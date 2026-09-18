import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useSiteTheme } from '../../context/SiteThemeContext';
import { MidnightEmberFooter } from '../../themes/components/midnightEmber/MidnightEmberFooter';
import { Modal } from './Modal';

const HeritageSpiceFooter = React.lazy(() =>
  import('../../themes/components/heritageSpice/HeritageSpiceFooter').then((m) => ({
    default: m.HeritageSpiceFooter,
  }))
);

const BotanicalBistroFooter = React.lazy(() =>
  import('../../themes/components/botanicalBistro/BotanicalBistroFooter').then((m) => ({
    default: m.BotanicalBistroFooter,
  }))
);

const UrbanNeonFooter = React.lazy(() =>
  import('../../themes/components/urbanNeon/UrbanNeonFooter').then((m) => ({
    default: m.UrbanNeonFooter,
  }))
);

export const Footer: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: render theme-specific footer for Midnight Ember
  if (effectiveThemeId === 'midnight-ember') {
    return <MidnightEmberFooter />;
  }

  // Early branch: render theme-specific footer for Heritage Spice
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="h-24 bg-[#2B080E]" />}>
        <HeritageSpiceFooter />
      </React.Suspense>
    );
  }

  // Early branch: render theme-specific footer for Botanical Bistro
  if (effectiveThemeId === 'botanical-bistro') {
    return (
      <React.Suspense fallback={<div className="h-24 bg-[#E7E3D6]" />}>
        <BotanicalBistroFooter />
      </React.Suspense>
    );
  }

  // Early branch: render theme-specific footer for Urban Neon
  if (effectiveThemeId === 'urban-neon') {
    return (
      <React.Suspense fallback={<div className="h-24 bg-[#090B18]" />}>
        <UrbanNeonFooter />
      </React.Suspense>
    );
  }


  const { settings } = useData();
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }
    showToast({ type: 'success', title: 'Subscribed to The Q-RESTOBAR Gazette', message: 'Thank you for subscribing to our culinary updates and exclusive tasting invitations.' });
    setNewsletterEmail('');
  };

  const colHeadStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.10em',
    textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)',
    marginBottom: '1.25rem',
    display: 'block',
  };

  return (
    <footer
      style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-default)' }}
      className="text-qc-primary pt-16 pb-12 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block focus:outline-none py-1" aria-label="Q - RESTOBAR Homepage">
              <span
                className="font-serif text-xl font-semibold tracking-[0.22em] select-none transition-colors duration-200"
                style={{ color: 'var(--logo-text-color)' }}
              >
                Q - RESTOBAR
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-light text-qc-body">
              Modern Malaysian dining reimagined with local soul, contemporary culinary craft, and vibrant nightlife in Bukit Bintang.
            </p>
            <div className="pt-2 flex items-center gap-3">
              {[
                { href: settings.instagramUrl, label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
                { href: settings.facebookUrl, label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
                { href: settings.tiktokUrl, label: 'TikTok', icon: <span className="text-xs font-bold">TT</span> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent-hover)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span style={colHeadStyle}>Explore</span>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Digital Menu' },
                { to: '/reservations', label: 'Table Reservations' },
                { to: '/experiences', label: 'Experiences Hub', badge: 'VIP' },
                { to: '/offers', label: 'Offers & Events' },
                { to: '/about', label: 'Our Culinary Story' },
                { to: '/contact', label: 'Contact & Location' },
              ].map(({ to, label, badge }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-1.5 transition-colors text-qc-body hover:text-purple-500"
                  >
                    <span>{label}</span>
                    {badge && (
                      <span
                        className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded"
                        style={{
                          background: 'var(--accent-surface)',
                          color: 'var(--accent-primary)',
                          border: '1px solid var(--accent-primary)',
                        }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}

              {/* Separated CMS Demo & Staff Login Access Link */}
              <li className="pt-3 border-t border-border-default/40 mt-3">
                <Link
                  to="/admin/login"
                  className="group inline-flex items-center gap-2 transition-colors text-qc-body hover:text-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded py-0.5"
                  title="CMS Demo & Staff Access Gate"
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300 transition-colors shrink-0" />
                  <span className="font-medium text-xs">CMS Demo</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-600/30">
                    Staff Login
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact */}
          <div>
            <span style={colHeadStyle}>Hours & Contact</span>
            <div className="space-y-3.5 text-xs text-qc-body">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-purple-500" />
                <div>
                  <p className="font-medium text-qc-primary">Daily: 12:00 PM to 12:00 AM</p>
                  <p className="text-[11px] mt-0.5">Kitchen closes 10:30 PM (Sun–Thu) / 11:30 PM (Fri–Sat)</p>
                </div>
              </div>
              {settings.addressLine1 && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-purple-500" />
                  <div>
                    <p className="font-medium text-qc-primary">{settings.addressLine1}</p>
                    <p className="text-[11px]">{settings.city}{settings.postcode ? `, ${settings.postcode}` : ''}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-purple-500" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="transition-colors text-qc-body hover:text-purple-500"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-purple-500" />
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors text-qc-body hover:text-purple-500"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <span style={colHeadStyle}>Private Invitations</span>
            <p className="text-xs mb-4 leading-relaxed font-light text-qc-body">
              Receive private tasting event notifications, seasonal chef menu previews, and weekend brunch updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 text-xs rounded pr-10"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)',
                  }}
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: 'var(--button-primary-bg)',
                    color: 'var(--button-primary-text)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--button-hover-bg)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--button-hover-text)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--button-primary-bg)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--button-primary-text)';
                  }}
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-qc-muted">Demonstration newsletter form. No spam.</p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-qc-muted"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <p>© {new Date().getFullYear()} Q-RESTOBAR. All rights reserved.</p>
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="underline transition-colors hover:text-purple-500"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="underline transition-colors hover:text-purple-500"
            >
              Terms of Service
            </button>
            <Link
              to="/admin/login"
              className="underline transition-colors hover:text-purple-500"
            >
              Staff Login
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Concept Website by </span>
            <span className="text-purple-500 font-semibold">Quantum Climb</span>
          </div>
        </div>
      </div>

      <Modal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} title="Privacy Policy (Demonstration)" subtitle="Q-RESTOBAR">
        <div className="text-xs space-y-3 leading-relaxed text-qc-body">
          <p>This website is a demonstration restaurant application created by <strong className="text-qc-primary">Quantum Climb</strong> to exhibit high-performance web engineering, reservation workflow, and digital menu management.</p>
          <p>Any table reservation details entered in this demo are stored strictly in your local browser storage (LocalStorage) for testing purposes and are not transmitted to third-party commercial marketing databases.</p>
          <p>In a live production deployment, all customer data is protected using encrypted Supabase PostgreSQL storage with Row Level Security (RLS) in strict compliance with the Malaysian Personal Data Protection Act (PDPA).</p>
        </div>
      </Modal>

      <Modal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} title="Terms of Service (Demonstration)" subtitle="Q-RESTOBAR">
        <div className="text-xs space-y-3 leading-relaxed text-qc-body">
          <p><strong className="text-qc-primary">Table Reservations:</strong> All online booking submissions constitute a request for table reservation. Official confirmation is issued upon verification by the restaurant hosting team.</p>
          <p><strong className="text-qc-primary">Menu &amp; Pricing:</strong> All dishes, ingredients, and prices in Malaysian Ringgit (RM) shown on this demonstration platform are subject to seasonal availability and kitchen revision.</p>
          <p><strong className="text-qc-primary">Intellectual Property:</strong> Visual layout, custom components, and software structure are crafted by Quantum Climb.</p>
        </div>
      </Modal>
    </footer>
  );
};
