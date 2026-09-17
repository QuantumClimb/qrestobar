import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Calendar, Leaf, Lock } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useData();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close mobile menu
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

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'botanical-bistro');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Experiences', path: '/experiences', badge: 'Botanical VIP' },
    { name: 'Offers & Events', path: '/offers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      {settings.announcementBarActive && settings.announcementBarText && (
        <div
          className="text-xs py-2 px-3 sm:px-4 text-center tracking-wider relative z-50 transition-colors break-words overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #3F6B4F 0%, #24352A 50%, #3F6B4F 100%)',
            borderBottom: '1px solid rgba(63, 107, 79, 0.35)',
            boxShadow: '0 2px 14px rgba(63, 107, 79, 0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-[#FCFAF4] leading-snug">
            <Leaf className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
            <span className="font-light text-[11px] sm:text-xs text-center">{settings.announcementBarText}</span>
            <Link
              to={getThemedPath('/reservations')}
              className="font-bold underline ml-1 text-[#F4F1E8] hover:text-[#A3E635] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      {/* Main Botanical Bistro Sticky Header */}
      <header
        className={`sticky top-0 z-50 relative transition-all duration-300 w-full max-w-full box-border min-w-0 ${
          isScrolled
            ? 'py-3.5 bg-[#F4F1E8]/95 backdrop-blur-md border-b border-[#3F6B4F]/25 shadow-md'
            : 'py-4 xl:py-5 bg-gradient-to-b from-[#F4F1E8]/95 via-[#F4F1E8]/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full box-border min-w-0">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4 min-w-0 w-full box-border">
            {/* Brand Logo */}
            <Link
              to={getThemedPath('/')}
              className="group flex flex-col focus:outline-none rounded py-1 px-1 min-w-0 shrink max-w-[50%] sm:max-w-none"
              aria-label="Q - RESTOBAR Homepage"
            >
              <span className="bb-font-display text-base sm:text-2xl xl:text-3xl font-bold tracking-[0.12em] sm:tracking-[0.20em] text-[#24352A] group-hover:text-[#3F6B4F] transition-colors select-none truncate block">
                Q - RESTOBAR
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.20em] sm:tracking-[0.30em] text-[#3F6B4F] font-semibold uppercase -mt-0.5 sm:-mt-1 font-sans truncate block">
                Kuala Lumpur
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={getThemedPath(link.path)}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.14em] font-medium transition-all relative py-1 whitespace-nowrap ${
                      isActive
                        ? 'text-[#3F6B4F] font-bold'
                        : 'text-[#556257] hover:text-[#24352A]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      {link.name}
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#3F6B4F]/15 text-[#3F6B4F] font-mono border border-[#3F6B4F]/30 font-semibold">
                          {link.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3F6B4F] rounded-full" />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden xl:flex items-center gap-4">
              <Link
                to={getThemedPath('/admin/login')}
                className="text-xs text-[#7B877E] hover:text-[#24352A] flex items-center gap-1 transition-colors px-2 py-1 font-mono"
                title="Staff & Management Access"
              >
                <Lock className="w-3 h-3 text-[#3F6B4F]" />
                <span>Staff Access</span>
              </Link>

              <Link
                to={getThemedPath('/reservations')}
                className="bb-btn-primary px-5 py-2.5 text-xs font-bold"
              >
                <Calendar className="w-3.5 h-3.5 mr-2" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden ml-auto shrink-0">
              <Link
                to={getThemedPath('/reservations')}
                className="bb-btn-primary px-2.5 sm:px-3 py-2 text-[11px] font-bold flex items-center gap-1.5 shrink-0 min-h-[44px] justify-center"
                title="Reserve a Table"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden min-[360px]:inline">RESERVE</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xs border border-[#3F6B4F]/30 bg-[#FCFAF4] text-[#24352A] hover:text-[#3F6B4F] hover:border-[#3F6B4F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3F6B4F] w-[44px] h-[44px] shrink-0 flex items-center justify-center cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer-bb"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer-bb"
            className="xl:hidden absolute top-full left-0 right-0 w-full max-w-[100vw] z-[60] bg-[#F4F1E8] border-b border-[#3F6B4F]/30 backdrop-blur-xl px-5 pt-4 pb-6 space-y-4 shadow-2xl animate-fade-in max-h-[calc(100vh-75px)] overflow-y-auto box-border text-[#24352A]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={getThemedPath(link.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block min-h-[44px] px-4 py-2.5 rounded text-sm uppercase tracking-[0.16em] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#3F6B4F] text-white font-bold'
                        : 'text-[#24352A] hover:text-[#3F6B4F] hover:bg-[#FCFAF4]'
                    }`
                  }
                >
                  <div className="flex items-center justify-between h-full">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#3F6B4F]/15 text-[#3F6B4F]">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer Action Buttons */}
            <div className="pt-3 border-t border-[#3F6B4F]/20 flex flex-col gap-2.5">
              <Link
                to={getThemedPath('/reservations')}
                onClick={() => setMobileMenuOpen(false)}
                className="bb-btn-primary w-full py-3 min-h-[44px] text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Staff CMS Demo Access Section */}
            <div className="pt-3 border-t border-[#3F6B4F]/20 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#7B877E]">Staff Access</p>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xs border border-[#3F6B4F]/40 bg-[#FCFAF4] hover:bg-[#F4F1E8] text-[#24352A] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-[#3F6B4F]" />
                <span>CMS Demo</span>
              </Link>
            </div>

            {/* Mobile Footer Meta */}
            <div className="text-center pt-4 text-xs text-[#7B877E] space-y-1 border-t border-[#3F6B4F]/10">
              <p className="text-[#3F6B4F] font-medium">{settings.openingHoursDisplay}</p>
              {(settings.addressLine1 || settings.city) && (
                <p>{[settings.addressLine1, settings.city].filter(Boolean).join(', ')}</p>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
