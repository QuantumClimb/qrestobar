import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Send, Instagram, Facebook, Lock } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import { Modal } from '../../../components/common/Modal';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroFooter: React.FC = () => {
  const { settings } = useData();
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const getThemedPath = (path: string) => withSiteThemePreview(path, 'botanical-bistro');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }
    showToast({
      type: 'success',
      title: 'Subscribed to Botanical Journal',
      message: 'Thank you for subscribing to our seasonal garden menu updates and culinary events.'
    });
    setNewsletterEmail('');
  };

  const colHeadStyle: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '0.70rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#3F6B4F',
    marginBottom: '1.25rem',
    display: 'block',
    fontWeight: 700,
  };

  return (
    <footer className="bg-[#E7E3D6] text-[#24352A] pt-16 pb-24 sm:pb-12 relative overflow-hidden border-t border-[#3F6B4F]/25 bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <Link to={getThemedPath('/')} className="inline-block focus:outline-none py-1" aria-label="Q - RESTOBAR Homepage">
              <span className="bb-font-display text-xl sm:text-2xl font-bold tracking-[0.20em] text-[#24352A] select-none">
                Q - RESTOBAR
              </span>
              <span className="block text-[9px] tracking-[0.30em] text-[#3F6B4F] font-semibold uppercase -mt-0.5">
                Kuala Lumpur · Botanical Bistro
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-light text-[#556257]">
              An upscale garden dining sanctuary in Bukit Bintang. Fresh botanical ingredients, wood-fired flavors, and vibrant artisan mixology.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xs bg-[#FCFAF4] border border-[#3F6B4F]/30 flex items-center justify-center text-[#3F6B4F] hover:bg-[#3F6B4F] hover:text-white transition-colors"
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
                  className="w-8 h-8 rounded-xs bg-[#FCFAF4] border border-[#3F6B4F]/30 flex items-center justify-center text-[#3F6B4F] hover:bg-[#3F6B4F] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span style={colHeadStyle}>Explore</span>
            <ul className="space-y-2.5 text-xs text-[#556257]">
              <li>
                <Link to={getThemedPath('/')} className="hover:text-[#3F6B4F] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/menu')} className="hover:text-[#3F6B4F] transition-colors">
                  Culinary &amp; Botanical Menu
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/reservations')} className="hover:text-[#3F6B4F] transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/experiences')} className="hover:text-[#3F6B4F] transition-colors">
                  Private Dining &amp; Experiences
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/offers')} className="hover:text-[#3F6B4F] transition-colors">
                  Offers &amp; Events
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/about')} className="hover:text-[#3F6B4F] transition-colors">
                  Our Garden Story
                </Link>
              </li>
              <li>
                <Link to={getThemedPath('/contact')} className="hover:text-[#3F6B4F] transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="space-y-3">
            <span style={colHeadStyle}>Hours &amp; Location</span>
            <div className="space-y-3 text-xs text-[#556257]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#24352A] font-semibold">{settings.addressLine1}</p>
                  {settings.addressLine2 && <p>{settings.addressLine2}</p>}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#3F6B4F] transition-colors">
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#24352A] font-semibold">Opening Hours</p>
                  <p>Mon - Fri: {settings.openingHoursWeekday}</p>
                  <p>Sat - Sun: {settings.openingHoursWeekend}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <span style={colHeadStyle}>Botanical Journal</span>
            <p className="text-xs text-[#556257] font-light leading-relaxed">
              Subscribe to receive invitations to garden tasting menus, seasonal cocktail launches, and exclusive events.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#FCFAF4] border border-[#3F6B4F]/30 rounded-xs px-3.5 py-2.5 text-xs text-[#24352A] placeholder-[#7B877E] focus:outline-none focus:border-[#3F6B4F]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#3F6B4F] text-white rounded-xs hover:bg-[#2F533C] transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Legal Bar */}
        <div className="pt-8 border-t border-[#3F6B4F]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B877E]">
          <p>© {new Date().getFullYear()} Q-RESTOBAR. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#3F6B4F] transition-colors underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-[#3F6B4F] transition-colors underline"
            >
              Terms of Service
            </button>
            <Link
              to={getThemedPath('/admin/login')}
              className="hover:text-[#3F6B4F] transition-colors flex items-center gap-1 font-mono"
            >
              <Lock className="w-3 h-3 text-[#3F6B4F]" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      <Modal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} title="Privacy Policy">
        <div className="space-y-4 text-xs text-qc-body leading-relaxed max-h-[60vh] overflow-y-auto">
          <p>
            At Q-RESTOBAR, we value your privacy and are committed to protecting your personal data in accordance with the Personal Data Protection Act (PDPA) of Malaysia.
          </p>
          <h4 className="font-bold text-qc-primary">Data Collection</h4>
          <p>We collect personal information such as your name, email address, and phone number solely for reservation processing, event inquiries, and subscribed communications.</p>
          <h4 className="font-bold text-qc-primary">Data Protection</h4>
          <p>Your data is securely stored and will never be sold or shared with unauthorized third parties for marketing purposes.</p>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} title="Terms of Service">
        <div className="space-y-4 text-xs text-qc-body leading-relaxed max-h-[60vh] overflow-y-auto">
          <p>Welcome to Q-RESTOBAR. By using our website and reservation services, you agree to comply with our terms and conditions.</p>
          <h4 className="font-bold text-qc-primary">Reservations</h4>
          <p>Reservations are held for a maximum of 15 minutes past the scheduled time. Please inform us in advance if you are running late.</p>
          <h4 className="font-bold text-qc-primary">Dress Code</h4>
          <p>{settings.dressCode}</p>
        </div>
      </Modal>
    </footer>
  );
};
