import React, { useState } from 'react';
import { Clock, Phone, ShieldCheck, MessageSquare, MapPin, Leaf } from 'lucide-react';
import { ReservationForm } from '../../../components/reservations/ReservationForm';
import { ReservationSuccessModal } from '../../../components/reservations/ReservationSuccessModal';
import { Reservation } from '../../../types/reservation';
import { useData } from '../../../context/DataContext';
import { BotanicalBistroPageHero } from './BotanicalBistroPageHero';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroReservations: React.FC = () => {
  const { settings } = useData();
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleWhatsAppInquiry = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello Botanical Bistro concierge, I would like to inquire about table reservations in Bukit Bintang.');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] py-12 sm:py-16 selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <BotanicalBistroPageHero
          badge="BOTANICAL BISTRO · TABLE RESERVATIONS"
          title="Reserve Your Garden Table"
          subtitle="Reserve your dining experience at Botanical Bistro in Bukit Bintang. Enjoy seasonal herbs, organic pairings, and tranquil courtyard seating."
        />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Booking Form Card (Left/Center Column) */}
          <div className="lg:col-span-8 bg-[#FCFAF4] border border-[#3F6B4F]/25 p-6 sm:p-10 rounded-md shadow-lg relative">
            {/* Top Botanical Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3F6B4F] via-[#B86B45] to-[#3F6B4F] opacity-90 rounded-t-md" />
            
            <div className="mb-6 pb-4 border-b border-[#3F6B4F]/15 flex items-center justify-between">
              <div>
                <h2 className="bb-font-display text-2xl sm:text-3xl font-bold text-[#24352A]">
                  Dining Details &amp; Guest Information
                </h2>
                <p className="text-xs text-[#5B7065] font-light mt-1">
                  Select your preferred date, garden or indoor seating, and party size.
                </p>
              </div>
              <Leaf className="w-5 h-5 text-[#3F6B4F] shrink-0" />
            </div>

            {/* Reusable ReservationForm Container */}
            <div className="bb-reservation-form-wrapper">
              <ReservationForm onSuccess={(res) => setConfirmedReservation(res)} />
            </div>
          </div>

          {/* Right Sidebar: Service Hours, Policies & Concierge */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Operating Hours */}
            <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-5 sm:p-6 rounded-md shadow-md space-y-3 sm:space-y-4 relative static sm:static z-10 w-full max-w-full min-w-0">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3F6B4F] flex items-center gap-2 w-full max-w-full min-w-0">
                <Clock className="w-4 h-4 text-[#3F6B4F] shrink-0" />
                <span>Service Hours</span>
              </h3>

              <div className="space-y-2 text-xs text-[#5B7065] font-light leading-relaxed w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
                <p className="text-[#24352A] font-medium text-xs sm:text-sm w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
                  Daily, 12:00 PM to 12:00 AM
                </p>
                <p className="w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">• {settings.openingHoursWeekday}</p>
                <p className="w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">• {settings.openingHoursWeekend}</p>
                <p className="text-[11px] text-[#B86B45] pt-1 w-full max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
                  Last kitchen orders 1 hour prior to closing
                </p>
              </div>
            </div>

            {/* Box 2: Dining Policies */}
            <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-6 rounded-md shadow-md space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3F6B4F] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3F6B4F]" />
                <span>Dining Policies</span>
              </h3>

              <ul className="space-y-3 text-xs text-[#5B7065] font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F6B4F] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#24352A] font-medium">Table Holding:</strong> Tables are held for 15 minutes past scheduled time before release.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F6B4F] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#24352A] font-medium">Dress Code:</strong> {settings.dressCode || 'Smart casual garden dining attire'}.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F6B4F] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-[#24352A] font-medium">Large Parties (&gt;10 guests):</strong> For celebrations or private botanical garden buyouts, our concierge team is happy to assist.
                  </span>
                </li>
              </ul>
            </div>

            {/* Box 3: Concierge Assistance */}
            <div className="bg-[#FCFAF4] border border-[#3F6B4F]/30 p-6 rounded-md shadow-md space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#24352A] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3F6B4F]" />
                <span>Garden Concierge Assistance</span>
              </h3>
              
              <p className="text-xs text-[#5B7065] font-light leading-relaxed">
                For same-day table requests or special dietary arrangements, connect directly with our hosting staff.
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="bb-btn-outline w-full py-3 text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#3F6B4F]" />
                  <span>Call {settings.phone}</span>
                </a>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 text-xs rounded-xs border border-[#3F6B4F]/30 bg-[#3F6B4F]/10 hover:bg-[#3F6B4F]/20 text-[#2F533C] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#3F6B4F]" />
                  <span>WhatsApp Concierge</span>
                </button>
              </div>
            </div>

            {/* Box 4: Location Pin */}
            <div className="p-4 bg-[#FCFAF4] border border-[#3F6B4F]/20 rounded-md text-xs text-[#5B7065] flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#B86B45] shrink-0" />
              <span>{settings.addressLine1 ? `${settings.addressLine1}, ${settings.city}` : 'Bukit Bintang, 55100 Kuala Lumpur'} · Valet parking available</span>
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

export default BotanicalBistroReservations;
