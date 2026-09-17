import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Utensils, 
  Sparkles, 
  Clock, 
  Phone, 
  ArrowRight, 
  Flame,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceHome: React.FC = () => {
  const { menuItems, promotions, settings } = useData();

  // Pick signature dishes from live CMS menu data
  const signatureDishes = menuItems
    .filter((item) => item.isChefsPick && item.isAvailable)
    .slice(0, 4);

  const displayDishes = signatureDishes.length >= 3
    ? signatureDishes
    : menuItems.filter((item) => item.isAvailable).slice(0, 4);

  // Active promotional event from live CMS
  const activePromo = promotions.find((p) => p.isActive) || promotions[0];

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

  return (
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      
      {/* ── 1. CINEMATIC HERITAGE HERO SECTION ──────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Deep Maroon Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Q-RESTOBAR Heritage Dining Atmosphere"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            loading="eager"
          />
          {/* Deep Maroon & Warm Spice Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B080E] via-[#2B080E]/85 to-[#371018]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#2B080E]/70 to-[#2B080E]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 pb-24 sm:pb-28 lg:pb-32 space-y-8 animate-fade-in">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#371018]/90 border border-[#C69A4B]/40 text-[#C69A4B] text-xs font-semibold uppercase tracking-[0.25em] shadow-lg backdrop-blur-md">
            <span className="text-[#E89532]">♦</span>
            <span>Kuala Lumpur · Bukit Bintang</span>
            <span className="text-[#E89532]">♦</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="hs-font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.06em] uppercase text-[#FFF4DF] leading-tight">
              Tradition Served <br />
              <span className="bg-gradient-to-r from-[#E89532] via-[#C69A4B] to-[#F8EAD2] bg-clip-text text-transparent">
                With Soul.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-[#F8EAD2]/80 font-light leading-relaxed tracking-wide pt-2">
              Celebrating Malaysia’s multicultural food heritage through modern presentation, warm hospitality, and a vibrant Bukit Bintang atmosphere.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="hs-btn-primary w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.18em] flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>

            <Link
              to={getThemedPath('/menu')}
              className="hs-btn-outline w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.18em] flex items-center justify-center gap-2.5"
            >
              <Utensils className="w-4 h-4" />
              <span>Discover Our Menu</span>
            </Link>
          </div>

          {/* Quick Heritage Highlights */}
          <div className="hs-stats-grid">
            <div className="hs-stat-card">
              <span className="hs-stat-value">Charcoal</span>
              <span className="hs-stat-label">Authentic Smokiness</span>
            </div>
            <div className="hs-stat-card">
              <span className="hs-stat-value">Local</span>
              <span className="hs-stat-label">Heritage Recipes</span>
            </div>
            <div className="hs-stat-card">
              <span className="hs-stat-value">Contemporary</span>
              <span className="hs-stat-label">Modern Dining</span>
            </div>
            <div className="hs-stat-card">
              <span className="hs-stat-value">Bukit Bintang</span>
              <span className="hs-stat-label">Warm Hospitality</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. SIGNATURE DISHES (WARM CREAM EDITORIAL SECTION) ─────── */}
      <section className="py-24 bg-[#FFF9EC] text-[#321B18] border-t border-b border-[#C69A4B]/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C69A4B]">
              <Sparkles className="w-3.5 h-3.5 text-[#E89532]" />
              <span>Signature Creations</span>
            </div>
            <h2 className="hs-font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#321B18]">
              Slow-Simmered Heritage &amp; Craft
            </h2>
            <div className="hs-divider-gold my-4" />
            <p className="text-xs sm:text-sm text-[#80665A] font-light">
              Reimagined heritage classics crafted with contemporary culinary precision and bold flavours.
            </p>
          </div>

          {/* 4-Card Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayDishes.map((dish) => (
              <div key={dish.id} className="hs-menu-card group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F6E8D1]">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-1 text-xs font-bold font-mono bg-[#2B080E] text-[#C69A4B] border border-[#C69A4B]/40 rounded-xs shadow-md">
                      RM {dish.price.toFixed(2)}
                    </span>
                  </div>
                  {dish.spicyLevel > 0 && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#E89532] text-white rounded-xs flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3" />
                        Spicy
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#FFFDF7]">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="hs-font-display text-lg font-bold text-[#321B18] group-hover:text-[#C69A4B] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#80665A] leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#C69A4B]/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] uppercase font-mono font-medium text-[#C69A4B]">
                      {dish.category}
                    </span>
                    {dish.isChefsPick && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#E89532] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Chef's Choice
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to={getThemedPath('/menu')}
              className="hs-btn-dark px-8 py-3.5 text-xs inline-flex items-center gap-2"
            >
              <span>Explore Complete Digital Menu</span>
              <ArrowRight className="w-4 h-4 text-[#C69A4B]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 3. PHILOSOPHY & CULINARY STORY ─────────────────────────── */}
      <section className="py-24 bg-[#2B080E] text-[#FFF4DF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C69A4B]">
                <span>♦</span>
                <span>Our Heritage Story</span>
              </div>

              <h2 className="hs-font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFF4DF] leading-tight">
                Local Soul. <br />
                <span className="text-[#C69A4B]">Contemporary Flavour.</span>
              </h2>

              <p className="text-sm text-[#F8EAD2]/80 leading-relaxed font-light">
                Rooted in the multicultural culinary tapestry of Malaysia, Q-RESTOBAR brings together the flavours Malaysians know and love with fresh, contemporary dining. From relaxed lunches to late-night celebrations, every plate is made for sharing, discovering, and remembering.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C69A4B]/20 border border-[#C69A4B]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C69A4B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FFF4DF]">Charcoal &amp; Wood-Fired Grilling</h4>
                    <p className="text-xs text-[#F8EAD2]/70">Championing authentic charcoal fire and time-honoured slow cooking for rich, smoky depth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C69A4B]/20 border border-[#C69A4B]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C69A4B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FFF4DF]">Multicultural Heritage Roots</h4>
                    <p className="text-xs text-[#F8EAD2]/70">Honouring iconic Malaysian flavours with fresh local ingredients and refined modern presentation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C69A4B]/20 border border-[#C69A4B]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C69A4B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FFF4DF]">Warm Service &amp; Hospitality</h4>
                    <p className="text-xs text-[#F8EAD2]/70">Delivering welcoming Malaysian hospitality and memorable dining moments in Bukit Bintang.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to={getThemedPath('/about')}
                  className="hs-btn-primary px-7 py-3 text-xs inline-flex items-center gap-2"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden border border-[#C69A4B]/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                  alt="Heritage Dining at Q-RESTOBAR"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B080E] via-transparent to-transparent opacity-60" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-[#371018] border border-[#C69A4B]/60 p-5 rounded-xs shadow-2xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C69A4B]/20 border border-[#C69A4B] flex items-center justify-center text-[#C69A4B]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FFF4DF] block">Contemporary Dining</span>
                    <span className="text-[11px] text-[#C69A4B]">Bukit Bintang, KL</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. FEATURED OFFER / PROMOTION ──────────────────────────── */}
      {activePromo && (
        <section className="py-20 bg-[#FFF9EC] text-[#321B18] border-t border-b border-[#C69A4B]/30 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FFFDF7] border-2 border-[#C69A4B]/50 rounded-sm p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B080E] text-[#C69A4B] border border-[#C69A4B]/40 text-xs font-mono font-bold uppercase tracking-wider rounded-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#E89532]" />
                    <span>Special Feature · {activePromo.badge || 'Limited Event'}</span>
                  </div>

                  <h3 className="hs-font-display text-2xl sm:text-3xl font-bold text-[#321B18]">
                    {activePromo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#80665A] leading-relaxed">
                    {activePromo.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#80665A] pt-2">
                    {activePromo.schedule && (
                      <div className="flex items-center gap-1.5 font-mono text-[#321B18]">
                        <Clock className="w-3.5 h-3.5 text-[#C69A4B]" />
                        <span>Schedule: {activePromo.schedule}</span>
                      </div>
                    )}
                    {activePromo.pricingHighlights && (
                      <div className="font-bold text-[#E89532]">
                        {activePromo.pricingHighlights}
                      </div>
                    )}
                  </div>

                </div>

                <div className="md:col-span-4 flex flex-col items-center sm:items-end justify-center space-y-3">
                  <Link
                    to={getThemedPath('/offers')}
                    className="hs-btn-dark w-full text-center px-6 py-3.5 text-xs flex items-center justify-center gap-2"
                  >
                    <span>View Offer Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C69A4B]" />
                  </Link>

                  <Link
                    to={getThemedPath('/reservations')}
                    className="text-xs text-[#C69A4B] hover:text-[#E89532] font-semibold underline transition-colors"
                  >
                    Book with this offer →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. TABLE RESERVATION CALL TO ACTION ────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-[#2B080E] to-[#1A0509] text-[#FFF4DF] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C69A4B]">
            <span>♦</span>
            <span>Intimate Hospitality</span>
            <span>♦</span>
          </div>

          <h2 className="hs-font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#FFF4DF]">
            Experience The Flavours <br />
            <span className="text-[#C69A4B]">Of Tradition</span>
          </h2>

          <p className="text-sm sm:text-base max-w-xl mx-auto text-[#F8EAD2]/80 font-light leading-relaxed">
            From relaxed family lunches to late-night celebrations, reserve your table in the heart of Bukit Bintang.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to={getThemedPath('/reservations')}
              className="hs-btn-primary px-8 py-4 text-xs font-bold tracking-[0.18em] flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Table</span>
            </Link>

            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hs-btn-outline px-8 py-4 text-xs font-bold tracking-[0.18em] flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C69A4B]" />
              <span>Call {settings.phone}</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};


