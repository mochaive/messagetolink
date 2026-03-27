'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageViewProps {
  content: string;
  viewMode: 'rendered' | 'raw';
}

/**
 * Renders a decoded message either as formatted markdown or as raw text.
 *
 * @param content - The markdown string to display.
 * @param viewMode - Whether to render the content as 'rendered' markdown or 'raw' text.
 */
export default function MessageView({ content, viewMode }: MessageViewProps) {
  if (viewMode === 'raw') {
    return (
      <pre
        className="
          w-full max-w-[680px] mx-auto
          whitespace-pre-wrap break-words
          font-[var(--font-mono)] text-[15px] leading-[1.7]
          text-[var(--text-primary)]
          p-6
          rounded-[var(--radius-md)]
          bg-[var(--bg-surface)]
          border border-[var(--border-default)]
          shadow-[var(--shadow-2)]
          overflow-x-auto
        "
        aria-label="Raw message content"
      >
        {content}
      </pre>
    );
  }

  return (
    <article
      className="
        w-full max-w-[680px] mx-auto
        p-6
        rounded-[var(--radius-md)]
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
        shadow-[var(--shadow-2)]
      "
      aria-label="Message content"
    >
      <div
        className="
          reader-content
          [&_h1]:text-[1.875rem] [&_h1]:font-bold [&_h1]:leading-[1.2] [&_h1]:tracking-[-0.02em] [&_h1]:mb-4 [&_h1]:text-[var(--text-primary)]
          [&_h2]:text-[1.5rem] [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.015em] [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-[var(--text-primary)]
          [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_h3]:leading-[1.3] [&_h3]:tracking-[-0.01em] [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-[var(--text-primary)]
          [&_p]:leading-[1.75] [&_p]:mb-[1.25em] [&_p]:text-[var(--text-primary)]
          [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[var(--accent-hover)]
          [&_code]:font-[var(--font-mono)] [&_code]:text-[0.875rem] [&_code]:bg-[var(--bg-subtle)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-[4px]
          [&_pre]:bg-[var(--bg-subtle)] [&_pre]:rounded-[6px] [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
          [&_li]:mb-1 [&_li]:text-[var(--text-primary)]
          [&_blockquote]:border-l-[3px] [&_blockquote]:border-[var(--border-strong)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--text-secondary)] [&_blockquote]:mb-4
          [&_hr]:border-[var(--border-default)] [&_hr]:my-8
          [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
          [&_th]:border [&_th]:border-[var(--border-default)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-[var(--bg-subtle)]
          [&_td]:border [&_td]:border-[var(--border-default)] [&_td]:px-3 [&_td]:py-2
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
