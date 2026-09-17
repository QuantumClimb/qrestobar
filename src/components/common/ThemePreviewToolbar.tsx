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
      className="fixed bottom-2.5 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 max-w-[calc(100vw-16px)] sm:max-w-2xl sm:w-auto animate-slide-up box-border"
    >
      <div className="bg-[#181614]/95 border border-[#D8AA5B]/40 text-[#F5EFE6] px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center justify-between gap-2 box-border max-w-full">
        {/* Left Side: Theme Info */}
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <div
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-white/30 shrink-0 shadow-sm"
            style={{ backgroundColor: currentThemeMeta.accentColor }}
          />
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide truncate">
              <span className="hidden xs:inline">Previewing: </span>{currentThemeMeta.name}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#D8662C]/25 text-[#E47B3D] border border-[#D8662C]/40 shrink-0">
              Preview
            </span>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleReturnToStudio}
            className="px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#2A231F] hover:bg-[#3D332D] text-[#D8AA5B] border border-[#D8AA5B]/40 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#D8AA5B]"
            title="Return to CMS Theme Studio"
          >
            <Layout className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Studio</span>
          </button>

          <button
            onClick={handleExitPreview}
            className="px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-white"
            title="Exit preview and return to active theme"
          >
            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

