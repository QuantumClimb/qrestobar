import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Navigation, Train, Car, Send, Instagram, Facebook } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { useSiteTheme } from '../context/SiteThemeContext';

const MidnightEmberContact = React.lazy(
  () => import('../themes/components/midnightEmber/MidnightEmberContact')
);
const HeritageSpiceContact = React.lazy(
  () => import('../themes/components/heritageSpice/HeritageSpiceContact')
);

export const ContactPage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: Midnight Ember presentation
  if (effectiveThemeId === 'midnight-ember') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <MidnightEmberContact />
      </React.Suspense>
    );
  }

  // Early branch: Heritage Spice presentation
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#2B080E]" />}>
        <HeritageSpiceContact />
      </React.Suspense>
    );
  }

  const { settings } = useData();
  const { showToast } = useToast();

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
    <div className="min-h-screen bg-qc-base text-qc-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect &amp; Visit Us</span>
            <MapPin className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-qc-primary tracking-wide">
            Contact &amp; Location
          </h1>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Conveniently situated in the bustling dining epicenter of Bukit Bintang, Kuala Lumpur. We look forward to welcoming you.
          </p>
        </div>

        {/* Two Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-qc-surface border border-border-base p-6 sm:p-8 rounded-sm space-y-6">
              <h2 className="text-lg font-display font-bold text-qc-primary border-b border-border-base pb-3">
                Direct Inquiries
              </h2>

              <div className="space-y-4 text-xs text-qc-body font-light">
                {settings.addressLine1 ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-qc-primary font-medium">Address</p>
                      <p>{settings.addressLine1}</p>
                      {settings.addressLine2 && <p>{settings.addressLine2}</p>}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-qc-primary font-medium">Telephone</p>
                    <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-qc-secondary">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-qc-primary font-medium">WhatsApp Concierge</p>
                    <button onClick={handleWhatsApp} className="hover:text-emerald-300 text-left">
                      {settings.whatsapp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-qc-primary font-medium">Email</p>
                    <a href={`mailto:${settings.email}`} className="hover:text-qc-secondary">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-qc-primary font-medium">Opening Hours</p>
                    <p>{settings.openingHoursDisplay}</p>
                    <p className="text-[11px] text-qc-body">{settings.openingHoursWeekday}</p>
                    <p className="text-[11px] text-qc-body">{settings.openingHoursWeekend}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-border-base flex items-center gap-3">
                <span className="text-xs text-purple-500 font-medium uppercase tracking-wider">Social:</span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-qc-base border border-border-strong flex items-center justify-center text-qc-body hover:text-purple-500 hover:border-purple-600/50"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-qc-base border border-border-strong flex items-center justify-center text-qc-body hover:text-purple-500 hover:border-purple-600/50"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Parking & Transit Box */}
            <div className="bg-qc-surface border border-border-base p-6 rounded-sm space-y-4 text-xs font-light">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-500">
                Getting Here &amp; Parking
              </h3>

              <div className="space-y-3 text-qc-body">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-qc-primary font-medium block">Public Transit:</strong>
                    <span>MRT Bukit Bintang (Gate A) or Monorail Bukit Bintang station within 3 minutes walking distance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-qc-primary font-medium block">Parking &amp; Valet:</strong>
                    <span>Basement parking available inside the complex. Complimentary valet service for patrons spending RM250 and above.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDirections}
                  className="btn-gold-outline w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-qc-surface border border-border-base p-6 sm:p-10 rounded-sm shadow-2xl">
            <div className="space-y-2 mb-8">
              <span className="text-[11px] font-semibold text-purple-500 uppercase tracking-widest">
                Send a Message
              </span>
              <h2 className="text-2xl font-display font-bold text-qc-primary">
                General Inquiries &amp; Feedback
              </h2>
              <p className="text-xs text-qc-body font-light">
                Have questions about private dining, menu allergens, or media collaboration? Drop us a note below.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-qc-body uppercase font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Dato Marcus Tan"
                    className="w-full bg-qc-base border border-border-strong px-3.5 py-2.5 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-qc-body uppercase font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="marcus@example.com"
                    className="w-full bg-qc-base border border-border-strong px-3.5 py-2.5 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-qc-body uppercase font-medium mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+60 12 345 6789"
                    className="w-full bg-qc-base border border-border-strong px-3.5 py-2.5 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-qc-body uppercase font-medium mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-qc-base border border-border-strong px-3.5 py-2.5 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
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
                <label className="block text-qc-body uppercase font-medium mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can our culinary and hospitality team assist you today?"
                  className="w-full bg-qc-base border border-border-strong px-3.5 py-2.5 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-gold w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
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
        <div className="h-80 sm:h-96 rounded-sm overflow-hidden border border-border-base relative bg-qc-base shadow-2xl">
          <iframe
            title="Q-RESTOBAR Location Google Map"
            src={settings.googleMapsEmbedUrl}
            className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
