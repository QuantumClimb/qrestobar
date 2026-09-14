import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-qc-base/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog container */}
      <div 
        className={`relative w-full ${maxWidthClasses[maxWidth]} my-8 bg-qc-surface border border-border-strong/80 rounded-sm shadow-2xl z-10 overflow-hidden transform transition-all animate-slide-up`}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between p-6 border-b border-border-base bg-qc-base/40">
            <div>
              {title && (
                <h3 className="text-xl sm:text-2xl font-display text-qc-primary tracking-wide">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-xs text-purple-500 font-medium tracking-wider uppercase">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-qc-body hover:text-qc-secondary p-1.5 transition-colors rounded-sm hover:bg-qc-elevated"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal without explicit header button */}
        {!title && !subtitle && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-qc-body hover:text-qc-secondary p-1.5 bg-qc-base/60 rounded-full transition-colors hover:bg-qc-elevated"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Body Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
