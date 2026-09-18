import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Calendar, Lock, Zap } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/urbanNeon.css';

export const UrbanNeonHeader: React.FC = () => {
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

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'urban-neon');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Experiences', path: '/experiences', badge: 'NEON VIP' },
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
            background: 'linear-gradient(90deg, #090B18 0%, #EC4899 50%, #20E3D2 100%)',
            borderBottom: '1px solid rgba(32, 227, 210, 0.40)',
            boxShadow: '0 0 15px rgba(236, 72, 153, 0.25)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-white leading-snug">
            <Zap className="w-3.5 h-3.5 text-[#20E3D2] shrink-0" />
            <span className="font-light text-[11px] sm:text-xs text-center">{settings.announcementBarText}</span>
            <Link
              to={getThemedPath('/reservations')}
              className="font-bold underline ml-1 text-[#20E3D2] hover:text-[#EC4899] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              Book Table
            </Link>
          </div>
        </div>
      )}

      {/* Main Urban Neon Sticky Header */}
      <header
        className={`sticky top-0 z-50 relative transition-all duration-300 w-full max-w-full box-border min-w-0 ${
          isScrolled
            ? 'py-3 bg-[#090B18]/95 backdrop-blur-md border-b border-[#20E3D2]/30 shadow-[0_4px_20px_rgba(32,227,210,0.15)]'
            : 'py-4 xl:py-5 bg-gradient-to-b from-[#090B18]/95 via-[#090B18]/80 to-transparent'
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
              <span className="un-font-display text-lg sm:text-2xl xl:text-3xl font-bold tracking-[0.15em] sm:tracking-[0.22em] text-white group-hover:text-[#20E3D2] transition-colors select-none truncate block drop-shadow-[0_0_8px_rgba(32,227,210,0.5)]">
                Q - RESTOBAR
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] text-[#EC4899] font-bold uppercase -mt-0.5 sm:-mt-1 font-sans truncate block">
                BUKIT BINTANG NIGHTLIFE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={getThemedPath(link.path)}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.16em] font-medium transition-all relative py-1 whitespace-nowrap un-font-display ${
                      isActive
                        ? 'text-[#20E3D2] font-bold drop-shadow-[0_0_8px_rgba(32,227,210,0.6)]'
                        : 'text-gray-300 hover:text-[#EC4899]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      {link.name}
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/40 font-bold uppercase tracking-wider">
                          {link.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#20E3D2] rounded-full shadow-[0_0_10px_#20E3D2]" />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden xl:flex items-center gap-4">
              <Link
                to="/admin/login"
                className="text-xs text-gray-400 hover:text-[#20E3D2] flex items-center gap-1.5 transition-colors px-2.5 py-1.5 font-mono border border-white/10 rounded hover:border-[#20E3D2]/40"
                title="Staff & Management Access"
              >
                <Lock className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Staff Access</span>
              </Link>

              <Link
                to={getThemedPath('/reservations')}
                className="un-btn-cyan px-5 py-2.5 text-xs font-bold flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden ml-auto shrink-0">
              <Link
                to={getThemedPath('/reservations')}
                className="un-btn-cyan px-2.5 sm:px-3 py-2 text-[11px] font-bold flex items-center gap-1.5 shrink-0 min-h-[44px] justify-center"
                title="Reserve a Table"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden min-[360px]:inline">RESERVE</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded border border-[#20E3D2]/40 bg-[#111827] text-white hover:text-[#20E3D2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20E3D2] w-[44px] h-[44px] shrink-0 flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(32,227,210,0.2)]"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer-un"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#EC4899]" /> : <MenuIcon className="w-6 h-6 text-[#20E3D2]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer-un"
            className="xl:hidden absolute top-full left-0 right-0 w-full max-w-[100vw] z-[60] bg-[#090B18] border-b border-[#20E3D2]/40 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)] animate-fade-in max-h-[calc(100vh-75px)] overflow-y-auto box-border text-white"
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
                    `block min-h-[44px] px-4 py-2.5 rounded text-sm uppercase tracking-[0.16em] font-medium transition-colors un-font-display ${
                      isActive
                        ? 'bg-[#20E3D2] text-[#090B18] font-bold shadow-[0_0_15px_rgba(32,227,210,0.4)]'
                        : 'text-gray-200 hover:text-[#20E3D2] hover:bg-[#111827]'
                    }`
                  }
                >
                  <div className="flex items-center justify-between h-full">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/40">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                to={getThemedPath('/reservations')}
                onClick={() => setMobileMenuOpen(false)}
                className="un-btn-cyan w-full py-3 min-h-[44px] text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Staff Access Section */}
            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest font-mono text-gray-400">Staff Access</p>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded border border-[#EC4899]/40 bg-[#111827] hover:bg-[#1F293D] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>CMS Demo / Staff Access</span>
              </Link>
            </div>

            {/* Mobile Footer Meta */}
            <div className="text-center pt-4 text-xs text-gray-400 space-y-1 border-t border-white/10">
              <p className="text-[#20E3D2] font-medium">{settings.openingHoursDisplay}</p>
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

export default UrbanNeonHeader;
