import React from 'react';
import { Flame } from 'lucide-react';

interface MidnightEmberPageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}

export const MidnightEmberPageHero: React.FC<MidnightEmberPageHeroProps> = ({
  badge = 'Q - RESTOBAR · KUALA LUMPUR',
  title,
  subtitle,
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 py-8 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1613] border border-[#D8AA5B]/30 text-[#D8AA5B] text-xs font-semibold uppercase tracking-[0.25em]">
        <Flame className="w-3.5 h-3.5 text-[#D8662C]" />
        <span>{badge}</span>
        <Flame className="w-3.5 h-3.5 text-[#D8662C]" />
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-[#F5EFE6] uppercase">
        {title}
      </h1>

      <div className="me-divider-gold max-w-xs mx-auto my-3" />

      <p className="text-sm sm:text-base text-[#CFC3B5] font-light leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};
