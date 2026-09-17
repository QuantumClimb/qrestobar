import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, MapPin, Clock, Navigation, Train, Car, Send, Instagram, Facebook, Calendar, Sparkles } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { HeritageSpicePageHero } from './HeritageSpicePageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceContact: React.FC = () => {
  const { settings } = useData();
  const { showToast } = useToast();
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast({
        type: 'success',
        title: 'Message Received',
        message: `Thank you, ${contactForm.name}. Our concierge team will reply to ${contactForm.email} shortly.`
      });
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 800);
  };

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello Q-RESTOBAR, I have an inquiry.')}`, '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Bukit+Bintang+Kuala+Lumpur', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] py-12 sm:py-16 selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <HeritageSpicePageHero
          badge="CONNECT & VISIT US"
          title="Contact & Location"
          subtitle="Conveniently situated in the bustling dining epicenter of Bukit Bintang, Kuala Lumpur. We look forward to welcoming you."
        />

        {/* Two Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#371018] border border-[#C69A4B]/30 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6">
              <h2 className="hs-font-display text-xl font-bold text-[#FFF4DF] border-b border-[#C69A4B]/20 pb-3">
                Direct Inquiries
              </h2>

              <div className="space-y-4 text-xs text-[#F8EAD2]/85 font-light">
                {settings.addressLine1 ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C69A4B] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#FFF4DF] font-medium font-mono uppercase text-[11px] tracking-wider">
                        Address
                      </p>
                      <p>{settings.addressLine1}</p>
                      {settings.addressLine2 && <p>{settings.addressLine2}</p>}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C69A4B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FFF4DF] font-medium font-mono uppercase text-[11px] tracking-wider">
                      Telephone
                    </p>
                    <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#E89532] transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FFF4DF] font-medium font-mono uppercase text-[11px] tracking-wider">
                      WhatsApp Concierge
                    </p>
                    <button onClick={handleWhatsApp} className="hover:text-[#34D399] text-left transition-colors cursor-pointer">
                      {settings.whatsapp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C69A4B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FFF4DF] font-medium font-mono uppercase text-[11px] tracking-wider">
                      Email
                    </p>
                    <a href={`mailto:${settings.email}`} className="hover:text-[#E89532] transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C69A4B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FFF4DF] font-medium font-mono uppercase text-[11px] tracking-wider">
                      Opening Hours
                    </p>
                    <p>{settings.openingHoursDisplay}</p>
                    <p className="text-[11px] text-[#C2AFA6]">{settings.openingHoursWeekday}</p>
                    <p className="text-[11px] text-[#C2AFA6]">{settings.openingHoursWeekend}</p>
                  </div>
                </div>

                {settings.dressCode ? (
                  <div className="pt-2 border-t border-[#C69A4B]/15">
                    <p className="text-[11px] font-mono text-[#C69A4B] uppercase tracking-wider mb-0.5">
                      Dress Code
                    </p>
                    <p className="text-xs text-[#F8EAD2]/80">{settings.dressCode}</p>
                  </div>
                ) : null}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#C69A4B]/20 flex items-center gap-3">
                <span className="text-xs text-[#C69A4B] font-mono font-medium uppercase tracking-wider">Social:</span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xs bg-[#2B080E] border border-[#C69A4B]/30 flex items-center justify-center text-[#F8EAD2] hover:text-[#C69A4B] hover:border-[#E89532] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xs bg-[#2B080E] border border-[#C69A4B]/30 flex items-center justify-center text-[#F8EAD2] hover:text-[#C69A4B] hover:border-[#E89532] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Parking & Transit Box */}
            <div className="bg-[#371018] border border-[#C69A4B]/30 p-6 rounded-sm space-y-4 text-xs font-light shadow-xl">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C69A4B] font-mono">
                Getting Here &amp; Parking
              </h3>

              <div className="space-y-3 text-[#F8EAD2]/80">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#E89532] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FFF4DF] font-medium block">Public Transit:</strong>
                    <span>MRT Bukit Bintang (Gate A) or Monorail Bukit Bintang station within 3 minutes walking distance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#E89532] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FFF4DF] font-medium block">Parking &amp; Valet:</strong>
                    <span>Basement parking available inside the complex. Complimentary valet service for patrons spending RM250 and above.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDirections}
                  className="hs-btn-outline w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#371018] border border-[#C69A4B]/30 p-6 sm:p-10 rounded-sm shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C69A4B] via-[#E89532] to-[#C69A4B]" />

            <div className="space-y-2 mb-8">
              <span className="text-[11px] font-semibold text-[#C69A4B] uppercase tracking-widest font-mono">
                Send a Message
              </span>
              <h2 className="hs-font-display text-2xl font-bold text-[#FFF4DF]">
                General Inquiries &amp; Feedback
              </h2>
              <p className="text-xs text-[#F8EAD2]/80 font-light">
                Have questions about private dining, menu allergens, or media collaboration? Drop us a note below.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F8EAD2] uppercase font-medium mb-1 font-mono text-[11px]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Dato Marcus Tan"
                    className="w-full bg-[#2B080E] border border-[#C69A4B]/35 px-3.5 py-2.5 text-[#FFF4DF] rounded-xs focus:border-[#E89532] focus:outline-none placeholder-[#80665A]"
                  />
                </div>

                <div>
                  <label className="block text-[#F8EAD2] uppercase font-medium mb-1 font-mono text-[11px]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="marcus@example.com"
                    className="w-full bg-[#2B080E] border border-[#C69A4B]/35 px-3.5 py-2.5 text-[#FFF4DF] rounded-xs focus:border-[#E89532] focus:outline-none placeholder-[#80665A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F8EAD2] uppercase font-medium mb-1 font-mono text-[11px]">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+60 12 345 6789"
                    className="w-full bg-[#2B080E] border border-[#C69A4B]/35 px-3.5 py-2.5 text-[#FFF4DF] rounded-xs focus:border-[#E89532] focus:outline-none placeholder-[#80665A]"
                  />
                </div>

                <div>
                  <label className="block text-[#F8EAD2] uppercase font-medium mb-1 font-mono text-[11px]">
                    Subject / Topic
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#2B080E] border border-[#C69A4B]/35 px-3.5 py-2.5 text-[#FFF4DF] rounded-xs focus:border-[#E89532] focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Private Event Hire">Private Event &amp; Banquet Hire</option>
                    <option value="Corporate Dining">Corporate Tasting Dinner</option>
                    <option value="Dietary Questions">Dietary &amp; Allergen Queries</option>
                    <option value="Feedback">Dining Feedback</option>
                    <option value="Media & Press">Media &amp; Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#F8EAD2] uppercase font-medium mb-1 font-mono text-[11px]">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can our culinary and hospitality team assist you today?"
                  className="w-full bg-[#2B080E] border border-[#C69A4B]/35 px-3.5 py-2.5 text-[#FFF4DF] rounded-xs focus:border-[#E89532] focus:outline-none placeholder-[#80665A]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="hs-btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry to Concierge</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Embedded Interactive Map Container */}
        <div className="h-80 sm:h-96 rounded-sm overflow-hidden border border-[#C69A4B]/30 relative bg-[#2B080E] shadow-2xl">
          <iframe
            title="Q-RESTOBAR Location Google Map"
            src={settings.googleMapsEmbedUrl}
            className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Themed Reservation Call-to-Action */}
        <div className="bg-gradient-to-r from-[#371018] via-[#4A0E18] to-[#371018] border border-[#C69A4B]/40 p-8 sm:p-10 rounded-sm text-center space-y-4 shadow-2xl relative overflow-hidden">
          <Sparkles className="w-7 h-7 text-[#E89532] mx-auto" />
          <h2 className="hs-font-display text-2xl sm:text-3xl font-bold text-[#FFF4DF]">
            Plan Your Evening with Us
          </h2>
          <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light max-w-md mx-auto leading-relaxed">
            Secure your table for lunch, dinner, or late-night cocktails in Bukit Bintang.
          </p>
          <div className="pt-2">
            <Link
              to={getThemedPath('/reservations')}
              className="hs-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeritageSpiceContact;
