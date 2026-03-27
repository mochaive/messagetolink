'use client';

import { useState, useCallback } from 'react';
import { URL_MAX_SAFE_LENGTH } from '@/lib/constants';

interface UrlDisplayProps {
  url: string;
  urlLength: number;
}

/**
 * Displays the generated message URL with a copy button and a URL-length progress bar.
 *
 * @param url - The full encoded URL to display.
 * @param urlLength - Estimated character length of the URL for the length indicator.
 */
export default function UrlDisplay({ url, urlLength }: UrlDisplayProps) {
  const [copied, setCopied] = useState(false);

  const ratio = urlLength / URL_MAX_SAFE_LENGTH;
  const barColor =
    ratio < 0.6
      ? 'var(--success)'
      : ratio < 0.85
        ? 'var(--warning)'
        : 'var(--error)';
  const barWidth = Math.min(ratio * 100, 100);

  const handleCopy = useCallback(async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text for manual copy
    }
  }, [url]);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-medium tracking-[0.05em] uppercase text-[var(--text-tertiary)]">
        Link
      </span>

      {/* URL + Copy */}
      <div
        className="
          flex items-center gap-2
          rounded-[var(--radius-md)] p-3
          bg-[var(--bg-surface)]
          border border-[var(--border-default)]
          shadow-[var(--shadow-1)]
        "
      >
        <span
          className="
            flex-1 min-w-0
            font-[var(--font-mono)] text-[12px] leading-[1.5]
            text-[var(--text-secondary)]
            truncate select-all
          "
          title={url || undefined}
        >
          {url || (
            <span className="text-[var(--text-tertiary)] italic">
              Start typing…
            </span>
          )}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!url}
          aria-label={copied ? 'Copied to clipboard' : 'Copy link to clipboard'}
          className={`
            shrink-0 inline-flex items-center gap-1.5
            min-h-[36px]
            rounded-[var(--radius-sm)] px-3
            text-[12px] font-medium text-white
            cursor-pointer
            transition-colors duration-150 ease-in-out
            disabled:opacity-40 disabled:cursor-not-allowed
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--accent)]
            focus-visible:ring-opacity-30
            ${copied
              ? 'bg-[var(--success)]'
              : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent)]'
            }
          `}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied
            </>
          ) : (
            'Copy'
          )}
        </button>
      </div>

      {/* Live region for copy feedback */}
      <div aria-live="polite" className="sr-only">
        {copied ? 'Link copied to clipboard' : ''}
      </div>

      {/* Length indicator */}
      {urlLength > 0 && (
        <div className="flex items-center gap-2">
          <div
            className="flex-1 h-[3px] rounded-full bg-[var(--bg-subtle)] overflow-hidden"
            role="progressbar"
            aria-valuenow={urlLength}
            aria-valuemin={0}
            aria-valuemax={URL_MAX_SAFE_LENGTH}
            aria-label="URL length"
          >
            <div
              className="h-full rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${barWidth}%`, backgroundColor: barColor }}
            />
          </div>
          <span className="shrink-0 text-[10px] font-medium tabular-nums text-[var(--text-tertiary)]">
            {urlLength.toLocaleString()}/{URL_MAX_SAFE_LENGTH.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
