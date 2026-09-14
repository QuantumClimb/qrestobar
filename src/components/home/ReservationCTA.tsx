import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, MessageSquare, MapPin, Clock, Navigation } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ReservationCTA: React.FC = () => {
  const { settings } = useData();

  const handleWhatsAppDirect = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello Q-RESTOBAR, I would like to inquire about table reservations.');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const handleGoogleMapsDirections = () => {
    window.open('https://maps.google.com/?q=Bukit+Bintang+Kuala+Lumpur', '_blank');
  };

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden transition-colors"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          alt="Q-RESTOBAR Atmosphere"
          className="w-full h-full object-cover opacity-10"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, var(--bg-secondary) 0%, var(--overlay-color) 50%, var(--bg-secondary) 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top CTA */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.20em] text-purple-500">
            <span>Online Booking &amp; Inquiries</span>
          </div>
          <h2 className="font-display font-semibold text-qc-primary" style={{ letterSpacing: '-0.01em' }}>
            Your Table Is Waiting.
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-qc-body">
            Join us for an unforgettable dining experience in Bukit Bintang. Reserve online instantly or reach out directly to our concierge team.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/reservations" className="btn-gold w-full sm:w-auto px-8 py-4 text-xs tracking-widest flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table Online</span>
            </Link>
            <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="btn-gold-outline w-full sm:w-auto px-6 py-4 text-xs tracking-widest flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Call Us Directly</span>
            </a>
            <button onClick={handleWhatsAppDirect} className="btn-ghost-ivory w-full sm:w-auto px-6 py-4 text-xs tracking-widest flex items-center justify-center gap-2 border border-border-strong bg-qc-card">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>

        {/* Location card */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded p-6 sm:p-8 transition-colors shadow-lg"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="qc-label-purple block mb-2">Visit Us</span>
              <h3 className="text-xl font-display font-semibold mb-3 text-qc-primary">Q-RESTOBAR</h3>
              {(settings.addressLine1 || settings.addressLine2) && (
                <p className="text-sm font-light leading-relaxed text-qc-body">
                  {[settings.addressLine1, settings.addressLine2].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
            <div className="space-y-4 pt-4" style={{ borderTop: '1px solid var(--border-default)' }}>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 shrink-0 mt-1 text-purple-500" />
                <div className="text-xs space-y-1 font-light text-qc-body">
                  <p className="font-medium text-qc-primary">Opening Hours</p>
                  <p>{settings.openingHoursWeekday}</p>
                  <p>{settings.openingHoursWeekend}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-1 text-purple-500" />
                <div className="text-xs font-light text-qc-body">
                  <p className="font-medium text-qc-primary">Transit &amp; Parking</p>
                  <p>3-minute walk from MRT Bukit Bintang (Gate A). Valet &amp; basement parking available.</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button onClick={handleGoogleMapsDirections} className="btn-gold text-xs px-6 py-3 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </button>
            </div>
          </div>
          <div
            className="lg:col-span-7 h-72 sm:h-96 rounded overflow-hidden relative"
            style={{
              border: '1px solid var(--border-default)',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            <iframe
              title="Q-RESTOBAR Location Map"
              src={settings.googleMapsEmbedUrl}
              className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded text-[11px] backdrop-blur-sm pointer-events-none flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-purple-500" />
              <span>Bukit Bintang, KL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
