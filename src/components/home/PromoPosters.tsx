import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Modal } from '../common/Modal';
import { Promotion } from '../../types/promotion';
import { useToast } from '../../context/ToastContext';

export const PromoPosters: React.FC = () => {
  const { promotions } = useData();
  const { showToast } = useToast();
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  // Take first 3 active promotions for homepage highlight
  const activePromos = promotions.filter(p => p.isActive).slice(0, 3);

  const handleShareWhatsApp = (promo: Promotion) => {
    const text = encodeURIComponent(
      `Check out this offer at Q-RESTOBAR: ${promo.title} - ${promo.tagline}. Schedule: ${promo.schedule}. View more at https://q-restobar.com/offers`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast({
      type: 'info',
      title: 'WhatsApp Share',
      message: 'Opening WhatsApp to share promotion.'
    });
  };

  return (
    <section className="py-20 lg:py-28 bg-qc-base text-qc-primary border-t border-border-base relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Happenings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary">
              Promotions &amp; Live Events
            </h2>
            <p className="text-sm text-qc-body font-light leading-relaxed">
              Curated dining rituals, guest DJ sets, and mid-week celebrations in Bukit Bintang.
            </p>
          </div>

          <Link
            to="/offers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-500 hover:text-qc-secondary transition-colors group"
          >
            <span>View All 6 Special Offers</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activePromos.map((promo) => (
            <div
              key={promo.id}
              className="luxury-card-glow group overflow-hidden flex flex-col justify-between border border-border-base hover:border-purple-600/50 rounded-sm transition-all duration-300 shadow-xl"
            >
              {/* Poster Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-qc-base">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-qc-surface/90 text-qc-secondary border border-purple-600/40 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-md backdrop-blur-sm">
                    {promo.badge}
                  </span>
                </div>

                {/* Schedule Tag */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2 text-xs text-qc-primary bg-qc-surface/80 px-3 py-1.5 rounded-sm border border-border-strong/80 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="truncate font-medium">{promo.schedule}</span>
                </div>
              </div>

              {/* Poster Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-qc-primary group-hover:text-qc-secondary transition-colors mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-qc-body font-light leading-relaxed line-clamp-2">
                    {promo.tagline}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-border-base/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedPromo(promo)}
                    className="text-xs text-purple-500 hover:text-qc-secondary font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <Link
                    to="/reservations"
                    className="btn-gold text-[11px] px-4 py-2 font-bold uppercase tracking-wider"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Poster Modal */}
      {selectedPromo && (
        <Modal
          isOpen={Boolean(selectedPromo)}
          onClose={() => setSelectedPromo(null)}
          title={selectedPromo.title}
          subtitle={selectedPromo.schedule}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <div className="h-64 sm:h-72 rounded-sm overflow-hidden border border-border-base relative">
              <img
                src={selectedPromo.imageUrl}
                alt={selectedPromo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-qc-surface/90 border border-purple-600/40 px-3 py-1 text-xs text-qc-secondary font-semibold uppercase tracking-wider rounded-sm">
                {selectedPromo.pricingHighlights || 'Exclusive Dining Experience'}
              </div>
            </div>

            <div>
              <h4 className="text-base font-display font-bold text-qc-primary mb-2">
                {selectedPromo.tagline}
              </h4>
              <p className="text-sm text-qc-body font-light leading-relaxed">
                {selectedPromo.description}
              </p>
            </div>

            {selectedPromo.terms && selectedPromo.terms.length > 0 && (
              <div className="p-4 bg-qc-base border border-border-base rounded-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-500 mb-2">
                  Event Highlights &amp; Terms:
                </p>
                <ul className="space-y-1.5 text-xs text-qc-body">
                  {selectedPromo.terms.map((term, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-border-base flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleShareWhatsApp(selectedPromo)}
                className="btn-gold-outline w-full sm:w-auto text-xs px-4 py-2.5 flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share to WhatsApp</span>
              </button>

              <Link
                to="/reservations"
                className="btn-gold w-full sm:w-auto text-xs px-6 py-2.5 flex items-center justify-center gap-2"
                onClick={() => setSelectedPromo(null)}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedPromo.ctaText || 'Reserve a Table'}</span>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
