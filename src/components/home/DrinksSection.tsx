import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DrinksSection: React.FC = () => {
  const { menuItems } = useData();

  // Pick the 6 signature drinks from menuItems (cocktails and mocktails)
  const drinks = menuItems
    .filter(item => item.category === 'cocktails' || item.category === 'mocktails')
    .slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-qc-base text-qc-primary border-t border-border-base relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Wine className="w-3.5 h-3.5" />
            <span>Artisanal Bar &amp; Mixology</span>
            <Wine className="w-3.5 h-3.5" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary">
            Botanical Cocktails &amp; Zero-Proof Elixirs
          </h2>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Crafted with local Malaysian botanicals, fresh pandan, calamansi lime, torch ginger flower, and aged international spirits.
          </p>
        </div>

        {/* 6 Drinks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              className="luxury-card group flex flex-col justify-between overflow-hidden border border-border-base hover:border-purple-600/40 rounded-sm"
            >
              <div className="relative h-60 overflow-hidden bg-qc-surface">
                <img
                  src={drink.imageUrl}
                  alt={drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    drink.category === 'cocktails'
                      ? 'bg-qc-surface/90 text-qc-secondary border border-purple-600/40'
                      : 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/40'
                  }`}>
                    {drink.category === 'cocktails' ? 'Signature Cocktail' : 'Zero-Proof Mocktail'}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-qc-base/90 border border-purple-600/40 px-3 py-1 rounded-sm shadow-md z-10 backdrop-blur-sm">
                  <span className="text-xs font-medium text-purple-500">RM</span>
                  <span className="text-base font-display font-bold text-qc-primary ml-1">{drink.price}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-qc-primary group-hover:text-qc-secondary transition-colors mb-2">
                    {drink.name}
                  </h3>
                  <p className="text-xs text-qc-body leading-relaxed font-light line-clamp-3">
                    {drink.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-base/80 flex items-center justify-between text-xs text-purple-500 font-medium">
                  <span className="text-[11px] text-qc-body">Perfect pairing with sharing plates</span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Bar Menu CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="btn-gold-outline px-8 py-3.5 text-xs tracking-widest uppercase inline-flex items-center gap-2"
          >
            <span>View Full Bar &amp; Wine List</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
