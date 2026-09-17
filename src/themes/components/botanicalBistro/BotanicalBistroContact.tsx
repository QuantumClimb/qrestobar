import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Navigation, Train, Car, Send, Instagram, Facebook } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { BotanicalBistroPageHero } from './BotanicalBistroPageHero';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroContact: React.FC = () => {
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
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello Botanical Bistro concierge, I have an inquiry.')}`, '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Bukit+Bintang+Kuala+Lumpur', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] py-12 sm:py-16 selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <BotanicalBistroPageHero
          badge="BOTANICAL BISTRO · CONNECT & VISIT"
          title="Contact &amp; Location"
          subtitle="Conveniently situated in the bustling dining epicenter of Bukit Bintang, Kuala Lumpur. We look forward to welcoming you."
        />

        {/* Two Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#FCFAF4] border border-[#3F6B4F]/25 p-6 sm:p-8 rounded-md space-y-6 shadow-md">
              <h2 className="text-xl bb-font-display font-bold text-[#24352A] border-b border-[#3F6B4F]/15 pb-3">
                Direct Inquiries
              </h2>

              <div className="space-y-4 text-xs text-[#5B7065] font-light">
                {settings.addressLine1 ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#24352A] font-medium">Address</p>
                      <p>{settings.addressLine1}</p>
                      {settings.addressLine2 && <p>{settings.addressLine2}</p>}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#24352A] font-medium">Telephone</p>
                    <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#3F6B4F] transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#24352A] font-medium">WhatsApp Concierge</p>
                    <button onClick={handleWhatsApp} className="hover:text-[#2F533C] text-left transition-colors cursor-pointer">
                      {settings.whatsapp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#24352A] font-medium">Email</p>
                    <a href={`mailto:${settings.email}`} className="hover:text-[#3F6B4F] transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#24352A] font-medium">Opening Hours</p>
                    <p>{settings.openingHoursDisplay}</p>
                    <p className="text-[11px] text-[#5B7065]">{settings.openingHoursWeekday}</p>
                    <p className="text-[11px] text-[#5B7065]">{settings.openingHoursWeekend}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#3F6B4F]/15 flex items-center gap-3">
                <span className="text-xs text-[#3F6B4F] font-semibold uppercase tracking-wider">Social:</span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F4F1E8] border border-[#3F6B4F]/30 flex items-center justify-center text-[#3F6B4F] hover:bg-[#3F6B4F] hover:text-[#FFFFFF] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F4F1E8] border border-[#3F6B4F]/30 flex items-center justify-center text-[#3F6B4F] hover:bg-[#3F6B4F] hover:text-[#FFFFFF] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Parking & Transit Box */}
            <div className="bg-[#FCFAF4] border border-[#3F6B4F]/25 p-6 rounded-md space-y-4 text-xs font-light shadow-md">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3F6B4F] font-mono">
                Getting Here &amp; Parking
              </h3>

              <div className="space-y-3 text-[#5B7065]">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#24352A] font-medium block">Public Transit:</strong>
                    <span>MRT Bukit Bintang (Gate A) or Monorail Bukit Bintang station within 3 minutes walking distance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#3F6B4F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#24352A] font-medium block">Parking &amp; Valet:</strong>
                    <span>Basement parking available inside the complex. Complimentary valet service for patrons spending RM250 and above.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDirections}
                  className="bb-btn-outline w-full py-2.5 text-xs flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FCFAF4] border border-[#3F6B4F]/25 p-6 sm:p-10 rounded-md shadow-lg">
            <div className="space-y-2 mb-8">
              <span className="text-[11px] font-semibold text-[#3F6B4F] uppercase tracking-widest font-mono">
                Send a Message
              </span>
              <h2 className="text-2xl sm:text-3xl bb-font-display font-bold text-[#24352A]">
                General Inquiries &amp; Feedback
              </h2>
              <p className="text-xs text-[#5B7065] font-light leading-relaxed">
                Have questions about private dining, menu allergens, or media collaboration? Drop us a note below.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3F6B4F] uppercase font-semibold mb-1 tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Dato Marcus Tan"
                    className="w-full bg-[#F4F1E8] border border-[#3F6B4F]/30 px-3.5 py-2.5 text-[#24352A] rounded-md focus:border-[#3F6B4F] focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]/15 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#3F6B4F] uppercase font-semibold mb-1 tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="marcus@example.com"
                    className="w-full bg-[#F4F1E8] border border-[#3F6B4F]/30 px-3.5 py-2.5 text-[#24352A] rounded-md focus:border-[#3F6B4F] focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]/15 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3F6B4F] uppercase font-semibold mb-1 tracking-wider">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+60 12 345 6789"
                    className="w-full bg-[#F4F1E8] border border-[#3F6B4F]/30 px-3.5 py-2.5 text-[#24352A] rounded-md focus:border-[#3F6B4F] focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]/15 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#3F6B4F] uppercase font-semibold mb-1 tracking-wider">
                    Subject / Topic
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#F4F1E8] border border-[#3F6B4F]/30 px-3.5 py-2.5 text-[#24352A] rounded-md focus:border-[#3F6B4F] focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]/15 transition-colors"
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
                <label className="block text-[#3F6B4F] uppercase font-semibold mb-1 tracking-wider">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can our culinary and hospitality team assist you today?"
                  className="w-full bg-[#F4F1E8] border border-[#3F6B4F]/30 px-3.5 py-2.5 text-[#24352A] rounded-md focus:border-[#3F6B4F] focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]/15 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="bb-btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 min-h-[44px]"
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
        <div className="h-80 sm:h-96 rounded-md overflow-hidden border border-[#3F6B4F]/25 relative bg-[#F4F1E8] shadow-lg">
          <iframe
            title="Botanical Bistro Location Google Map"
            src={settings.googleMapsEmbedUrl}
            className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
};

export default BotanicalBistroContact;
