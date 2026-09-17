import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Utensils, Sparkles, Clock, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroHome: React.FC = () => {
  const { menuItems, promotions } = useData();

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'botanical-bistro');

  // Featured dishes from live CMS menu items
  const featuredDishes = menuItems.filter(item => item.isChefsPick).concat(menuItems.filter(item => !item.isChefsPick)).slice(0, 3);
  
  // Featured promotion from live CMS data
  const featuredPromo = promotions.find(p => p.isActive) || promotions[0];

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#3F6B4F]/20 pt-12 pb-20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/7c8ae1ad-de1e-4176-ab36-b029628d76f1.png"
            alt="Botanical Dining Atmosphere"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1E8] via-[#F4F1E8]/70 to-[#F4F1E8]/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3F6B4F]/10 border border-[#3F6B4F]/30 text-[#3F6B4F] text-xs font-semibold uppercase tracking-[0.22em] font-mono shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-[#3F6B4F]" />
            <span>Kuala Lumpur Garden Sanctuary</span>
          </div>

          <h1 className="bb-font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#24352A] tracking-wide leading-tight">
            Modern Malaysian Dining <br className="hidden sm:block" />
            <span className="italic text-[#3F6B4F]">Infused with Botanical Grace</span>
          </h1>

          <p className="text-base sm:text-lg text-[#556257] font-light max-w-2xl mx-auto leading-relaxed">
            Where traditional charcoal grilling meets wild jungle herbs, cold-pressed botanicals, and refined contemporary culinary craftsmanship in Bukit Bintang.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="bb-btn-primary w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>

            <Link
              to={getThemedPath('/menu')}
              className="bb-btn-outline w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Utensils className="w-4 h-4 text-[#3F6B4F]" />
              <span>Explore Garden Menu</span>
            </Link>
          </div>

          {/* Key Attributes Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#3F6B4F]/15">
            <div className="p-3 bg-[#FCFAF4] rounded border border-[#3F6B4F]/15 text-center">
              <span className="block text-xs font-bold text-[#24352A]">Bukit Bintang</span>
              <span className="text-[11px] text-[#7B877E] font-mono">Prime Location</span>
            </div>
            <div className="p-3 bg-[#FCFAF4] rounded border border-[#3F6B4F]/15 text-center">
              <span className="block text-xs font-bold text-[#24352A]">Daily Rempahs</span>
              <span className="text-[11px] text-[#7B877E] font-mono">Fresh Botanicals</span>
            </div>
            <div className="p-3 bg-[#FCFAF4] rounded border border-[#3F6B4F]/15 text-center">
              <span className="block text-xs font-bold text-[#24352A]">Charcoal Grill</span>
              <span className="text-[11px] text-[#7B877E] font-mono">Smokey Infusions</span>
            </div>
            <div className="p-3 bg-[#FCFAF4] rounded border border-[#3F6B4F]/15 text-center">
              <span className="block text-xs font-bold text-[#24352A]">Private Dining</span>
              <span className="text-[11px] text-[#7B877E] font-mono">Curated Suites</span>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Philosophy & Story */}
      <section className="py-20 bg-[#E7E3D6]/50 border-b border-[#3F6B4F]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#3F6B4F] font-mono">
                <Leaf className="w-3.5 h-3.5 text-[#3F6B4F]" />
                <span>Our Culinary Roots</span>
              </div>

              <h2 className="bb-font-display text-3xl sm:text-5xl font-bold text-[#24352A] leading-tight">
                Honouring Heritage Flavours With Organic Sophistication
              </h2>

              <p className="text-sm sm:text-base text-[#556257] font-light leading-relaxed">
                At Q-RESTOBAR, we draw inspiration from Malaysia’s rich botanical biodiversity. From fresh ginger flower (bunga kantan) to highland laksa leaves and toasted coconut kerisik, every dish is a homage to local flavors crafted for the modern palate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FCFAF4] rounded border border-[#3F6B4F]/20 space-y-1">
                  <h4 className="font-semibold text-xs text-[#24352A] uppercase tracking-wider">Artisanal Cooking</h4>
                  <p className="text-xs text-[#556257] font-light">Charcoal-seared skewers, slow-simmered rendang, and fragrant clays.</p>
                </div>
                <div className="p-4 bg-[#FCFAF4] rounded border border-[#3F6B4F]/20 space-y-1">
                  <h4 className="font-semibold text-xs text-[#24352A] uppercase tracking-wider">Botanical Mixology</h4>
                  <p className="text-xs text-[#556257] font-light">Coolers and cocktails layered with lemongrass, pandan, and tropical citrus.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={getThemedPath('/about')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3F6B4F] hover:text-[#2F533C] transition-colors"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-md overflow-hidden border border-[#3F6B4F]/25 shadow-xl relative group">
              <img
                src="/images/2ddac553-ec52-4467-9d7b-9c7009405d4b.png"
                alt="Q-RESTOBAR Ambiance"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 border-b border-[#3F6B4F]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#3F6B4F] font-mono">
              Chef Highlights
            </span>
            <h2 className="bb-font-display text-3xl sm:text-4xl font-bold text-[#24352A]">
              Featured Botanical Creations
            </h2>
            <p className="text-xs sm:text-sm text-[#556257] font-light">
              Hand-selected signature dishes demonstrating our culinary philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((item) => (
              <div
                key={item.id}
                className="bb-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E3D6]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#7B877E]">
                        <Utensils className="w-10 h-10 opacity-30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bb-badge">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="bb-font-display text-xl font-bold text-[#24352A] group-hover:text-[#3F6B4F] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm font-bold text-[#3F6B4F] shrink-0">
                        RM {Number(item.price).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#556257] font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={getThemedPath('/menu')}
                    className="bb-btn-outline w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
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
              className="bb-btn-primary px-8 py-3.5 text-xs font-bold"
            >
              <span>Explore Complete Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Promotion Section */}
      {featuredPromo && (
        <section className="py-20 bg-[#E7E3D6]/40 border-b border-[#3F6B4F]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FCFAF4] border border-[#3F6B4F]/25 rounded-md p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.20em] text-[#B86B45] font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Experience</span>
                </div>

                <h3 className="bb-font-display text-2xl sm:text-4xl font-bold text-[#24352A]">
                  {featuredPromo.title}
                </h3>

                <p className="text-sm text-[#556257] font-light leading-relaxed">
                  {featuredPromo.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#7B877E] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#3F6B4F]" />
                    <span>{featuredPromo.schedule}</span>
                  </span>
                  {featuredPromo.terms && (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#3F6B4F]" />
                      <span>{featuredPromo.terms}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3 lg:border-l lg:border-[#3F6B4F]/20 lg:pl-8">
                <Link
                  to={getThemedPath('/offers')}
                  className="bb-btn-terracotta w-full py-3.5 text-xs font-bold text-center"
                >
                  <span>View All Offers</span>
                </Link>
                <Link
                  to={getThemedPath('/reservations')}
                  className="bb-btn-outline w-full py-3.5 text-xs font-bold text-center"
                >
                  <span>Book This Experience</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reservation Callout CTA */}
      <section className="py-20 bg-gradient-to-b from-[#FCFAF4] to-[#E7E3D6]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-block p-3 rounded-full bg-[#3F6B4F]/10 border border-[#3F6B4F]/30 text-[#3F6B4F]">
            <Calendar className="w-8 h-8" />
          </div>

          <h2 className="bb-font-display text-3xl sm:text-5xl font-bold text-[#24352A]">
            Reserve Your Botanical Table
          </h2>

          <p className="text-sm sm:text-base text-[#556257] font-light max-w-xl mx-auto leading-relaxed">
            Join us for an unforgettable dining journey in Bukit Bintang. Open daily for lunch, dinner, and late evening cocktail lounge.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedPath('/reservations')}
              className="bb-btn-primary px-10 py-4 text-xs font-bold uppercase tracking-widest shadow-lg"
            >
              <span>Book Table Online</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BotanicalBistroHome;
