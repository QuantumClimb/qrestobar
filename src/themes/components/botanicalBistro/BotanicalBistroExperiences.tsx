import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Gift, Wine, Zap, MapPin, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { GoldenPerkWheel } from '../../../components/experiences/GoldenPerkWheel';
import { FlavorMatchmaker } from '../../../components/experiences/FlavorMatchmaker';
import { LiveAvailabilityTicker } from '../../../components/experiences/LiveAvailabilityTicker';
import { ZoneVibePicker } from '../../../components/experiences/ZoneVibePicker';
import { BotanicalBistroPageHero } from './BotanicalBistroPageHero';
import '../../styles/botanicalBistro.css';

type ExperienceTab = 'wheel' | 'sommelier' | 'availability' | 'zones';

export const BotanicalBistroExperiences: React.FC = () => {
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
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] py-12 sm:py-16 selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <BotanicalBistroPageHero
          badge="BOTANICAL BISTRO · INTERACTIVE EXPERIENCES"
          title="Curate Your Garden Experience"
          subtitle="Explore interactive dining tools designed to personalize your visit, unlock organic pairings, and discover our Bukit Bintang garden atmospheres."
        />

        {/* 4 Feature Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#FCFAF4] p-2.5 rounded-md border border-[#3F6B4F]/25 shadow-lg backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-md text-left transition-all flex items-start gap-3.5 relative overflow-hidden cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#F4F1E8] border border-[#3F6B4F] shadow-md ring-1 ring-[#3F6B4F]/30'
                    : 'bg-[#FCFAF4] border border-[#3F6B4F]/15 hover:border-[#3F6B4F]/40 hover:bg-[#F4F1E8]/60 text-[#5B7065]'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3F6B4F] via-[#B86B45] to-[#3F6B4F]" />
                )}

                <div
                  className={`p-2.5 rounded-md shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#3F6B4F] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#F4F1E8] text-[#3F6B4F] border border-[#3F6B4F]/25'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`bb-font-display font-bold text-base sm:text-lg tracking-wide ${isActive ? 'text-[#24352A]' : 'text-[#5B7065]'}`}>
                    {tab.number}. {tab.title}
                  </p>
                  <p className="text-[11px] text-[#5B7065] font-light mt-0.5 tracking-wider uppercase font-mono">
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

        {/* Bottom Executive ROI Demonstration Card */}
        <div className="bg-[#FCFAF4] border border-[#3F6B4F]/25 p-8 sm:p-10 rounded-md shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3F6B4F]/15 pb-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#3F6B4F] font-mono">
                Botanical Bistro Growth Hub
              </span>
              <h3 className="text-xl sm:text-2xl bb-font-display font-bold text-[#24352A] mt-1">
                How Interactive Experiences Drive Guest Engagement
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2F533C] font-medium shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#3F6B4F]" />
              <span>Fully Integrated with Table Reservation System</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5B7065] font-light">
            <div className="space-y-2 bg-[#F4F1E8] p-5 rounded-md border border-[#3F6B4F]/20 shadow-sm">
              <div className="flex items-center gap-2 text-[#3F6B4F] font-semibold uppercase tracking-wider font-mono">
                <TrendingUp className="w-4 h-4 text-[#B86B45]" />
                <span>+38% Lead Conversion</span>
              </div>
              <p className="leading-relaxed text-[#24352A]/90">
                Casual visitors browsing menus often abandon without booking. The Golden Perk Wheel captures instant intent by providing a tangible garden treat.
              </p>
            </div>

            <div className="space-y-2 bg-[#F4F1E8] p-5 rounded-md border border-[#3F6B4F]/20 shadow-sm">
              <div className="flex items-center gap-2 text-[#3F6B4F] font-semibold uppercase tracking-wider font-mono">
                <DollarSign className="w-4 h-4 text-[#B86B45]" />
                <span>+42% Average Spend</span>
              </div>
              <p className="leading-relaxed text-[#24352A]/90">
                The Flavour Matchmaker quiz effortlessly introduces guests to botanical pairings, signature appetizers, and dessert finishes.
              </p>
            </div>

            <div className="space-y-2 bg-[#F4F1E8] p-5 rounded-md border border-[#3F6B4F]/20 shadow-sm">
              <div className="flex items-center gap-2 text-[#3F6B4F] font-semibold uppercase tracking-wider font-mono">
                <Users className="w-4 h-4 text-[#B86B45]" />
                <span>Zero Seating Friction</span>
              </div>
              <p className="leading-relaxed text-[#24352A]/90">
                Allowing diners to choose their exact atmosphere (Garden Courtyard vs. Greenhouse Alcoves) creates high commitment and avoids re-seating requests.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BotanicalBistroExperiences;
