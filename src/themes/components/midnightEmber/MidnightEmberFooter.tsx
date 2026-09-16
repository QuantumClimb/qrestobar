import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Lock } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { Modal } from '../../../components/common/Modal';

export const MidnightEmberFooter: React.FC = () => {
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
    showToast({
      type: 'success',
      title: 'Joined The Ember Circle',
      message: 'Thank you for subscribing to our private tastings and chef masterclasses.'
    });
    setNewsletterEmail('');
  };

  const getThemedPath = (path: string) => {
    if (import.meta.env.DEV) {
      return `${path}?siteThemePreview=midnight-ember`;
    }
    return path;
  };

  return (
    <footer className="bg-[#0D0B0A] text-[#F5EFE6] pt-20 pb-12 border-t border-[#D8AA5B]/25 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#D8662C]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-5">
            <Link to={getThemedPath('/')} className="inline-block focus:outline-none">
              <span className="font-serif text-2xl font-bold tracking-[0.24em] text-[#F5EFE6] select-none">
                Q - RESTOBAR
              </span>
              <span className="block text-[9px] tracking-[0.32em] text-[#D8662C] font-semibold uppercase mt-0.5">
                Kuala Lumpur · Bukit Bintang
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#CFC3B5] font-light">
              Modern Malaysian dining reimagined with smoky artisanal charcoal craft, botanical mixology, and late-night vinyl warmth.
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
                  className="w-9 h-9 rounded bg-[#1A1613] border border-[#D8AA5B]/30 text-[#CFC3B5] hover:text-[#D8AA5B] hover:border-[#D8662C] flex items-center justify-center transition-all shadow-md"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.20em] text-[#D8AA5B] font-semibold block mb-5">
              Explore
            </span>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Artisanal Menu' },
                { to: '/reservations', label: 'Table Reservations' },
                { to: '/experiences', label: 'VIP Experiences Hub' },
                { to: '/offers', label: 'Offers & Tasting Events' },
                { to: '/about', label: 'Our Culinary Heritage' },
                { to: '/contact', label: 'Contact & Location' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={getThemedPath(item.to)}
                    className="text-[#CFC3B5] hover:text-[#D8AA5B] transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.20em] text-[#D8AA5B] font-semibold block mb-5">
              Hours &amp; Location
            </span>
            <div className="space-y-3 text-xs text-[#CFC3B5] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8662C] shrink-0 mt-0.5" />
                <span>Bukit Bintang, 55100 Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D8662C] shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#F5EFE6]">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D8662C] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#F5EFE6]">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#D8662C] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F5EFE6] font-medium">{settings.openingHoursDisplay}</p>
                  <p className="text-[11px] text-[#94877A] mt-0.5">{settings.dressCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.20em] text-[#D8AA5B] font-semibold block mb-2">
              The Ember Gazette
            </span>
            <p className="text-xs text-[#CFC3B5] leading-relaxed font-light">
              Subscribe for private dining releases, omakase cocktail seatings, and seasonal spice previews.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#1A1613] border border-[#D8AA5B]/30 px-3.5 py-2.5 text-xs text-[#F5EFE6] rounded-sm focus:border-[#D8662C] focus:outline-none placeholder-[#88796B]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#D8662C] hover:bg-[#E47B3D] text-white rounded-xs transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-[#94877A]">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-8 border-t border-[#D8AA5B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94877A]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Q-RESTOBAR. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#D8AA5B] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-[#D8AA5B] transition-colors"
            >
              Terms of Service
            </button>
            <Link
              to="/admin/login"
              className="hover:text-[#D8AA5B] transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <Modal
          isOpen={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
          title="Privacy Policy"
          subtitle="Q-RESTOBAR Customer Privacy & Data Protection"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs leading-relaxed text-[#CFC3B5] max-h-[60vh] overflow-y-auto pr-2">
            <p>At Q-RESTOBAR, we are committed to safeguarding the privacy and personal data of our guests.</p>
            <h4 className="text-sm font-semibold text-[#F5EFE6]">1. Data Collection</h4>
            <p>We collect personal information necessary to manage reservations, dietary preferences, and contact information.</p>
            <h4 className="text-sm font-semibold text-[#F5EFE6]">2. Usage &amp; Security</h4>
            <p>Your details are never sold to third parties and are encrypted in transit and at rest.</p>
          </div>
        </Modal>
      )}

      {/* Terms of Service Modal */}
      {termsModalOpen && (
        <Modal
          isOpen={termsModalOpen}
          onClose={() => setTermsModalOpen(false)}
          title="Terms of Service"
          subtitle="Dining & Reservation Policies"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs leading-relaxed text-[#CFC3B5] max-h-[60vh] overflow-y-auto pr-2">
            <p>Welcome to Q-RESTOBAR. By booking a reservation or dining with us, you agree to our policies.</p>
            <h4 className="text-sm font-semibold text-[#F5EFE6]">1. Table Holding Time</h4>
            <p>Tables are held for up to 15 minutes past the confirmed reservation time.</p>
            <h4 className="text-sm font-semibold text-[#F5EFE6]">2. Dress Code</h4>
            <p>We kindly request smart casual attire in the evening.</p>
          </div>
        </Modal>
      )}
    </footer>
  );
};
