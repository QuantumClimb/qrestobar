import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Utensils, Home } from 'lucide-react';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/urbanNeon.css';

export const UrbanNeonNotFound: React.FC = () => {
  const getThemedPath = (path: string) => withSiteThemePreview(path, 'urban-neon');

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#090B18] text-white px-4 py-20 text-center un-font-body">
      <div className="max-w-md w-full space-y-6 bg-[#131B2E] p-8 sm:p-12 rounded-lg border border-[#20E3D2]/30 shadow-[0_0_30px_rgba(32,227,210,0.15)]">
        <div className="inline-flex p-4 rounded-full bg-[#111827] border border-[#20E3D2]/40 text-[#20E3D2] shadow-[0_0_15px_#20E3D2]">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EC4899] block">
            ERROR 404
          </span>
          <h1 className="text-3xl sm:text-4xl un-font-display font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            The nightlife page or experience route you are looking for has moved or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={getThemedPath('/')}
            className="un-btn-cyan w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to={getThemedPath('/menu')}
            className="un-btn-outline w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Utensils className="w-4 h-4 text-[#20E3D2]" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UrbanNeonNotFound;
