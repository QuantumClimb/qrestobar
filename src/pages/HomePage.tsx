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

export const HomePage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: render theme-specific homepage for Midnight Ember
  if (effectiveThemeId === 'midnight-ember') {
    return <MidnightEmberHome />;
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
