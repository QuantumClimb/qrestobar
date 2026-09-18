import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Send, Instagram, Facebook, Lock } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import { Modal } from '../../../components/common/Modal';
import '../../styles/urbanNeon.css';

export const UrbanNeonFooter: React.FC = () => {
  const { settings } = useData();
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'urban-neon');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }
    showToast({
      type: 'success',
      title: 'Subscribed to Urban Nightlife Pass',
      message: 'Thank you for joining our VIP list for DJ lineups, event invites, and late-night specials.'
    });
    setNewsletterEmail('');
  };

  const colHeadStyle: React.CSSProperties = {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '0.75rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#20E3D2',
    marginBottom: '1.25rem',
    display: 'block',
    fontWeight: 700,
  };

  return (
    <footer className="bg-[#090B18] text-white pt-16 pb-24 sm:pb-12 relative overflow-hidden border-t border-[#20E3D2]/30 un-font-body">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#20E3D2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EC4899]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <Link to={getThemedPath('/')} className="inline-block focus:outline-none py-1" aria-label="Q - RESTOBAR Homepage">
              <span className="un-font-display text-xl sm:text-2xl font-bold tracking-[0.20em] text-white select-none drop-shadow-[0_0_8px_rgba(32,227,210,0.5)]">
                Q - RESTOBAR
              </span>
              <span className="block text-[9px] tracking-[0.30em] text-[#EC4899] font-bold uppercase -mt-0.5">
                Kuala Lumpur · Urban Neon Nightlife
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-light text-gray-300">
              Bukit Bintang’s electric nightlife sanctuary. Gourmet burgers, charcoal flame grills, craft cocktails, and late-night DJ sets.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-[#111827] border border-[#20E3D2]/40 flex items-center justify-center text-[#20E3D2] hover:bg-[#20E3D2] hover:text-[#090B18] transition-colors shadow-[0_0_10px_rgba(32,227,210,0.2)]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-[#111827] border border-[#20E3D2]/40 flex items-center justify-center text-[#20E3D2] hover:bg-[#20E3D2] hover:text-[#090B18] transition-colors shadow-[0_0_10px_rgba(32,227,210,0.2)]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span style={colHeadStyle}>Explore Venue</span>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link to={getThemedPath('/')} className="hover:text-[#20E3D2] transition-colors">
                  Urban Neon Home
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/menu')} className="hover:text-[#20E3D2] transition-colors">
                  Late-Night &amp; Grill Menu
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/reservations')} className="hover:text-[#20E3D2] transition-colors">
                  Reserve VIP Table
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/experiences')} className="hover:text-[#20E3D2] transition-colors">
                  DJ &amp; Live Music Sessions
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/offers')} className="hover:text-[#20E3D2] transition-colors">
                  Nightlife Offers &amp; Events
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/about')} className="hover:text-[#20E3D2] transition-colors">
                  Our Nightlife Story
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/contact')} className="hover:text-[#20E3D2] transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="space-y-3">
            <span style={colHeadStyle}>Opening Hours &amp; Access</span>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EC4899] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{settings.addressLine1}</p>
                  {settings.addressLine2 && <p>{settings.addressLine2}</p>}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#20E3D2] transition-colors">
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Opening Hours</p>
                  <p>Mon - Fri: {settings.openingHoursWeekday}</p>
                  <p>Sat - Sun: {settings.openingHoursWeekend}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <span style={colHeadStyle}>VIP Nightlife List</span>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Sign up for priority guest list access, DJ event announcements, and exclusive cocktail promotions.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#111827] border border-[#20E3D2]/40 rounded px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#20E3D2] focus:ring-1 focus:ring-[#20E3D2]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#20E3D2] text-[#090B18] font-bold rounded hover:bg-[#14B8A6] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe to VIP list"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Q-RESTOBAR. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#20E3D2] transition-colors underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-[#20E3D2] transition-colors underline"
            >
              Terms of Service
            </button>
            <Link
              to="/admin/login"
              className="hover:text-[#20E3D2] transition-colors flex items-center gap-1 font-mono text-[#EC4899]"
            >
              <Lock className="w-3 h-3 text-[#EC4899]" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      <Modal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} title="Privacy Policy">
        <div className="space-y-4 text-xs text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto">
          <p>
            At Q-RESTOBAR, we respect customer privacy in compliance with Malaysia's Personal Data Protection Act (PDPA).
          </p>
          <h4 className="font-bold text-[#20E3D2]">Information Handling</h4>
          <p>Your name, contact details, and booking information are used strictly to fulfill dining reservations and concierge requests.</p>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} title="Terms of Service">
        <div className="space-y-4 text-xs text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto">
          <p>Welcome to Q-RESTOBAR Urban Neon experience. Reservations are held for 15 minutes past scheduled arrival time.</p>
          <h4 className="font-bold text-[#20E3D2]">Dress Code &amp; Entry</h4>
          <p>{settings.dressCode}</p>
        </div>
      </Modal>
    </footer>
  );
};

export default UrbanNeonFooter;
