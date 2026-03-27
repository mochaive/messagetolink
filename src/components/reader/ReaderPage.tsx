'use client';

import { useState } from 'react';
import { useDecoder } from '@/hooks/useDecoder';
import PasswordPrompt from './PasswordPrompt';
import MessageView from './MessageView';
import MessageActions from './MessageActions';

interface ReaderPageProps {
  hash: string;
}

type ViewMode = 'rendered' | 'raw';

/**
 * Main page for decoding and displaying a message from a URL hash fragment.
 * Handles loading, encryption, error, and success states.
 *
 * @param hash - The URL hash fragment (without leading '#') containing the encoded message.
 */
export default function ReaderPage({ hash }: ReaderPageProps) {
  const { content, isEncrypted, isDecoding, error, decrypt } = useDecoder(hash);
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');

  const toggleView = () =>
    setViewMode((prev) => (prev === 'rendered' ? 'raw' : 'rendered'));

  // Loading state
  if (isDecoding && !content) {
    return (
      <section
        className="flex flex-col items-center justify-center flex-1 py-16 px-4"
        aria-label="Message reader"
        aria-busy="true"
      >
        <div
          className="
            w-6 h-6 rounded-full
            border-2 border-[var(--border-default)]
            border-t-[var(--accent)]
            animate-spin
          "
          role="status"
          aria-label="Decoding message"
        />
        <p className="mt-3 text-[14px] text-[var(--text-secondary)]">
          Decoding message...
        </p>
      </section>
    );
  }

  // Encrypted: needs password
  if (isEncrypted && !content) {
    return (
      <section
        className="flex flex-col items-center justify-center flex-1 py-16 px-4"
        aria-label="Message reader"
      >
        <PasswordPrompt onSubmit={decrypt} error={error} />
      </section>
    );
  }

  // Error state (non-encrypted)
  if (error && !content) {
    return (
      <section
        className="flex flex-col items-center justify-center flex-1 py-16 px-4"
        aria-label="Message reader"
      >
        <div className="text-center max-w-[400px]">
          <div
            className="
              w-12 h-12 mx-auto mb-4
              flex items-center justify-center
              rounded-full
              bg-[color-mix(in_srgb,var(--error)_10%,transparent)]
              text-[var(--error)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
          <p
            className="text-[16px] font-medium text-[var(--text-primary)] mb-1"
            role="alert"
          >
            Unable to read message
          </p>
          <p className="text-[14px] text-[var(--text-secondary)]">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // No hash provided
  if (!hash) {
    return (
      <section
        className="flex flex-col items-center justify-center flex-1 py-16 px-4"
        aria-label="Message reader"
      >
        <p className="text-[16px] text-[var(--text-secondary)]">
          No message found in this link.
        </p>
      </section>
    );
  }

  // Content available
  if (content) {
    return (
      <section
        className="flex flex-col flex-1 py-8 px-4 md:px-8 md:py-12"
        aria-label="Message reader"
      >
        <MessageView content={content} viewMode={viewMode} />
        <MessageActions
          content={content}
          viewMode={viewMode}
          onToggleView={toggleView}
        />
        <p className="mt-8 text-center text-[12px] text-[var(--text-tertiary)]">
          <a
            href="https://messageto.link"
            className="
              underline underline-offset-2 decoration-[var(--border-default)]
              transition-colors duration-150 ease-in-out
              hover:text-[var(--text-secondary)] hover:decoration-[var(--border-strong)]
            "
          >
            Create your own &rarr; messageto.link
          </a>
        </p>
      </section>
    );
  }

  return null;
}
