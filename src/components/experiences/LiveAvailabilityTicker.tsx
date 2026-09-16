import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Zap, Flame, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  zone: string;
  tablesLeft: number;
  status: 'available' | 'low' | 'last-table' | 'full';
  perk?: string;
}

const INITIAL_SLOTS: TimeSlot[] = [
  { id: 's1', time: '18:00', zone: 'Alfresco Sunset Terrace', tablesLeft: 4, status: 'available', perk: 'Sunset Cocktail Happy Hour' },
  { id: 's2', time: '18:45', zone: 'Intimate Velvet Booths', tablesLeft: 2, status: 'low' },
  { id: 's3', time: '19:30', zone: 'Main Dining Hall', tablesLeft: 1, status: 'last-table', perk: 'Prime Dinner Seating' },
  { id: 's4', time: '20:15', zone: 'Intimate Velvet Booths', tablesLeft: 1, status: 'last-table' },
  { id: 's5', time: '21:00', zone: 'The Mixology Bar Counter', tablesLeft: 3, status: 'available', perk: 'Live Band Night Front Row' },
  { id: 's6', time: '21:45', zone: 'Alfresco Terrace & Lounge', tablesLeft: 2, status: 'low', perk: 'Late Night Midnight Bites' },
  { id: 's7', time: '22:30', zone: 'Mixology Bar Counter', tablesLeft: 4, status: 'available' },
];

export const LiveAvailabilityTicker: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 45 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 15, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaimTable = (slot: TimeSlot) => {
    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams({
      date: today,
      time: slot.time,
      seatingPreference: slot.zone.toLowerCase().includes('alfresco') ? 'outdoor' : slot.zone.toLowerCase().includes('mixology') ? 'chefs-table' : 'indoor',
      specialRequests: slot.perk ? `[Flash Perk Applied: ${slot.perk}]` : `[Priority Booking for ${slot.time} - ${slot.zone}]`
    });
    navigate(`/reservations?${params.toString()}`);
  };

  return (
    <div className="bg-qc-surface border border-border-base rounded-sm p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border-base pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-widest mb-1">
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--experience-accent-secondary, #C084FC)', fill: 'var(--experience-accent-secondary, #C084FC)' }} />
            <span>Tonight’s Live Seating &amp; Flash Urgency Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
            Real-Time Table Availability
          </h3>
          <p className="text-xs sm:text-sm text-qc-body font-light mt-1">
            Live dining inventory for Bukit Bintang dinner and late-night service.
          </p>
        </div>

        {/* Live Flash Perk Countdown Box */}
        <div
          className="bg-qc-surface/80 border p-4 rounded-sm shrink-0 flex items-center gap-4 shadow-sm"
          style={{ borderColor: 'var(--experience-box-border, rgba(147, 51, 234, 0.4))' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--experience-accent-surface, rgba(147, 51, 234, 0.2))',
              color: 'var(--experience-accent-primary, #A855F7)'
            }}
          >
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-qc-secondary font-bold">
                Flash Table Perk
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-qc-primary font-medium mt-0.5">
              Free Truffle Brioche Bites on bookings within:
            </p>
            <p
              className="font-mono text-sm font-bold"
              style={{ color: 'var(--experience-accent-primary, #A855F7)' }}
            >
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} mins
            </p>
          </div>
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {INITIAL_SLOTS.map((slot) => {
          const isUrgent = slot.status === 'last-table';
          const isLow = slot.status === 'low';

          return (
            <div
              key={slot.id}
              className={`p-5 rounded-sm border transition-all flex flex-col justify-between gap-4 ${
                isUrgent
                  ? 'bg-qc-base border-red-500/40 shadow-lg ring-1 ring-red-500/20'
                  : isLow
                  ? 'bg-qc-base border-purple-500/40'
                  : 'bg-qc-base/70 border-border-base hover:border-border-strong'
              }`}
            >
              <div>
                {/* Status pill & Time */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xl font-display font-bold text-qc-primary tracking-wide">
                    {slot.time}
                  </span>

                  {isUrgent ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-950/80 border border-red-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Only 1 Table!</span>
                    </span>
                  ) : isLow ? (
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border"
                      style={{
                        color: 'var(--experience-low-text, #D8B4FE)',
                        backgroundColor: 'var(--experience-low-bg, rgba(59, 7, 100, 0.8))',
                        borderColor: 'var(--experience-low-border, rgba(168, 85, 247, 0.4))'
                      }}
                    >
                      {slot.tablesLeft} Tables Left
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Available</span>
                    </span>
                  )}
                </div>

                {/* Zone name */}
                <p className="text-xs font-medium text-qc-primary flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-500" />
                  <span>{slot.zone}</span>
                </p>

                {/* Optional Perk badge */}
                {slot.perk && (
                  <p className="mt-2 text-[11px] text-qc-secondary/90 italic bg-purple-600/10 px-2 py-1 rounded border border-purple-600/20">
                    ✨ {slot.perk}
                  </p>
                )}
              </div>

              {/* Claim button */}
              <button
                onClick={() => handleClaimTable(slot)}
                className={`w-full py-2.5 text-xs font-semibold tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-all ${
                  isUrgent
                    ? 'bg-gradient-to-r from-red-600 to-purple-700 text-white hover:brightness-110 shadow-md'
                    : 'btn-gold-outline text-xs'
                }`}
              >
                <span>Instant Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Restaurant Owner Growth Note */}
      <div className="border-t border-border-base pt-4 flex items-start gap-3 text-xs text-qc-body font-light">
        <Flame className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
        <p>
          <strong className="text-qc-primary font-medium">Why Restaurant Owners Love This:</strong>{' '}
          Displays real-time inventory scarcity to trigger FOMO (Fear Of Missing Out). Flash timers fill off-peak (early 6 PM or late 9:30 PM) tables that would otherwise sit empty.
        </p>
      </div>
    </div>
  );
};
