'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  decode,
  isEncrypted as checkEncrypted,
  NeedPasswordError,
  InvalidFormatError,
} from '@/lib/codec';
import { DecryptionError } from '@/lib/crypto';

interface UseDecoderResult {
  /** Decoded message content, or null if not yet decoded */
  content: string | null;
  /** Whether the hash represents an encrypted message */
  isEncrypted: boolean;
  /** True while decoding is in progress */
  isDecoding: boolean;
  /** Error message if decoding failed, null otherwise */
  error: string | null;
  /** Call with a password to decrypt an encrypted message */
  decrypt: (password: string) => Promise<void>;
}

/**
 * Parse and decode a URL hash fragment into message content.
 *
 * - Plain messages are decoded automatically on mount/hash change.
 * - Encrypted messages require calling `decrypt(password)`.
 *
 * @param hash - The URL hash fragment (with or without leading '#').
 */
export function useDecoder(hash: string): UseDecoderResult {
  const [content, setContent] = useState<string | null>(null);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const staleRef = useRef(false);

  // Auto-decode on mount / hash change
  useEffect(() => {
    staleRef.current = false;
    setContent(null);
    setError(null);
    setIsDecoding(false);

    if (!hash) {
      setIsEncrypted(false);
      return;
    }

    const encrypted = checkEncrypted(hash);
    setIsEncrypted(encrypted);

    if (encrypted) {
      // Wait for user to call decrypt(password)
      return;
    }

    // Plain message: auto-decode
    setIsDecoding(true);
    decode(hash)
      .then((result) => {
        if (staleRef.current) return;
        setContent(result);
      })
      .catch((err: unknown) => {
        if (staleRef.current) return;
        setError(mapError(err));
      })
      .finally(() => {
        if (staleRef.current) return;
        setIsDecoding(false);
      });

    return () => {
      staleRef.current = true;
    };
  }, [hash]);

  // Manual decrypt for encrypted messages
  const decryptMessage = useCallback(
    async (password: string) => {
      if (!hash) return;
      setIsDecoding(true);
      setError(null);

      try {
        const result = await decode(hash, password);
        setContent(result);
      } catch (err: unknown) {
        setError(mapError(err));
      } finally {
        setIsDecoding(false);
      }
    },
    [hash],
  );

  return {
    content,
    isEncrypted,
    isDecoding,
    error,
    decrypt: decryptMessage,
  };
}

/**
 * Map codec/crypto errors to user-friendly messages.
 */
function mapError(err: unknown): string {
  if (err instanceof DecryptionError) {
    return 'Wrong password. Please try again.';
  }
  if (err instanceof NeedPasswordError) {
    return 'Password required.';
  }
  if (err instanceof InvalidFormatError) {
    return 'This link does not contain a valid message.';
  }
  return 'An unexpected error occurred while decoding.';
}
