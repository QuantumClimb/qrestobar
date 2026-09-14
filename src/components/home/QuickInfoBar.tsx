import React from 'react';
import { MapPin, Clock, Phone, Shirt, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const QuickInfoBar: React.FC = () => {
  const { settings } = useData();

  return (
    <div id="quick-info-bar" className="bg-qc-surface border-y border-border-base text-qc-primary py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Item 1: Location */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-qc-surface/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-500">Location</p>
              <p className="text-sm font-medium text-qc-primary mt-0.5">{settings.locationArea}</p>
              <p className="text-xs text-qc-body font-light truncate">{settings.addressLine1}</p>
            </div>
          </div>

          {/* Item 2: Hours */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-qc-surface/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-500">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-500">Opening Hours</p>
              <p className="text-sm font-medium text-qc-primary mt-0.5">{settings.openingHoursDisplay}</p>
              <p className="text-xs text-qc-body font-light">Lunch &amp; Late Night Dining</p>
            </div>
          </div>

          {/* Item 3: Telephone */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-qc-surface/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-500">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-500">Telephone</p>
              <a 
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} 
                className="text-sm font-medium text-qc-primary hover:text-qc-secondary transition-colors mt-0.5 block"
              >
                {settings.phone}
              </a>
              <p className="text-xs text-qc-body font-light">Direct Table Inquiries</p>
            </div>
          </div>

          {/* Item 4: Dress Code */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-qc-surface/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-500">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-500">Dress Code</p>
              <p className="text-sm font-medium text-qc-primary mt-0.5">{settings.dressCode}</p>
              <p className="text-xs text-qc-body font-light">Refined Dining Atmosphere</p>
            </div>
          </div>
        </div>

        {/* Demonstration Disclaimer Tag */}
        <div className="mt-5 pt-4 border-t border-border-base/60 flex items-center justify-center gap-2 text-[11px] text-qc-body text-center font-light">
          <Sparkles className="w-3 h-3 text-purple-500 shrink-0" />
          <span>Demonstration restaurant profile. Location and contact details can be customized in the Admin CMS.</span>
        </div>
      </div>
    </div>
  );
};
