import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Calendar, Flame } from 'lucide-react';
import { useData } from '../../../context/DataContext';

export const MidnightEmberHeader: React.FC = () => {
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

  const getThemedPath = (path: string) => {
    if (import.meta.env.DEV) {
      return `${path}?siteThemePreview=midnight-ember`;
    }
    return path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
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
          className="text-xs py-2 px-4 text-center tracking-wider relative z-50 transition-colors"
          style={{
            background: 'linear-gradient(90deg, #1A0D06 0%, #7C2D12 50%, #2A1208 100%)',
            borderBottom: '1px solid rgba(216, 170, 91, 0.35)',
            boxShadow: '0 2px 14px rgba(216, 102, 44, 0.20)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-[#F5EFE6]">
            <Flame className="w-3.5 h-3.5 text-[#D8662C] shrink-0" />
            <span className="font-light">{settings.announcementBarText}</span>
            <Link
              to={getThemedPath('/reservations')}
              className="font-bold underline ml-1 text-[#D8AA5B] hover:text-[#E47B3D] transition-colors hidden sm:inline"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      {/* Main Midnight Ember Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#101010]/95 backdrop-blur-md border-b border-[#D8AA5B]/20 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-[#0A0908]/90 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              to={getThemedPath('/')}
              className="group flex flex-col focus:outline-none rounded py-1 px-1.5 shrink-0"
              aria-label="Q - RESTOBAR Homepage"
            >
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.24em] text-[#F5EFE6] group-hover:text-[#D8AA5B] transition-colors select-none">
                Q - RESTOBAR
              </span>
              <span className="text-[9px] tracking-[0.30em] text-[#D8662C] font-semibold uppercase -mt-0.5">
                Kuala Lumpur
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={getThemedPath(link.path)}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.18em] font-medium transition-all relative py-1 whitespace-nowrap ${
                      isActive
                        ? 'text-[#D8AA5B] font-bold'
                        : 'text-[#CFC3B5] hover:text-[#F5EFE6]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#D8662C]/20 text-[#D8AA5B] border border-[#D8AA5B]/40">
                          {link.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D8662C] to-[#D8AA5B] rounded-full" />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to={getThemedPath('/reservations')}
                className="me-btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to={getThemedPath('/reservations')}
                className="me-btn-primary text-[11px] px-3.5 py-2 flex items-center gap-1.5 mr-1"
              >
                <span>Book</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#CFC3B5] hover:text-[#F5EFE6] border border-[#D8AA5B]/30 rounded bg-[#1A1613]/80 focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#14110F]/98 border-b border-[#D8AA5B]/30 backdrop-blur-xl px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-fade-in">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={getThemedPath(link.path)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded text-sm uppercase tracking-[0.16em] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#D8662C]/15 text-[#D8AA5B] font-bold border-l-2 border-[#D8AA5B]'
                        : 'text-[#CFC3B5] hover:text-[#F5EFE6] hover:bg-[#1A1613]'
                    }`
                  }
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#D8662C]/20 text-[#D8AA5B] border border-[#D8AA5B]/40">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D8AA5B]/20">
              <Link
                to={getThemedPath('/reservations')}
                className="me-btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
