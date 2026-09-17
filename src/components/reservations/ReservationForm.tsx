import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Users, MapPin, Gift, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Reservation, ReservationFormData } from '../../types/reservation';

const reservationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number (e.g. +60 12 345 6789)'),
  date: z.string().refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, 'Reservation date cannot be in the past'),
  time: z.string().min(1, 'Please select a dining time slot'),
  guestCount: z.coerce.number().min(1, 'Minimum 1 guest').max(20, 'Maximum 20 guests per online booking'),
  seatingPreference: z.enum(['indoor', 'outdoor', 'chefs-table'] as const),
  occasion: z.enum(['casual', 'birthday', 'anniversary', 'business', 'date-night', 'celebration', 'other'] as const),
  specialRequests: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, 'You must agree to the reservation terms & policy')
});

type FormData = z.infer<typeof reservationSchema>;

// Daily opening time slots: 12:00 PM to 10:30 PM (30 min intervals)
const AVAILABLE_TIMES = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
  '20:30', '21:00', '21:30', '22:00', '22:30'
];

interface ReservationFormProps {
  onSuccess: (reservation: Reservation) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess }) => {
  const { createReservation } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paramVoucher = searchParams.get('voucher');
  const paramPerk = searchParams.get('perk');
  const paramPackage = searchParams.get('package');
  const paramSeating = searchParams.get('seatingPreference') as 'indoor' | 'outdoor' | 'chefs-table' | null;
  const paramTime = searchParams.get('time');
  const paramDate = searchParams.get('date');
  const paramNotes = searchParams.get('notes');
  const paramSpecial = searchParams.get('specialRequests');

  // assemble initial special requests
  const initialSpecialNotes = [
    paramVoucher ? `[VOUCHER APPLIED: ${paramVoucher}${paramPerk ? ` - ${paramPerk}` : ''}]` : '',
    paramPackage ? `[EXPERIENCE PACKAGE: ${paramPackage}]` : '',
    paramNotes || '',
    paramSpecial || ''
  ].filter(Boolean).join(' | ');

  // Today's date string for input min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: paramDate && paramDate >= todayStr ? paramDate : todayStr,
      time: paramTime || '19:30',
      guestCount: 2,
      seatingPreference: paramSeating && ['indoor', 'outdoor', 'chefs-table'].includes(paramSeating) ? paramSeating : 'indoor',
      occasion: 'casual',
      specialRequests: initialSpecialNotes,
      consent: true
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const newReservation = await createReservation(data as ReservationFormData);
      onSuccess(newReservation);
    } catch (error) {
      console.error('Reservation submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Experience / Perk Applied Banner */}
      {(paramVoucher || paramPackage || paramSpecial) && (
        <div className="bg-qc-base border border-purple-600/60 p-4 rounded-sm flex items-start gap-3 shadow-gold-subtle animate-slide-up">
          <Gift className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-semibold text-qc-secondary uppercase tracking-wider text-[11px]">
              Special Experience Attached
            </p>
            <p className="text-qc-primary font-light">
              {paramPerk || paramPackage || paramSpecial || paramVoucher}
            </p>
            {paramVoucher && (
              <p className="font-mono text-[11px] text-purple-500 font-bold">
                Voucher Code: {paramVoucher}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 1: Date, Time & Party Size */}
      <div className="space-y-4 w-full max-w-full min-w-0 relative z-10">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-500 border-b border-border-base pb-2 flex items-center gap-2 w-full max-w-full min-w-0">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>1. Dining Schedule &amp; Party</span>
        </h3>

        {/* Quick Schedule & Opening Hours Info Bar (Single-column on mobile, row on desktop) */}
        <div className="bg-qc-base/90 border border-border-strong p-3.5 sm:p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full max-w-full min-w-0 relative z-10 box-border shadow-sm">
          {/* Opening Hours Block */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto max-w-full min-w-0 whitespace-normal [overflow-wrap:anywhere]">
            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-xs text-qc-body min-w-0 w-full max-w-full whitespace-normal [overflow-wrap:anywhere]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 block sm:inline mr-1.5">Operating Hours:</span>
              <span className="text-qc-primary font-medium text-xs whitespace-normal [overflow-wrap:anywhere]">Daily, 12:00 PM to 12:00 AM</span>
            </div>
          </div>

          {/* Guest Count Summary Row */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto max-w-full min-w-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-base/50 sm:border-l sm:border-border-base/50 sm:pl-4 whitespace-normal">
            <Users className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-xs text-qc-body min-w-0 w-full max-w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 block sm:inline mr-1.5">Default Party:</span>
              <span className="text-qc-primary font-medium text-xs">2 guests (Table for 2)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-full min-w-0">
          {/* Date Picker */}
          <div className="w-full max-w-full min-w-0">
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5 whitespace-normal">
              Reservation Date *
            </label>
            <input
              type="date"
              min={todayStr}
              {...register('date')}
              className={`w-full max-w-full min-w-0 bg-qc-surface border px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none transition-colors ${
                errors.date ? 'border-red-500' : 'border-border-strong focus:border-purple-500'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-[11px] text-red-400 whitespace-normal break-words">{errors.date.message}</p>
            )}
          </div>

          {/* Time Slot Picker */}
          <div className="w-full max-w-full min-w-0">
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5 whitespace-normal">
              Dining Time *
            </label>
            <select
              {...register('time')}
              className={`w-full max-w-full min-w-0 bg-qc-surface border px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none transition-colors ${
                errors.time ? 'border-red-500' : 'border-border-strong focus:border-purple-500'
              }`}
            >
              {AVAILABLE_TIMES.map((slot) => (
                <option key={slot} value={slot}>
                  {slot} ({parseInt(slot) < 12 ? 'Lunch' : parseInt(slot) < 17 ? 'Afternoon' : 'Dinner'})
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-[11px] text-red-400 whitespace-normal break-words">{errors.time.message}</p>
            )}
          </div>

          {/* Guests Count */}
          <div className="w-full max-w-full min-w-0">
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5 whitespace-normal">
              Number of Guests * (1 - 20)
            </label>
            <select
              {...register('guestCount')}
              className={`w-full max-w-full min-w-0 bg-qc-surface border px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none transition-colors ${
                errors.guestCount ? 'border-red-500' : 'border-border-strong focus:border-purple-500'
              }`}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest (Solo Dining)' : num === 2 ? 'Guests (Table for 2)' : `Guests`}
                </option>
              ))}
            </select>
            {errors.guestCount && (
              <p className="mt-1 text-[11px] text-red-400 whitespace-normal break-words">{errors.guestCount.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Step 2: Seating & Occasion */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-500 border-b border-border-base pb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>2. Seating Preference &amp; Occasion</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Seating Preference */}
          <div>
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5">
              Seating Area *
            </label>
            <select
              {...register('seatingPreference')}
              className="w-full bg-qc-surface border border-border-strong px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none focus:border-purple-500"
            >
              <option value="indoor">Indoor Main Dining Room (Air-Conditioned)</option>
              <option value="outdoor">Alfresco Terrace Lounge (Covered)</option>
              <option value="chefs-table">Chef's Open Counter (Bar Height)</option>
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5">
              Dining Occasion
            </label>
            <select
              {...register('occasion')}
              className="w-full bg-qc-surface border border-border-strong px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none focus:border-purple-500"
            >
              <option value="casual">Casual Dining / Social</option>
              <option value="birthday">Birthday Celebration</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Corporate / Business Dinner</option>
              <option value="date-night">Date Night</option>
              <option value="celebration">Special Milestone</option>
              <option value="other">Other Occasion</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: Guest Contact Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-500 border-b border-border-base pb-2 flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>3. Guest Contact Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Datin Serena Lim"
              {...register('fullName')}
              className={`w-full bg-qc-surface border px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none transition-colors ${
                errors.fullName ? 'border-red-500' : 'border-border-strong focus:border-purple-500'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="serena@example.com"
              {...register('email')}
              className={`w-full bg-qc-surface border px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none transition-colors ${
                errors.email ? 'border-red-500' : 'border-border-strong focus:border-purple-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs text-qc-body uppercase font-medium mb-1.5">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              placeholder="+60 12 345 6789"
              {...register('phone')}
              className={`w-full bg-qc-surface border px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none transition-colors ${
                errors.phone ? 'border-red-500' : 'border-border-strong focus:border-purple-500'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] text-red-400">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs text-qc-body uppercase font-medium mb-1.5">
            Special Requests / Dietary Requirements (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Please mention any severe food allergies, high-chair requirements, quiet booth preference, or anniversary dessert candle requests..."
            {...register('specialRequests')}
            className="w-full bg-qc-surface border border-border-strong px-3.5 py-2.5 text-xs text-qc-primary rounded-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Step 4: Policy & Consent Checkbox */}
      <div className="p-4 bg-qc-surface border border-border-base rounded-sm space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent-box"
            {...register('consent')}
            className="mt-1 h-4 w-4 rounded border-border-strong bg-qc-base text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="consent-box" className="text-xs text-qc-body font-light leading-relaxed cursor-pointer">
            I understand that this is a table booking request. Q-RESTOBAR concierge team will review table availability and contact me via WhatsApp or email to officially confirm my reservation. Tables are held for a maximum of 15 minutes past booking time.
          </label>
        </div>
        {errors.consent && (
          <p className="text-[11px] text-red-400 pl-7">{errors.consent.message}</p>
        )}
      </div>

      {/* Submit Action */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold w-full py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-qc-base border-t-transparent rounded-full animate-spin" />
              <span>Processing Your Request...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Submit Table Reservation Request</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-qc-body text-center mt-3 font-light">
          Instant request confirmation code generated immediately upon submission.
        </p>
      </div>
    </form>
  );
};
