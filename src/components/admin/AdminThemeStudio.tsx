import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, Sparkles, ShieldAlert, X, Layers } from 'lucide-react';
import { THEME_CATALOG_LIST } from '../../themes/themeCatalog';
import { ThemeMetadata, SiteThemeId } from '../../themes/types';
import { useSiteTheme } from '../../context/SiteThemeContext';
import { ThemeCard } from './ThemeCard';
import { ThemeMockupModal } from './ThemeMockupModal';

export const AdminThemeStudio: React.FC = () => {
  const { activeThemeId, previewTheme } = useSiteTheme();
  const navigate = useNavigate();

  const [selectedMockupTheme, setSelectedMockupTheme] = useState<ThemeMetadata | null>(null);
  const [activationInfoTheme, setActivationInfoTheme] = useState<ThemeMetadata | null>(null);

  const activeThemeMeta = THEME_CATALOG_LIST.find((t) => t.id === activeThemeId) || THEME_CATALOG_LIST[0];
  const availableCount = THEME_CATALOG_LIST.filter((t) => t.available).length;
  const premiumCount = THEME_CATALOG_LIST.filter((t) => t.access === 'premium').length;

  const handlePreviewLive = (themeId: SiteThemeId) => {
    const res = previewTheme(themeId);
    if (res.success) {
      if (selectedMockupTheme) {
        setSelectedMockupTheme(null);
      }
      // Navigate to public website in live preview mode
      navigate('/');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in w-full max-w-full min-w-0">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-qc-surface border border-border-base p-6 rounded-sm shadow-sm w-full max-w-full min-w-0 overflow-hidden">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-widest">
            <Palette className="w-3.5 h-3.5" />
            <span>Theme Management &amp; Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
            Theme Studio
          </h1>
          <p className="text-xs sm:text-sm text-qc-body max-w-2xl font-light">
            Choose, preview and manage the visual experience of your restaurant website.
          </p>
        </div>

        {/* Quick Metrics Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 w-full md:w-auto">
          <div className="bg-qc-base border border-border-default px-3.5 py-2 rounded-xs flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: activeThemeMeta.accentColor }}
            />
            <div>
              <span className="text-[10px] uppercase font-mono text-qc-body block leading-none">Active Theme</span>
              <span className="text-xs font-bold text-qc-primary">{activeThemeMeta.name}</span>
            </div>
          </div>

          <div className="bg-qc-base border border-border-default px-3.5 py-2 rounded-xs flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <span className="text-[10px] uppercase font-mono text-qc-body block leading-none">Implemented</span>
              <span className="text-xs font-bold text-emerald-400">{availableCount} / {THEME_CATALOG_LIST.length} Ready</span>
            </div>
          </div>

          <div className="bg-qc-base border border-border-default px-3.5 py-2 rounded-xs flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <span className="text-[10px] uppercase font-mono text-qc-body block leading-none">Premium</span>
              <span className="text-xs font-bold text-amber-400">{premiumCount} Themes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="space-y-4 w-full max-w-full min-w-0">
        <div className="flex items-center justify-between w-full max-w-full min-w-0">
          <div>
            <h2 className="text-base font-bold text-qc-primary">
              All Themes ({THEME_CATALOG_LIST.length})
            </h2>
            <p className="text-xs text-qc-body">
              Explore signatures and curated premium styles tailored for upscale hospitality.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full min-w-0">
          {THEME_CATALOG_LIST.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isActive={theme.id === activeThemeId}
              onViewMockup={(t) => setSelectedMockupTheme(t)}
              onPreviewLive={handlePreviewLive}
              onShowActivationInfo={(t) => setActivationInfoTheme(t)}
            />
          ))}
        </div>
      </div>

      {/* Mockup Modal */}
      <ThemeMockupModal
        theme={selectedMockupTheme}
        isOpen={Boolean(selectedMockupTheme)}
        onClose={() => setSelectedMockupTheme(null)}
        onPreviewLive={handlePreviewLive}
        isActiveTheme={selectedMockupTheme?.id === activeThemeId}
      />

      {/* Informational Premium Activation Modal */}
      {activationInfoTheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in"
          onClick={() => setActivationInfoTheme(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="activation-modal-title"
        >
          <div
            className="bg-qc-surface border border-border-base rounded-md shadow-2xl max-w-md w-full p-6 space-y-5 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="activation-modal-title" className="text-base font-bold text-qc-primary">
                    Premium Theme Activation
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400">
                    {activationInfoTheme.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActivationInfoTheme(null)}
                className="text-qc-body hover:text-qc-primary p-1 rounded-sm transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-qc-base border border-border-default p-4 rounded-xs text-xs text-qc-body space-y-2 leading-relaxed">
              <p className="text-qc-primary font-medium">
                This premium theme is available as an additional website service. Contact your website provider to activate it.
              </p>
              <p className="text-[11px] text-qc-body/80">
                You can freely test and inspect this theme in interactive preview mode across all public pages before activation.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActivationInfoTheme(null)}
                className="px-4 py-2 text-xs font-semibold text-qc-primary bg-qc-base border border-border-strong rounded-xs hover:bg-qc-surface transition-colors"
              >
                Got It
              </button>
              {activationInfoTheme.available && (
                <button
                  onClick={() => {
                    const themeId = activationInfoTheme.id;
                    setActivationInfoTheme(null);
                    handlePreviewLive(themeId);
                  }}
                  className="btn-gold px-4 py-2 text-xs font-bold uppercase tracking-wider"
                >
                  Preview Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
