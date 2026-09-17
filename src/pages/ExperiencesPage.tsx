import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Gift, Wine, Zap, MapPin, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { GoldenPerkWheel } from '../components/experiences/GoldenPerkWheel';
import { FlavorMatchmaker } from '../components/experiences/FlavorMatchmaker';
import { LiveAvailabilityTicker } from '../components/experiences/LiveAvailabilityTicker';
import { ZoneVibePicker } from '../components/experiences/ZoneVibePicker';
import { useSiteTheme } from '../context/SiteThemeContext';

const MidnightEmberExperiences = React.lazy(
  () => import('../themes/components/midnightEmber/MidnightEmberExperiences')
);
const HeritageSpiceExperiences = React.lazy(
  () => import('../themes/components/heritageSpice/HeritageSpiceExperiences')
);

type ExperienceTab = 'wheel' | 'sommelier' | 'availability' | 'zones';

export const ExperiencesPage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: Midnight Ember presentation
  if (effectiveThemeId === 'midnight-ember') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <MidnightEmberExperiences />
      </React.Suspense>
    );
  }

  // Early branch: Heritage Spice presentation
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#2B080E]" />}>
        <HeritageSpiceExperiences />
      </React.Suspense>
    );
  }

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ExperienceTab>('wheel');

  // Check URL query param for default tab (e.g. ?tab=sommelier)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab') as ExperienceTab;
    if (tabParam && ['wheel', 'sommelier', 'availability', 'zones'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-qc-base text-qc-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em] bg-purple-600/10 px-3.5 py-1.5 rounded-full border border-purple-600/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Dining &amp; Customer Growth Hub</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-qc-primary tracking-wide leading-tight">
            Special Dining Experiences
          </h1>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Explore interactive tools designed to delight diners, boost table spend, and accelerate reservation bookings for modern restaurants.
          </p>
        </div>

        {/* 4 Feature Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-qc-surface/90 p-2 rounded-sm border border-border-base shadow-xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`p-4 rounded-sm text-left transition-all flex items-start gap-3 ${
              activeTab === 'wheel'
                ? 'bg-qc-base border border-purple-600 shadow-sm'
                : 'hover:bg-qc-base/60 border border-transparent text-qc-body'
            }`}
          >
            <div className={`p-2 rounded shrink-0 ${activeTab === 'wheel' ? 'bg-purple-600 text-white' : 'bg-qc-elevated text-purple-500'}`}>
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-qc-primary">
                1. Golden Perk Wheel
              </p>
              <p className="text-[11px] text-qc-body mt-0.5 font-light">Instant Lead Magnet</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('sommelier')}
            className={`p-4 rounded-sm text-left transition-all flex items-start gap-3 ${
              activeTab === 'sommelier'
                ? 'bg-qc-base border border-purple-600 shadow-sm'
                : 'hover:bg-qc-base/60 border border-transparent text-qc-body'
            }`}
          >
            <div className={`p-2 rounded shrink-0 ${activeTab === 'sommelier' ? 'bg-purple-600 text-white' : 'bg-qc-elevated text-purple-500'}`}>
              <Wine className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-qc-primary">
                2. AI Sommelier Quiz
              </p>
              <p className="text-[11px] text-qc-body mt-0.5 font-light">Flavor &amp; Cocktail Pairing</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`p-4 rounded-sm text-left transition-all flex items-start gap-3 ${
              activeTab === 'availability'
                ? 'bg-qc-base border border-purple-600 shadow-sm'
                : 'hover:bg-qc-base/60 border border-transparent text-qc-body'
            }`}
          >
            <div className={`p-2 rounded shrink-0 ${activeTab === 'availability' ? 'bg-purple-600 text-white' : 'bg-qc-elevated text-purple-500'}`}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-qc-primary">
                3. Live Table Ticker
              </p>
              <p className="text-[11px] text-qc-body mt-0.5 font-light">Real-Time Urgency Engine</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('zones')}
            className={`p-4 rounded-sm text-left transition-all flex items-start gap-3 ${
              activeTab === 'zones'
                ? 'bg-qc-base border border-purple-600 shadow-sm'
                : 'hover:bg-qc-base/60 border border-transparent text-qc-body'
            }`}
          >
            <div className={`p-2 rounded shrink-0 ${activeTab === 'zones' ? 'bg-purple-600 text-white' : 'bg-qc-elevated text-purple-500'}`}>
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-qc-primary">
                4. Zone Vibe Picker
              </p>
              <p className="text-[11px] text-qc-body mt-0.5 font-light">Visual Seating Simulator</p>
            </div>
          </button>
        </div>

        {/* Active Module Display */}
        <div className="transition-all duration-300">
          {activeTab === 'wheel' && <GoldenPerkWheel />}
          {activeTab === 'sommelier' && <FlavorMatchmaker />}
          {activeTab === 'availability' && <LiveAvailabilityTicker />}
          {activeTab === 'zones' && <ZoneVibePicker />}
        </div>

        {/* Bottom Executive ROI Card for Restaurant Owners */}
        <div className="bg-qc-surface/90 border border-border-base p-8 rounded-sm shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-base pb-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-purple-500">
                Restaurant Owner Demonstration Note
              </span>
              <h3 className="text-xl font-display font-bold text-qc-primary mt-1">
                How These 4 Features Drive Restaurant Growth
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Integration with Table Booking System</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-qc-body font-light">
            <div className="space-y-2 bg-qc-base/60 p-4 rounded-sm border border-border-base">
              <div className="flex items-center gap-2 text-purple-500 font-semibold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>+38% Lead Conversion</span>
              </div>
              <p className="leading-relaxed">
                Casual visitors browsing menus often abandon without booking. The Golden Perk Wheel captures instant intent by providing a tangible hospitality treat.
              </p>
            </div>

            <div className="space-y-2 bg-qc-base/60 p-4 rounded-sm border border-border-base">
              <div className="flex items-center gap-2 text-purple-500 font-semibold uppercase tracking-wider">
                <DollarSign className="w-4 h-4" />
                <span>+42% Average Spend</span>
              </div>
              <p className="leading-relaxed">
                The AI Sommelier pairing quiz automatically upsells high-margin cocktails, signature appetizers, and dessert finishes without pushy waitstaff tactics.
              </p>
            </div>

            <div className="space-y-2 bg-qc-base/60 p-4 rounded-sm border border-border-base">
              <div className="flex items-center gap-2 text-purple-500 font-semibold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Zero Table No-Shows</span>
              </div>
              <p className="leading-relaxed">
                Allowing diners to choose their exact atmosphere (Velvet Booths vs. Outdoor Terrace) creates high commitment and reduces table re-seating requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
