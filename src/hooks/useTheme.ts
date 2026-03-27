'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeResult {
  /** Current active theme */
  theme: Theme;
  /** Toggle between light and dark themes */
  toggleTheme: () => void;
}

const STORAGE_KEY = 'messagetolink-theme';

/**
 * Manage light/dark theme with localStorage persistence.
 *
 * Priority: localStorage → prefers-color-scheme → light (default).
 * Toggles the `dark` class on `document.documentElement` for Tailwind CSS.
 */
export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme from stored preference or system preference
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. some private browsing modes)
    }

    let resolved: Theme;
    if (stored === 'light' || stored === 'dark') {
      resolved = stored;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      resolved = 'dark';
    } else {
      resolved = 'light';
    }

    setTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.style.colorScheme = resolved;
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // localStorage unavailable
      }

      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.style.colorScheme = next;
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
