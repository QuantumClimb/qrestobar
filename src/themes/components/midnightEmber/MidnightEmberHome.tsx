import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Utensils, 
  Flame, 
  Sparkles, 
  Clock, 
  Phone, 
  ArrowRight, 
  Star,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../../context/DataContext';

export const MidnightEmberHome: React.FC = () => {
  const { menuItems, promotions, settings } = useData();

  // Pick top chef's picks or signature dishes from CMS data
  const signatureDishes = menuItems
    .filter((item) => item.isChefsPick && item.isAvailable)
    .slice(0, 4);

  // If less than 4 chef picks, fill with available items
  const displayDishes = signatureDishes.length >= 3 
    ? signatureDishes 
    : menuItems.filter((item) => item.isAvailable).slice(0, 4);

  // Active promotional events from CMS
  const activePromo = promotions.find((p) => p.isActive) || promotions[0];

  return (
    <div className="min-h-screen bg-[#101010] text-[#F5EFE6] selection:bg-[#D8662C]/30 selection:text-[#F5EFE6]">
      
      {/* ── 1. CINEMATIC HERO SECTION ─────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Charcoal Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Q-RESTOBAR Atmosphere"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            loading="eager"
          />
          {/* Deep Charcoal / Warm Ember Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/80 to-[#101010]/60" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#101010]/70 to-[#101010]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-28 sm:pb-32 lg:pb-36 space-y-8 animate-fade-in">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1613]/90 border border-[#D8AA5B]/40 text-[#D8AA5B] text-xs font-semibold uppercase tracking-[0.25em] shadow-lg backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-[#D8662C]" />
            <span>Kuala Lumpur · Bukit Bintang</span>
            <Flame className="w-3.5 h-3.5 text-[#D8662C]" />
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] uppercase text-[#F5EFE6] leading-tight">
              Dine. Drink. <br />
              <span className="bg-gradient-to-r from-[#D8662C] via-[#E47B3D] to-[#D8AA5B] bg-clip-text text-transparent">
                Stay Awhile.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-[#CFC3B5] font-light leading-relaxed tracking-wide pt-2">
              An intimate culinary sanctuary in the heart of Kuala Lumpur. Experience artisanal charcoal grilling, botanical mixology, and late-night vinyl warmth.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservations"
              className="me-btn-primary w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.18em] flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>

            <Link
              to="/menu"
              className="me-btn-outline w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.18em] flex items-center justify-center gap-2.5"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore The Menu</span>
            </Link>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="me-stats-grid">
            <div className="me-stat-card">
              <span className="me-stat-value">100%</span>
              <span className="me-stat-label">Artisanal Charcoal</span>
            </div>
            <div className="me-stat-card">
              <span className="me-stat-value">30+</span>
              <span className="me-stat-label">Signature Dishes</span>
            </div>
            <div className="me-stat-card">
              <span className="me-stat-value">Handcrafted</span>
              <span className="me-stat-label">Botanical Cocktails</span>
            </div>
            <div className="me-stat-card">
              <span className="me-stat-value">Daily</span>
              <span className="me-stat-label">Live Vinyl Sessions</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. ARTISANAL SIGNATURE DISHES (CMS DATA) ────────────────── */}
      <section className="py-24 bg-[#14110F] border-t border-b border-[#D8AA5B]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#D8662C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Culinary Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5EFE6]">
              Artisanal Charcoal &amp; Craft
            </h2>
            <div className="me-divider-gold my-4" />
            <p className="text-xs sm:text-sm text-[#CFC3B5] font-light">
              Each dish is prepared over live embers with whole-spice rempahs ground fresh daily.
            </p>
          </div>

          {/* Grid of Dishes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayDishes.map((dish) => (
              <div
                key={dish.id}
                className="me-card overflow-hidden flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1613]">
                  {dish.imageUrl ? (
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1A1613] text-[#94877A]">
                      <Utensils className="w-8 h-8 opacity-40" />
                    </div>
                  )}
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#101010]/80 border border-[#D8AA5B]/30 text-[10px] font-semibold uppercase tracking-wider text-[#D8AA5B] backdrop-blur-sm">
                    {dish.category}
                  </span>
                  {/* Price Tag */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#D8662C] text-white text-xs font-bold font-mono shadow-md">
                    RM {Number(dish.price).toFixed(2)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#F5EFE6] group-hover:text-[#D8AA5B] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#CFC3B5] font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D8AA5B]/15 flex items-center justify-between text-[11px] text-[#94877A]">
                    <span className="capitalize">{dish.isVegetarian ? 'Vegetarian' : 'Chef Specialty'}</span>
                    <span className="text-[#D8662C] font-medium">View in Menu &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Menu Link CTA */}
          <div className="text-center pt-4">
            <Link
              to="/menu"
              className="me-btn-outline px-8 py-3.5 text-xs font-semibold tracking-widest inline-flex items-center gap-2"
            >
              <span>View Full Digital Menu</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D8662C]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 3. FEATURED PROMOTION / EVENT (CMS DATA) ───────────────── */}
      {activePromo && (
        <section className="py-20 bg-[#101010] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#1A1613] via-[#211A15] to-[#1A1613] border border-[#D8AA5B]/35 rounded-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Background ambient lighting */}
              <div className="absolute right-0 top-0 w-1/2 h-full bg-radial-at-c from-[#D8662C]/15 to-transparent pointer-events-none" />

              {/* Text content */}
              <div className="lg:col-span-7 space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D8662C]/20 border border-[#D8AA5B]/40 text-[#D8AA5B] text-xs font-semibold uppercase tracking-widest">
                  <Star className="w-3.5 h-3.5 text-[#D8662C] fill-current" />
                  <span>Featured Tasting Event</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F5EFE6] leading-tight">
                  {activePromo.title}
                </h2>

                <p className="text-sm text-[#CFC3B5] font-light leading-relaxed">
                  {activePromo.description}
                </p>

                {activePromo.schedule && (
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D8AA5B]">
                    <Clock className="w-4 h-4 text-[#D8662C]" />
                    <span>{activePromo.schedule}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    to="/reservations"
                    className="me-btn-primary px-6 py-3 text-xs font-bold tracking-widest flex items-center gap-2"
                  >
                    <span>Reserve For Event</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/offers"
                    className="text-xs text-[#CFC3B5] hover:text-[#D8AA5B] font-semibold tracking-wider uppercase underline ml-2"
                  >
                    All Offers &rarr;
                  </Link>
                </div>
              </div>

              {/* Image banner */}
              <div className="lg:col-span-5 relative z-10 rounded-sm overflow-hidden border border-[#D8AA5B]/30 shadow-xl aspect-video lg:aspect-square">
                <img
                  src={activePromo.imageUrl || '/images/DJLivemusic.png'}
                  alt={activePromo.title}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── 4. CULINARY STORY & CRAFT SECTION ──────────────────────── */}
      <section className="py-24 bg-[#14110F] border-t border-[#D8AA5B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-sm overflow-hidden border border-[#D8AA5B]/30 shadow-2xl">
                <img
                  src="/images/aboutus.png"
                  alt="Craft Mixology and Kitchen at Q-RESTOBAR"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 rounded bg-[#1A1613] border border-[#D8AA5B]/40 shadow-2xl max-w-xs">
                <p className="font-serif text-sm font-bold text-[#D8AA5B]">Bukit Bintang Nights</p>
                <p className="text-[11px] text-[#CFC3B5] font-light mt-0.5">Where Malaysian heritage meets refined contemporary culinary fire.</p>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D8662C] block">
                Our Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EFE6] leading-tight">
                Honouring Local Heritage Roots with Smoked Charcoal Fire
              </h2>

              <p className="text-sm text-[#CFC3B5] font-light leading-relaxed">
                At Q-RESTOBAR, we strip away formality while celebrating Malaysia’s rich multicultural gastronomy. Hand-ground spice rempahs, whole fresh botanicals, and artisanal wood-fire cooking bring out unforgettable flavor depths.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Artisanal charcoal grills using sustainable mangrove wood',
                  'Cocktails infused with fresh wild ginger flower & highland herbs',
                  'Intimate late-night listening lounge with vintage vinyl selectors',
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-xs text-[#F5EFE6]">
                    <CheckCircle2 className="w-4 h-4 text-[#D8662C] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="me-btn-outline px-6 py-3 text-xs font-semibold tracking-widest inline-flex items-center gap-2"
                >
                  <span>Read Full Heritage Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D8662C]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. FINAL RESERVATION CTA BANNER ────────────────────────── */}
      <section className="py-24 bg-[#101010] relative overflow-hidden border-t border-[#D8AA5B]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#D8662C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFE6]">
            Your Table Is Waiting Under The Warm Embers
          </h2>

          <p className="text-sm sm:text-base text-[#CFC3B5] font-light max-w-2xl mx-auto leading-relaxed">
            Join us for an evening of bold Malaysian flavours, handcrafted mixology, and soulful hospitality. Reserve online instantly or call our concierge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/reservations"
              className="me-btn-primary w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table Online</span>
            </Link>

            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="me-btn-outline w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Concierge: {settings.phone}</span>
            </a>
          </div>

          <div className="pt-8 border-t border-[#D8AA5B]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#94877A]">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D8662C]" />
              <span>{settings.openingHoursDisplay}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D8662C]" />
              <span>Bukit Bintang, Kuala Lumpur</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
