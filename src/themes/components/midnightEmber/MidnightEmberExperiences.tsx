import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Gift, Wine, Zap, MapPin, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { GoldenPerkWheel } from '../../../components/experiences/GoldenPerkWheel';
import { FlavorMatchmaker } from '../../../components/experiences/FlavorMatchmaker';
import { LiveAvailabilityTicker } from '../../../components/experiences/LiveAvailabilityTicker';
import { ZoneVibePicker } from '../../../components/experiences/ZoneVibePicker';
import { MidnightEmberPageHero } from './MidnightEmberPageHero';

type ExperienceTab = 'wheel' | 'sommelier' | 'availability' | 'zones';

export const MidnightEmberExperiences: React.FC = () => {
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
      title: 'AI Sommelier Quiz',
      subtitle: 'Bespoke Flavour Matcher',
      icon: Wine
    },
    {
      id: 'availability' as const,
      number: '3',
      title: 'Live Table Ticker',
      subtitle: 'Real-Time Inventory',
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
    <div className="min-h-screen bg-[#101010] text-[#F5EFE6] py-12 sm:py-16 selection:bg-[#D8662C]/30 selection:text-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <MidnightEmberPageHero
          badge="Q - RESTOBAR · INTERACTIVE EXPERIENCES"
          title="Craft Your Night"
          subtitle="Discover the atmosphere, flavours and experiences waiting for you. Explore interactive tools designed to personalize your visit and elevate your evening."
        />

        {/* 4 Feature Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#14110F] p-2.5 rounded-sm border border-[#D8AA5B]/25 shadow-2xl backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xs text-left transition-all flex items-start gap-3.5 relative overflow-hidden ${
                  isActive
                    ? 'bg-[#1A1613] border border-[#D8662C] shadow-lg ring-1 ring-[#D8662C]/30'
                    : 'bg-[#14110F] border border-[#D8AA5B]/15 hover:border-[#D8AA5B]/40 hover:bg-[#1A1613]/50 text-[#CFC3B5]'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D8662C] to-[#D8AA5B]" />
                )}

                <div
                  className={`p-2.5 rounded-xs shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#D8662C] text-white shadow-md'
                      : 'bg-[#1A1613] text-[#D8AA5B] border border-[#D8AA5B]/25'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`font-serif font-bold text-sm tracking-wide ${isActive ? 'text-[#F5EFE6]' : 'text-[#CFC3B5]'}`}>
                    {tab.number}. {tab.title}
                  </p>
                  <p className="text-[11px] text-[#94877A] font-light mt-0.5 tracking-wider uppercase font-mono">
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
        <div className="bg-[#14110F] border border-[#D8AA5B]/25 p-8 sm:p-10 rounded-sm shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D8AA5B]/20 pb-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#D8662C] font-mono">
                Hospitality Technology Highlight
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5EFE6] mt-1">
                How These Interactive Experiences Drive Table Conversion
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#34D399] font-medium shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Real-Time Integration with Reservation Engine</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#CFC3B5] font-light">
            <div className="space-y-2 bg-[#1A1613] p-5 rounded-xs border border-[#D8AA5B]/20 shadow-md">
              <div className="flex items-center gap-2 text-[#D8AA5B] font-semibold uppercase tracking-wider font-mono">
                <TrendingUp className="w-4 h-4 text-[#D8662C]" />
                <span>+38% Direct Booking Lift</span>
              </div>
              <p className="leading-relaxed">
                Casual visitors browsing online menus often hesitate. The Golden Perk Wheel engages diners immediately with a tangible hospitality incentive.
              </p>
            </div>

            <div className="space-y-2 bg-[#1A1613] p-5 rounded-xs border border-[#D8AA5B]/20 shadow-md">
              <div className="flex items-center gap-2 text-[#D8AA5B] font-semibold uppercase tracking-wider font-mono">
                <DollarSign className="w-4 h-4 text-[#D8662C]" />
                <span>+42% Average Table Spend</span>
              </div>
              <p className="leading-relaxed">
                The Sommelier Pairing Quiz effortlessly introduces guests to high-margin botanical cocktails, charcoal grilled mains, and dessert finishes.
              </p>
            </div>

            <div className="space-y-2 bg-[#1A1613] p-5 rounded-xs border border-[#D8AA5B]/20 shadow-md">
              <div className="flex items-center gap-2 text-[#D8AA5B] font-semibold uppercase tracking-wider font-mono">
                <Users className="w-4 h-4 text-[#D8662C]" />
                <span>Zero Seating Friction</span>
              </div>
              <p className="leading-relaxed">
                Allowing guests to select their exact atmosphere (Intimate Velvet Booths vs. Alfresco Terrace) creates high commitment and avoids re-seating delays.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MidnightEmberExperiences;
