import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { QuickInfoBar } from '../components/home/QuickInfoBar';
import { StorySection } from '../components/home/StorySection';
import { SignatureDishes } from '../components/home/SignatureDishes';
import { PromoPosters } from '../components/home/PromoPosters';
import { ExperienceCards } from '../components/home/ExperienceCards';
import { ExperienceTeaser } from '../components/home/ExperienceTeaser';
import { DrinksSection } from '../components/home/DrinksSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ReservationCTA } from '../components/home/ReservationCTA';
import { useSiteTheme } from '../context/SiteThemeContext';
import { MidnightEmberHome } from '../themes/components/midnightEmber/MidnightEmberHome';

const HeritageSpiceHome = React.lazy(() =>
  import('../themes/components/heritageSpice/HeritageSpiceHome').then((m) => ({
    default: m.HeritageSpiceHome,
  }))
);

const HeritageHomeFallback: React.FC = () => (
  <div
    className="min-h-screen bg-[#2B080E] text-[#FFF4DF] flex items-center justify-center p-8"
    role="status"
    aria-label="Loading Heritage Spice theme"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#C69A4B]/30 border-t-[#C69A4B] animate-spin" />
      <span className="font-serif text-xs tracking-[0.2em] uppercase text-[#C69A4B]">Q - RESTOBAR</span>
    </div>
  </div>
);

export const HomePage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: render theme-specific homepage for Midnight Ember
  if (effectiveThemeId === 'midnight-ember') {
    return <MidnightEmberHome />;
  }

  // Early branch: render theme-specific homepage for Heritage Spice
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<HeritageHomeFallback />}>
        <HeritageSpiceHome />
      </React.Suspense>
    );
  }


  return (
    <div className="space-y-0">
      <HeroSection />
      <QuickInfoBar />
      <StorySection />
      <SignatureDishes />
      <ExperienceTeaser />
      <PromoPosters />
      <ExperienceCards />
      <DrinksSection />
      <TestimonialsSection />
      <ReservationCTA />
    </div>
  );
};
