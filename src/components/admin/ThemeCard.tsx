import React from 'react';
import { Eye, Image as ImageIcon, Sparkles, CheckCircle2, Lock, Clock, Info } from 'lucide-react';
import { ThemeMetadata, SiteThemeId } from '../../themes/types';

interface ThemeCardProps {
  theme: ThemeMetadata;
  isActive: boolean;
  onViewMockup: (theme: ThemeMetadata) => void;
  onPreviewLive: (themeId: SiteThemeId) => void;
  onShowActivationInfo: (theme: ThemeMetadata) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  isActive,
  onViewMockup,
  onPreviewLive,
  onShowActivationInfo,
}) => {
  const isIncluded = theme.access === 'included';
  const isRuntimeAvailable = theme.available;

  return (
    <div
      className={`bg-qc-surface border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-xl ${
        isActive
          ? 'border-purple-500 shadow-purple-500/10 shadow-lg ring-1 ring-purple-500/40'
          : 'border-border-base hover:border-border-strong'
      }`}
    >
      {/* Thumbnail Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-qc-base border-b border-border-base">
        <img
          src={theme.previewImage}
          alt={`${theme.name} Preview Thumbnail`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-md ${
              isIncluded
                ? 'bg-emerald-600/90 text-white backdrop-blur-xs'
                : 'bg-amber-600/90 text-white backdrop-blur-xs'
            }`}
          >
            {isIncluded ? 'Included' : 'Premium'}
          </span>

          {isActive && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-purple-600 text-white shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </span>
          )}
        </div>

        {/* Runtime Status Pill */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {isRuntimeAvailable ? (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-black/75 text-emerald-400 border border-emerald-500/40 backdrop-blur-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Available
            </span>
          ) : (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-black/75 text-zinc-400 border border-zinc-600/40 backdrop-blur-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Coming Soon
            </span>
          )}
        </div>

        {/* Color Palette Overlay */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 p-1 bg-black/70 backdrop-blur-xs rounded border border-white/10">
          <div
            className="w-4 h-4 rounded-full border border-white/30"
            style={{ backgroundColor: theme.accentColor }}
            title={`Primary: ${theme.accentColor}`}
          />
          {theme.secondaryAccent && (
            <div
              className="w-4 h-4 rounded-full border border-white/30"
              style={{ backgroundColor: theme.secondaryAccent }}
              title={`Secondary: ${theme.secondaryAccent}`}
            />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-display font-bold text-qc-primary">
                {theme.name}
              </h3>
              <p className="text-xs text-qc-body font-light line-clamp-1">
                {theme.tagline}
              </p>
            </div>
          </div>

          <p className="text-xs text-qc-body leading-relaxed line-clamp-2">
            {theme.description}
          </p>
        </div>

        {/* Status / Activation Notice */}
        <div className="pt-2 border-t border-border-base/70">
          {!isIncluded && (
            <div className="flex items-center justify-between gap-2 text-[11px] text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-xs mb-3">
              <span className="flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 shrink-0" />
                Activation Required
              </span>
              <button
                onClick={() => onShowActivationInfo(theme)}
                className="text-[10px] text-amber-300 hover:text-white underline font-semibold flex items-center gap-0.5"
                title="View activation instructions"
              >
                <Info className="w-3 h-3" />
                Details
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewMockup(theme)}
              className="px-3 py-2 text-xs font-semibold text-qc-body hover:text-qc-primary border border-border-strong rounded-xs hover:bg-qc-base transition-colors flex items-center justify-center gap-1.5"
              title="View full theme mockup and palette"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Mockup</span>
            </button>

            {isRuntimeAvailable ? (
              <button
                onClick={() => onPreviewLive(theme.id)}
                className="btn-gold px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                title="Launch live interactive preview"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            ) : (
              <button
                disabled
                className="px-3 py-2 text-xs font-medium text-zinc-500 bg-qc-base/60 border border-border-default rounded-xs cursor-not-allowed flex items-center justify-center gap-1.5"
                title="Runtime implementation coming in a future update"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Planned</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
