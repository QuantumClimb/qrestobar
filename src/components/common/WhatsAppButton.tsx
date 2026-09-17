import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useSiteTheme } from '../../context/SiteThemeContext';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useData();
  const { previewThemeId } = useSiteTheme();

  const handleWhatsAppClick = () => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      "Hello Q-RESTOBAR! I would like to inquire about table reservations or dining options in Bukit Bintang. Could you please assist me?"
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed ${previewThemeId ? 'bottom-20 sm:bottom-6' : 'bottom-6'} right-4 sm:right-6 z-40 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-qc-primary shadow-2xl flex items-center justify-center border-2 border-purple-600/60 hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-emerald-500/40`}
      aria-label="Chat with Q-RESTOBAR Concierge on WhatsApp"
      title="Chat with Q-RESTOBAR Concierge on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-16 px-3 py-1.5 bg-qc-surface/95 border border-purple-600/40 text-qc-secondary text-xs font-semibold rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl backdrop-blur-md">
        WhatsApp Concierge
      </span>

      {/* Pulsing indicator circle */}
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full border-2 border-charcoal-950" />
    </button>
  );
};

