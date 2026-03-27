'use client';

import { useTheme } from '@/hooks/useTheme';

/**
 * Button that toggles between light and dark themes.
 * Renders a sun icon in light mode and a moon icon in dark mode.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="
        relative w-10 h-10 flex items-center justify-center
        rounded-[var(--radius-sm)] cursor-pointer
        text-[var(--text-secondary)]
        transition-colors duration-150 ease-in-out
        hover:text-[var(--text-primary)]
        hover:bg-[var(--bg-subtle)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--accent)]
        focus-visible:ring-opacity-30
        active:scale-95
      "
    >
      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          absolute transition-opacity duration-200 ease-in-out
          ${isDark ? 'opacity-0' : 'opacity-100'}
        `}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>

      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          absolute transition-opacity duration-200 ease-in-out
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}
