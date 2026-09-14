import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Utensils, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('quick-info-bar');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden transition-colors"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background Image — Theme-Aware Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Q-RESTOBAR Dining Atmosphere"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Primary theme-aware overlay */}
        <div className="absolute inset-0 transition-colors" style={{ backgroundColor: 'var(--overlay-color)' }} />
        {/* Soft bottom blend to page background */}
        <div
          className="absolute inset-0 transition-colors"
          style={{
            background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20 animate-slide-up">
        {/* Top Tagline Pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-6 backdrop-blur-md bg-qc-surface/80 border border-border-strong text-qc-secondary"
        >
          <span>Kuala Lumpur</span>
          <span className="w-1 h-1 rounded-full bg-qc-secondary" />
          <span>Bukit Bintang</span>
        </div>

        {/* Main Heading — Classic Serif Text Logo */}
        <h1 className="mb-5 flex justify-center">
          <span
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.20em] sm:tracking-[0.24em] uppercase select-none transition-colors duration-200"
            style={{ color: 'var(--logo-text-color)' }}
          >
            Q - RESTOBAR
          </span>
        </h1>

        <p className="text-base sm:text-xl font-display mb-4 tracking-wide text-qc-primary font-medium">
          Modern Malaysian Dining, Reimagined.
        </p>

        <p className="text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light text-qc-secondary">
          Discover bold local flavours, contemporary plates and memorable evenings in the heart of Kuala Lumpur.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/reservations"
            className="btn-gold w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </Link>

          <Link
            to="/menu"
            className="btn-gold-outline w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2.5"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Our Menu</span>
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 transition-colors flex flex-col items-center gap-1 focus:outline-none text-qc-muted hover:text-qc-primary"
        aria-label="Scroll to restaurant details"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium opacity-70">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-purple-500" />
      </button>
    </section>
  );
};
