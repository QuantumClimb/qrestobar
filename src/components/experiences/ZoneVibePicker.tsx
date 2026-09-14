import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Volume2, Moon, ArrowRight, Check, Flame } from 'lucide-react';

interface DiningZone {
  id: string;
  name: string;
  tagline: string;
  seatingKey: 'indoor' | 'outdoor' | 'chefs-table';
  image: string;
  badge: string;
  capacity: string;
  vibe: string;
  noiseLevel: string;
  lighting: string;
  bestFor: string[];
  features: string[];
}

const DINING_ZONES: DiningZone[] = [
  {
    id: 'mixology-bar',
    name: 'The Mixology Bar Counter',
    tagline: 'High-energy front-row seats to world-class flair mixology and botanical infusions.',
    seatingKey: 'chefs-table',
    image: '/images/baratteneder1_qrestobar.jpg',
    badge: 'High Energy & Energetic',
    capacity: '1 - 4 Guests',
    vibe: 'Dynamic, theatrical, and social with bartender banter.',
    noiseLevel: 'Upbeat & Lively (DJ Beats)',
    lighting: 'Warm Low Ambient Glow',
    bestFor: ['Cocktail Enthusiasts', 'Solo Diners', 'Casual Date Nights', 'Aperitivo Hour'],
    features: ['Direct mixologist interaction', 'Hand-carved artisanal ice viewing', 'Exclusive off-menu cocktail tasting']
  },
  {
    id: 'alfresco-terrace',
    name: 'Alfresco Sunset Terrace',
    tagline: 'Breezy open-air terrace with Bukit Bintang skyline vistas and tropical botanicals.',
    seatingKey: 'outdoor',
    image: '/images/3f403e4e-3e7d-4d84-91df-1d87668967b9.jpg',
    badge: 'Skyline & Open-Air',
    capacity: '2 - 10 Guests',
    vibe: 'Relaxed tropical elegance with evening breeze.',
    noiseLevel: 'Moderate & Ambient',
    lighting: 'City Skyline & Candlelight',
    bestFor: ['Sunset Dining', 'Group Gatherings', 'Weekend Brunch', 'Relaxed Evenings'],
    features: ['Panoramic skyline backdrop', 'Weather-shielded canopy', 'Dedicated outdoor cocktail service']
  },
  {
    id: 'velvet-booths',
    name: 'Intimate Velvet Booths',
    tagline: 'Curved velvet banquettes offering quiet seclusion and candlelit romance.',
    seatingKey: 'indoor',
    image: '/images/a98ac4fdaec420709f19610c23f36765.jpg',
    badge: 'Romantic & Intimate',
    capacity: '2 - 6 Guests',
    vibe: 'Opulent, cozy, and conversation-friendly.',
    noiseLevel: 'Quiet & Intimate (Acoustic)',
    lighting: 'Dim Soft Candlelight',
    bestFor: ['Anniversaries & Proposals', 'Intimate Dates', 'Private Conversations', 'Wine Tastings'],
    features: ['Plush velvet seating', 'Acoustic sound dampening', 'Sommelier table-side decanting']
  },
  {
    id: 'vip-suite',
    name: 'The Private Velvet Dining Suite',
    tagline: 'Bespoke boardroom-grade private sanctuary with custom audiovisuals and dedicated banquet team.',
    seatingKey: 'indoor',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    badge: 'Exclusive Buyout',
    capacity: '8 - 18 Guests',
    vibe: 'Prestigious, confidential, and fully customized.',
    noiseLevel: 'Private & Dedicated Sound',
    lighting: 'Crystal Chandelier (Dimmable)',
    bestFor: ['Corporate Dinners', 'Family Milestones', 'VIP Hosting', 'Brand Launches'],
    features: ['Dedicated private butler', 'Custom printed tasting menus', 'Private sound system & presentation screen']
  }
];

