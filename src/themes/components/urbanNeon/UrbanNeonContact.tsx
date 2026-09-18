import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Navigation, Train, Car, Send, Instagram, Facebook } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { UrbanNeonPageHero } from './UrbanNeonPageHero';
import '../../styles/urbanNeon.css';

export const UrbanNeonContact: React.FC = () => {
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
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello Q-RESTOBAR concierge, I have an inquiry.')}`, '_blank');
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Bukit+Bintang+Kuala+Lumpur', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#090B18] text-white py-12 sm:py-16 selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <UrbanNeonPageHero
          badge="CONNECT &amp; LOCATION"
          title="Contact &amp; Location"
          subtitle="Conveniently situated in the bustling nightlife epicenter of Bukit Bintang, Kuala Lumpur. We look forward to welcoming you."
        />

        {/* Two Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 sm:p-8 rounded-lg space-y-6 shadow-md">
              <h2 className="text-xl un-font-display font-bold text-white border-b border-white/10 pb-3">
                Direct Inquiries
              </h2>

              <div className="space-y-4 text-xs text-gray-300 font-light">
                {settings.addressLine1 ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#EC4899] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p>{settings.addressLine1}</p>
                      {settings.addressLine2 && <p>{settings.addressLine2}</p>}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Telephone</p>
                    <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#20E3D2] transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">WhatsApp Concierge</p>
                    <button onClick={handleWhatsApp} className="hover:text-[#20E3D2] text-left transition-colors cursor-pointer">
                      {settings.whatsapp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href={`mailto:${settings.email}`} className="hover:text-[#20E3D2] transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Opening Hours</p>
                    <p>{settings.openingHoursDisplay}</p>
                    <p className="text-[11px] text-gray-400">{settings.openingHoursWeekday}</p>
                    <p className="text-[11px] text-gray-400">{settings.openingHoursWeekend}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <span className="text-xs text-[#20E3D2] font-semibold uppercase tracking-wider font-mono">Social:</span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-[#111827] border border-[#20E3D2]/40 flex items-center justify-center text-[#20E3D2] hover:bg-[#20E3D2] hover:text-[#090B18] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-[#111827] border border-[#20E3D2]/40 flex items-center justify-center text-[#20E3D2] hover:bg-[#20E3D2] hover:text-[#090B18] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Parking & Transit Box */}
            <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg space-y-4 text-xs font-light shadow-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#20E3D2] font-mono">
                Getting Here &amp; Valet Parking
              </h3>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block">Public Transit:</strong>
                    <span>MRT Bukit Bintang (Gate A) or Monorail Bukit Bintang station within 3 minutes walking distance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#20E3D2] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block">Parking &amp; Valet:</strong>
                    <span>Basement parking available inside the complex. Complimentary valet service for patrons spending RM250 and above.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDirections}
                  className="un-btn-outline w-full py-2.5 text-xs flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#131B2E] border border-[#20E3D2]/30 p-6 sm:p-10 rounded-lg shadow-[0_0_30px_rgba(32,227,210,0.15)]">
            <div className="space-y-2 mb-8">
              <span className="text-[11px] font-bold text-[#20E3D2] uppercase tracking-widest font-mono">
                SEND A MESSAGE
              </span>
              <h2 className="text-2xl sm:text-3xl un-font-display font-bold text-white">
                General Inquiries &amp; VIP Feedback
              </h2>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Have questions about private dining, menu allergens, or media collaboration? Drop us a note below.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#20E3D2] uppercase font-bold mb-1 tracking-wider font-mono">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Dato Marcus Tan"
                    className="w-full bg-[#111827] border border-white/20 px-3.5 py-2.5 text-white rounded focus:border-[#20E3D2] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#20E3D2] uppercase font-bold mb-1 tracking-wider font-mono">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="marcus@example.com"
                    className="w-full bg-[#111827] border border-white/20 px-3.5 py-2.5 text-white rounded focus:border-[#20E3D2] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#20E3D2] uppercase font-bold mb-1 tracking-wider font-mono">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+60 12 345 6789"
                    className="w-full bg-[#111827] border border-white/20 px-3.5 py-2.5 text-white rounded focus:border-[#20E3D2] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#20E3D2] uppercase font-bold mb-1 tracking-wider font-mono">
                    Subject / Topic
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#111827] border border-white/20 px-3.5 py-2.5 text-white rounded focus:border-[#20E3D2] focus:outline-none transition-colors"
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
                <label className="block text-[#20E3D2] uppercase font-bold mb-1 tracking-wider font-mono">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can our hospitality team assist you today?"
                  className="w-full bg-[#111827] border border-white/20 px-3.5 py-2.5 text-white rounded focus:border-[#20E3D2] focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="un-btn-cyan w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 min-h-[44px]"
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
        <div className="h-80 sm:h-96 rounded-lg overflow-hidden border border-[#20E3D2]/30 relative bg-[#111827] shadow-xl">
          <iframe
            title="Q-RESTOBAR Location Google Map"
            src={settings.googleMapsEmbedUrl}
            className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
};

export default UrbanNeonContact;
