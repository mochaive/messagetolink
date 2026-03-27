import LZString from 'lz-string';
import {
  VERSION,
  PREFIX_PLAIN,
  PREFIX_ENCRYPTED,
  BASE_URL,
} from '@/lib/constants';
import {
  encrypt as cryptoEncrypt,
  decrypt as cryptoDecrypt,
  DecryptionError,
} from '@/lib/crypto';

/** Compact message payload — short keys to minimize encoded size */
export interface MessagePayload {
  /** Message content (markdown) */
  c: string;
  /** Format version */
  v: number;
}

/**
 * Thrown when an encrypted message is decoded without a password.
 */
export class NeedPasswordError extends Error {
  constructor() {
    super('This message is encrypted. A password is required to decode it.');
    this.name = 'NeedPasswordError';
  }
}

/**
 * Thrown when the URL fragment cannot be parsed as a valid message.
 */
export class InvalidFormatError extends Error {
  constructor(message = 'The URL fragment is not a valid message format.') {
    super(message);
    this.name = 'InvalidFormatError';
  }
}

/**
 * Strip the leading '#' from a hash string if present.
 */
function stripHash(hash: string): string {
  return hash.startsWith('#') ? hash.slice(1) : hash;
}

/**
 * Encode a message into a full URL with the content in the hash fragment.
 *
 * @param content - The markdown message to encode.
 * @param password - Optional password for AES-GCM encryption.
 * @returns Full URL string (e.g. `https://messageto.link/#v1p:...`).
 */
export async function encode(
  content: string,
  password?: string,
): Promise<string> {
  const payload: MessagePayload = { c: content, v: VERSION };
  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);

  if (password) {
    const { salt, iv, data } = await cryptoEncrypt(compressed, password);
    const fragment = `${PREFIX_ENCRYPTED}${salt}:${iv}:${data}`;
    return `${BASE_URL}/#${fragment}`;
  }

  return `${BASE_URL}/#${PREFIX_PLAIN}${compressed}`;
}

/**
 * Synchronously encode a plaintext (unencrypted) message.
 * Used by useEncoder for the non-password path to avoid async overhead.
 */
export function encodePlain(content: string): string {
  const payload: MessagePayload = { c: content, v: VERSION };
  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `${BASE_URL}/#${PREFIX_PLAIN}${compressed}`;
}

/**
 * Decode a message from a URL hash fragment.
 *
 * @param hash - The hash fragment (with or without leading '#').
 * @param password - Required if the message is encrypted.
 * @returns The decoded message content string.
 * @throws {NeedPasswordError} if encrypted and no password provided.
 * @throws {InvalidFormatError} if the format is unrecognizable or corrupt.
 * @throws {DecryptionError} if the password is wrong.
 */
export async function decode(
  hash: string,
  password?: string,
): Promise<string> {
  const raw = stripHash(hash);

  if (raw.startsWith(PREFIX_ENCRYPTED)) {
    if (!password) throw new NeedPasswordError();

    const body = raw.slice(PREFIX_ENCRYPTED.length);
    const parts = body.split(':');
    if (parts.length !== 3) {
      throw new InvalidFormatError('Encrypted message has an invalid structure.');
    }

    const [salt, iv, data] = parts;

    let compressed: string;
    try {
      compressed = await cryptoDecrypt(data, password, salt, iv);
    } catch (err) {
      if (err instanceof DecryptionError) throw err;
      throw new InvalidFormatError('Failed to decrypt message data.');
    }

    return parseCompressed(compressed);
  }

  if (raw.startsWith(PREFIX_PLAIN)) {
    const compressed = raw.slice(PREFIX_PLAIN.length);
    return parseCompressed(compressed);
  }

  throw new InvalidFormatError();
}

/**
 * Decompress and parse a compressed payload string.
 */
function parseCompressed(compressed: string): string {
  const json = LZString.decompressFromEncodedURIComponent(compressed);
  if (!json) {
    throw new InvalidFormatError('Decompression produced empty result.');
  }

  let payload: MessagePayload;
  try {
    payload = JSON.parse(json) as MessagePayload;
  } catch {
    throw new InvalidFormatError('Decompressed data is not valid JSON.');
  }

  if (typeof payload.c !== 'string' || typeof payload.v !== 'number') {
    throw new InvalidFormatError('Message payload is missing required fields.');
  }

  if (payload.v !== VERSION) {
    throw new InvalidFormatError(`Unsupported message version: ${payload.v}`);
  }

  return payload.c;
}

/**
 * Check whether a hash fragment represents an encrypted message.
 */
export function isEncrypted(hash: string): boolean {
  return stripHash(hash).startsWith(PREFIX_ENCRYPTED);
}

/**
 * Estimate the total URL length for a given content string.
 * This is a synchronous approximation — encrypted URLs will be slightly larger
 * due to base64url expansion of ciphertext.
 *
 * @param content - The markdown message.
 * @param password - If provided, estimates encrypted URL length.
 * @returns Estimated character count of the full URL.
 */
export function getContentLength(
  content: string,
  password?: string,
): number {
  if (!content) return 0;

  const payload: MessagePayload = { c: content, v: VERSION };
  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);

  const baseLength = BASE_URL.length + 2; // '/#'

  if (password) {
    // AES-GCM adds 16-byte auth tag; base64url expands ~4/3x; plus salt:iv:prefix overhead
    const encryptedEstimate = Math.ceil(compressed.length * 1.35) + 60;
    return baseLength + PREFIX_ENCRYPTED.length + encryptedEstimate;
  }

  return baseLength + PREFIX_PLAIN.length + compressed.length;
}
