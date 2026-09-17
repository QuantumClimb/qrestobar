import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Share2, ArrowRight, CheckCircle2, PartyPopper, Phone, X } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { Promotion } from '../../../types/promotion';
import { useToast } from '../../../context/ToastContext';
import { BotanicalBistroPageHero } from './BotanicalBistroPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroOffers: React.FC = () => {
  const { promotions } = useData();
  const { showToast } = useToast();
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const activePromos = promotions.filter(p => p.isActive);

  const handleShareWhatsApp = (promo: Promotion) => {
    const text = encodeURIComponent(
      `Check out this offer at Botanical Bistro: ${promo.title} - ${promo.tagline}. Schedule: ${promo.schedule}. View full details at https://q-restobar.com/offers?siteThemePreview=botanical-bistro`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast({
      type: 'info',
      title: 'WhatsApp Share Triggered',
      message: 'Opening WhatsApp to share event details.'
    });
  };

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'botanical-bistro');

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
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] py-12 sm:py-16 selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <BotanicalBistroPageHero
          badge="BOTANICAL BISTRO · SPECIAL EVENTS & OFFERS"
          title="Promotions &amp; Garden Happenings"
          subtitle="Discover curated culinary celebrations, organic pairing events, and exclusive seasonal promotions in the heart of Bukit Bintang."
        />

        {/* Promotions Grid or Empty State */}
        {activePromos.length === 0 ? (
          <div className="py-24 text-center bg-[#FCFAF4] border border-[#3F6B4F]/25 rounded-md p-8 space-y-4 max-w-xl mx-auto shadow-md">
            <Sparkles className="w-10 h-10 text-[#3F6B4F] opacity-60 mx-auto" />
            <h3 className="bb-font-display text-2xl font-bold text-[#24352A]">
              No Active Promotions At This Moment
            </h3>
            <p className="text-xs sm:text-sm text-[#5B7065] font-light leading-relaxed">
              Check back soon for upcoming botanical mixology masterclasses, seasonal herb tasting menus, and guest chef takeovers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromos.map((promo) => (
              <div
                key={promo.id}
                className="bg-[#FCFAF4] border border-[#3F6B4F]/25 rounded-md flex flex-col justify-between overflow-hidden group shadow-md h-full relative transition-all duration-300 hover:border-[#3F6B4F] hover:shadow-xl"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E3D6]">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: promo.imagePosition || 'center' }}
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF4] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  {promo.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-[#FCFAF4]/95 text-[#3F6B4F] border border-[#3F6B4F]/40 text-[10px] font-bold uppercase tracking-wider rounded-xs shadow-sm backdrop-blur-sm">
                        {promo.badge}
                      </span>
                    </div>
                  )}

                  {/* Schedule Bar */}
                  {promo.schedule && (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 text-xs text-[#24352A] bg-[#FCFAF4]/95 px-3 py-1.5 rounded-xs border border-[#3F6B4F]/25 backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-[#3F6B4F] shrink-0" />
                      <span className="truncate text-[11px] font-mono tracking-wide">{promo.schedule}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="bb-font-display text-xl font-bold text-[#24352A] group-hover:text-[#3F6B4F] transition-colors leading-snug mb-2">
                      {promo.title}
                    </h3>

                    {promo.tagline && (
                      <p className="text-xs text-[#3F6B4F] font-semibold tracking-wide mb-2">
                        {promo.tagline}
                      </p>
                    )}

                    {promo.pricingHighlights && (
                      <div className="inline-block px-2.5 py-1 bg-[#F4F1E8] border border-[#3F6B4F]/30 rounded-xs text-[11px] text-[#24352A] font-mono font-semibold mb-3">
                        {promo.pricingHighlights}
                      </div>
                    )}

                    {promo.description && (
                      <p className="text-xs text-[#5B7065] font-light leading-relaxed line-clamp-3">
                        {promo.description}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-[#3F6B4F]/15 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={(e) => openModal(promo, e.currentTarget)}
                        className="text-xs text-[#3F6B4F] hover:text-[#2F533C] font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
                      >
                        <span>View Details &amp; Terms</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#3F6B4F]" />
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(promo)}
                        className="text-[#5B7065] hover:text-[#2F533C] p-2 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Share offer to WhatsApp"
                        aria-label="Share offer to WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      to={getThemedPath('/reservations')}
                      className="bb-btn-primary w-full py-3 text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 min-h-[44px]"
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
        <div className="bg-[#FCFAF4] border border-[#3F6B4F]/30 p-8 sm:p-12 rounded-md text-center space-y-5 shadow-lg relative overflow-hidden">
          <PartyPopper className="w-8 h-8 text-[#B86B45] mx-auto" />
          
          <h2 className="bb-font-display text-2xl sm:text-4xl font-bold text-[#24352A]">
            Hosting a Corporate Banquet or Private Celebration?
          </h2>

          <p className="text-xs sm:text-sm text-[#5B7065] font-light max-w-xl mx-auto leading-relaxed">
            Our garden events team crafts custom tasting menus, private sommelier sessions, and bespoke setups tailored to your company or personal milestone.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getThemedPath('/reservations')}
              className="bb-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table for Your Party</span>
            </Link>

            <Link
              to={getThemedPath('/contact')}
              className="bb-btn-outline px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#3F6B4F]" />
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
          aria-labelledby="botanical-offer-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl my-8 bg-[#FCFAF4] border-2 border-[#3F6B4F]/40 rounded-md shadow-2xl z-10 overflow-hidden transform transition-all animate-slide-up text-[#24352A]"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-[#5B7065] hover:text-[#24352A] p-2 bg-[#F4F1E8] rounded-full border border-[#3F6B4F]/30 hover:border-[#3F6B4F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3F6B4F] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close offer details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster banner */}
            <div className="relative aspect-video overflow-hidden bg-[#E7E3D6] border-b border-[#3F6B4F]/20">
              <img
                src={selectedPromo.imageUrl}
                alt={selectedPromo.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: selectedPromo.imagePosition || 'center' }}
              />
              {selectedPromo.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[#FCFAF4]/95 text-[#3F6B4F] border border-[#3F6B4F]/40 text-xs font-bold uppercase tracking-wider rounded-xs shadow-sm">
                    {selectedPromo.badge}
                  </span>
                </div>
              )}
              {selectedPromo.pricingHighlights && (
                <div className="absolute bottom-3 left-3 bg-[#FCFAF4]/95 border border-[#3F6B4F]/40 px-3 py-1.5 text-xs text-[#24352A] font-mono font-semibold uppercase tracking-wider rounded-xs backdrop-blur-sm">
                  {selectedPromo.pricingHighlights}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 id="botanical-offer-title" className="bb-font-display text-2xl sm:text-3xl font-bold text-[#24352A]">
                  {selectedPromo.title}
                </h3>
                {selectedPromo.tagline && (
                  <h4 className="text-sm font-semibold text-[#3F6B4F] mt-1">
                    {selectedPromo.tagline}
                  </h4>
                )}
                {selectedPromo.description && (
                  <p className="text-xs sm:text-sm text-[#5B7065] font-light leading-relaxed mt-2">
                    {selectedPromo.description}
                  </p>
                )}
              </div>

              {/* Terms list */}
              {selectedPromo.terms && selectedPromo.terms.length > 0 && (
                <div className="p-4 bg-[#F4F1E8] border border-[#3F6B4F]/20 rounded-md space-y-2.5">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#3F6B4F] flex items-center gap-2 font-bold">
                    <Clock className="w-4 h-4 text-[#3F6B4F]" />
                    <span>Event Schedule &amp; Conditions</span>
                  </p>
                  <ul className="space-y-2 text-xs text-[#5B7065]">
                    {selectedPromo.terms.map((term, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3F6B4F] shrink-0 mt-0.5" />
                        <span className="font-light text-[#24352A]/90">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#3F6B4F]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => handleShareWhatsApp(selectedPromo)}
                  className="bb-btn-outline w-full sm:w-auto text-xs px-4 py-2.5 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#3F6B4F]" />
                  <span>Share to WhatsApp</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeModal}
                    className="bb-btn-outline w-full sm:w-auto text-xs px-5 py-2.5 min-h-[44px]"
                  >
                    Close
                  </button>
                  <Link
                    to={getThemedPath('/reservations')}
                    className="bb-btn-primary w-full sm:w-auto text-xs px-6 py-2.5 flex items-center justify-center gap-2 uppercase tracking-wider min-h-[44px]"
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

export default BotanicalBistroOffers;
