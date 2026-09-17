import React from 'react';
import { Leaf } from 'lucide-react';

interface BotanicalBistroPageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}

export const BotanicalBistroPageHero: React.FC<BotanicalBistroPageHeroProps> = ({
  badge = 'Q-RESTOBAR · BUKIT BINTANG',
  title,
  subtitle,
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 py-8 animate-fade-in bb-font-body">
      {/* Badge Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3F6B4F]/10 border border-[#3F6B4F]/30 text-[#3F6B4F] text-xs font-semibold uppercase tracking-[0.22em] font-mono shadow-sm">
        <Leaf className="w-3.5 h-3.5 text-[#3F6B4F]" />
        <span>{badge}</span>
      </div>

      {/* Main Heading */}
      <h1 className="bb-font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.04em] text-[#24352A] leading-tight">
        {title}
      </h1>

      {/* Botanical Green Divider */}
      <div className="w-24 h-0.5 bg-[#3F6B4F]/40 mx-auto rounded-full my-3" />

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-[#556257] font-light leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default BotanicalBistroPageHero;
