import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, Share2 } from 'lucide-react';
import { Promotion } from '../../types/promotion';
import { Modal } from '../common/Modal';

interface OfferModalProps {
  promo: Promotion | null;
  onClose: () => void;
  onShareWhatsApp: (promo: Promotion) => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  promo,
  onClose,
  onShareWhatsApp
}) => {
  if (!promo) return null;

  return (
    <Modal
      isOpen={Boolean(promo)}
      onClose={onClose}
      title={promo.title}
      subtitle={promo.schedule}
      maxWidth="2xl"
    >
      <div className="space-y-5">
        <div className="offer-media-container rounded-sm border border-border-base">
          <img
            src={promo.imageUrl}
            alt={promo.title}
            className="offer-media-image"
            style={{ objectPosition: promo.imagePosition || 'center' }}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-qc-surface text-qc-secondary border border-purple-600/40 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
              {promo.badge}
            </span>
          </div>
          {promo.pricingHighlights && (
            <div className="absolute bottom-4 left-4 bg-qc-base/90 border border-purple-600/40 px-3 py-1.5 text-xs text-qc-secondary font-semibold uppercase tracking-wider rounded-sm backdrop-blur-sm">
              {promo.pricingHighlights}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-base font-display font-bold text-qc-primary mb-2">
            {promo.tagline}
          </h4>
          <p className="text-sm text-qc-body font-light leading-relaxed">
            {promo.description}
          </p>
        </div>

        <div className="p-4 bg-qc-base border border-border-base rounded-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-500 mb-2.5 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Event Schedule &amp; Conditions</span>
          </p>
          <ul className="space-y-2 text-xs text-qc-body">
            {promo.terms.map((term, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span className="font-light">{term}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-border-base flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onShareWhatsApp(promo)}
            className="btn-gold-outline w-full sm:w-auto text-xs px-4 py-2.5 flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share to WhatsApp</span>
          </button>

          <Link
            to="/reservations"
            className="btn-gold w-full sm:w-auto text-xs px-6 py-2.5 flex items-center justify-center gap-2 uppercase tracking-wider"
            onClick={onClose}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{promo.ctaText}</span>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
