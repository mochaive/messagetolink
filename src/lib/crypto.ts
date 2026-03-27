import {
  PBKDF2_ITERATIONS,
  SALT_LENGTH,
  IV_LENGTH,
} from '@/lib/constants';

/**
 * Thrown when decryption fails due to wrong password or corrupted data.
 */
export class DecryptionError extends Error {
  constructor(message = 'Decryption failed. Wrong password or corrupted data.') {
    super(message);
    this.name = 'DecryptionError';
  }
}

/** Result of an encryption operation, all fields base64url-encoded */
export interface EncryptedPayload {
  salt: string;
  iv: string;
  data: string;
}

/**
 * Convert an ArrayBuffer to a URL-safe base64 string (no +, /, or = characters).
 */
export function toBase64Url(bytes: Uint8Array<ArrayBuffer>): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Convert a base64url string back to a Uint8Array.
 */
export function fromBase64Url(base64url: string): Uint8Array<ArrayBuffer> {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad === 2) base64 += '==';
  else if (pad === 3) base64 += '=';

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Ensure Web Crypto API is available (browser-only).
 */
function assertCryptoAvailable(): void {
  if (typeof globalThis.crypto?.subtle === 'undefined') {
    throw new Error('Web Crypto API is not available in this environment.');
  }
}

/**
 * Derive an AES-GCM 256-bit key from a password and salt using PBKDF2 SHA-256.
 */
export async function deriveKey(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
): Promise<CryptoKey> {
  assertCryptoAvailable();

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/**
 * Encrypt a plaintext string with AES-GCM using a password.
 * Returns salt, iv, and ciphertext as base64url strings.
 */
export async function encrypt(
  plaintext: string,
  password: string,
): Promise<EncryptedPayload> {
  assertCryptoAvailable();

  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(password, salt);

  const encoder = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext),
  );

  return {
    salt: toBase64Url(salt),
    iv: toBase64Url(iv),
    data: toBase64Url(new Uint8Array(ciphertext)),
  };
}

/**
 * Decrypt an AES-GCM encrypted payload using a password.
 * @throws {DecryptionError} if the password is wrong or data is corrupted.
 */
export async function decrypt(
  encryptedData: string,
  password: string,
  salt: string,
  iv: string,
): Promise<string> {
  assertCryptoAvailable();

  try {
    const saltBuf = fromBase64Url(salt);
    const ivBuf = fromBase64Url(iv);
    const dataBuf = fromBase64Url(encryptedData);

    const key = await deriveKey(password, saltBuf);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivBuf },
      key,
      dataBuf,
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (err) {
    if (err instanceof DecryptionError) throw err;
    throw new DecryptionError();
  }
}
