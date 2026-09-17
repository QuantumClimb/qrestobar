import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Calendar, Flame, Lock } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceHeader: React.FC = () => {
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

  // Close drawer on Escape key press
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

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Experiences', path: '/experiences', badge: 'VIP' },
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
            background: 'linear-gradient(90deg, #2B080E 0%, #4A0E18 50%, #2B080E 100%)',
            borderBottom: '1px solid rgba(198, 154, 75, 0.40)',
            boxShadow: '0 2px 14px rgba(198, 154, 75, 0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-[#FFF4DF] leading-snug">
            <Flame className="w-3.5 h-3.5 text-[#E89532] shrink-0" />
            <span className="font-light text-[11px] sm:text-xs text-center">{settings.announcementBarText}</span>
            <Link
              to={getThemedPath('/reservations')}
              className="font-bold underline ml-1 text-[#C69A4B] hover:text-[#E89532] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}


      {/* Main Heritage Spice Sticky Header */}
      <header
        className={`sticky top-0 z-50 relative transition-all duration-300 w-full max-w-full box-border min-w-0 ${
          isScrolled
            ? 'py-3.5 bg-[#2B080E]/95 backdrop-blur-md border-b border-[#C69A4B]/30 shadow-2xl'
            : 'py-4 xl:py-5 bg-gradient-to-b from-[#2B080E]/95 to-transparent'
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
              <span className="font-serif text-base sm:text-xl xl:text-2xl font-semibold tracking-[0.14em] sm:tracking-[0.24em] text-[#FFF4DF] group-hover:text-[#C69A4B] transition-colors select-none truncate block">
                Q - RESTOBAR
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.20em] sm:tracking-[0.30em] text-[#E89532] font-semibold uppercase -mt-0.5 font-sans truncate block">
                Kuala Lumpur
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={getThemedPath(link.path)}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.16em] font-medium transition-all relative py-1 whitespace-nowrap ${
                      isActive
                        ? 'text-[#C69A4B] font-bold'
                        : 'text-[#F8EAD2]/80 hover:text-[#FFF4DF]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#E89532]/20 text-[#C69A4B] border border-[#C69A4B]/40">
                          {link.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E89532] to-[#C69A4B] rounded-full" />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Right Utilities (CMS Demo + Reserve CTA) */}
            <div className="hidden xl:flex items-center gap-3 shrink-0 pl-4 border-l border-[#C69A4B]/25">
              {/* Compact CMS Demo Button */}
              <Link
                to="/admin/login"
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-xs border border-[#C69A4B]/40 bg-[#371018]/90 text-[#FFF4DF] hover:text-[#C69A4B] hover:border-[#C69A4B] hover:bg-[#4A0E18] transition-all whitespace-nowrap flex items-center gap-1.5 min-h-[36px]"
                title="CMS Demo & Staff Access Gate"
              >
                <Lock className="w-3 h-3 text-[#C69A4B]" />
                <span>CMS Demo</span>
              </Link>

              {/* Compact Single-Line Reserve CTA */}
              <Link
                to={getThemedPath('/reservations')}
                className="hs-btn-primary text-xs px-4 py-2 flex items-center gap-1.5 whitespace-nowrap min-h-[36px]"
                title="Reserve a Table"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Reserve</span>
              </Link>
            </div>

            {/* Mobile Header Controls (Quick Reserve + Hamburger) */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden ml-auto shrink-0">
              <Link
                to={getThemedPath('/reservations')}
                className="hs-btn-primary text-[11px] px-2.5 sm:px-3.5 py-1.5 flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[44px] justify-center"
                title="Reserve a Table"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden min-[360px]:inline">RESERVE</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F8EAD2] hover:text-[#FFF4DF] border border-[#C69A4B]/40 rounded bg-[#371018]/80 focus:outline-none w-[44px] h-[44px] shrink-0 flex items-center justify-center cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer-hs"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#C69A4B]" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer-hs"
            className="xl:hidden absolute top-full left-0 right-0 w-full max-w-[100vw] z-[60] bg-[#24060B] border-b border-[#C69A4B]/40 backdrop-blur-xl px-5 pt-4 pb-6 space-y-4 shadow-2xl animate-fade-in max-h-[calc(100vh-75px)] overflow-y-auto box-border"
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
                        ? 'bg-[#C69A4B]/15 text-[#C69A4B] font-bold border-l-2 border-[#C69A4B]'
                        : 'text-[#F8EAD2]/80 hover:text-[#FFF4DF] hover:bg-[#371018]'
                    }`
                  }
                >
                  <div className="flex items-center justify-between h-full">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#E89532]/20 text-[#C69A4B] border border-[#C69A4B]/40">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer Action Buttons */}
            <div className="pt-3 border-t border-[#C69A4B]/20 flex flex-col gap-2.5">
              <Link
                to={getThemedPath('/reservations')}
                onClick={() => setMobileMenuOpen(false)}
                className="hs-btn-primary w-full py-3 min-h-[44px] text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Staff CMS Demo Access Section */}
            <div className="pt-3 border-t border-[#C69A4B]/20 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#F8EAD2]/60">Staff Access</p>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xs border border-[#C69A4B]/40 bg-[#371018] hover:bg-[#4A0E18] text-[#FFF4DF] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-[#C69A4B]" />
                <span>CMS Demo</span>
              </Link>
            </div>

            {/* Mobile Footer Meta */}
            <div className="text-center pt-4 text-xs text-[#F8EAD2]/60 space-y-1 border-t border-[#C69A4B]/10">
              <p className="text-[#C69A4B] font-medium">{settings.openingHoursDisplay}</p>
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
