import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home, Leaf } from 'lucide-react';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroNotFound: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'botanical-bistro');

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F4F1E8] text-[#24352A] px-4 py-20 text-center bb-font-body">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 rounded-full bg-[#FCFAF4] border border-[#3F6B4F]/30 text-[#3F6B4F] mb-2 shadow-sm">
          <Leaf className="w-10 h-10" />
        </div>

        <h1 className="text-6xl sm:text-7xl bb-font-display font-bold text-[#24352A] tracking-wider">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl bb-font-display font-semibold text-[#3F6B4F]">
          Page Not Found
        </h2>

        <p className="text-xs sm:text-sm text-[#5B7065] font-light leading-relaxed">
          The culinary page or experience you are looking for has been moved or does not exist in our garden menu.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={getThemedPath('/')}
            className="bb-btn-primary w-full sm:w-auto text-xs px-6 py-3 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to={getThemedPath('/menu')}
            className="bb-btn-outline w-full sm:w-auto text-xs px-6 py-3 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BotanicalBistroNotFound;
