import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Share2, ArrowRight } from 'lucide-react';
import { Promotion } from '../../types/promotion';

interface OfferCardProps {
  promo: Promotion;
  onViewDetails: (promo: Promotion) => void;
  onShareWhatsApp: (promo: Promotion) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  promo,
  onViewDetails,
  onShareWhatsApp
}) => {
  return (
    <div className="luxury-card-glow group overflow-hidden flex flex-col justify-between border border-border-base hover:border-purple-600/50 rounded-sm transition-all duration-300 shadow-2xl h-full">
      {/* Poster Image Container */}
      <div className="offer-media-container">
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="offer-media-image group-hover:scale-105 transition-transform duration-700 brightness-90"
          style={{ objectPosition: promo.imagePosition || 'center' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

        {/* Badge & Schedule Overlays */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-qc-surface/90 text-qc-secondary border border-purple-600/40 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-md backdrop-blur-sm">
            {promo.badge}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2 text-xs text-qc-primary bg-qc-surface/80 px-3 py-1.5 rounded-sm border border-border-strong/80 backdrop-blur-sm">
          <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
          <span className="truncate font-medium">{promo.schedule}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-display font-bold text-qc-primary group-hover:text-qc-secondary transition-colors mb-2">
            {promo.title}
          </h3>
          <p className="text-xs text-qc-body font-light leading-relaxed mb-3">
            {promo.tagline}
          </p>

          {promo.pricingHighlights && (
            <div className="inline-block px-2.5 py-1 bg-qc-base border border-border-strong rounded text-[11px] text-qc-secondary font-medium mb-3">
              {promo.pricingHighlights}
            </div>
          )}

          <p className="text-xs text-qc-body/90 font-light leading-relaxed line-clamp-3">
            {promo.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border-base/80 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => onViewDetails(promo)}
              className="text-xs text-purple-500 hover:text-qc-secondary font-semibold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>View Full Terms</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => onShareWhatsApp(promo)}
              className="text-qc-body hover:text-emerald-400 p-1.5 transition-colors"
              title="Share event to WhatsApp"
              aria-label="Share to WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/reservations"
            className="btn-gold w-full py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{promo.ctaText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
