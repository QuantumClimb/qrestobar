import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Share2, ArrowRight, CheckCircle2, PartyPopper, Phone } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { Promotion } from '../../../types/promotion';
import { useToast } from '../../../context/ToastContext';
import { Modal } from '../../../components/common/Modal';
import { MidnightEmberPageHero } from './MidnightEmberPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';

export const MidnightEmberOffers: React.FC = () => {
  const { promotions } = useData();
  const { showToast } = useToast();
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  const activePromos = promotions.filter(p => p.isActive);

  const handleShareWhatsApp = (promo: Promotion) => {
    const text = encodeURIComponent(
      `Check out this experience at Q-RESTOBAR: ${promo.title} - ${promo.tagline}. Schedule: ${promo.schedule}. View full details at https://q-restobar.com/offers`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast({
      type: 'info',
      title: 'WhatsApp Share Triggered',
      message: 'Opening WhatsApp to share event details.'
    });
  };

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'midnight-ember');

  return (
    <div className="min-h-screen bg-[#101010] text-[#F5EFE6] py-12 sm:py-16 selection:bg-[#D8662C]/30 selection:text-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <MidnightEmberPageHero
          badge="Q - RESTOBAR · TASTING EVENTS & HAPPENINGS"
          title="Offers & Events"
          subtitle="Exclusive flavours, memorable nights and reasons to stay longer. From curated ladies night cocktails to Saturday vinyl sessions and bespoke degustation dinners."
        />

        {/* Promotions Grid or Empty State */}
        {activePromos.length === 0 ? (
          <div className="py-24 text-center bg-[#14110F] border border-[#D8AA5B]/25 rounded-sm p-8 space-y-4 max-w-xl mx-auto">
            <Sparkles className="w-10 h-10 text-[#D8662C] opacity-60 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#F5EFE6]">
              No Active Promotions At This Moment
            </h3>
            <p className="text-xs sm:text-sm text-[#CFC3B5] font-light leading-relaxed">
              Check back soon for upcoming culinary masterclasses, seasonal tasting menus, and guest bartender takeovers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromos.map((promo) => (
              <div
                key={promo.id}
                className="me-card flex flex-col justify-between overflow-hidden group shadow-2xl h-full relative"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#101010]">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    style={{ objectPosition: promo.imagePosition || 'center' }}
                    loading="lazy"
                  />
                  
                  {/* Subtle Ember Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent opacity-90" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-[#101010]/90 text-[#D8AA5B] border border-[#D8AA5B]/40 text-[10px] font-bold uppercase tracking-wider rounded-xs shadow-md backdrop-blur-sm">
                      {promo.badge}
                    </span>
                  </div>

                  {/* Schedule Bar */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 text-xs text-[#F5EFE6] bg-[#14110F]/85 px-3 py-1.5 rounded-xs border border-[#D8AA5B]/25 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-[#D8662C] shrink-0" />
                    <span className="truncate text-[11px] font-mono tracking-wide">{promo.schedule}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F5EFE6] group-hover:text-[#D8AA5B] transition-colors leading-snug mb-2">
                      {promo.title}
                    </h3>

                    <p className="text-xs text-[#D8AA5B] font-medium tracking-wide mb-2">
                      {promo.tagline}
                    </p>

                    {promo.pricingHighlights && (
                      <div className="inline-block px-2.5 py-1 bg-[#101010] border border-[#D8AA5B]/30 rounded-xs text-[11px] text-[#F5EFE6] font-mono font-semibold mb-3">
                        {promo.pricingHighlights}
                      </div>
                    )}

                    <p className="text-xs text-[#CFC3B5] font-light leading-relaxed line-clamp-3">
                      {promo.description}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-[#D8AA5B]/20 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedPromo(promo)}
                        className="text-xs text-[#D8AA5B] hover:text-[#E47B3D] font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Full Terms</span>
                        <ArrowRight className="w-3 h-3 text-[#D8662C]" />
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(promo)}
                        className="text-[#94877A] hover:text-[#34D399] p-1.5 transition-colors"
                        title="Share event to WhatsApp"
                        aria-label="Share to WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      to={getThemedPath('/reservations')}
                      className="me-btn-primary w-full py-3 text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{promo.ctaText || 'Reserve for Event'}</span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Private Events Banner Callout */}
        <div className="bg-gradient-to-r from-[#1A1613] via-[#211A15] to-[#1A1613] border border-[#D8AA5B]/35 p-8 sm:p-12 rounded-sm text-center space-y-5 shadow-2xl relative overflow-hidden">
          <PartyPopper className="w-8 h-8 text-[#D8662C] mx-auto" />
          
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F5EFE6]">
            Hosting a Corporate Banquet or Private Celebration?
          </h2>

          <p className="text-xs sm:text-sm text-[#CFC3B5] font-light max-w-xl mx-auto leading-relaxed">
            Our events team crafts custom tasting menus, private sommelier sessions, and bespoke setups tailored to your company or personal milestone.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="me-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table for Your Party</span>
            </Link>

            <Link
              to={getThemedPath('/contact')}
              className="me-btn-outline px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D8AA5B]" />
              <span>Contact Private Events Team</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Offer Detail Modal */}
      {selectedPromo && (
        <Modal
          isOpen={Boolean(selectedPromo)}
          onClose={() => setSelectedPromo(null)}
          title={selectedPromo.title}
          subtitle={selectedPromo.schedule}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs text-[#F5EFE6]">
            {/* Poster banner */}
            <div className="rounded-xs overflow-hidden aspect-video border border-[#D8AA5B]/30 relative">
              <img
                src={selectedPromo.imageUrl}
                alt={selectedPromo.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: selectedPromo.imagePosition || 'center' }}
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-[#101010]/90 text-[#D8AA5B] border border-[#D8AA5B]/40 text-xs font-bold uppercase tracking-wider rounded-xs shadow-md">
                  {selectedPromo.badge}
                </span>
              </div>
              {selectedPromo.pricingHighlights && (
                <div className="absolute bottom-3 left-3 bg-[#101010]/95 border border-[#D8AA5B]/40 px-3 py-1.5 text-xs text-[#F5EFE6] font-mono font-semibold uppercase tracking-wider rounded-xs backdrop-blur-sm">
                  {selectedPromo.pricingHighlights}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-serif font-bold text-[#D8AA5B] mb-1">
                {selectedPromo.tagline}
              </h4>
              <p className="text-xs text-[#CFC3B5] font-light leading-relaxed">
                {selectedPromo.description}
              </p>
            </div>

            {/* Terms list */}
            {selectedPromo.terms && selectedPromo.terms.length > 0 && (
              <div className="p-4 bg-[#1A1613] border border-[#D8AA5B]/20 rounded-xs">
                <p className="text-xs font-mono uppercase tracking-wider text-[#D8AA5B] mb-2.5 flex items-center gap-2 font-bold">
                  <Clock className="w-4 h-4 text-[#D8662C]" />
                  <span>Event Schedule &amp; Conditions</span>
                </p>
                <ul className="space-y-2 text-xs text-[#CFC3B5]">
                  {selectedPromo.terms.map((term, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D8662C] shrink-0 mt-0.5" />
                      <span className="font-light">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#D8AA5B]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleShareWhatsApp(selectedPromo)}
                className="me-btn-outline w-full sm:w-auto text-xs px-4 py-2.5 flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Share to WhatsApp</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedPromo(null)}
                  className="me-btn-outline w-full sm:w-auto text-xs px-4 py-2.5"
                >
                  Close
                </button>
                <Link
                  to={getThemedPath('/reservations')}
                  className="me-btn-primary w-full sm:w-auto text-xs px-6 py-2.5 flex items-center justify-center gap-2 uppercase tracking-wider"
                  onClick={() => setSelectedPromo(null)}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPromo.ctaText || 'Book Table'}</span>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MidnightEmberOffers;
