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
            flex items-center gap-2
            text-[var(--text-primary)]
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
          <img
            src="/messagetolink_logo.svg"
            alt=""
            width={24}
            height={24}
            className="block"
          />
          <span
            className="
              font-[var(--font-logo)] font-semibold text-[15px]
              tracking-[-0.02em]
            "
          >
            messagetolink
          </span>
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
}
