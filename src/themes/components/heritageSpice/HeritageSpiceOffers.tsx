import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Share2, ArrowRight, CheckCircle2, PartyPopper, Phone, X } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { Promotion } from '../../../types/promotion';
import { useToast } from '../../../context/ToastContext';
import { HeritageSpicePageHero } from './HeritageSpicePageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceOffers: React.FC = () => {
  const { promotions } = useData();
  const { showToast } = useToast();
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

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

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

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

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Initial focus placement
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Keyboard handlers: Escape to close, Tab / Shift+Tab to trap focus
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
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] py-12 sm:py-16 selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <HeritageSpicePageHero
          badge="Q-RESTOBAR · SPECIAL EVENTS & HAPPENINGS"
          title="Offers & Special Happenings"
          subtitle="Discover curated culinary celebrations, chef's tasting events, and exclusive seasonal promotions in the heart of Bukit Bintang."
        />

        {/* Promotions Grid or Empty State */}
        {activePromos.length === 0 ? (
          <div className="py-24 text-center bg-[#371018] border border-[#C69A4B]/30 rounded-sm p-8 space-y-4 max-w-xl mx-auto shadow-xl">
            <Sparkles className="w-10 h-10 text-[#E89532] opacity-60 mx-auto" />
            <h3 className="hs-font-display text-2xl font-bold text-[#FFF4DF]">
              No Active Promotions At This Moment
            </h3>
            <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light leading-relaxed">
              Check back soon for upcoming culinary masterclasses, seasonal tasting menus, and guest chef takeovers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromos.map((promo) => (
              <div
                key={promo.id}
                className="bg-[#371018] border border-[#C69A4B]/35 rounded-sm flex flex-col justify-between overflow-hidden group shadow-2xl h-full relative transition-all duration-300 hover:border-[#C69A4B]"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#2B080E]">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    style={{ objectPosition: promo.imagePosition || 'center' }}
                    loading="lazy"
                  />
                  
                  {/* Subtle Maroon Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#371018] via-transparent to-transparent opacity-90" />

                  {/* Badge */}
                  {promo.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-[#2B080E]/90 text-[#C69A4B] border border-[#C69A4B]/40 text-[10px] font-bold uppercase tracking-wider rounded-xs shadow-md backdrop-blur-sm">
                        {promo.badge}
                      </span>
                    </div>
                  )}

                  {/* Schedule Bar */}
                  {promo.schedule && (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 text-xs text-[#FFF4DF] bg-[#2B080E]/90 px-3 py-1.5 rounded-xs border border-[#C69A4B]/30 backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-[#E89532] shrink-0" />
                      <span className="truncate text-[11px] font-mono tracking-wide">{promo.schedule}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="hs-font-display text-xl font-bold text-[#FFF4DF] group-hover:text-[#C69A4B] transition-colors leading-snug mb-2">
                      {promo.title}
                    </h3>

                    {promo.tagline && (
                      <p className="text-xs text-[#C69A4B] font-medium tracking-wide mb-2">
                        {promo.tagline}
                      </p>
                    )}

                    {promo.pricingHighlights && (
                      <div className="inline-block px-2.5 py-1 bg-[#2B080E] border border-[#C69A4B]/40 rounded-xs text-[11px] text-[#FFF4DF] font-mono font-semibold mb-3">
                        {promo.pricingHighlights}
                      </div>
                    )}

                    {promo.description && (
                      <p className="text-xs text-[#F8EAD2]/80 font-light leading-relaxed line-clamp-3">
                        {promo.description}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-[#C69A4B]/20 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={(e) => openModal(promo, e.currentTarget)}
                        className="text-xs text-[#C69A4B] hover:text-[#E89532] font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>View Full Terms</span>
                        <ArrowRight className="w-3 h-3 text-[#E89532]" />
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(promo)}
                        className="text-[#C2AFA6] hover:text-[#34D399] p-1.5 transition-colors cursor-pointer"
                        title="Share offer to WhatsApp"
                        aria-label="Share offer to WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      to={getThemedPath('/reservations')}
                      className="hs-btn-primary w-full py-3 text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2"
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
        <div className="bg-gradient-to-r from-[#371018] via-[#4A0E18] to-[#371018] border border-[#C69A4B]/40 p-8 sm:p-12 rounded-sm text-center space-y-5 shadow-2xl relative overflow-hidden">
          <PartyPopper className="w-8 h-8 text-[#E89532] mx-auto" />
          
          <h2 className="hs-font-display text-2xl sm:text-4xl font-bold text-[#FFF4DF]">
            Hosting a Corporate Banquet or Private Celebration?
          </h2>

          <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light max-w-xl mx-auto leading-relaxed">
            Our events team crafts custom tasting menus, private sommelier sessions, and bespoke setups tailored to your company or personal milestone.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="hs-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table for Your Party</span>
            </Link>

            <Link
              to={getThemedPath('/contact')}
              className="hs-btn-outline px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C69A4B]" />
              <span>Contact Private Events Team</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Offer Detail Modal with Full Focus Containment */}
      {selectedPromo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="heritage-offer-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl my-8 bg-[#371018] border-2 border-[#C69A4B]/50 rounded-sm shadow-2xl z-10 overflow-hidden transform transition-all animate-slide-up text-[#FFF4DF]"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-[#C2AFA6] hover:text-[#FFF4DF] p-1.5 bg-[#2B080E]/80 rounded-full border border-[#C69A4B]/30 hover:border-[#C69A4B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C69A4B]"
              aria-label="Close offer details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster banner */}
            <div className="relative aspect-video overflow-hidden bg-[#2B080E] border-b border-[#C69A4B]/30">
              <img
                src={selectedPromo.imageUrl}
                alt={selectedPromo.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: selectedPromo.imagePosition || 'center' }}
              />
              {selectedPromo.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[#2B080E]/90 text-[#C69A4B] border border-[#C69A4B]/40 text-xs font-bold uppercase tracking-wider rounded-xs shadow-md">
                    {selectedPromo.badge}
                  </span>
                </div>
              )}
              {selectedPromo.pricingHighlights && (
                <div className="absolute bottom-3 left-3 bg-[#2B080E]/95 border border-[#C69A4B]/40 px-3 py-1.5 text-xs text-[#FFF4DF] font-mono font-semibold uppercase tracking-wider rounded-xs backdrop-blur-sm">
                  {selectedPromo.pricingHighlights}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 id="heritage-offer-title" className="hs-font-display text-2xl sm:text-3xl font-bold text-[#FFF4DF]">
                  {selectedPromo.title}
                </h3>
                {selectedPromo.tagline && (
                  <h4 className="text-sm hs-font-display font-bold text-[#C69A4B] mt-1">
                    {selectedPromo.tagline}
                  </h4>
                )}
                {selectedPromo.description && (
                  <p className="text-xs sm:text-sm text-[#F8EAD2]/85 font-light leading-relaxed mt-2">
                    {selectedPromo.description}
                  </p>
                )}
              </div>

              {/* Terms list */}
              {selectedPromo.terms && selectedPromo.terms.length > 0 && (
                <div className="p-4 bg-[#2B080E] border border-[#C69A4B]/25 rounded-xs space-y-2.5">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#C69A4B] flex items-center gap-2 font-bold">
                    <Clock className="w-4 h-4 text-[#E89532]" />
                    <span>Event Schedule &amp; Conditions</span>
                  </p>
                  <ul className="space-y-2 text-xs text-[#F8EAD2]/80">
                    {selectedPromo.terms.map((term, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E89532] shrink-0 mt-0.5" />
                        <span className="font-light">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#C69A4B]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => handleShareWhatsApp(selectedPromo)}
                  className="hs-btn-outline w-full sm:w-auto text-xs px-4 py-2.5 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Share to WhatsApp</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeModal}
                    className="hs-btn-outline w-full sm:w-auto text-xs px-5 py-2.5"
                  >
                    Close
                  </button>
                  <Link
                    to={getThemedPath('/reservations')}
                    className="hs-btn-primary w-full sm:w-auto text-xs px-6 py-2.5 flex items-center justify-center gap-2 uppercase tracking-wider"
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

export default HeritageSpiceOffers;
