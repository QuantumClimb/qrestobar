import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, UtensilsCrossed, Wine, Music, Users } from 'lucide-react';
import { InteractiveGallery } from '../../../components/common/InteractiveGallery';
import { BotanicalBistroPageHero } from './BotanicalBistroPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroAbout: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'botanical-bistro');

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] py-12 sm:py-16 selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero Header */}
        <BotanicalBistroPageHero
          badge="BOTANICAL BISTRO · HERITAGE & VISION"
          title="Made in Malaysia. Designed for Today."
          subtitle="Celebrating Malaysia’s multicultural food heritage through modern presentation, warm hospitality, soulful music, and a vibrant Bukit Bintang atmosphere."
        />

        {/* Section 1: The Brand Story & Inspiration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3F6B4F] block font-mono">
              Culinary Story
            </span>
            <h2 className="text-3xl sm:text-4xl bb-font-display font-bold text-[#24352A] leading-tight">
              Honouring Heritage Roots with Modern Culinary Fire
            </h2>
            <p className="text-sm sm:text-base text-[#5B7065] font-light leading-relaxed">
              Malaysia is blessed with one of the most vibrant, multifaceted culinary traditions on the planet. For generations, Malay, Chinese, Indian, Peranakan, and indigenous Bornean cooking techniques have intermingled, giving rise to unforgettable flavour depths.
            </p>
            <p className="text-sm text-[#5B7065] font-light leading-relaxed">
              At Q-RESTOBAR, we set out to honour these iconic flavours while stripping away formality. Our kitchen champions artisanal charcoal grilling, whole-spice rempahs ground daily by hand, and cold-pressed tropical aromatics such as wild ginger flower (bunga kantan) and Sarawak peppercorns.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-md overflow-hidden border border-[#3F6B4F]/25 shadow-xl">
            <img
              src="/images/7c8ae1ad-de1e-4176-ab36-b029628d76f1.png"
              alt="Culinary Atmosphere at Botanical Bistro Q-RESTOBAR"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

        {/* Section 2: 4 Pillars of Q-RESTOBAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-6 rounded-md shadow-md space-y-3">
            <UtensilsCrossed className="w-6 h-6 text-[#3F6B4F]" />
            <h3 className="text-lg bb-font-display font-bold text-[#24352A]">Chef Philosophy</h3>
            <p className="text-xs text-[#5B7065] font-light leading-relaxed">
              Every plate strikes a balance between deeply satisfying comfort and refined contemporary aesthetic precision.
            </p>
          </div>

          <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-6 rounded-md shadow-md space-y-3">
            <Wine className="w-6 h-6 text-[#3F6B4F]" />
            <h3 className="text-lg bb-font-display font-bold text-[#24352A]">Botanical Mixology</h3>
            <p className="text-xs text-[#5B7065] font-light leading-relaxed">
              Cocktails and zero-proof coolers infused with fresh pandan, calamansi lime, and indigenous highland herbs.
            </p>
          </div>

          <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-6 rounded-md shadow-md space-y-3">
            <Music className="w-6 h-6 text-[#3F6B4F]" />
            <h3 className="text-lg bb-font-display font-bold text-[#24352A]">Nightlife &amp; Sound</h3>
            <p className="text-xs text-[#5B7065] font-light leading-relaxed">
              A carefully curated acoustic landscape transitioning from laid-back dinner jazz to late-night melodic house vinyl.
            </p>
          </div>

          <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-6 rounded-md shadow-md space-y-3">
            <Users className="w-6 h-6 text-[#3F6B4F]" />
            <h3 className="text-lg bb-font-display font-bold text-[#24352A]">Private Dining</h3>
            <p className="text-xs text-[#5B7065] font-light leading-relaxed">
              Bespoke suites equipped with multimedia capabilities, tailored menus, and dedicated hosting for VIP occasions.
            </p>
          </div>
        </div>

        {/* Section 3: Interactive Atmosphere & Photo Gallery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl bb-font-display font-bold text-[#24352A]">
              The Botanical Bistro Atmosphere
            </h2>
            <p className="text-xs sm:text-sm text-[#5B7065] font-light">
              Filter through moments of dining, mixology cocktails, evening atmosphere, and weekend sessions in Bukit Bintang. Click any photo to view in full lightbox.
            </p>
          </div>

          <InteractiveGallery />
        </div>

        {/* CTA Section */}
        <div className="bg-[#FCFAF4] border border-[#3F6B4F]/25 p-8 sm:p-12 rounded-md text-center space-y-4 shadow-lg">
          <h2 className="text-2xl sm:text-3xl bb-font-display font-bold text-[#24352A]">
            Come Experience the Flavours for Yourself
          </h2>
          <p className="text-xs sm:text-sm text-[#5B7065] font-light max-w-md mx-auto leading-relaxed">
            Reserve your table for lunch, dinner, or evening drinks in the heart of Kuala Lumpur.
          </p>
          <div className="pt-2">
            <Link
              to={getThemedPath('/reservations')}
              className="bb-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 min-h-[44px]"
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

export default BotanicalBistroAbout;
