import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Award, HeartHandshake } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-qc-base text-qc-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
              <span className="w-8 h-px bg-purple-500" />
              <span>Restaurant Introduction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary leading-tight">
              Local Soul. Contemporary Flavour.
            </h2>

            <p className="text-base sm:text-lg text-qc-body leading-relaxed font-light">
              Q-RESTOBAR brings together the flavours Malaysians know and love with a fresh, contemporary dining experience. From relaxed lunches to late-night celebrations, every plate is made for sharing, discovering and remembering.
            </p>

            <p className="text-sm text-qc-body leading-relaxed font-light">
              Rooted in the multicultural culinary tapestry of Malaysia, our kitchen blends time-honoured slow cooking, wood-fired grilling, and locally harvested botanicals with sleek modern presentation and craft mixology.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-base">
              <div className="space-y-1">
                <Flame className="w-5 h-5 text-purple-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-qc-primary">Charcoal Fire</p>
                <p className="text-[11px] text-qc-body font-light">Authentic smokiness</p>
              </div>
              <div className="space-y-1">
                <Award className="w-5 h-5 text-purple-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-qc-primary">Local Roots</p>
                <p className="text-[11px] text-qc-body font-light">Heritage recipes</p>
              </div>
              <div className="space-y-1">
                <HeartHandshake className="w-5 h-5 text-purple-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-qc-primary">Warm Service</p>
                <p className="text-[11px] text-qc-body font-light">Malaysian hospitality</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-500 hover:text-qc-secondary transition-colors group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            {/* Primary Main Image */}
            <div className="col-span-8 overflow-hidden rounded-sm border border-border-base shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Modern Malaysian Beef Rendang"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Secondary Top Right Image */}
            <div className="col-span-4 overflow-hidden rounded-sm border border-border-base shadow-xl group self-start">
              <img
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
                alt="Craft Pandan Cocktail"
                className="w-full h-44 sm:h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Secondary Bottom Right Image */}
            <div className="col-span-4 overflow-hidden rounded-sm border border-border-base shadow-xl group -mt-10">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                alt="Restaurant Dining Atmosphere"
                className="w-full h-44 sm:h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Floating Luxury Stamp */}
            <div className="absolute -bottom-6 right-6 bg-qc-surface border border-purple-600/40 p-4 rounded-sm shadow-gold-subtle hidden sm:block max-w-[180px] text-center">
              <p className="text-[10px] uppercase tracking-widest text-purple-500 font-semibold">Bukit Bintang</p>
              <p className="text-xs font-display text-qc-primary font-bold mt-0.5">Est. 2026</p>
              <p className="text-[10px] text-qc-body mt-1 font-light">Contemporary Dining</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
