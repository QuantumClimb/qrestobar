import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Utensils, 
  Sparkles, 
  Settings, 
  ExternalLink, 
  ShieldAlert, 
  Database,
  RotateCcw
} from 'lucide-react';
import { AdminStats } from './AdminStats';
import { AdminReservations } from './AdminReservations';
import { AdminMenu } from './AdminMenu';
import { AdminPromotions } from './AdminPromotions';
import { AdminSettings } from './AdminSettings';
import { useData } from '../../context/DataContext';
import { ThemeToggle } from '../common/ThemeToggle';

export const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'menu' | 'promotions' | 'settings'>('overview');
  const { resetDemoData } = useData();

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'menu', label: 'Menu & Pricing', icon: Utensils },
    { id: 'promotions', label: 'Offers & Events', icon: Sparkles },
    { id: 'settings', label: 'Restaurant Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-qc-base text-qc-primary flex flex-col transition-colors">
      {/* Admin Top Header */}
      <header className="bg-qc-surface border-b border-border-base sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex flex-col focus:outline-none py-1">
              <span
                className="font-serif text-lg sm:text-xl font-semibold tracking-[0.22em] select-none transition-colors"
                style={{ color: 'var(--logo-text-color)' }}
              >
                Q - RESTOBAR
              </span>
              <span className="text-[9px] tracking-[0.25em] text-purple-500 font-semibold uppercase -mt-0.5">
                ADMIN CMS
              </span>
            </Link>

            {/* Demo Mode Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-qc-surface border border-purple-600/40 text-qc-secondary text-[10px] font-semibold uppercase tracking-wider rounded">
              <Database className="w-3 h-3 text-purple-500" />
              <span>LocalStorage Demo Mode (Supabase Ready)</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            <button
              onClick={resetDemoData}
              className="text-qc-body hover:text-qc-primary text-xs px-2.5 py-2 border border-border-strong rounded flex items-center gap-1.5 transition-colors min-h-[40px]"
              title="Reset all demo records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

            <Link
              to="/"
              className="btn-gold text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[40px]"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Production Security Notice */}
      <div className="bg-qc-surface/60 border-b border-border-base/80 px-4 py-2 text-[11px] text-qc-body">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-purple-500 shrink-0" />
          <span>
            <strong>Architecture Notice:</strong> This demonstration operates with instant LocalStorage persistence for client review. For production deployment, connect Supabase Auth and execute the SQL migration script located in <code className="text-qc-secondary bg-qc-base px-1 py-0.5 rounded border border-border-strong">supabase/schema.sql</code>.
          </span>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border-base pb-3 overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md font-bold'
                    : 'bg-qc-surface text-qc-body border border-border-base hover:text-qc-primary hover:bg-qc-card'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Views */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <AdminStats />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-500">
                    Latest Reservation Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('reservations')}
                    className="text-xs text-qc-secondary hover:underline uppercase tracking-wider"
                  >
                    View All Reservations &rarr;
                  </button>
                </div>
                <AdminReservations />
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="animate-fade-in">
              <AdminReservations />
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="animate-fade-in">
              <AdminMenu />
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="animate-fade-in">
              <AdminPromotions />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <AdminSettings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
