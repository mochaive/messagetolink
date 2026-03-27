'use client';

/**
 * Site-wide footer with author attribution and support links.
 */
export default function Footer() {
  return (
    <footer
      className="
        w-full py-6 pb-20 lg:pb-6 mt-auto
        text-center text-[12px] leading-[1.6]
        text-[var(--text-tertiary)]
      "
    >
      <p>
        &copy; 2026{' '}
        <span className="mx-0.5 text-[var(--border-default)]" aria-hidden="true">&middot;</span>{' '}
        made by{' '}
        <a
          href="https://www.linkedin.com/in/mochaive/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-[var(--text-tertiary)]
            underline underline-offset-2 decoration-[var(--border-default)]
            transition-colors duration-150 ease-in-out
            hover:text-[var(--text-secondary)] hover:decoration-[var(--border-strong)]
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-sm
          "
        >
          Mocha
        </a>
        <span className="mx-1.5 text-[var(--border-default)]" aria-hidden="true">&middot;</span>
        <a
          href="https://github.com/mochaive/messagetolink"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-[var(--text-tertiary)]
            underline underline-offset-2 decoration-[var(--border-default)]
            transition-colors duration-150 ease-in-out
            hover:text-[var(--text-secondary)] hover:decoration-[var(--border-strong)]
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-sm
          "
        >
          GitHub
        </a>
        <span className="mx-1.5 text-[var(--border-default)]" aria-hidden="true">&middot;</span>
        <a
          href="https://ko-fi.com/mochaive"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-[var(--text-tertiary)]
            underline underline-offset-2 decoration-[var(--border-default)]
            transition-colors duration-150 ease-in-out
            hover:text-[var(--text-secondary)] hover:decoration-[var(--border-strong)]
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-sm
          "
        >
          Buy me a coffee
        </a>
      </p>
    </footer>
  );
}
