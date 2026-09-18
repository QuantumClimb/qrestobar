import React from 'react';
import { Zap } from 'lucide-react';

interface UrbanNeonPageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
}

export const UrbanNeonPageHero: React.FC<UrbanNeonPageHeroProps> = ({
  badge,
  title,
  subtitle,
}) => {
  return (
    <div className="text-center max-w-4xl mx-auto space-y-4 py-4 sm:py-6">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20E3D2]/10 border border-[#20E3D2]/40 text-[#20E3D2] text-xs font-bold uppercase tracking-[0.22em] font-mono shadow-[0_0_12px_rgba(32,227,210,0.25)]">
        <Zap className="w-3.5 h-3.5 text-[#20E3D2]" />
        <span>{badge}</span>
      </div>

      <h1 className="un-font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
        {title}
      </h1>

      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent mx-auto rounded-full my-3 shadow-[0_0_10px_#EC4899]" />

      <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default UrbanNeonPageHero;
