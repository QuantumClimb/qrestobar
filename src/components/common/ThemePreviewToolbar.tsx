import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Layout } from 'lucide-react';
import { useSiteTheme } from '../../context/SiteThemeContext';
import { THEME_CATALOG } from '../../themes/themeCatalog';

export const ThemePreviewToolbar: React.FC = () => {
  const { previewThemeId, clearThemePreview } = useSiteTheme();
  const navigate = useNavigate();

  if (!previewThemeId) return null;

  const currentThemeMeta = THEME_CATALOG[previewThemeId] || {
    name: previewThemeId,
    accentColor: '#D8662C'
  };

  const handleReturnToStudio = () => {
    clearThemePreview();
    navigate('/admin/dashboard?tab=theme-studio');
  };

  const handleExitPreview = () => {
    clearThemePreview();
  };

  return (
    <div
      role="region"
      aria-label="Theme live preview toolbar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-slide-up"
    >
      <div className="bg-[#181614]/95 border border-[#D8AA5B]/40 text-[#F5EFE6] px-4 py-3 rounded-full shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Theme Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-sm"
            style={{ backgroundColor: currentThemeMeta.accentColor }}
          />
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-bold text-white tracking-wide truncate">
              Previewing: {currentThemeMeta.name}
            </span>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D8662C]/25 text-[#E47B3D] border border-[#D8662C]/40 shrink-0">
              Preview Only
            </span>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReturnToStudio}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#2A231F] hover:bg-[#3D332D] text-[#D8AA5B] border border-[#D8AA5B]/40 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#D8AA5B]"
            title="Return to CMS Theme Studio"
          >
            <Layout className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Theme Studio</span>
            <span className="sm:hidden">Studio</span>
          </button>

          <button
            onClick={handleExitPreview}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white"
            title="Exit preview and return to active theme"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
