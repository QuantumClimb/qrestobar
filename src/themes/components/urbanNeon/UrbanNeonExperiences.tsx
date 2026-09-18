import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Gift, Wine, Zap, MapPin, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { GoldenPerkWheel } from '../../../components/experiences/GoldenPerkWheel';
import { FlavorMatchmaker } from '../../../components/experiences/FlavorMatchmaker';
import { LiveAvailabilityTicker } from '../../../components/experiences/LiveAvailabilityTicker';
import { ZoneVibePicker } from '../../../components/experiences/ZoneVibePicker';
import { UrbanNeonPageHero } from './UrbanNeonPageHero';
import '../../styles/urbanNeon.css';

type ExperienceTab = 'wheel' | 'sommelier' | 'availability' | 'zones';

export const UrbanNeonExperiences: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ExperienceTab>('wheel');

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
      subtitle: 'Bespoke Cocktail Pairing',
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
      subtitle: 'Cyber Atmosphere',
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-[#090B18] text-white py-12 sm:py-16 selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <UrbanNeonPageHero
          badge="INTERACTIVE NIGHTLIFE EXPERIENCES"
          title="Curate Your Nightlife Experience"
          subtitle="Explore interactive dining tools to unlock special perks, discover cocktail pairings, and select your preferred Bukit Bintang venue atmosphere."
        />

        {/* 4 Feature Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#131B2E] p-3 rounded-lg border border-[#20E3D2]/30 shadow-[0_0_20px_rgba(32,227,210,0.15)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-md text-left transition-all flex items-start gap-3.5 relative overflow-hidden cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#1F293D] border border-[#20E3D2] shadow-[0_0_15px_rgba(32,227,210,0.3)]'
                    : 'bg-[#111827] border border-white/10 hover:border-[#20E3D2]/40 text-gray-300'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#20E3D2] via-[#EC4899] to-[#20E3D2]" />
                )}

                <div
                  className={`p-2.5 rounded-md shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#20E3D2] text-[#090B18] shadow-sm font-bold'
                      : 'bg-[#131B2E] text-[#20E3D2] border border-[#20E3D2]/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`un-font-display font-bold text-base sm:text-lg tracking-wide ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {tab.number}. {tab.title}
                  </p>
                  <p className="text-[11px] text-[#EC4899] font-light mt-0.5 tracking-wider uppercase font-mono">
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

        {/* Growth & ROI Demonstration Card */}
        <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-8 sm:p-10 rounded-lg shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#EC4899] font-mono">
                NIGHTLIFE ENGAGEMENT ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl un-font-display font-bold text-white mt-1">
                How Interactive Tools Enhance Guest Dining
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#20E3D2] font-medium shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#20E3D2]" />
              <span>Integrated with Live Reservation Engine</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300 font-light">
            <div className="space-y-2 bg-[#111827] p-5 rounded-lg border border-[#20E3D2]/30 shadow-sm">
              <div className="flex items-center gap-2 text-[#20E3D2] font-bold uppercase tracking-wider font-mono">
                <TrendingUp className="w-4 h-4 text-[#EC4899]" />
                <span>+38% Lead Conversion</span>
              </div>
              <p className="leading-relaxed">
                Casual visitors browsing menus often abandon without booking. The Golden Perk Wheel captures instant intent by providing a tangible hospitality treat.
              </p>
            </div>

            <div className="space-y-2 bg-[#111827] p-5 rounded-lg border border-[#20E3D2]/30 shadow-sm">
              <div className="flex items-center gap-2 text-[#20E3D2] font-bold uppercase tracking-wider font-mono">
                <DollarSign className="w-4 h-4 text-[#EC4899]" />
                <span>+42% Average Spend</span>
              </div>
              <p className="leading-relaxed">
                The Flavour Matchmaker quiz effortlessly introduces guests to craft cocktail pairings, signature flame starters, and dessert finishes.
              </p>
            </div>

            <div className="space-y-2 bg-[#111827] p-5 rounded-lg border border-[#20E3D2]/30 shadow-sm">
              <div className="flex items-center gap-2 text-[#20E3D2] font-bold uppercase tracking-wider font-mono">
                <Users className="w-4 h-4 text-[#EC4899]" />
                <span>Zero Seating Friction</span>
              </div>
              <p className="leading-relaxed">
                Allowing guests to select their exact atmosphere (Main DJ Lounge vs. Alfresco Terrace) creates high commitment and avoids re-seating requests.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UrbanNeonExperiences;
