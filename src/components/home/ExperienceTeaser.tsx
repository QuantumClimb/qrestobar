import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, Wine, Zap, MapPin, ArrowRight } from 'lucide-react';

export const ExperienceTeaser: React.FC = () => {
  return (
    <section className="py-20 bg-qc-base text-qc-primary border-t border-border-base relative overflow-hidden">
      {/* Subtle gold decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-base pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Guest Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary">
              Interactive Dining Experiences
            </h2>
            <p className="text-sm text-qc-body font-light leading-relaxed">
              Curate your evening before stepping through our doors. Spin for welcome perks, generate custom beverage pairings, and reserve your desired dining zone.
            </p>
          </div>

          <Link
            to="/experiences"
            className="btn-gold text-xs px-6 py-3.5 tracking-widest inline-flex items-center gap-2 shrink-0 shadow-gold-subtle"
          >
            <span>Explore All 4 Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Feature Teaser Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Wheel */}
          <Link
            to="/experiences?tab=wheel"
            className="bg-qc-surface border border-border-base hover:border-purple-600/60 p-6 rounded-sm space-y-4 group transition-all duration-300 flex flex-col justify-between hover:shadow-gold-subtle"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-qc-surface border border-purple-600/30 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-500 bg-purple-600/10 px-2 py-0.5 rounded">
                Instant Reward
              </span>
              <h3 className="font-display font-bold text-lg text-qc-primary group-hover:text-qc-secondary transition-colors">
                Golden Perk Wheel
              </h3>
              <p className="text-xs text-qc-body font-light leading-relaxed">
                Spin our interactive brass wheel to unlock complimentary Lychee Rose Martinis, artisan satay, or dessert vouchers.
              </p>
            </div>

            <div className="pt-4 border-t border-border-base/80 flex items-center justify-between text-xs text-purple-500 font-medium">
              <span>Spin &amp; Claim Perk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: AI Sommelier */}
          <Link
            to="/experiences?tab=sommelier"
            className="bg-qc-surface border border-border-base hover:border-purple-600/60 p-6 rounded-sm space-y-4 group transition-all duration-300 flex flex-col justify-between hover:shadow-gold-subtle"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-qc-surface border border-purple-600/30 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <Wine className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-500 bg-purple-600/10 px-2 py-0.5 rounded">
                Flavour Match
              </span>
              <h3 className="font-display font-bold text-lg text-qc-primary group-hover:text-qc-secondary transition-colors">
                AI Sommelier Quiz
              </h3>
              <p className="text-xs text-qc-body font-light leading-relaxed">
                Answer 3 quick questions to generate your bespoke 3-course tasting menu + signature cocktail pairing.
              </p>
            </div>

            <div className="pt-4 border-t border-border-base/80 flex items-center justify-between text-xs text-purple-500 font-medium">
              <span>Find My Pairing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Live Table Ticker */}
          <Link
            to="/experiences?tab=availability"
            className="bg-qc-surface border border-border-base hover:border-purple-600/60 p-6 rounded-sm space-y-4 group transition-all duration-300 flex flex-col justify-between hover:shadow-gold-subtle"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-qc-surface border border-purple-600/30 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                Live Inventory
              </span>
              <h3 className="font-display font-bold text-lg text-qc-primary group-hover:text-qc-secondary transition-colors">
                Live Seating &amp; Flash Perks
              </h3>
              <p className="text-xs text-qc-body font-light leading-relaxed">
                Check real-time table availability for tonight and claim limited-time flash dining treats.
              </p>
            </div>

            <div className="pt-4 border-t border-border-base/80 flex items-center justify-between text-xs text-purple-500 font-medium">
              <span>View Live Tables</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Zone Vibe Picker */}
          <Link
            to="/experiences?tab=zones"
            className="bg-qc-surface border border-border-base hover:border-purple-600/60 p-6 rounded-sm space-y-4 group transition-all duration-300 flex flex-col justify-between hover:shadow-gold-subtle"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-qc-surface border border-purple-600/30 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-500 bg-purple-600/10 px-2 py-0.5 rounded">
                Atmosphere Selector
              </span>
              <h3 className="font-display font-bold text-lg text-qc-primary group-hover:text-qc-secondary transition-colors">
                Zone &amp; Vibe Picker
              </h3>
              <p className="text-xs text-qc-body font-light leading-relaxed">
                Choose between intimate velvet booths, open-air sunset terrace, or front-row flair mixology counter.
              </p>
            </div>

            <div className="pt-4 border-t border-border-base/80 flex items-center justify-between text-xs text-purple-500 font-medium">
              <span>Select Seating Vibe</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
