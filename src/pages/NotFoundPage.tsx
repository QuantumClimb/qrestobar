import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home } from 'lucide-react';
import { useSiteTheme } from '../context/SiteThemeContext';

const MidnightEmberNotFound = React.lazy(
  () => import('../themes/components/midnightEmber/MidnightEmberNotFound')
);

const HeritageSpiceNotFound = React.lazy(
  () => import('../themes/components/heritageSpice/HeritageSpiceNotFound')
);

export const NotFoundPage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: Heritage Spice presentation
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#1F070B]" />}>
        <HeritageSpiceNotFound />
      </React.Suspense>
    );
  }

  // Early branch: Midnight Ember presentation
  if (effectiveThemeId === 'midnight-ember') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <MidnightEmberNotFound />
      </React.Suspense>
    );
  }
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-qc-base text-qc-primary px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-block p-4 rounded-full bg-qc-surface border border-purple-600/40 text-purple-500 mb-2">
          <Utensils className="w-10 h-10" />
        </div>

        <h1 className="text-6xl sm:text-7xl font-display font-bold text-qc-primary tracking-wider">
          404
        </h1>

        <h2 className="text-xl font-display text-qc-secondary">
          Page Not Found
        </h2>

        <p className="text-xs sm:text-sm text-qc-body font-light leading-relaxed">
          The culinary page or experience you are looking for has been moved or does not exist.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="btn-gold w-full sm:w-auto text-xs px-6 py-3 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/menu"
            className="btn-gold-outline w-full sm:w-auto text-xs px-6 py-3 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
