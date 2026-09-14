import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, PartyPopper } from 'lucide-react';
import { useData } from '../context/DataContext';
import { OfferCard } from '../components/offers/OfferCard';
import { OfferModal } from '../components/offers/OfferModal';
import { Promotion } from '../types/promotion';
import { useToast } from '../context/ToastContext';

export const OffersPage: React.FC = () => {
  const { promotions } = useData();
  const { showToast } = useToast();
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  const activePromos = promotions.filter(p => p.isActive);

  const handleShareWhatsApp = (promo: Promotion) => {
    const text = encodeURIComponent(
      `Check out this offer at Q-RESTOBAR: ${promo.title} - ${promo.tagline}. Schedule: ${promo.schedule}. View full details at https://q-restobar.com/offers`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast({
      type: 'info',
      title: 'WhatsApp Share Triggered',
      message: 'Opening WhatsApp to share event.'
    });
  };

  return (
    <div className="min-h-screen bg-qc-base text-qc-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Experiences &amp; Events</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-qc-primary tracking-wide">
            Promotions &amp; Special Happenings
          </h1>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            From free-flow weekend brunches and curated ladies night cocktails to Saturday night DJ sessions and bespoke milestone celebrations.
          </p>
        </div>

        {/* 6 Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activePromos.map((promo) => (
            <OfferCard
              key={promo.id}
              promo={promo}
              onViewDetails={(p) => setSelectedPromo(p)}
              onShareWhatsApp={handleShareWhatsApp}
            />
          ))}
        </div>

        {/* Private Events Banner Callout */}
        <div className="bg-qc-surface border border-purple-600/30 p-8 sm:p-12 rounded-sm text-center space-y-4 shadow-xl relative overflow-hidden transition-colors">
          <PartyPopper className="w-7 h-7 text-purple-500 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
            Hosting a Corporate Banquet or Private Celebration?
          </h2>
          <p className="text-xs sm:text-sm text-qc-body font-light max-w-xl mx-auto leading-relaxed">
            Our events concierge crafts custom tasting menus, private sommelier sessions, and audio-visual setups tailored to your company or personal milestone.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservations"
              className="btn-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table for Your Party</span>
            </Link>
            <Link
              to="/contact"
              className="btn-gold-outline px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <span>Contact Private Events Team</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Offer Detail Modal */}
      <OfferModal
        promo={selectedPromo}
        onClose={() => setSelectedPromo(null)}
        onShareWhatsApp={handleShareWhatsApp}
      />
    </div>
  );
};
