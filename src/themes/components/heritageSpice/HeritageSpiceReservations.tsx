import React, { useState } from 'react';
import { Clock, Phone, ShieldCheck, MessageSquare, Sparkles, MapPin } from 'lucide-react';
import { ReservationForm } from '../../../components/reservations/ReservationForm';
import { ReservationSuccessModal } from '../../../components/reservations/ReservationSuccessModal';
import { Reservation } from '../../../types/reservation';
import { useData } from '../../../context/DataContext';
import { HeritageSpicePageHero } from './HeritageSpicePageHero';
import '../../styles/heritageSpice.css';

export const HeritageSpiceReservations: React.FC = () => {
  const { settings } = useData();
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleWhatsAppInquiry = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello Q-RESTOBAR concierge, I would like to inquire about Heritage Spice table reservations in Bukit Bintang.');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] py-12 sm:py-16 selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <HeritageSpicePageHero
          badge="Q-RESTOBAR · TABLE RESERVATIONS"
          title="Reserve Your Table"
          subtitle="Reserve your dining experience at Q-RESTOBAR in Bukit Bintang. All online requests receive instant confirmation and attentive hosting."
        />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Booking Form Card (Left/Center Column) */}
          <div className="lg:col-span-8 bg-[#371018] border border-[#C69A4B]/35 p-6 sm:p-10 rounded-sm shadow-2xl relative">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C69A4B] via-[#E89532] to-[#C69A4B] opacity-80" />
            
            <div className="mb-6 pb-4 border-b border-[#C69A4B]/20 flex items-center justify-between">
              <div>
                <h3 className="hs-font-display text-xl sm:text-2xl font-bold text-[#FFF4DF]">
                  Dining Details &amp; Guest Information
                </h3>
                <p className="text-xs text-[#F8EAD2]/80 font-light mt-0.5">
                  Select your preferred date, seating zone, and party size.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[#C69A4B] shrink-0" />
            </div>

            {/* Reusable ReservationForm */}
            <div className="hs-reservation-form-wrapper">
              <ReservationForm onSuccess={(res) => setConfirmedReservation(res)} />
            </div>
          </div>

          {/* Right Sidebar: Service Hours, Policies & Concierge */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Operating Hours */}
            <div className="bg-[#371018] border border-[#C69A4B]/30 p-6 rounded-sm shadow-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C69A4B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E89532]" />
                <span>Service Hours</span>
              </h3>

              <div className="space-y-2 text-xs text-[#F8EAD2]/80 font-light leading-relaxed">
                <p className="text-[#FFF4DF] font-medium">{settings.openingHoursDisplay}</p>
                <p>• {settings.openingHoursWeekday}</p>
                <p>• {settings.openingHoursWeekend}</p>
                <p className="text-[11px] text-[#E89532] pt-1">
                  Last kitchen orders 1 hour prior to closing
                </p>
              </div>
            </div>

            {/* Box 2: Dining Policies */}
            <div className="bg-[#371018] border border-[#C69A4B]/30 p-6 rounded-sm shadow-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C69A4B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E89532]" />
                <span>Dining Policies</span>
              </h3>

              <ul className="space-y-3 text-xs text-[#F8EAD2]/80 font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E89532] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#FFF4DF] font-medium">Table Holding:</strong> Tables are held for 15 minutes past scheduled time before release.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E89532] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#FFF4DF] font-medium">Dress Code:</strong> {settings.dressCode || 'Smart casual dining atmosphere'}.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E89532] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#FFF4DF] font-medium">Large Parties (&gt;10 guests):</strong> For celebrations or group tasting menus, our concierge team is happy to assist.
                  </span>
                </li>
              </ul>
            </div>

            {/* Box 3: Concierge Assistance */}
            <div className="bg-[#371018] border border-[#C69A4B]/40 p-6 rounded-sm shadow-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFF4DF] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C69A4B]" />
                <span>Direct Concierge Assistance</span>
              </h3>
              
              <p className="text-xs text-[#F8EAD2]/80 font-light leading-relaxed">
                For same-day table requests or special dietary arrangements, connect directly with our hosting staff.
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="hs-btn-outline w-full py-3 text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C69A4B]" />
                  <span>Call {settings.phone}</span>
                </a>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 text-xs rounded-xs border border-[#059669]/50 bg-[#059669]/20 hover:bg-[#059669]/30 text-[#34D399] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>WhatsApp Concierge</span>
                </button>
              </div>
            </div>

            {/* Box 4: Location Pin */}
            <div className="p-4 bg-[#371018] border border-[#C69A4B]/25 rounded-sm text-xs text-[#C2AFA6] flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#E89532] shrink-0" />
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

export default HeritageSpiceReservations;
