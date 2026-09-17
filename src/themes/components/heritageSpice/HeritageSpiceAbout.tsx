import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Wine, Music, Users, Calendar, Sparkles } from 'lucide-react';
import { InteractiveGallery } from '../../../components/common/InteractiveGallery';
import { HeritageSpicePageHero } from './HeritageSpicePageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceAbout: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

  const pillars = [
    {
      title: 'Chef Philosophy',
      description: 'Every plate strikes a balance between deeply satisfying comfort and refined contemporary aesthetic precision.',
      icon: UtensilsCrossed
    },
    {
      title: 'Botanical Mixology',
      description: 'Cocktails and zero-proof coolers infused with fresh pandan, calamansi lime, and indigenous highland herbs.',
      icon: Wine
    },
    {
      title: 'Nightlife & Sound',
      description: 'A carefully curated acoustic landscape transitioning from laid-back dinner jazz to late-night melodic house vinyl.',
      icon: Music
    },
    {
      title: 'Private Dining',
      description: 'Bespoke suites equipped with multimedia capabilities, tailored menus, and dedicated hosting for VIP occasions.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] py-12 sm:py-16 selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero Header */}
        <HeritageSpicePageHero
          badge="OUR HERITAGE & VISION"
          title="Our Story"
          subtitle="Celebrating Malaysia’s multicultural food heritage through modern presentation, warm hospitality, soulful music, and a vibrant Bukit Bintang atmosphere."
        />

        {/* Section 1: The Brand Story & Inspiration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C69A4B] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#E89532]" />
              <span>Culinary Story</span>
            </div>

            <h2 className="hs-font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF4DF] leading-tight">
              Honouring Heritage Roots with Modern Culinary Fire
            </h2>

            <p className="text-sm sm:text-base text-[#F8EAD2]/85 font-light leading-relaxed">
              Malaysia is blessed with one of the most vibrant, multifaceted culinary traditions on the planet. For generations, Malay, Chinese, Indian, Peranakan, and indigenous Bornean cooking techniques have intermingled, giving rise to unforgettable flavour depths.
            </p>

            <p className="text-sm text-[#F8EAD2]/80 font-light leading-relaxed">
              At Q-RESTOBAR, we set out to honour these iconic flavours while stripping away formality. Our kitchen champions artisanal charcoal grilling, whole-spice rempahs ground daily by hand, and cold-pressed tropical aromatics such as wild ginger flower (bunga kantan) and Sarawak peppercorns.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-sm overflow-hidden border border-[#C69A4B]/35 shadow-2xl relative group">
            <img
              src="/images/7c8ae1ad-de1e-4176-ab36-b029628d76f1.png"
              alt="Culinary Atmosphere at Q-RESTOBAR"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Section 2: 4 Pillars of Q-RESTOBAR */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C69A4B] font-mono">
              The Four Cornerstones
            </span>
            <h3 className="hs-font-display text-2xl sm:text-3xl font-bold text-[#FFF4DF]">
              Four Pillars of Q-RESTOBAR
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-[#371018] border border-[#C69A4B]/30 p-6 rounded-sm space-y-4 flex flex-col justify-between shadow-xl transition-all hover:border-[#C69A4B]"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xs bg-[#2B080E] border border-[#C69A4B]/35 flex items-center justify-center text-[#C69A4B]">
                      <Icon className="w-5 h-5 text-[#E89532]" />
                    </div>
                    <h4 className="hs-font-display text-lg font-bold text-[#FFF4DF]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#F8EAD2]/80 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C69A4B]/15 text-[10px] font-mono text-[#C2AFA6] tracking-wider uppercase">
                    Pillar 0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Interactive Atmosphere & Photo Gallery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C69A4B] font-mono">
              Visual Atmosphere
            </span>
            <h2 className="hs-font-display text-3xl font-bold text-[#FFF4DF]">
              The Q-RESTOBAR Visual Atmosphere
            </h2>
            <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light leading-relaxed">
              Filter through moments of dining, mixology cocktails, evening atmosphere, and weekend sessions in Bukit Bintang. Click any photo to view in full lightbox.
            </p>
          </div>

          <InteractiveGallery />
        </div>

        {/* Section 4: Final Booking CTA */}
        <div className="bg-gradient-to-r from-[#371018] via-[#4A0E18] to-[#371018] border border-[#C69A4B]/40 p-8 sm:p-12 rounded-sm text-center space-y-5 shadow-2xl relative overflow-hidden">
          <Sparkles className="w-8 h-8 text-[#E89532] mx-auto" />
          
          <h2 className="hs-font-display text-2xl sm:text-4xl font-bold text-[#FFF4DF]">
            Come Experience the Flavours for Yourself
          </h2>

          <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light max-w-md mx-auto leading-relaxed">
            Reserve your table for lunch, dinner, or evening drinks in the heart of Kuala Lumpur.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedPath('/reservations')}
              className="hs-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeritageSpiceAbout;
