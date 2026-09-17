import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home } from 'lucide-react';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceNotFound: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'heritage-spice');

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#2B080E] text-[#FFF4DF] px-4 py-20 text-center selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Top Icon Hub */}
        <div className="inline-block p-4 rounded-full bg-[#371018] border border-[#C69A4B]/40 text-[#C69A4B] mb-2 shadow-2xl">
          <Utensils className="w-10 h-10 text-[#E89532]" />
        </div>

        {/* 404 Header */}
        <h1 className="text-6xl sm:text-7xl hs-font-display font-bold text-[#C69A4B] tracking-wider">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl hs-font-display font-bold text-[#FFF4DF]">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light leading-relaxed">
          The culinary page or experience you are looking for has been moved or does not exist. Explore our authentic menu or return to the main dining room.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={getThemedPath('/')}
            className="hs-btn-primary w-full sm:w-auto text-xs px-6 py-3.5 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to={getThemedPath('/menu')}
            className="hs-btn-outline w-full sm:w-auto text-xs px-6 py-3.5 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-[#C69A4B]" />
            <span>Explore Menu</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HeritageSpiceNotFound;
