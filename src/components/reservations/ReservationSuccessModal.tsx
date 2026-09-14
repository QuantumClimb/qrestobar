import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Download, MessageSquare, Clock, MapPin, Users, Utensils } from 'lucide-react';
import { Reservation } from '../../types/reservation';
import { reservationService } from '../../services/reservationService';
import { useData } from '../../context/DataContext';
import { Modal } from '../common/Modal';

interface ReservationSuccessModalProps {
  reservation: Reservation | null;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  onClose
}) => {
  const { settings } = useData();
  if (!reservation) return null;

  const handleDownloadIcs = () => {
    reservationService.downloadIcsFile(reservation);
  };

  const handleGoogleCalendar = () => {
    const url = reservationService.generateGoogleCalendarUrl(reservation);
    window.open(url, '_blank');
  };

  const handleWhatsApp = () => {
    const url = reservationService.generateWhatsAppLink(reservation, settings.whatsapp);
    window.open(url, '_blank');
  };

  return (
    <Modal
      isOpen={Boolean(reservation)}
      onClose={onClose}
      title="Table Request Received"
      subtitle="Q-RESTOBAR"
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Success Banner */}
        <div className="bg-qc-base border border-purple-600/40 p-6 rounded-sm text-center space-y-3">
          <div className="w-12 h-12 bg-purple-600/20 border border-purple-600/50 rounded-full flex items-center justify-center text-purple-500 mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-display font-bold text-qc-primary">
            Thank you, {reservation.fullName}.
          </h3>

          <p className="text-sm text-qc-secondary font-medium">
            Your table request has been received.
          </p>

          <div className="inline-block bg-qc-surface/80 border border-purple-600/40 px-4 py-2 rounded-sm mt-2">
            <span className="text-xs text-qc-body uppercase tracking-widest block">Reservation Reference</span>
            <span className="text-xl font-display font-bold text-purple-500 tracking-wider">
              {reservation.referenceNumber}
            </span>
          </div>

          <p className="text-xs text-qc-body font-light max-w-sm mx-auto leading-relaxed pt-2">
            Our team will contact you to confirm your booking.
          </p>
        </div>

        {/* Booking Summary Box */}
        <div className="p-4 bg-qc-surface border border-border-base rounded-sm space-y-3 text-xs">
          <div className="text-[11px] font-semibold text-purple-500 uppercase tracking-widest border-b border-border-base pb-2">
            Requested Details
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-qc-body">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-qc-body">Date</p>
                <p className="text-qc-primary font-medium">{reservation.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-qc-body">Time</p>
                <p className="text-qc-primary font-medium">{reservation.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-qc-body">Party Size</p>
                <p className="text-qc-primary font-medium">{reservation.guestCount} Guests</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-qc-body">Seating</p>
                <p className="text-qc-primary font-medium capitalize">{reservation.seatingPreference}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-qc-body">Occasion</p>
                <p className="text-qc-primary font-medium capitalize">{reservation.occasion}</p>
              </div>
            </div>
          </div>

          {reservation.specialRequests && (
            <div className="pt-2 border-t border-border-base">
              <span className="text-[10px] uppercase text-qc-body block">Notes:</span>
              <span className="text-qc-primary italic">"{reservation.specialRequests}"</span>
            </div>
          )}
        </div>

        {/* Action Buttons: Calendar & WhatsApp */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-500 text-center">
            Save &amp; Connect
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleGoogleCalendar}
              className="btn-gold-outline text-[11px] py-2.5 flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Google Calendar</span>
            </button>

            <button
              onClick={handleDownloadIcs}
              className="btn-gold-outline text-[11px] py-2.5 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .iCS</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="btn-ghost-ivory text-[11px] py-2.5 border border-border-strong bg-emerald-950/40 text-emerald-300 hover:text-emerald-200 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>

        {/* Bottom Close / View Menu */}
        <div className="pt-4 border-t border-border-base flex items-center justify-between gap-4">
          <Link
            to="/menu"
            className="text-xs text-purple-500 hover:underline uppercase tracking-wider font-semibold"
            onClick={onClose}
          >
            Explore Menu in the Meantime &rarr;
          </Link>

          <button
            onClick={onClose}
            className="btn-gold text-xs px-6 py-2.5 uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};
