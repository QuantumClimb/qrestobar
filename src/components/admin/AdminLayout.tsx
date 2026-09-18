import React, { useState, useEffect } from 'react';
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
  User as UserIcon,
  Menu as MenuIcon,
  X
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  // Close mobile menu on ESC key or tab change
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

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
            <Link to="/" className="flex flex-col focus:outline-none py-1" aria-label="Q - RESTOBAR Homepage">
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

          {/* Desktop Right Controls (hidden on small screens < md) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {/* User Profile Pill */}
            {userEmail && (
              <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 bg-qc-base border border-border-default rounded text-[11px] text-qc-body">
                <UserIcon className="w-3 h-3 text-purple-400" />
                <span className="font-mono">{userEmail}</span>
              </div>
            )}

            <ThemeToggle />

            {isDemoMode && (
              <button
                onClick={resetDemoData}
                className="text-qc-body hover:text-qc-primary text-xs px-2.5 py-2 border border-border-strong rounded hidden xl:flex items-center gap-1.5 transition-colors min-h-[44px]"
                title="Reset all demo records"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            )}

            {/* Desktop VIEW WEBSITE button */}
            <Link
              to="/"
              className="btn-gold-outline text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[44px] font-bold uppercase tracking-wider whitespace-nowrap"
              title="View Public Website"
            >
              <span>VIEW WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <a
              href="/downloads/Q-RESTOBAR_CMS_FAQ_Feature_Guide.pdf"
              download="Q-RESTOBAR_CMS_FAQ_Feature_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[44px] bg-qc-surface text-qc-primary border border-purple-500/40 hover:border-purple-500 hover:bg-purple-950/20 hover:text-purple-300 rounded font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 select-none whitespace-nowrap"
              title="Download QRestoBar CMS FAQ and Feature Guide PDF"
              aria-label="Download QRestoBar CMS FAQ and Feature Guide PDF"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>
                <span className="hidden xl:inline">CMS </span>GUIDE
              </span>
            </a>

            <button
              onClick={handleLogout}
              className="btn-gold text-xs px-3.5 py-2 flex items-center gap-1.5 min-h-[44px] cursor-pointer"
              title="End Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Right Controls (< md) */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/"
              className="btn-gold-outline text-xs px-2.5 py-1.5 flex items-center gap-1 min-h-[44px] font-bold uppercase tracking-wider shrink-0"
              title="View Public Website"
            >
              <span>WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-border-strong bg-qc-base text-qc-primary hover:bg-qc-surface transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Close CMS Menu' : 'Open CMS Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-qc-surface border-b border-border-base px-4 pt-3 pb-5 space-y-4 animate-fade-in shadow-xl">
            {/* User Info & Theme Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-border-base/60">
              {userEmail ? (
                <div className="flex items-center gap-1.5 text-xs text-qc-body font-mono truncate max-w-[200px]">
                  <UserIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{userEmail}</span>
                </div>
              ) : (
                <span className="text-xs text-qc-body font-mono">CMS Administrator</span>
              )}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation Tabs */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-qc-body px-1">Navigation</span>
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all text-left ${
                      isActive
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-qc-body hover:text-qc-primary hover:bg-qc-base'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions Section in Mobile Menu */}
            <div className="pt-3 border-t border-border-base/60 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-qc-body px-1">Actions</span>
              
              {/* Back to Website Button */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] px-4 py-3 rounded btn-gold-outline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Back to Website</span>
              </Link>

              {isDemoMode && (
                <button
                  onClick={() => {
                    resetDemoData();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded border border-border-strong text-qc-body hover:text-qc-primary bg-qc-base text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Demo Data</span>
                </button>
              )}

              <a
                href="/downloads/Q-RESTOBAR_CMS_FAQ_Feature_Guide.pdf"
                download="Q-RESTOBAR_CMS_FAQ_Feature_Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] px-4 py-2.5 rounded border border-purple-500/40 bg-qc-base text-qc-primary text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>CMS Feature Guide</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
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

