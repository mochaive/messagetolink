'use client';

import { useState, useCallback } from 'react';
import { useEncoder } from '@/hooks/useEncoder';
import LiveEditor from './LiveEditor';
import OptionsPanel from './OptionsPanel';
import UrlDisplay from './UrlDisplay';

/**
 * Main page for composing and encoding messages.
 * Manages editor content, password options, and URL generation.
 */
export default function WriterPage() {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setIsPasswordEnabled((prev) => !prev);
  }, []);

  const { encodedUrl, isEncoding, error, urlLength } = useEncoder(
    content,
    password,
    isPasswordEnabled,
  );

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1280px] mx-auto px-4 py-6 md:px-8 md:py-8 gap-6 lg:gap-10 overflow-x-hidden">
      {/* Main content area */}
      <section
        className="flex flex-col gap-5 flex-1 min-w-0"
        aria-label="Message writer"
      >
        {/* Options */}
        <OptionsPanel
          password={password}
          onPasswordChange={setPassword}
          isPasswordEnabled={isPasswordEnabled}
          onToggle={handleTogglePassword}
        />

        {/* Live markdown editor — type markdown, see it rendered in place */}
        <LiveEditor value={content} onChange={setContent} />

        {/* Encoding status */}
        {isEncoding && (
          <p
            className="text-[13px] text-[var(--text-tertiary)]"
            role="status"
            aria-live="polite"
          >
            Encrypting…
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-[13px] text-[var(--error)] font-medium" role="alert">
            {error}
          </p>
        )}
      </section>

      {/* Desktop sidebar — URL sticky */}
      <aside className="hidden lg:flex flex-col w-[280px] shrink-0">
        <div className="sticky top-8">
          <UrlDisplay url={encodedUrl} urlLength={urlLength} />
        </div>
      </aside>

      {/* Mobile URL bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-10 bg-[var(--bg-base)] border-t border-[var(--border-default)] px-4 py-3">
        <UrlDisplay url={encodedUrl} urlLength={urlLength} />
      </div>
    </div>
  );
}
