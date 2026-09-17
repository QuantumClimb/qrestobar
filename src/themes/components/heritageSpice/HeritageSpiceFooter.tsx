import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Lock } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import { Modal } from '../../../components/common/Modal';
import '../../styles/heritageSpice.css';

export const HeritageSpiceFooter: React.FC = () => {
  const { settings } = useData();
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }
    showToast({
      type: 'success',
      title: 'Subscribed to Heritage Culinary Notes',
      message: 'Thank you for subscribing to our seasonal chef menu previews and private tasting invitations.'
    });
    setNewsletterEmail('');
  };

  const colHeadStyle: React.CSSProperties = {
    fontFamily: "'Lato', system-ui, sans-serif",
    fontSize: '0.70rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#C69A4B',
    marginBottom: '1.25rem',
    display: 'block',
    fontWeight: 700,
  };

  return (
    <footer className="bg-[#2B080E] text-[#FFF4DF] pt-16 pb-24 sm:pb-12 relative overflow-hidden border-t border-[#C69A4B]/30 hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <Link to={getThemedPath('/')} className="inline-block focus:outline-none py-1" aria-label="Q - RESTOBAR Homepage">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.24em] text-[#FFF4DF] select-none">
                Q - RESTOBAR
              </span>
              <span className="block text-[9px] tracking-[0.30em] text-[#E89532] font-semibold uppercase -mt-0.5">
                Kuala Lumpur · Heritage
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-light text-[#F8EAD2]/80">
              Celebrated Malaysian culinary heritage elevated through artisanal spice craft, slow-simmered rempahs, and contemporary hospitality in Bukit Bintang.
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
                  className="w-9 h-9 rounded-xs flex items-center justify-center transition-all bg-[#371018] border border-[#C69A4B]/40 text-[#C69A4B] hover:text-[#FFF4DF] hover:bg-[#4A0E18] hover:border-[#E89532]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
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
                    to={getThemedPath(to)}
                    className="flex items-center gap-1.5 transition-colors text-[#F8EAD2]/80 hover:text-[#C69A4B]"
                  >
                    <span>{label}</span>
                    {badge && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-xs bg-[#E89532]/20 text-[#C69A4B] border border-[#C69A4B]/40">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}

              {/* Staff Access / CMS Demo Link */}
              <li className="pt-3 border-t border-[#C69A4B]/20 mt-3">
                <Link
                  to="/admin/login"
                  className="group inline-flex items-center gap-2 transition-colors text-[#F8EAD2]/80 hover:text-[#C69A4B] focus:outline-none rounded py-0.5"
                  title="CMS Demo & Staff Access Gate"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C69A4B] group-hover:text-[#E89532] transition-colors shrink-0" />
                  <span className="font-medium text-xs">CMS Demo</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-xs bg-[#371018] text-[#C69A4B] border border-[#C69A4B]/40">
                    Staff Login
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact */}
          <div>
            <span style={colHeadStyle}>Hours & Contact</span>
            <div className="space-y-3.5 text-xs text-[#F8EAD2]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-[#C69A4B]" />
                <div>
                  <p className="font-medium text-[#FFF4DF]">{settings.openingHoursDisplay || 'Daily: 12:00 PM to 12:00 AM'}</p>
                  <p className="text-[11px] mt-0.5 text-[#F8EAD2]/60">Kitchen closes 10:30 PM (Sun–Thu) / 11:30 PM (Fri–Sat)</p>
                </div>
              </div>
              {settings.addressLine1 && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#C69A4B]" />
                  <div>
                    <p className="font-medium text-[#FFF4DF]">{settings.addressLine1}</p>
                    <p className="text-[11px] text-[#F8EAD2]/60">{settings.city}{settings.postcode ? `, ${settings.postcode}` : ''}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-[#C69A4B]" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="transition-colors text-[#F8EAD2]/80 hover:text-[#C69A4B]"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-[#C69A4B]" />
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors text-[#F8EAD2]/80 hover:text-[#C69A4B]"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <span style={colHeadStyle}>Private Invitations</span>
            <p className="text-xs mb-4 leading-relaxed font-light text-[#F8EAD2]/80">
              Receive invitations to private seasonal tasting menus, heirloom recipe unveilings, and weekend dining highlights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xs pr-10 bg-[#371018] border border-[#C69A4B]/40 text-[#FFF4DF] placeholder-[#F8EAD2]/40 focus:outline-none focus:border-[#C69A4B]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-xs flex items-center justify-center transition-all bg-[#C69A4B] text-[#2B080E] hover:bg-[#E89532] hover:text-white"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-[#F8EAD2]/50">Demonstration newsletter form. No spam.</p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8EAD2]/60 border-t border-[#C69A4B]/20">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <p>© {new Date().getFullYear()} Q-RESTOBAR. All rights reserved.</p>
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="underline transition-colors hover:text-[#C69A4B]"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="underline transition-colors hover:text-[#C69A4B]"
            >
              Terms of Service
            </button>
            <Link
              to="/admin/login"
              className="underline transition-colors hover:text-[#C69A4B]"
            >
              Staff Login
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Concept Website by </span>
            <span className="text-[#C69A4B] font-semibold">Quantum Climb</span>
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
