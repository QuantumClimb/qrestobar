import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, UtensilsCrossed, Wine, Music, Users } from 'lucide-react';
import { InteractiveGallery } from '../../../components/common/InteractiveGallery';
import { UrbanNeonPageHero } from './UrbanNeonPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/urbanNeon.css';

export const UrbanNeonAbout: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'urban-neon');

  return (
    <div className="min-h-screen bg-[#090B18] text-white py-12 sm:py-16 selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero Header */}
        <UrbanNeonPageHero
          badge="HERITAGE &amp; NIGHTLIFE VISION"
          title="Made in Malaysia. Designed for Today."
          subtitle="Celebrating Malaysia’s multicultural food heritage through modern presentation, wood-fired flames, soulful music, and a vibrant Bukit Bintang atmosphere."
        />

        {/* Section 1: The Brand Story & Inspiration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.20em] text-[#20E3D2] block font-mono">
              CULINARY STORY
            </span>
            <h2 className="text-3xl sm:text-4xl un-font-display font-bold text-white leading-tight">
              Honouring Heritage Roots with Modern Culinary Fire
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              Malaysia is blessed with one of the most vibrant, multifaceted culinary traditions on the planet. For generations, Malay, Chinese, Indian, Peranakan, and indigenous Bornean cooking techniques have intermingled, giving rise to unforgettable flavour depths.
            </p>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              At Q-RESTOBAR, we set out to honour these iconic flavours while stripping away formality. Our kitchen champions artisanal charcoal grilling, whole-spice rempahs ground daily by hand, and cold-pressed tropical aromatics such as wild ginger flower (bunga kantan) and Sarawak peppercorns.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-lg overflow-hidden border border-[#20E3D2]/40 shadow-[0_0_30px_rgba(32,227,210,0.2)]">
            <img
              src="/images/7c8ae1ad-de1e-4176-ab36-b029628d76f1.png"
              alt="Culinary Atmosphere at Botanical Bistro Q-RESTOBAR"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

        {/* Section 2: 4 Pillars of Q-RESTOBAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg shadow-md space-y-3">
            <UtensilsCrossed className="w-6 h-6 text-[#20E3D2]" />
            <h3 className="text-lg un-font-display font-bold text-white">Chef Philosophy</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Every plate strikes a balance between deeply satisfying comfort and refined contemporary aesthetic precision.
            </p>
          </div>

          <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg shadow-md space-y-3">
            <Wine className="w-6 h-6 text-[#20E3D2]" />
            <h3 className="text-lg un-font-display font-bold text-white">Craft Mixology</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Cocktails and zero-proof coolers infused with fresh pandan, calamansi lime, and indigenous highland herbs.
            </p>
          </div>

          <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg shadow-md space-y-3">
            <Music className="w-6 h-6 text-[#EC4899]" />
            <h3 className="text-lg un-font-display font-bold text-white">Nightlife &amp; Sound</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              A carefully curated acoustic landscape transitioning from laid-back dinner jazz to late-night melodic house vinyl.
            </p>
          </div>

          <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg shadow-md space-y-3">
            <Users className="w-6 h-6 text-[#20E3D2]" />
            <h3 className="text-lg un-font-display font-bold text-white">Private Dining</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Bespoke suites equipped with multimedia capabilities, tailored menus, and dedicated hosting for VIP occasions.
            </p>
          </div>
        </div>

        {/* Section 3: Interactive Atmosphere & Photo Gallery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl un-font-display font-bold text-white">
              The Urban Nightlife Atmosphere
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Filter through moments of dining, mixology cocktails, evening atmosphere, and weekend sessions in Bukit Bintang. Click any photo to view in full lightbox.
            </p>
          </div>

          <InteractiveGallery />
        </div>

        {/* CTA Section */}
        <div className="bg-[#131B2E] border border-[#20E3D2]/40 p-8 sm:p-12 rounded-lg text-center space-y-4 shadow-[0_0_30px_rgba(32,227,210,0.15)]">
          <h2 className="text-2xl sm:text-3xl un-font-display font-bold text-white">
            Come Experience the Flavours for Yourself
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto leading-relaxed">
            Reserve your table for lunch, dinner, or evening drinks in the heart of Kuala Lumpur.
          </p>
          <div className="pt-2">
            <Link
              to={getThemedPath('/reservations')}
              className="un-btn-cyan px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 min-h-[44px]"
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

export default UrbanNeonAbout;
