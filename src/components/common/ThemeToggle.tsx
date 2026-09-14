import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-sm border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
        isDark
          ? 'bg-qc-surface border-border-strong text-qc-secondary hover:text-purple-400 hover:border-purple-500/50'
          : 'bg-qc-elevated border-border-default text-qc-secondary hover:text-purple-600 hover:border-purple-600/50'
      } ${className}`}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (shown in Dark mode to prompt switching to Light) */}
        <Sun
          className={`w-4 h-4 text-purple-400 transition-all duration-300 absolute ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />

        {/* Moon Icon (shown in Light mode to prompt switching to Dark) */}
        <Moon
          className={`w-4 h-4 text-purple-600 transition-all duration-300 absolute ${
            !isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      </div>

      {showLabel && (
        <span className="ml-2.5 text-xs font-medium uppercase tracking-wider">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
