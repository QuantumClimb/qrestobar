import React, { useEffect } from 'react';
import { X, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ThemeMetadata, SiteThemeId } from '../../themes/types';

interface ThemeMockupModalProps {
  theme: ThemeMetadata | null;
  isOpen: boolean;
  onClose: () => void;
  onPreviewLive?: (themeId: SiteThemeId) => void;
  isActiveTheme?: boolean;
}

export const ThemeMockupModal: React.FC<ThemeMockupModalProps> = ({
  theme,
  isOpen,
  onClose,
  onPreviewLive,
  isActiveTheme = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !theme) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mockup-modal-title"
    >
      <div
        className="bg-qc-surface border border-border-base rounded-md shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border-base flex items-center justify-between bg-qc-surface shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: theme.accentColor }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 id="mockup-modal-title" className="text-lg font-bold text-qc-primary">
                  {theme.name}
                </h2>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                    theme.access === 'included'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {theme.access === 'included' ? 'Included Theme' : 'Premium Theme'}
                </span>
                {isActiveTheme && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Active Site Theme
                  </span>
                )}
              </div>
              <p className="text-xs text-qc-body">{theme.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm text-qc-body hover:text-qc-primary hover:bg-qc-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Close mockup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content / Large Mockup Image */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-qc-base/60">
          <div className="rounded-sm overflow-hidden border border-border-strong shadow-lg bg-qc-base flex justify-center items-center">
            <img
              src={theme.previewImage}
              alt={`${theme.name} Full Mockup Preview`}
              className="w-full h-auto max-h-[60vh] object-contain"
              loading="lazy"
            />
          </div>

          {/* Details & Palette Swatches */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-qc-surface border border-border-base p-5 rounded-sm">
            <div className="md:col-span-8 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Design Identity &amp; Aesthetic
              </h3>
              <p className="text-sm text-qc-body leading-relaxed">
                {theme.description}
              </p>
              {theme.tags && theme.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {theme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] bg-qc-base border border-border-default rounded-xs text-qc-body font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-4 space-y-3 md:border-l md:border-border-base md:pl-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Palette &amp; Status
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.accentColor }}
                    title={`Primary Accent: ${theme.accentColor}`}
                  />
                  {theme.secondaryAccent && (
                    <div
                      className="w-6 h-6 rounded border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.secondaryAccent }}
                      title={`Secondary Accent: ${theme.secondaryAccent}`}
                    />
                  )}
                </div>
                <div className="text-[11px] text-qc-body font-mono">
                  <span>{theme.accentColor}</span>
                  {theme.secondaryAccent && <span> · {theme.secondaryAccent}</span>}
                </div>
              </div>

              <div className="pt-1 text-xs">
                <span className="text-qc-body font-light">Runtime Status: </span>
                <span
                  className={`font-semibold ${
                    theme.available ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {theme.available ? 'Implemented & Previewable' : 'Design Concept / Coming Soon'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-border-base flex items-center justify-between bg-qc-surface shrink-0">
          <div className="text-xs text-qc-body">
            {theme.access === 'premium' && (
              <span className="flex items-center gap-1.5 text-amber-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                Premium Theme — Publishing requires theme activation
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-qc-body hover:text-qc-primary border border-border-strong rounded-sm hover:bg-qc-base transition-colors"
            >
              Close
            </button>

            {theme.available && onPreviewLive && (
              <button
                onClick={() => onPreviewLive(theme.id)}
                className="btn-gold px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Live Theme</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
