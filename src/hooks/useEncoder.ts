'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import LZString from 'lz-string';
import { encode, getContentLength } from '@/lib/codec';
import {
  VERSION,
  PREFIX_PLAIN,
  BASE_URL,
  DEBOUNCE_MS,
} from '@/lib/constants';

interface UseEncoderResult {
  /** The full encoded URL, or empty string if content is empty */
  encodedUrl: string;
  /** True while async encryption is in progress */
  isEncoding: boolean;
  /** Error message if encoding failed, null otherwise */
  error: string | null;
  /** Estimated total URL length in characters */
  urlLength: number;
}

/**
 * Reactively encode content into a message URL.
 *
 * - Plain mode (no password): computed synchronously via useMemo.
 * - Encrypted mode: debounced async computation via useEffect.
 *
 * @param content - The markdown message to encode.
 * @param password - The encryption password.
 * @param isPasswordEnabled - Whether encryption is active.
 */
export function useEncoder(
  content: string,
  password: string,
  isPasswordEnabled: boolean,
): UseEncoderResult {
  const [encryptedUrl, setEncryptedUrl] = useState('');
  const [isEncoding, setIsEncoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generationRef = useRef(0);

  // Plain mode: synchronous encoding (no crypto needed)
  const plainUrl = useMemo(() => {
    if (!content) return '';
    const payload = JSON.stringify({ c: content, v: VERSION });
    const compressed = LZString.compressToEncodedURIComponent(payload);
    return `${BASE_URL}/#${PREFIX_PLAIN}${compressed}`;
  }, [content]);

  // Encrypted mode: debounced async encoding
  useEffect(() => {
    if (!isPasswordEnabled || !password || !content) {
      setEncryptedUrl('');
      setIsEncoding(false);
      setError(null);
      return;
    }

    const generation = ++generationRef.current;
    setIsEncoding(true);
    setError(null);

    const timer = setTimeout(() => {
      encode(content, password)
        .then((url) => {
          if (generationRef.current !== generation) return;
          setEncryptedUrl(url);
          setError(null);
        })
        .catch((err: unknown) => {
          if (generationRef.current !== generation) return;
          setEncryptedUrl('');
          setError(err instanceof Error ? err.message : 'Encoding failed.');
        })
        .finally(() => {
          if (generationRef.current !== generation) return;
          setIsEncoding(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [content, password, isPasswordEnabled]);

  // Determine which URL to use based on mode
  const useEncrypted = isPasswordEnabled && !!password;
  const encodedUrl = !content ? '' : useEncrypted ? encryptedUrl : plainUrl;

  // URL length estimate (always synchronous)
  const urlLength = useMemo(() => {
    if (!content) return 0;
    return getContentLength(content, useEncrypted ? password : undefined);
  }, [content, password, useEncrypted]);

  return {
    encodedUrl,
    isEncoding: useEncrypted ? isEncoding : false,
    error: useEncrypted ? error : null,
    urlLength,
  };
}
