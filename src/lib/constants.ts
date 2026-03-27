/** Format version for message payloads */
export const VERSION = 1 as const;

/** URL fragment prefix for plaintext (unencrypted) messages */
export const PREFIX_PLAIN = 'v1p:' as const;

/** URL fragment prefix for encrypted messages */
export const PREFIX_ENCRYPTED = 'v1e:' as const;

/** PBKDF2 iteration count for key derivation */
export const PBKDF2_ITERATIONS = 100_000;

/** Salt length in bytes for PBKDF2 */
export const SALT_LENGTH = 16;

/** Initialization vector length in bytes for AES-GCM */
export const IV_LENGTH = 12;

/** Maximum safe URL length in characters (browsers typically support ~8KB) */
export const URL_MAX_SAFE_LENGTH = 8000;

/** Base URL for generated message links */
export const BASE_URL = 'https://messageto.link' as const;

/** Debounce delay in milliseconds for encrypted encoding */
export const DEBOUNCE_MS = 300;
