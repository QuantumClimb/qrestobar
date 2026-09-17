import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, UtensilsCrossed, Wine, Music, Users, Calendar } from 'lucide-react';
import { InteractiveGallery } from '../components/common/InteractiveGallery';
import { useSiteTheme } from '../context/SiteThemeContext';

const MidnightEmberAbout = React.lazy(
  () => import('../themes/components/midnightEmber/MidnightEmberAbout')
);
const HeritageSpiceAbout = React.lazy(
  () => import('../themes/components/heritageSpice/HeritageSpiceAbout')
);
const BotanicalBistroAbout = React.lazy(
  () => import('../themes/components/botanicalBistro/BotanicalBistroAbout')
);

export const AboutPage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: Midnight Ember presentation
  if (effectiveThemeId === 'midnight-ember') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <MidnightEmberAbout />
      </React.Suspense>
    );
  }

  // Early branch: Heritage Spice presentation
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#2B080E]" />}>
        <HeritageSpiceAbout />
      </React.Suspense>
    );
  }

  // Early branch: Botanical Bistro presentation
  if (effectiveThemeId === 'botanical-bistro') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#F4F1E8]" />}>
        <BotanicalBistroAbout />
      </React.Suspense>
    );
  }
  return (
    <div className="min-h-screen bg-qc-base text-qc-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage &amp; Vision</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-qc-primary tracking-wide">
            Made in Malaysia. Designed for Today.
          </h1>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Celebrating Malaysia’s multicultural food heritage through modern presentation, warm hospitality, soulful music, and a vibrant Bukit Bintang atmosphere.
          </p>
        </div>

        {/* Section 1: The Brand Story & Inspiration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 block">
              Culinary Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-qc-primary leading-tight">
              Honouring Heritage Roots with Modern Culinary Fire
            </h2>
            <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
              Malaysia is blessed with one of the most vibrant, multifaceted culinary traditions on the planet. For generations, Malay, Chinese, Indian, Peranakan, and indigenous Bornean cooking techniques have intermingled, giving rise to unforgettable flavour depths.
            </p>
            <p className="text-sm text-qc-body font-light leading-relaxed">
              At Q-RESTOBAR, we set out to honour these iconic flavours while stripping away formality. Our kitchen champions artisanal charcoal grilling, whole-spice rempahs ground daily by hand, and cold-pressed tropical aromatics such as wild ginger flower (bunga kantan) and Sarawak peppercorns.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-sm overflow-hidden border border-border-base shadow-2xl">
            <img
              src="/images/7c8ae1ad-de1e-4176-ab36-b029628d76f1.png"
              alt="Culinary Atmosphere at Q-RESTOBAR"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

        {/* Section 2: 4 Pillars of Q-RESTOBAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="luxury-card p-6 space-y-3">
            <UtensilsCrossed className="w-6 h-6 text-purple-500" />
            <h3 className="text-base font-display font-bold text-qc-primary">Chef Philosophy</h3>
            <p className="text-xs text-qc-body font-light leading-relaxed">
              Every plate strikes a balance between deeply satisfying comfort and refined contemporary aesthetic precision.
            </p>
          </div>

          <div className="luxury-card p-6 space-y-3">
            <Wine className="w-6 h-6 text-purple-500" />
            <h3 className="text-base font-display font-bold text-qc-primary">Botanical Mixology</h3>
            <p className="text-xs text-qc-body font-light leading-relaxed">
              Cocktails and zero-proof coolers infused with fresh pandan, calamansi lime, and indigenous highland herbs.
            </p>
          </div>

          <div className="luxury-card p-6 space-y-3">
            <Music className="w-6 h-6 text-purple-500" />
            <h3 className="text-base font-display font-bold text-qc-primary">Nightlife &amp; Sound</h3>
            <p className="text-xs text-qc-body font-light leading-relaxed">
              A carefully curated acoustic landscape transitioning from laid-back dinner jazz to late-night melodic house vinyl.
            </p>
          </div>

          <div className="luxury-card p-6 space-y-3">
            <Users className="w-6 h-6 text-purple-500" />
            <h3 className="text-base font-display font-bold text-qc-primary">Private Dining</h3>
            <p className="text-xs text-qc-body font-light leading-relaxed">
              Bespoke suites equipped with multimedia capabilities, tailored menus, and dedicated hosting for VIP occasions.
            </p>
          </div>
        </div>

        {/* Section 3: Interactive Atmosphere & Photo Gallery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-display font-bold text-qc-primary">
              The Q-RESTOBAR Visual Atmosphere
            </h2>
            <p className="text-xs sm:text-sm text-qc-body font-light">
              Filter through moments of dining, mixology cocktails, evening atmosphere, and weekend sessions in Bukit Bintang. Click any photo to view in full lightbox.
            </p>
          </div>

          <InteractiveGallery />
        </div>

        {/* CTA Section */}
        <div className="bg-qc-surface border border-border-base p-8 sm:p-12 rounded-sm text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
            Come Experience the Flavours for Yourself
          </h2>
          <p className="text-xs sm:text-sm text-qc-body font-light max-w-md mx-auto">
            Reserve your table for lunch, dinner, or evening drinks in the heart of Kuala Lumpur.
          </p>
          <div className="pt-2">
            <Link
              to="/reservations"
              className="btn-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
