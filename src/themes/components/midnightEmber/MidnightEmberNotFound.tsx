import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home, Flame } from 'lucide-react';
import { withSiteThemePreview } from '../../themePreviewNavigation';

export const MidnightEmberNotFound: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'midnight-ember');

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#101010] text-[#F5EFE6] px-4 py-20 text-center selection:bg-[#D8662C]/30 selection:text-[#F5EFE6]">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Top Flame Icon Hub */}
        <div className="inline-block p-4 rounded-full bg-[#1A1613] border border-[#D8AA5B]/40 text-[#D8662C] mb-2 shadow-2xl">
          <Flame className="w-10 h-10 animate-pulse" />
        </div>

        {/* 404 Header */}
        <h1 className="text-6xl sm:text-7xl font-serif font-bold text-[#D8AA5B] tracking-wider">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5EFE6]">
          This Table Isn’t Available
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#CFC3B5] font-light leading-relaxed">
          The page you’re looking for may have moved, but your evening can still begin here. Explore our artisanal charcoal menu or return to the main dining room.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={getThemedPath('/')}
            className="me-btn-primary w-full sm:w-auto text-xs px-6 py-3.5 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to={getThemedPath('/menu')}
            className="me-btn-outline w-full sm:w-auto text-xs px-6 py-3.5 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-[#D8662C]" />
            <span>Explore Menu</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MidnightEmberNotFound;
