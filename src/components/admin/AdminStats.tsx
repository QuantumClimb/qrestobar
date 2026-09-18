import React from 'react';
import { Utensils, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminStats: React.FC = () => {
  const { reservations, menuItems, promotions } = useData();

  const newReservations = reservations.filter(r => r.status === 'new').length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const activeMenuItems = menuItems.filter(m => m.isAvailable).length;
  const activePromos = promotions.filter(p => p.isActive).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full max-w-full min-w-0">
      {/* Stat 1: New Requests */}
      <div className="bg-qc-surface border border-border-base p-5 rounded-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-purple-500 uppercase tracking-wider">New Table Requests</p>
          <p className="text-2xl font-display font-bold text-qc-primary mt-1">{newReservations}</p>
          <p className="text-[11px] text-qc-body font-light mt-0.5">Awaiting staff review</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-qc-surface border border-purple-600/30 flex items-center justify-center text-purple-500">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      {/* Stat 2: Confirmed Bookings */}
      <div className="bg-qc-surface border border-border-base p-5 rounded-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Confirmed Bookings</p>
          <p className="text-2xl font-display font-bold text-qc-primary mt-1">{confirmedReservations}</p>
          <p className="text-[11px] text-qc-body font-light mt-0.5">Ready for seating</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-600/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Stat 3: Available Dishes */}
      <div className="bg-qc-surface border border-border-base p-5 rounded-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-purple-500 uppercase tracking-wider">Active Menu Items</p>
          <p className="text-2xl font-display font-bold text-qc-primary mt-1">{activeMenuItems} <span className="text-xs font-normal text-qc-body font-sans">/ {menuItems.length}</span></p>
          <p className="text-[11px] text-qc-body font-light mt-0.5">{menuItems.length - activeMenuItems} marked sold out</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-qc-base border border-border-strong flex items-center justify-center text-purple-500">
          <Utensils className="w-5 h-5" />
        </div>
      </div>

      {/* Stat 4: Live Campaigns */}
      <div className="bg-qc-surface border border-border-base p-5 rounded-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-purple-500 uppercase tracking-wider">Active Promotions</p>
          <p className="text-2xl font-display font-bold text-qc-primary mt-1">{activePromos}</p>
          <p className="text-[11px] text-qc-body font-light mt-0.5">Live on public pages</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-qc-base border border-border-strong flex items-center justify-center text-purple-500">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
