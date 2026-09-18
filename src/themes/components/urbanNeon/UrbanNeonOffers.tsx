import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Share2, ArrowRight, CheckCircle2, PartyPopper, Phone, X } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { Promotion } from '../../../types/promotion';
import { useToast } from '../../../context/ToastContext';
import { UrbanNeonPageHero } from './UrbanNeonPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/urbanNeon.css';

export const UrbanNeonOffers: React.FC = () => {
  const { promotions } = useData();
  const { showToast } = useToast();
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const activePromos = promotions.filter(p => p.isActive);

  const handleShareWhatsApp = (promo: Promotion) => {
    const text = encodeURIComponent(
      `Check out this offer at Q-RESTOBAR Urban Neon: ${promo.title} - ${promo.tagline}. Schedule: ${promo.schedule}. View full details at https://q-restobar.com/offers?siteThemePreview=urban-neon`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast({
      type: 'info',
      title: 'WhatsApp Share Triggered',
      message: 'Opening WhatsApp to share event details.'
    });
  };

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'urban-neon');

  const openModal = (promo: Promotion, triggerElement: HTMLElement | null) => {
    openerRef.current = triggerElement;
    setSelectedPromo(promo);
  };

  const closeModal = () => {
    setSelectedPromo(null);
    if (openerRef.current) {
      openerRef.current.focus();
    }
  };

  // Focus trap, Escape key, and body-scroll locking for modal
  useEffect(() => {
    if (!selectedPromo) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [selectedPromo]);

  return (
    <div className="min-h-screen bg-[#090B18] text-white py-12 sm:py-16 selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <UrbanNeonPageHero
          badge="NIGHTLIFE EVENTS &amp; PROMOTIONS"
          title="Promotions &amp; Live Events"
          subtitle="Explore special guest DJ lineups, happy hour cocktail specials, and exclusive Bukit Bintang nightlife events."
        />

        {/* Promotions Grid or Empty State */}
        {activePromos.length === 0 ? (
          <div className="py-24 text-center bg-[#131B2E] border border-[#20E3D2]/30 rounded-lg p-8 space-y-4 max-w-xl mx-auto shadow-xl">
            <Sparkles className="w-10 h-10 text-[#20E3D2] opacity-60 mx-auto" />
            <h3 className="un-font-display text-2xl font-bold text-white">
              No Active Promotions At This Moment
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Check back soon for upcoming DJ lineups, guest chef pop-ups, and cocktail masterclasses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromos.map((promo) => (
              <div
                key={promo.id}
                className="bg-[#131B2E] border border-[#20E3D2]/30 rounded-lg flex flex-col justify-between overflow-hidden group shadow-[0_0_20px_rgba(32,227,210,0.1)] h-full relative transition-all duration-300 hover:border-[#20E3D2] hover:shadow-[0_0_30px_rgba(32,227,210,0.25)]"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111827]">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: promo.imagePosition || 'center' }}
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131B2E] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  {promo.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="un-badge-cyan shadow-md">
                        {promo.badge}
                      </span>
                    </div>
                  )}

                  {/* Schedule Bar */}
                  {promo.schedule && (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 text-xs text-[#20E3D2] bg-[#090B18]/90 px-3 py-1.5 rounded border border-[#20E3D2]/30 backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-[#20E3D2] shrink-0" />
                      <span className="truncate text-[11px] font-mono tracking-wide">{promo.schedule}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="un-font-display text-xl font-bold text-white group-hover:text-[#20E3D2] transition-colors leading-snug mb-2">
                      {promo.title}
                    </h3>

                    {promo.tagline && (
                      <p className="text-xs text-[#EC4899] font-bold tracking-wide mb-2">
                        {promo.tagline}
                      </p>
                    )}

                    {promo.pricingHighlights && (
                      <div className="inline-block px-2.5 py-1 bg-[#111827] border border-[#20E3D2]/40 rounded text-[11px] text-[#20E3D2] font-mono font-bold mb-3">
                        {promo.pricingHighlights}
                      </div>
                    )}

                    {promo.description && (
                      <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                        {promo.description}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={(e) => openModal(promo, e.currentTarget)}
                        className="text-xs text-[#20E3D2] hover:text-white font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
                      >
                        <span>View Details &amp; Terms</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#20E3D2]" />
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(promo)}
                        className="text-gray-400 hover:text-[#20E3D2] p-2 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Share offer to WhatsApp"
                        aria-label="Share offer to WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      to={getThemedPath('/reservations')}
                      className="un-btn-cyan w-full py-3 text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 min-h-[44px]"
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
        <div className="bg-[#131B2E] border border-[#EC4899]/40 p-8 sm:p-12 rounded-lg text-center space-y-5 shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
          <PartyPopper className="w-8 h-8 text-[#EC4899] mx-auto" />
          
          <h2 className="un-font-display text-2xl sm:text-4xl font-bold text-white">
            Hosting a Corporate Banquet or Private VIP Celebration?
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Our events team crafts custom tasting menus, private DJ sound setups, and bespoke VIP lounge spaces tailored to your milestone.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="un-btn-magenta px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table for Your Party</span>
            </Link>

            <Link
              to={getThemedPath('/contact')}
              className="un-btn-outline px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#20E3D2]" />
              <span>Contact Private Events Team</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Offer Detail Modal */}
      {selectedPromo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="urban-offer-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl my-8 bg-[#131B2E] border-2 border-[#20E3D2]/50 rounded-lg shadow-[0_0_40px_rgba(32,227,210,0.3)] z-10 overflow-hidden transform transition-all animate-scale-up text-white"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-gray-300 hover:text-white p-2 bg-[#111827] rounded-full border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#20E3D2] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close offer details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster banner */}
            <div className="relative aspect-video overflow-hidden bg-[#111827] border-b border-white/10">
              <img
                src={selectedPromo.imageUrl}
                alt={selectedPromo.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: selectedPromo.imagePosition || 'center' }}
              />
              {selectedPromo.badge && (
                <div className="absolute top-3 left-3">
                  <span className="un-badge-cyan">
                    {selectedPromo.badge}
                  </span>
                </div>
              )}
              {selectedPromo.pricingHighlights && (
                <div className="absolute bottom-3 left-3 bg-[#090B18]/90 border border-[#20E3D2]/40 px-3 py-1.5 text-xs text-[#20E3D2] font-mono font-bold uppercase tracking-wider rounded backdrop-blur-sm">
                  {selectedPromo.pricingHighlights}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 id="urban-offer-title" className="un-font-display text-2xl sm:text-3xl font-bold text-white">
                  {selectedPromo.title}
                </h3>
                {selectedPromo.tagline && (
                  <h4 className="text-sm font-bold text-[#EC4899] mt-1">
                    {selectedPromo.tagline}
                  </h4>
                )}
                {selectedPromo.description && (
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mt-2">
                    {selectedPromo.description}
                  </p>
                )}
              </div>

              {/* Terms list */}
              {selectedPromo.terms && selectedPromo.terms.length > 0 && (
                <div className="p-4 bg-[#111827] border border-[#20E3D2]/30 rounded space-y-2.5">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#20E3D2] flex items-center gap-2 font-bold">
                    <Clock className="w-4 h-4 text-[#20E3D2]" />
                    <span>Event Schedule &amp; Conditions</span>
                  </p>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {selectedPromo.terms.map((term, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#20E3D2] shrink-0 mt-0.5" />
                        <span className="font-light">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => handleShareWhatsApp(selectedPromo)}
                  className="un-btn-outline w-full sm:w-auto text-xs px-4 py-2.5 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#20E3D2]" />
                  <span>Share to WhatsApp</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeModal}
                    className="un-btn-outline w-full sm:w-auto text-xs px-5 py-2.5 min-h-[44px]"
                  >
                    Close
                  </button>
                  <Link
                    to={getThemedPath('/reservations')}
                    className="un-btn-cyan w-full sm:w-auto text-xs px-6 py-2.5 flex items-center justify-center gap-2 uppercase tracking-wider min-h-[44px]"
                    onClick={closeModal}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedPromo.ctaText || 'Book Table'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrbanNeonOffers;