export const ZoneVibePicker: React.FC = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState<DiningZone>(DINING_ZONES[2]); // Default Velvet Booths

  const handleBookZone = (zone: DiningZone) => {
    const params = new URLSearchParams({
      seatingPreference: zone.seatingKey,
      specialRequests: `[Preferred Zone: ${zone.name}]`
    });
    navigate(`/reservations?${params.toString()}`);
  };

  return (
    <div className="bg-qc-surface border border-border-base rounded-sm p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header section */}
      <div className="border-b border-border-base pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Visual Seating Simulator &amp; Atmosphere Picker</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
          Choose Your Dining Vibe
        </h3>
        <p className="text-xs sm:text-sm text-qc-body font-light max-w-2xl">
          Every table at Q-RESTOBAR offers a distinct sensory mood. Select your desired space to preview lighting, soundscape, and amenities.
        </p>
      </div>

      {/* 4 Zone Cards Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DINING_ZONES.map((zone) => {
          const isSelected = selectedZone.id === zone.id;

          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`text-left rounded-sm overflow-hidden border transition-all duration-300 relative group flex flex-col ${
                isSelected
                  ? 'bg-qc-base border-purple-600 shadow-md ring-1 ring-purple-500/30'
                  : 'bg-qc-base/60 border-border-base hover:border-border-strong'
              }`}
            >
              <div className="h-40 relative overflow-hidden">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-qc-card via-qc-card/40 to-transparent" />
                <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-qc-base/90 text-purple-500 border border-purple-600/30">
                  {zone.badge}
                </span>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-display font-bold text-qc-primary text-sm">
                    {zone.name}
                  </h4>
                  <p className="text-xs text-qc-body font-light line-clamp-2 mt-1">
                    {zone.tagline}
                  </p>
                </div>

                <div className="text-[11px] text-purple-500 font-medium pt-2 border-t border-border-base/80 flex items-center justify-between">
                  <span>{zone.capacity}</span>
                  <span className="underline group-hover:text-qc-secondary">View Specs →</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive Spec Panel */}
      <div className="bg-qc-base border border-border-base rounded-sm p-6 sm:p-8 space-y-6 animate-slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Image Preview */}
          <div className="lg:col-span-5 h-64 sm:h-80 rounded-sm overflow-hidden border border-border-strong relative">
            <img
              src={selectedZone.image}
              alt={selectedZone.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-qc-base/90 border border-border-strong px-3 py-1 rounded text-xs text-purple-500 backdrop-blur-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>{selectedZone.badge}</span>
            </div>
          </div>

          {/* Right Column: Detailed Vibe Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-500">
                Atmosphere Profile
              </span>
              <h4 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
                {selectedZone.name}
              </h4>
              <p className="text-xs sm:text-sm text-qc-body font-light leading-relaxed">
                {selectedZone.vibe}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-qc-surface border border-border-base p-3 rounded-sm space-y-1">
                <p className="text-qc-body font-light flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-500" />
                  <span>Capacity</span>
                </p>
                <p className="font-semibold text-qc-primary">{selectedZone.capacity}</p>
              </div>

              <div className="bg-qc-surface border border-border-base p-3 rounded-sm space-y-1">
                <p className="text-qc-body font-light flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Soundscape</span>
                </p>
                <p className="font-semibold text-qc-primary">{selectedZone.noiseLevel}</p>
              </div>

              <div className="bg-qc-surface border border-border-base p-3 rounded-sm space-y-1">
                <p className="text-qc-body font-light flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-purple-500" />
                  <span>Lighting</span>
                </p>
                <p className="font-semibold text-qc-primary">{selectedZone.lighting}</p>
              </div>
            </div>

            {/* Best For Tags & Features */}
            <div className="space-y-3 pt-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-qc-primary mb-1.5">
                  Ideal For:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedZone.bestFor.map((item, i) => (
                    <span
                      key={i}
                      className="bg-qc-surface border border-border-strong text-qc-secondary text-xs px-2.5 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-qc-primary mb-1.5">
                  Zone Amenities:
                </p>
                <ul className="space-y-1 text-xs text-qc-body font-light">
                  {selectedZone.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={() => handleBookZone(selectedZone)}
                className="btn-gold px-8 py-3.5 text-xs tracking-widest inline-flex items-center gap-2"
              >
                <span>Book a Table in {selectedZone.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Owner Growth Note */}
      <div className="border-t border-border-base pt-4 flex items-start gap-3 text-xs text-qc-body font-light">
        <Flame className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
        <p>
          <strong className="text-qc-primary font-medium">Why Restaurant Owners Love This:</strong>{' '}
          Empowers guests to book their exact desired atmosphere (romantic booths vs. lively cocktail bar), drastically reducing table re-seating requests and elevating customer satisfaction.
        </p>
      </div>
    </div>
  );
};
