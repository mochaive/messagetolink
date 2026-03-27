'use client';

import { useState, useCallback } from 'react';

interface MessageActionsProps {
  content: string;
  viewMode: 'rendered' | 'raw';
  onToggleView: () => void;
}

/**
 * Toolbar with actions for a decoded message: copy to clipboard, download as Markdown, and toggle view mode.
 *
 * @param content - The message content string used for copy and download.
 * @param viewMode - Current view mode ('rendered' or 'raw'), used for the toggle label.
 * @param onToggleView - Callback to switch between rendered and raw view.
 */
export default function MessageActions({
  content,
  viewMode,
  onToggleView,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silently
    }
  }, [content]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'message.md';
    link.click();
    URL.revokeObjectURL(url);
  }, [content]);

  return (
    <div
      className="flex items-center gap-2 w-full max-w-[680px] mx-auto mt-4"
      role="toolbar"
      aria-label="Message actions"
    >
      <ActionButton
        onClick={handleCopy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy message content'}
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy
          </>
        )}
      </ActionButton>

      {/* Live region for copy feedback */}
      <div aria-live="polite" className="sr-only">
        {copied ? 'Message copied to clipboard' : ''}
      </div>

      <ActionButton onClick={handleDownload} aria-label="Download as Markdown file">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
        Download
      </ActionButton>

      <ActionButton
        onClick={onToggleView}
        aria-label={`Switch to ${viewMode === 'rendered' ? 'raw' : 'rendered'} view`}
        aria-pressed={viewMode === 'raw'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        {viewMode === 'rendered' ? 'Raw' : 'Rendered'}
      </ActionButton>
    </div>
  );
}

function ActionButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="
        inline-flex items-center gap-1.5
        rounded-[var(--radius-sm)] px-3 min-h-[44px]
        text-[13px] font-medium
        cursor-pointer
        text-[var(--text-secondary)]
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
        shadow-[var(--shadow-1)]
        transition-colors duration-150 ease-in-out
        hover:text-[var(--text-primary)]
        hover:border-[var(--border-strong)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--accent)]
        focus-visible:ring-opacity-30
        active:bg-[var(--bg-subtle)]
      "
    >
      {children}
    </button>
  );
}
