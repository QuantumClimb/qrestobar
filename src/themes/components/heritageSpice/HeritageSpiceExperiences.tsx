import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Gift, Wine, Zap, MapPin, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { GoldenPerkWheel } from '../../../components/experiences/GoldenPerkWheel';
import { FlavorMatchmaker } from '../../../components/experiences/FlavorMatchmaker';
import { LiveAvailabilityTicker } from '../../../components/experiences/LiveAvailabilityTicker';
import { ZoneVibePicker } from '../../../components/experiences/ZoneVibePicker';
import { HeritageSpicePageHero } from './HeritageSpicePageHero';
import '../../styles/heritageSpice.css';

type ExperienceTab = 'wheel' | 'sommelier' | 'availability' | 'zones';

export const HeritageSpiceExperiences: React.FC = () => {
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

  const tabs = [
    {
      id: 'wheel' as const,
      number: '1',
      title: 'Golden Perk Wheel',
      subtitle: 'Instant Hospitality Treat',
      icon: Gift
    },
    {
      id: 'sommelier' as const,
      number: '2',
      title: 'Flavour Matchmaker',
      subtitle: 'Bespoke Culinary Pairing',
      icon: Wine
    },
    {
      id: 'availability' as const,
      number: '3',
      title: 'Live Table Ticker',
      subtitle: 'Real-Time Availability',
      icon: Zap
    },
    {
      id: 'zones' as const,
      number: '4',
      title: 'Zone Vibe Picker',
      subtitle: 'Atmospheric Seating',
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] py-12 sm:py-16 selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <HeritageSpicePageHero
          badge="Q-RESTOBAR · INTERACTIVE DINING EXPERIENCES"
          title="Curate Your Experience"
          subtitle="Explore interactive dining tools designed to personalize your visit, unlock chef's treats, and discover our diverse Bukit Bintang dining atmospheres."
        />

        {/* 4 Feature Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#371018] p-2.5 rounded-sm border border-[#C69A4B]/30 shadow-2xl backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xs text-left transition-all flex items-start gap-3.5 relative overflow-hidden ${
                  isActive
                    ? 'bg-[#2B080E] border border-[#C69A4B] shadow-lg ring-1 ring-[#C69A4B]/40'
                    : 'bg-[#371018] border border-[#C69A4B]/15 hover:border-[#C69A4B]/40 hover:bg-[#2B080E]/60 text-[#F8EAD2]'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E89532] via-[#C69A4B] to-[#E89532]" />
                )}

                <div
                  className={`p-2.5 rounded-xs shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#C69A4B] text-[#2B080E] shadow-md'
                      : 'bg-[#2B080E] text-[#C69A4B] border border-[#C69A4B]/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`hs-font-display font-bold text-sm sm:text-base tracking-wide ${isActive ? 'text-[#FFF4DF]' : 'text-[#F8EAD2]'}`}>
                    {tab.number}. {tab.title}
                  </p>
                  <p className="text-[11px] text-[#C2AFA6] font-light mt-0.5 tracking-wider uppercase font-mono">
                    {tab.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Display */}
        <div className="transition-all duration-300">
          {activeTab === 'wheel' && <GoldenPerkWheel />}
          {activeTab === 'sommelier' && <FlavorMatchmaker />}
          {activeTab === 'availability' && <LiveAvailabilityTicker />}
          {activeTab === 'zones' && <ZoneVibePicker />}
        </div>

        {/* Bottom Executive Growth Card for Demonstration */}
        <div className="bg-[#371018] border border-[#C69A4B]/30 p-8 sm:p-10 rounded-sm shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C69A4B]/20 pb-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#C69A4B] font-mono">
                Hospitality Technology Demonstration
              </span>
              <h3 className="text-xl sm:text-2xl hs-font-display font-bold text-[#FFF4DF] mt-1">
                How These Interactive Experiences Elevate Dining Conversion
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#34D399] font-medium shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Integration with Reservation System</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#F8EAD2]/80 font-light">
            <div className="space-y-2 bg-[#2B080E] p-5 rounded-xs border border-[#C69A4B]/20 shadow-md">
              <div className="flex items-center gap-2 text-[#C69A4B] font-semibold uppercase tracking-wider font-mono">
                <TrendingUp className="w-4 h-4 text-[#E89532]" />
                <span>+38% Lead Conversion</span>
              </div>
              <p className="leading-relaxed">
                Casual visitors browsing menus often abandon without booking. The Golden Perk Wheel captures instant intent by providing a tangible hospitality treat.
              </p>
            </div>

            <div className="space-y-2 bg-[#2B080E] p-5 rounded-xs border border-[#C69A4B]/20 shadow-md">
              <div className="flex items-center gap-2 text-[#C69A4B] font-semibold uppercase tracking-wider font-mono">
                <DollarSign className="w-4 h-4 text-[#E89532]" />
                <span>+42% Average Table Spend</span>
              </div>
              <p className="leading-relaxed">
                The Flavour Matchmaker quiz effortlessly introduces guests to high-margin cocktails, signature appetizers, and dessert finishes.
              </p>
            </div>

            <div className="space-y-2 bg-[#2B080E] p-5 rounded-xs border border-[#C69A4B]/20 shadow-md">
              <div className="flex items-center gap-2 text-[#C69A4B] font-semibold uppercase tracking-wider font-mono">
                <Users className="w-4 h-4 text-[#E89532]" />
                <span>Zero Seating Friction</span>
              </div>
              <p className="leading-relaxed">
                Allowing diners to choose their exact atmosphere (Intimate Velvet Booths vs. Outdoor Terrace) creates high commitment and avoids re-seating requests.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeritageSpiceExperiences;
