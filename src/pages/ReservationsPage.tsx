import React, { useState } from 'react';
import { Calendar, Clock, Phone, ShieldCheck, MessageSquare } from 'lucide-react';
import { ReservationForm } from '../components/reservations/ReservationForm';
import { ReservationSuccessModal } from '../components/reservations/ReservationSuccessModal';
import { Reservation } from '../types/reservation';
import { useData } from '../context/DataContext';
import { useSiteTheme } from '../context/SiteThemeContext';

const MidnightEmberReservations = React.lazy(
  () => import('../themes/components/midnightEmber/MidnightEmberReservations')
);
const HeritageSpiceReservations = React.lazy(
  () => import('../themes/components/heritageSpice/HeritageSpiceReservations')
);
const BotanicalBistroReservations = React.lazy(
  () => import('../themes/components/botanicalBistro/BotanicalBistroReservations')
);

export const ReservationsPage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: Midnight Ember presentation
  if (effectiveThemeId === 'midnight-ember') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <MidnightEmberReservations />
      </React.Suspense>
    );
  }

  // Early branch: Heritage Spice presentation
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#2B080E]" />}>
        <HeritageSpiceReservations />
      </React.Suspense>
    );
  }

  // Early branch: Botanical Bistro presentation
  if (effectiveThemeId === 'botanical-bistro') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#F4F1E8]" />}>
        <BotanicalBistroReservations />
      </React.Suspense>
    );
  }

  const { settings } = useData();
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleWhatsAppInquiry = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello Q-RESTOBAR concierge, I would like to inquire about group bookings.');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-qc-base text-qc-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
            <Calendar className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-qc-primary tracking-wide">
            Book Your Dining Experience
          </h1>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Reserve your table at Q-RESTOBAR in Bukit Bintang. All online requests receive immediate reference confirmation and dedicated staff review.
          </p>
        </div>

        {/* Two Column Layout: Form on Left/Center, Booking Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Booking Form Column */}
          <div className="lg:col-span-8 bg-qc-surface border border-border-base p-6 sm:p-10 rounded-sm shadow-2xl">
            <ReservationForm onSuccess={(res) => setConfirmedReservation(res)} />
          </div>

          {/* Right Information & Policy Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box 1: Operating Hours */}
            <div className="bg-qc-surface border border-border-base p-5 sm:p-6 rounded-sm space-y-3 sm:space-y-4 relative static sm:static z-10 w-full max-w-full min-w-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-500 flex items-center gap-2 w-full max-w-full min-w-0">
                <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Operating Hours</span>
              </h3>

              <div className="space-y-2 text-xs text-qc-body font-light w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
                <p className="text-qc-primary font-medium text-xs sm:text-sm w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
                  Daily, 12:00 PM to 12:00 AM
                </p>
                <p className="w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">• Lunch Service: 12:00 PM to 3:30 PM</p>
                <p className="w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">• Dinner &amp; Lounge: 5:30 PM to 12:00 AM</p>
                <p className="text-[11px] text-purple-500/90 pt-1 w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
                  Last kitchen orders 10:30 PM (Sun-Thu) / 11:30 PM (Fri-Sat)
                </p>
              </div>
            </div>

            {/* Box 2: Reservation Policies */}
            <div className="bg-qc-surface border border-border-base p-6 rounded-sm space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Dining Policies</span>
              </h3>

              <ul className="space-y-2.5 text-xs text-qc-body font-light">
                <li>
                  <strong className="text-qc-primary font-medium">Table Holding:</strong> Tables are held for 15 minutes past scheduled time before release.
                </li>
                <li>
                  <strong className="text-qc-primary font-medium">Dress Code:</strong> Smart Casual. Tailored shorts allowed for lunch; no flip-flops after 6:00 PM.
                </li>
                <li>
                  <strong className="text-qc-primary font-medium">Large Groups (&gt; 20 pax):</strong> For private dining buyouts or weddings, please contact our concierge team.
                </li>
              </ul>
            </div>

            {/* Box 3: Urgent / Group Assistance */}
            <div className="bg-qc-surface/70 border border-purple-600/30 p-6 rounded-sm space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-qc-secondary">
                Need Immediate Assistance?
              </h3>
              <p className="text-xs text-qc-body font-light leading-relaxed">
                For same-day reservations within 2 hours or urgent party size modifications, please contact our hosting team directly.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="btn-gold-outline w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.phone}</span>
                </a>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="btn-ghost-ivory w-full py-2.5 text-xs border border-border-strong bg-qc-surface/60 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      <ReservationSuccessModal
        reservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />
    </div>
  );
};
