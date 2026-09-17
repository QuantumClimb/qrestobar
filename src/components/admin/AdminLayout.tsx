import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Utensils, 
  Sparkles, 
  Palette,
  Settings, 
  ExternalLink, 
  ShieldCheck, 
  Database,
  RotateCcw,
  LogOut,
  BookOpen,
  User as UserIcon
} from 'lucide-react';
import { AdminStats } from './AdminStats';
import { AdminReservations } from './AdminReservations';
import { AdminMenu } from './AdminMenu';
import { AdminPromotions } from './AdminPromotions';
import { AdminThemeStudio } from './AdminThemeStudio';
import { AdminSettings } from './AdminSettings';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';

const VALID_TABS = ['overview', 'reservations', 'menu', 'promotions', 'theme-studio', 'settings'] as const;
type AdminTab = typeof VALID_TABS[number];

export const AdminLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab');
  const activeTab: AdminTab = (rawTab && (VALID_TABS as readonly string[]).includes(rawTab))
    ? (rawTab as AdminTab)
    : 'overview';

  const setActiveTab = (tab: AdminTab) => {
    setSearchParams({ tab });
  };

  const { resetDemoData } = useData();
  const { logout, userEmail, isDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'menu', label: 'Menu & Pricing', icon: Utensils },
    { id: 'promotions', label: 'Offers & Events', icon: Sparkles },
    { id: 'theme-studio', label: 'Theme Studio', icon: Palette },
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
                CMS Dashboard
              </span>
            </Link>

            {/* Database Status Badge */}
            <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 bg-qc-surface border border-emerald-500/40 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider rounded">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Supabase Live Database</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Profile Pill */}
            {userEmail && (
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 bg-qc-base border border-border-default rounded text-[11px] text-qc-body">
                <UserIcon className="w-3 h-3 text-purple-400" />
                <span className="font-mono">{userEmail}</span>
              </div>
            )}

            <ThemeToggle />

            {isDemoMode && (
              <button
                onClick={resetDemoData}
                className="text-qc-body hover:text-qc-primary text-xs px-2.5 py-2 border border-border-strong rounded hidden sm:flex items-center gap-1.5 transition-colors min-h-[38px]"
                title="Reset all demo records"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            )}

            <Link
              to="/"
              className="btn-gold-outline text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[38px]"
              title="View Public Website"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <a
              href="/downloads/Q-RESTOBAR_CMS_FAQ_Feature_Guide.pdf"
              download="Q-RESTOBAR_CMS_FAQ_Feature_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[38px] bg-qc-surface text-qc-primary border border-purple-500/40 hover:border-purple-500 hover:bg-purple-950/20 hover:text-purple-300 rounded font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 select-none"
              title="Download QRestoBar CMS FAQ and Feature Guide PDF"
              aria-label="Download QRestoBar CMS FAQ and Feature Guide PDF"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>
                <span className="hidden sm:inline">CMS </span>GUIDE
              </span>
            </a>

            <button
              onClick={handleLogout}
              className="btn-gold text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[38px] cursor-pointer"
              title="End Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Production Security Notice */}
      <div className="bg-qc-surface/60 border-b border-border-base/80 px-4 py-2 text-[11px] text-qc-body">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            <strong>Cloud Production Mode:</strong> Connected to Supabase PostgreSQL with active Row Level Security (RLS) policies and authentication.
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
                    : 'text-qc-body hover:text-qc-primary hover:bg-qc-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div>
          {activeTab === 'overview' && <AdminStats />}
          {activeTab === 'reservations' && <AdminReservations />}
          {activeTab === 'menu' && <AdminMenu />}
          {activeTab === 'promotions' && <AdminPromotions />}
          {activeTab === 'theme-studio' && <AdminThemeStudio />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
};

