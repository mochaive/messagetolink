'use client';

import ThemeToggle from './ThemeToggle';

/**
 * Site-wide header with logo and theme toggle.
 */
export default function Header() {
  return (
    <header
      className="
        w-full
        border-b border-[var(--border-default)]
      "
    >
      <div
        className="
          mx-auto max-w-[1280px]
          flex items-center justify-between
          px-4 py-3
          md:px-8
        "
      >
        <a
          href="/"
          className="
            text-[var(--text-primary)]
            font-[var(--font-mono)] font-semibold text-[15px]
            tracking-[-0.02em]
            no-underline
            transition-colors duration-150 ease-in-out
            hover:text-[var(--accent)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--accent)]
            focus-visible:ring-opacity-30
            rounded-[var(--radius-sm)]
          "
        >
          messagetolink
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
}
