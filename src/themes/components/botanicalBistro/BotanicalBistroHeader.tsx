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
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
        className={`sticky top-0 z-40 transition-all duration-300 w-full max-w-full box-border min-w-0 overflow-x-clip ${
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
              className="group flex flex-col focus:outline-none rounded py-1 px-1 min-w-0 shrink max-w-[55%] sm:max-w-none"
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
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#F4F1E8] border-l border-[#3F6B4F]/30 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 text-[#24352A]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#3F6B4F]/20 pb-4">
                <div>
                  <h3 className="bb-font-display text-lg font-bold text-[#24352A] tracking-wider">
                    Q - RESTOBAR
                  </h3>
                  <span className="text-[10px] text-[#3F6B4F] font-mono tracking-widest uppercase">
                    Botanical Bistro
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xs bg-[#FCFAF4] border border-[#3F6B4F]/30 text-[#24352A] hover:text-[#3F6B4F] focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={getThemedPath(link.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#3F6B4F] text-white font-bold'
                          : 'bg-[#FCFAF4] text-[#24352A] border border-[#3F6B4F]/15 hover:border-[#3F6B4F]/40'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#3F6B4F]/15 text-[#3F6B4F] font-mono">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#3F6B4F]/20 space-y-3">
                <Link
                  to={getThemedPath('/reservations')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bb-btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </Link>

                <Link
                  to={getThemedPath('/admin/login')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bb-btn-outline w-full py-2.5 text-xs font-mono flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#3F6B4F]" />
                  <span>Staff Access / CMS Demo</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#3F6B4F]/20 text-center space-y-1">
              <p className="text-[11px] text-[#7B877E] font-light">
                Bukit Bintang, Kuala Lumpur
              </p>
              <p className="text-[10px] text-[#7B877E]/80 font-mono">
                {settings.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
