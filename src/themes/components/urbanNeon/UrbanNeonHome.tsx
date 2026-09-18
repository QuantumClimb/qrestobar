import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Utensils, Sparkles, Clock, Zap, ArrowRight, ShieldCheck, Disc } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/urbanNeon.css';

export const UrbanNeonHome: React.FC = () => {
  const { menuItems, promotions } = useData();

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'urban-neon');

  // Featured dishes from live CMS menu items
  const featuredDishes = menuItems.filter(item => item.isChefsPick).concat(menuItems.filter(item => !item.isChefsPick)).slice(0, 3);

  // Featured promotion from live CMS data
  const featuredPromo = promotions.find(p => p.isActive) || promotions[0];

  return (
    <div className="min-h-screen bg-[#090B18] text-white selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-[#20E3D2]/30 pt-12 pb-20">
        {/* Ambient Neon Lighting Overlays */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#20E3D2]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EC4899]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/DJLivemusic.png"
            alt="Bukit Bintang Nightlife Atmosphere"
            className="w-full h-full object-cover object-center opacity-30 brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090B18] via-[#090B18]/70 to-[#090B18]/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20E3D2]/15 border border-[#20E3D2]/40 text-[#20E3D2] text-xs font-bold uppercase tracking-[0.25em] font-mono shadow-[0_0_15px_rgba(32,227,210,0.3)]">
            <Zap className="w-3.5 h-3.5 text-[#20E3D2]" />
            <span>BUKIT BINTANG NIGHTLIFE DESTINATION</span>
          </div>

          <h1 className="un-font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-wider leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            EAT LOUD. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20E3D2] via-[#EC4899] to-[#8B5CF6] animate-pulse">
              LIVE LATE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Where charcoal-flamed gourmet burgers, artisanal wood-fired grills, and electric craft mixology ignite under Kuala Lumpur’s neon skyline.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="un-btn-cyan w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve VIP Table</span>
            </Link>

            <Link
              to={getThemedPath('/menu')}
              className="un-btn-outline w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Utensils className="w-4 h-4 text-[#20E3D2]" />
              <span>Explore Nightlife Menu</span>
            </Link>
          </div>

          {/* Highlights Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
            <div className="p-3.5 bg-[#131B2E]/80 rounded border border-[#20E3D2]/30 text-center shadow-[0_0_10px_rgba(32,227,210,0.1)]">
              <span className="block text-xs font-bold text-white uppercase tracking-wider">Bukit Bintang</span>
              <span className="text-[11px] text-[#20E3D2] font-mono">Heart of KL Nightlife</span>
            </div>
            <div className="p-3.5 bg-[#131B2E]/80 rounded border border-[#EC4899]/30 text-center shadow-[0_0_10px_rgba(236,72,153,0.1)]">
              <span className="block text-xs font-bold text-white uppercase tracking-wider">Live DJ Sessions</span>
              <span className="text-[11px] text-[#EC4899] font-mono">Thu – Sun Nights</span>
            </div>
            <div className="p-3.5 bg-[#131B2E]/80 rounded border border-[#20E3D2]/30 text-center shadow-[0_0_10px_rgba(32,227,210,0.1)]">
              <span className="block text-xs font-bold text-white uppercase tracking-wider">Charcoal Grill</span>
              <span className="text-[11px] text-[#20E3D2] font-mono">Open Until 12 AM</span>
            </div>
            <div className="p-3.5 bg-[#131B2E]/80 rounded border border-[#EC4899]/30 text-center shadow-[0_0_10px_rgba(236,72,153,0.1)]">
              <span className="block text-xs font-bold text-white uppercase tracking-wider">Craft Mixology</span>
              <span className="text-[11px] text-[#EC4899] font-mono">Infused Spirits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live DJ & Music Promotion Panel */}
      <section className="py-16 bg-[#111827] border-b border-[#20E3D2]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.20em] text-[#EC4899] font-mono">
                <Disc className="w-4 h-4 text-[#EC4899] animate-spin" />
                <span>WEEKEND LIVE SESSIONS</span>
              </div>

              <h2 className="un-font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
                Late-Night Vinyl &amp; Electric DJ Beats
              </h2>

              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                Step into Kuala Lumpur’s premier urban sanctuary where acoustic lounge vibes seamlessly evolve into high-energy deep house and vinyl DJ performances starting at 8:00 PM every weekend.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#131B2E] rounded border border-[#20E3D2]/30 space-y-1">
                  <h4 className="font-semibold text-xs text-[#20E3D2] uppercase tracking-wider">Friday Cyber Groove</h4>
                  <p className="text-xs text-gray-300">Synthwave, Nu-Disco &amp; Melodic House featuring local KL talent.</p>
                </div>
                <div className="p-4 bg-[#131B2E] rounded border border-[#EC4899]/30 space-y-1">
                  <h4 className="font-semibold text-xs text-[#EC4899] uppercase tracking-wider">Saturday Neon Ignition</h4>
                  <p className="text-xs text-gray-300">Live vocalists, percussionists, and guest international DJs.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={getThemedPath('/experiences')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#20E3D2] hover:text-[#EC4899] transition-colors"
                >
                  <span>Explore All Nightlife Lineups</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-lg overflow-hidden border border-[#20E3D2]/40 shadow-[0_0_25px_rgba(32,227,210,0.25)] relative group">
              <img
                src="/images/QRESTOBARLIVEMUSIC.png"
                alt="Q-RESTOBAR Live Music & DJ Showcase"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090B18] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 border-b border-[#20E3D2]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#20E3D2] font-mono">
              CHEF'S HIGHLIGHTS
            </span>
            <h2 className="un-font-display text-3xl sm:text-4xl font-bold text-white">
              Signature Late-Night Dishes
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Wood-fired steaks, artisanal gourmet burgers, and bold Malaysian charcoal creations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((item) => (
              <div
                key={item.id}
                className="un-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111827]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Utensils className="w-10 h-10 opacity-30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="un-badge-cyan">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="un-font-display text-xl font-bold text-white group-hover:text-[#20E3D2] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm font-bold text-[#20E3D2] shrink-0">
                        RM {Number(item.price).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={getThemedPath('/menu')}
                    className="un-btn-outline w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>View Menu Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to={getThemedPath('/menu')}
              className="un-btn-cyan px-8 py-3.5 text-xs font-bold"
            >
              <span>Explore Complete Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Promotion Section */}
      {featuredPromo && (
        <section className="py-20 bg-[#111827] border-b border-[#20E3D2]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#131B2E] border border-[#20E3D2]/40 rounded-lg p-8 sm:p-12 shadow-[0_0_30px_rgba(32,227,210,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.20em] text-[#EC4899] font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>FEATURED NIGHTLIFE OFFER</span>
                </div>

                <h3 className="un-font-display text-2xl sm:text-4xl font-bold text-white">
                  {featuredPromo.title}
                </h3>

                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  {featuredPromo.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-1">
                  <span className="flex items-center gap-1.5 text-[#20E3D2]">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPromo.schedule}</span>
                  </span>
                  {featuredPromo.terms && (
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <ShieldCheck className="w-4 h-4 text-[#EC4899]" />
                      <span>{featuredPromo.terms}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3 lg:border-l lg:border-white/10 lg:pl-8">
                <Link
                  to={getThemedPath('/offers')}
                  className="un-btn-magenta w-full py-3.5 text-xs font-bold text-center"
                >
                  <span>View All Offers</span>
                </Link>
                <Link
                  to={getThemedPath('/reservations')}
                  className="un-btn-outline w-full py-3.5 text-xs font-bold text-center"
                >
                  <span>Book This Experience</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reservation Callout CTA */}
      <section className="py-20 bg-gradient-to-b from-[#090B18] to-[#111827]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-block p-3 rounded-full bg-[#20E3D2]/15 border border-[#20E3D2]/40 text-[#20E3D2] shadow-[0_0_20px_rgba(32,227,210,0.3)]">
            <Calendar className="w-8 h-8" />
          </div>

          <h2 className="un-font-display text-3xl sm:text-5xl font-bold text-white">
            Reserve Your Table at Q-RESTOBAR
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Join us for dinner, late-night cocktails, or live DJ music in the heart of Bukit Bintang.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedPath('/reservations')}
              className="un-btn-cyan px-10 py-4 text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(32,227,210,0.4)]"
            >
              <span>Book Table Online</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default UrbanNeonHome;
