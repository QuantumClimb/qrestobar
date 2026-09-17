import React from 'react';

interface HeritageSpicePageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}

export const HeritageSpicePageHero: React.FC<HeritageSpicePageHeroProps> = ({
  badge = 'Q-RESTOBAR · BUKIT BINTANG',
  title,
  subtitle,
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 py-8 animate-fade-in hs-font-body">
      {/* Badge Pill */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#371018]/90 border border-[#C69A4B]/40 text-[#C69A4B] text-xs font-semibold uppercase tracking-[0.25em] shadow-lg backdrop-blur-md">
        <span className="text-[#E89532]">♦</span>
        <span>{badge}</span>
        <span className="text-[#E89532]">♦</span>
      </div>

      {/* Main Heading */}
      <h1 className="hs-font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-[#FFF4DF] uppercase leading-tight">
        {title}
      </h1>

      {/* Antique Gold Divider */}
      <div className="hs-divider-gold max-w-xs mx-auto my-3" />

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-[#F8EAD2]/80 font-light leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default HeritageSpicePageHero;
