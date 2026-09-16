import React, { useState } from 'react';
import { Clock, Phone, ShieldCheck, MessageSquare, Sparkles, MapPin } from 'lucide-react';
import { ReservationForm } from '../../../components/reservations/ReservationForm';
import { ReservationSuccessModal } from '../../../components/reservations/ReservationSuccessModal';
import { Reservation } from '../../../types/reservation';
import { useData } from '../../../context/DataContext';
import { MidnightEmberPageHero } from './MidnightEmberPageHero';

export const MidnightEmberReservations: React.FC = () => {
  const { settings } = useData();
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleWhatsAppInquiry = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello Q-RESTOBAR concierge, I would like to inquire about Midnight Ember table bookings.');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#101010] text-[#F5EFE6] py-12 sm:py-16 selection:bg-[#D8662C]/30 selection:text-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <MidnightEmberPageHero
          badge="Q - RESTOBAR · ONLINE RESERVATIONS"
          title="Reserve Your Table"
          subtitle="An unforgettable evening begins here. Reserve your table at Q-RESTOBAR in Bukit Bintang with immediate instant confirmation."
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Booking Form Card (Left/Center) */}
          <div className="lg:col-span-8 bg-[#14110F] border border-[#D8AA5B]/30 p-6 sm:p-10 rounded-sm shadow-2xl relative">
            {/* Top Ember Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D8662C] via-[#E47B3D] to-[#D8AA5B]" />
            
            <div className="mb-6 pb-4 border-b border-[#D8AA5B]/20 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#F5EFE6]">
                  Dining Details &amp; Guest Information
                </h3>
                <p className="text-xs text-[#CFC3B5] font-light mt-0.5">
                  Select your preferred date, seating zone, and party size.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[#D8AA5B] shrink-0" />
            </div>

            {/* Existing Reusable ReservationForm */}
            <ReservationForm onSuccess={(res) => setConfirmedReservation(res)} />
          </div>

          {/* Right Sidebar: Atmosphere, Policies & Concierge */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Operating Hours */}
            <div className="bg-[#14110F] border border-[#D8AA5B]/25 p-6 rounded-sm shadow-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D8AA5B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D8662C]" />
                <span>Service Hours</span>
              </h3>

              <div className="space-y-2 text-xs text-[#CFC3B5] font-light leading-relaxed">
                <p className="text-[#F5EFE6] font-medium">{settings.openingHoursDisplay}</p>
                <p>• {settings.openingHoursWeekday}</p>
                <p>• {settings.openingHoursWeekend}</p>
                <p className="text-[11px] text-[#D8662C] pt-1">
                  Last kitchen orders 1 hour prior to closing
                </p>
              </div>
            </div>

            {/* Box 2: Dining Policies */}
            <div className="bg-[#14110F] border border-[#D8AA5B]/25 p-6 rounded-sm shadow-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D8AA5B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D8662C]" />
                <span>Dining Policies</span>
              </h3>

              <ul className="space-y-3 text-xs text-[#CFC3B5] font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8662C] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#F5EFE6] font-medium">Table Holding:</strong> Tables are held for 15 minutes past your scheduled reservation time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8662C] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#F5EFE6] font-medium">Dress Code:</strong> {settings.dressCode}.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8662C] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#F5EFE6] font-medium">Large Parties (&gt;10 pax):</strong> Please reach out to our concierge for tailored banquet tasting menus.
                  </span>
                </li>
              </ul>
            </div>

            {/* Box 3: Concierge Assistance */}
            <div className="bg-[#14110F] border border-[#D8662C]/40 p-6 rounded-sm shadow-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F5EFE6] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D8662C]" />
                <span>Direct Concierge Assistance</span>
              </h3>
              
              <p className="text-xs text-[#CFC3B5] font-light leading-relaxed">
                For same-day table requests or urgent special arrangements, connect directly with our hosting staff.
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="me-btn-outline w-full py-3 text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D8AA5B]" />
                  <span>Call {settings.phone}</span>
                </a>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 text-xs rounded-xs border border-[#059669]/50 bg-[#059669]/15 hover:bg-[#059669]/25 text-[#34D399] font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>WhatsApp Concierge</span>
                </button>
              </div>
            </div>

            {/* Box 4: Location Pin */}
            <div className="p-4 bg-[#14110F] border border-[#D8AA5B]/20 rounded-sm text-xs text-[#94877A] flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D8662C] shrink-0" />
              <span>Bukit Bintang, 55100 Kuala Lumpur · Valet available</span>
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

export default MidnightEmberReservations;
