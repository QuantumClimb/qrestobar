import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { UrbanNeonPageHero } from './UrbanNeonPageHero';
import '../../styles/urbanNeon.css';

export const UrbanNeonReservations: React.FC = () => {
  const { settings, createReservation } = useData();
  const { showToast } = useToast();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !name || !email || !phone) {
      showToast({
        type: 'error',
        title: 'Missing Required Information',
        message: 'Please complete all required fields to reserve your table.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createReservation({
        fullName: name,
        email,
        phone,
        date,
        time,
        guestCount: guests,
        seatingPreference: 'indoor',
        occasion: 'casual',
        specialRequests: specialRequests || undefined,
        consent: true
      });

      setIsSubmitting(false);
      setIsConfirmed(true);
      showToast({
        type: 'success',
        title: 'VIP Reservation Confirmed!',
        message: `Thank you, ${name}. Your table for ${guests} guests on ${date} at ${time} is reserved.`
      });
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello Q-RESTOBAR VIP concierge, I would like to inquire about a table reservation for ${guests} guests.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#090B18] text-white py-12 sm:py-16 selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <UrbanNeonPageHero
          badge="VIP TABLE RESERVATIONS"
          title="Reserve Your Nightlife Table"
          subtitle="Open daily from 12:00 PM to 12:00 AM in Bukit Bintang. Book your table for dining, craft cocktails, or late-night DJ music."
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Form Column */}
          <div className="lg:col-span-8 bg-[#131B2E] border border-[#20E3D2]/30 p-6 sm:p-10 rounded-lg shadow-[0_0_30px_rgba(32,227,210,0.15)] relative un-reservation-form-wrapper">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#20E3D2] via-[#EC4899] to-[#20E3D2] rounded-t-lg" />

            {isConfirmed ? (
              /* Confirmation Screen */
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#20E3D2]/20 border-2 border-[#20E3D2] rounded-full flex items-center justify-center mx-auto text-[#20E3D2] shadow-[0_0_20px_#20E3D2]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="un-font-display text-3xl font-bold text-white">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-sm text-gray-300 font-light max-w-md mx-auto">
                    We look forward to welcoming you to Q-RESTOBAR in Bukit Bintang. A confirmation notification has been dispatched to <strong className="text-[#20E3D2]">{email}</strong>.
                  </p>
                </div>

                <div className="bg-[#111827] border border-[#20E3D2]/30 p-6 rounded-md max-w-md mx-auto text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Guest Name:</span>
                    <span className="font-bold text-white">{name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Date &amp; Time:</span>
                    <span className="font-bold text-[#20E3D2]">{date} at {time}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Party Size:</span>
                    <span className="font-bold text-white">{guests} Guests</span>
                  </div>
                  {specialRequests && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Requests:</span>
                      <span className="font-bold text-gray-300">{specialRequests}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setSpecialRequests('');
                    }}
                    className="un-btn-outline px-6 py-3 text-xs min-h-[44px]"
                  >
                    Make Another Reservation
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="un-btn-cyan px-6 py-3 text-xs flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="un-font-display text-2xl font-bold text-white">
                    Table Details
                  </h2>
                  <p className="text-xs text-gray-300 font-light mt-1">
                    Select your preferred date, time slot, and guest party size.
                  </p>
                </div>

                {/* Date, Time, Guests Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Time *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:00">01:00 PM (Lunch)</option>
                      <option value="18:00">06:00 PM (Dinner)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="20:00">08:00 PM (Dinner &amp; DJ)</option>
                      <option value="21:00">09:00 PM (Late Lounge)</option>
                      <option value="22:00">10:00 PM (Late Lounge)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Guests *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-b border-white/10 pb-4 pt-2">
                  <h2 className="un-font-display text-2xl font-bold text-white">
                    Contact Information
                  </h2>
                  <p className="text-xs text-gray-300 font-light mt-1">
                    Your details are strictly used for booking verification.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Tan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Special Requests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+60 12 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#20E3D2] font-semibold mb-1">
                      Seating Preference / Requests
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near DJ booth / Alfresco"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-white bg-[#111827] border border-white/20 rounded focus:border-[#20E3D2] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="un-btn-cyan w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Confirming Reservation...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Confirm VIP Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Info Sidebar (Separate full-width rows on mobile <640px) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Opening Hours Block */}
            <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg space-y-4 shadow-md w-full box-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#20E3D2] font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#20E3D2]" />
                <span>Operating Hours</span>
              </h3>

              <div className="space-y-2 text-xs text-gray-300">
                <p className="font-semibold text-white">Daily: 12:00 PM to 12:00 AM</p>
                <p className="text-[11px] text-gray-400">Kitchen closes 10:30 PM (Sun–Thu) / 11:30 PM (Fri–Sat)</p>
                <p className="text-[11px] text-[#EC4899] font-medium pt-1">DJ Live Music: Thu – Sun from 8:00 PM</p>
              </div>
            </div>

            {/* Concierge Contact Box */}
            <div className="bg-[#131B2E] border border-[#EC4899]/30 p-6 rounded-lg space-y-4 shadow-md w-full box-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#EC4899] font-mono flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#EC4899]" />
                <span>VIP Party &amp; Group Booking</span>
              </h3>

              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Hosting a private event, birthday party, or corporate celebration for 10+ guests? Contact our concierge team directly.
              </p>

              <button
                onClick={handleWhatsApp}
                className="un-btn-outline w-full py-3 text-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#20E3D2]" />
                <span>Chat with VIP Concierge</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UrbanNeonReservations;
