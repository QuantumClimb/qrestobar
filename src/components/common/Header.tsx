import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Calendar, Phone, Zap, Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useSiteTheme } from '../../context/SiteThemeContext';
import { MidnightEmberHeader } from '../../themes/components/midnightEmber/MidnightEmberHeader';
import { ThemeToggle } from './ThemeToggle';

const HeritageSpiceHeader = React.lazy(() =>
  import('../../themes/components/heritageSpice/HeritageSpiceHeader').then((m) => ({
    default: m.HeritageSpiceHeader,
  }))
);

const BotanicalBistroHeader = React.lazy(() =>
  import('../../themes/components/botanicalBistro/BotanicalBistroHeader').then((m) => ({
    default: m.BotanicalBistroHeader,
  }))
);

const UrbanNeonHeader = React.lazy(() =>
  import('../../themes/components/urbanNeon/UrbanNeonHeader').then((m) => ({
    default: m.UrbanNeonHeader,
  }))
);

export const Header: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: render theme-specific header for Midnight Ember
  if (effectiveThemeId === 'midnight-ember') {
    return <MidnightEmberHeader />;
  }

  // Early branch: render theme-specific header for Heritage Spice
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="h-20 bg-[#2B080E]" />}>
        <HeritageSpiceHeader />
      </React.Suspense>
    );
  }

  // Early branch: render theme-specific header for Botanical Bistro
  if (effectiveThemeId === 'botanical-bistro') {
    return (
      <React.Suspense fallback={<div className="h-20 bg-[#F4F1E8]" />}>
        <BotanicalBistroHeader />
      </React.Suspense>
    );
  }

  // Early branch: render theme-specific header for Urban Neon
  if (effectiveThemeId === 'urban-neon') {
    return (
      <React.Suspense fallback={<div className="h-20 bg-[#090B18]" />}>
        <UrbanNeonHeader />
      </React.Suspense>
    );
  }


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
          className="text-xs py-1.5 px-3 sm:px-4 text-center tracking-wider relative z-50 transition-colors w-full max-w-full box-border min-w-0 overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #17002B 0%, #4B00B5 50%, #25005C 100%)',
            borderBottom: '1px solid rgba(129, 76, 255, 0.40)',
            boxShadow: '0 2px 14px rgba(91, 33, 255, 0.16)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-center min-w-0 w-full">
            <Zap className="w-3 h-3 text-purple-400 shrink-0" />
            <span className="font-light text-[11px] sm:text-xs" style={{ color: '#F5F5F7' }}>
              {settings.announcementBarText}
            </span>
            <Link
              to="/reservations"
              className="font-semibold underline ml-1 hidden sm:inline text-[11px] sm:text-xs whitespace-nowrap"
              style={{ color: '#C084FC' }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-50 relative transition-all duration-300 w-full max-w-full box-border min-w-0 ${isScrolled ? 'py-3 border-b' : 'py-3.5 lg:py-5'}`}
        style={{
          backgroundColor: isScrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: isScrolled ? 'var(--border-default)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full box-border min-w-0">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4 min-w-0 w-full box-border">
            {/* Classic Serif Text Logo */}
            <Link
              to="/"
              className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded py-1 px-1 min-w-0 shrink max-w-[50%] sm:max-w-none"
              aria-label="Q - RESTOBAR Homepage"
            >
              <span
                className="font-serif text-base sm:text-xl font-semibold tracking-[0.12em] sm:tracking-[0.22em] select-none transition-colors duration-200 truncate block"
                style={{ color: 'var(--logo-text-color)' }}
              >
                Q - RESTOBAR
              </span>
            </Link>

            {/* Desktop Primary Navigation */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 2xl:gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `text-xs uppercase tracking-[0.14em] font-medium font-display transition-colors relative py-1 whitespace-nowrap ${isActive ? 'text-qc-primary font-semibold' : 'text-qc-body hover:text-qc-primary'}`}
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span
                          className="text-[9px] uppercase font-bold tracking-wider px-1.5 rounded"
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

            {/* Desktop Utility Actions */}
            <div
              className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 shrink-0"
              style={{
                marginLeft: '28px',
                paddingLeft: '20px',
                borderLeft: '1px solid var(--border-default)',
              }}
            >
              {/* CMS Demo Access Button */}
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center whitespace-nowrap uppercase font-display font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                style={{
                  minWidth: '92px',
                  height: '42px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--accent-surface)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                title="CMS Demo & Staff Access Gate"
              >
                <span>CMS DEMO</span>
              </Link>

              {/* Telephone */}
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2 text-xs flex items-center gap-1.5 transition-colors text-qc-body hover:text-qc-primary whitespace-nowrap"
                title={`Call ${settings.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-qc-muted shrink-0" />
                <span className="hidden 2xl:inline">{settings.phone}</span>
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Reserve a Table CTA */}
              <Link
                to="/reservations"
                className="btn-gold text-xs px-4 xl:px-5 flex items-center gap-2 whitespace-nowrap h-[42px]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Mobile Actions (Theme Toggle + Quick Reserve + Hamburger) */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
              <ThemeToggle />

              <Link
                to="/reservations"
                className="btn-gold px-2.5 sm:px-3.5 py-1.5 text-[11px] flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[44px] justify-center"
                title="Reserve a Table"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden min-[360px]:inline">RESERVE</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors text-qc-secondary hover:text-qc-primary w-[44px] h-[44px] shrink-0 flex items-center justify-center cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-purple-400" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="absolute top-full left-0 right-0 w-full max-w-[100vw] z-[60] lg:hidden animate-fade-in flex flex-col justify-between pt-4 pb-6 px-5 overflow-y-auto max-h-[calc(100vh-70px)] box-border shadow-2xl border-b border-qc-border"
            style={{
              backgroundColor: '#09090C',
              opacity: 0.99,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col gap-4 text-center">
              <div className="pb-3 border-b border-qc-border">
                <p className="qc-label-purple mb-0.5">Modern Malaysian Dining</p>
                <p className="text-xs text-qc-body">Bukit Bintang, Kuala Lumpur</p>
              </div>

              {/* Primary Mobile Navigation */}
              <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-[44px] px-4 py-2.5 rounded text-sm tracking-wider uppercase font-display font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-purple-900/30 text-qc-primary font-bold border-l-2 border-purple-500'
                          : 'text-qc-secondary hover:text-qc-primary hover:bg-qc-surface'
                      }`
                    }
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
              <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto w-full">
                <div className="flex items-center justify-center gap-2 pb-1">
                  <ThemeToggle showLabel={true} className="w-full min-h-[44px]" />
                </div>

                <Link
                  to="/reservations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-gold w-full text-center py-3 min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Reserve a Table</span>
                </Link>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="btn-gold-outline w-full text-center py-2.5 min-h-[44px] flex items-center justify-center gap-2 text-xs"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>

              {/* Staff CMS Demo Access Link */}
              <div className="pt-3 border-t border-qc-border max-w-xs mx-auto w-full space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest font-mono text-qc-muted">Staff Access</p>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded border border-qc-border-strong bg-transparent hover:border-purple-500 hover:bg-purple-600/10 text-qc-primary text-xs font-display font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>CMS DEMO</span>
                </Link>
              </div>
            </div>

            <div className="text-center pt-4 text-xs text-qc-muted space-y-1 border-t border-qc-border mt-4">
              <p className="text-qc-secondary font-medium mb-0.5">{settings.openingHoursDisplay}</p>
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
