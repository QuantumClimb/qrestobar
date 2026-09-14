import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Calendar, Phone, Zap } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useData();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

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
      {settings.announcementBarActive && settings.announcementBarText && (
        <div
          className="text-xs py-1.5 px-4 text-center tracking-wider relative z-50 transition-colors"
          style={{
            background: 'linear-gradient(90deg, #17002B 0%, #4B00B5 50%, #25005C 100%)',
            borderBottom: '1px solid rgba(129, 76, 255, 0.40)',
            boxShadow: '0 2px 14px rgba(91, 33, 255, 0.16)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <Zap className="w-3 h-3 text-purple-400 shrink-0" />
            <span className="font-light" style={{ color: '#F5F5F7' }}>
              {settings.announcementBarText}
            </span>
            <Link
              to="/reservations"
              className="font-semibold underline ml-1 hidden sm:inline"
              style={{ color: '#C084FC' }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'py-3 border-b' : 'py-5'}`}
        style={{
          backgroundColor: isScrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: isScrolled ? 'var(--border-default)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Classic Serif Text Logo */}
            <Link
              to="/"
              className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded py-1 px-1.5"
              aria-label="Q - RESTOBAR Homepage"
            >
              <span
                className="font-serif text-lg sm:text-xl font-semibold tracking-[0.22em] select-none transition-colors duration-200"
                style={{ color: 'var(--logo-text-color)' }}
              >
                Q - RESTOBAR
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `text-xs uppercase tracking-[0.14em] font-medium font-display transition-colors relative py-1 ${isActive ? 'text-qc-primary font-semibold' : 'text-qc-body hover:text-qc-primary'}`}
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span
                          className="text-[9px] uppercase tracking-wider font-bold px-1.5 rounded"
                          style={{
                            background: 'var(--accent-surface)',
                            color: 'var(--accent-primary)',
                            border: '1px solid var(--accent-primary)',
                            paddingTop: '1px',
                            paddingBottom: '1px',
                          }}
                        >
                          {link.badge}
                        </span>
                      )}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                          style={{ background: 'var(--accent-primary)' }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Right Actions (Phone + Theme Toggle + Reserve Button) */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2 text-xs flex items-center gap-1.5 transition-colors text-qc-body hover:text-qc-primary"
                title={`Call ${settings.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-qc-muted" />
                <span className="hidden lg:inline">{settings.phone}</span>
              </a>

              <ThemeToggle />

              <Link to="/reservations" className="btn-gold text-xs px-5 py-2.5 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Mobile Actions (Theme Toggle + Quick Reserve + Hamburger) */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />

              <Link to="/reservations" className="btn-gold px-3.5 py-2 text-[11px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors text-qc-secondary hover:text-qc-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-purple-400" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden animate-fade-in flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto transition-colors"
          style={{
            backgroundColor: 'var(--mobile-menu-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6 text-center">
            <div className="pb-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
              <p className="qc-label-purple mb-1">Modern Malaysian Dining</p>
              <p className="text-sm text-qc-body">Bukit Bintang, Kuala Lumpur</p>
            </div>

            <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `text-lg tracking-wider uppercase font-display font-semibold transition-colors flex items-center justify-center gap-2 ${isActive ? 'text-qc-primary' : 'text-qc-secondary hover:text-qc-primary'}`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{
                        background: 'var(--accent-surface)',
                        color: 'var(--accent-primary)',
                        border: '1px solid var(--accent-primary)',
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Drawer Theme Toggle & Action Buttons */}
            <div className="pt-4 flex flex-col gap-3 max-w-xs mx-auto w-full">
              <div className="flex items-center justify-center gap-2 pb-2">
                <ThemeToggle showLabel={true} className="w-full" />
              </div>

              <Link to="/reservations" className="btn-gold w-full text-center py-3.5 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </Link>
              <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="btn-gold-outline w-full text-center py-3 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>

          <div className="text-center pt-8 text-xs text-qc-muted" style={{ borderTop: '1px solid var(--border-default)' }}>
            <p className="text-qc-secondary font-medium mb-1">{settings.openingHoursDisplay}</p>
            {(settings.addressLine1 || settings.city) && (
              <p>{[settings.addressLine1, settings.city].filter(Boolean).join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
