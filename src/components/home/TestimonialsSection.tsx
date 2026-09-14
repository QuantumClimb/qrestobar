import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../data/initialTestimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-qc-surface border-t border-border-base text-qc-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guest Impressions</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary">
            Praise for Q-RESTOBAR Dining
          </h2>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Read impressions from culinary critics, hospitality leaders, and discerning Malaysian diners.
          </p>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="luxury-card p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <Quote className="w-8 h-8 text-purple-500/20 absolute top-4 right-4" />

              <div className="space-y-4 relative z-10">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-qc-body leading-relaxed font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border-base">
                <p className="text-xs font-display font-bold text-qc-primary">{t.author}</p>
                <p className="text-[11px] text-purple-500 font-light mt-0.5">{t.role}</p>
                <div className="mt-2 inline-block px-2 py-0.5 bg-qc-base border border-border-strong rounded text-[10px] text-qc-body">
                  Fav Dish: {t.highlightDish}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Required Demonstration Disclosure Tag */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-qc-base/80 border border-border-strong/80 rounded-full text-xs text-qc-body">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>Sample testimonials for demonstration purposes.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
