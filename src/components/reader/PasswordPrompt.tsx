'use client';

import { useState, useRef, useEffect } from 'react';

interface PasswordPromptProps {
  onSubmit: (password: string) => void;
  error?: string | null;
}

/**
 * Dialog prompting the user to enter a password to decrypt an encrypted message.
 *
 * @param onSubmit - Callback invoked with the entered password when the form is submitted.
 * @param error - Optional error message to display when decryption fails.
 */
export default function PasswordPrompt({ onSubmit, error }: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount (desktop only)
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      inputRef.current?.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
    }
  };

  return (
    <div
      className="
        w-full max-w-[400px] mx-auto
        rounded-[var(--radius-lg)] p-6
        bg-[var(--bg-surface)]
        shadow-[var(--shadow-3)]
        overscroll-contain
      "
      role="dialog"
      aria-labelledby="password-prompt-heading"
    >
      {/* Lock icon */}
      <div className="flex justify-center mb-4">
        <div
          className="
            w-12 h-12 flex items-center justify-center
            rounded-full
            bg-[var(--accent-subtle)]
            text-[var(--accent)]
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </div>

      <h2
        id="password-prompt-heading"
        className="
          text-center text-[20px] font-semibold leading-[1.3] tracking-[-0.01em]
          text-[var(--text-primary)]
          mb-1
        "
      >
        This message is encrypted
      </h2>
      <p className="text-center text-[14px] leading-[1.5] text-[var(--text-secondary)] mb-5">
        Enter the password to view the content.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <label htmlFor="decrypt-password" className="sr-only">
            Decryption password
          </label>
          <input
            ref={inputRef}
            id="decrypt-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password…"
            autoComplete="off"
            className={`
              w-full
              rounded-[var(--radius-sm)] py-[10px] pl-3 pr-12
              text-[14px] leading-[1.5]
              text-[var(--text-primary)]
              placeholder:text-[var(--text-tertiary)]
              bg-[var(--bg-base)]
              border
              shadow-[var(--shadow-1)]
              outline-none
              transition-colors duration-150 ease-in-out
              hover:border-[var(--border-strong)]
              focus-visible:border-[var(--accent)]
              focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-opacity-30
              ${error ? 'border-[var(--error)] animate-[shake_0.3s_ease-in-out]' : 'border-[var(--border-default)]'}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? 'decrypt-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="
              absolute right-1 top-1/2 -translate-y-1/2
              min-w-[44px] min-h-[44px] flex items-center justify-center
              rounded-[var(--radius-sm)] cursor-pointer
              text-[var(--text-tertiary)]
              transition-colors duration-150 ease-in-out
              hover:text-[var(--text-secondary)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--accent)]
              focus-visible:ring-opacity-30
            "
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <p
            id="decrypt-error"
            className="text-[13px] text-[var(--error)] font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!password.trim()}
          className="
            w-full min-h-[44px] rounded-[var(--radius-sm)]
            text-[14px] font-medium text-white
            bg-[var(--accent)]
            cursor-pointer
            transition-colors duration-150 ease-in-out
            hover:bg-[var(--accent-hover)]
            active:bg-[var(--accent)]
            disabled:opacity-40 disabled:cursor-not-allowed
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--accent)]
            focus-visible:ring-opacity-30
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[var(--bg-surface)]
          "
        >
          Decrypt Message
        </button>
      </form>
    </div>
  );
}
