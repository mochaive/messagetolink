'use client';

import { useState } from 'react';

interface OptionsPanelProps {
  password: string;
  onPasswordChange: (value: string) => void;
  isPasswordEnabled: boolean;
  onToggle: () => void;
}

/**
 * Panel for configuring message options such as password encryption.
 *
 * @param password - Current password value.
 * @param onPasswordChange - Callback invoked when the password input changes.
 * @param isPasswordEnabled - Whether password protection is currently toggled on.
 * @param onToggle - Callback to toggle password protection on or off.
 */
export default function OptionsPanel({
  password,
  onPasswordChange,
  isPasswordEnabled,
  onToggle,
}: OptionsPanelProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Toggle row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="password-toggle"
          className="
            text-[13px] font-medium leading-[1.5]
            text-[var(--text-secondary)]
            cursor-pointer select-none
          "
        >
          Encrypt with password
        </label>
        <button
          id="password-toggle"
          role="switch"
          type="button"
          aria-checked={isPasswordEnabled}
          aria-label="Toggle password protection"
          onClick={onToggle}
          className={`
            relative inline-flex shrink-0
            w-[44px] h-[24px]
            rounded-full cursor-pointer
            border-2 border-transparent
            transition-colors duration-150 ease-in-out
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--accent)]
            focus-visible:ring-opacity-30
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[var(--bg-base)]
            ${isPasswordEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'}
          `}
        >
          <span
            aria-hidden="true"
            className={`
              pointer-events-none inline-block
              w-[20px] h-[20px]
              rounded-full bg-white
              shadow-[var(--shadow-1)]
              transition-transform duration-150 ease-in-out
              ${isPasswordEnabled ? 'translate-x-[20px]' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

      {/* Password input */}
      {isPasswordEnabled && (
        <div className="relative">
          <label htmlFor="password-input" className="sr-only">
            Encryption password
          </label>
          <input
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter password…"
            autoComplete="off"
            className="
              w-full
              rounded-[var(--radius-sm)] py-[10px] pl-3 pr-12
              text-[14px] leading-[1.5]
              text-[var(--text-primary)]
              placeholder:text-[var(--text-tertiary)]
              bg-[var(--bg-surface)]
              border border-[var(--border-default)]
              shadow-[var(--shadow-1)]
              outline-none
              transition-colors duration-150 ease-in-out
              hover:border-[var(--border-strong)]
              focus-visible:border-[var(--accent)]
              focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-opacity-30
            "
            aria-label="Encryption password"
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
      )}
    </div>
  );
}
