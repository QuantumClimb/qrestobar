import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SpicyBadge, ChefsPickBadge, VegetarianBadge, SoldOutBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { MenuItem } from '../../types/menu';

export const SignatureDishes: React.FC = () => {
  const { menuItems } = useData();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Pick the 6 signature dishes (or fallback to top 6 items)
  const signatureItems = menuItems.filter(item => item.isChefsPick).slice(0, 6);
  const displayItems = signatureItems.length >= 6 ? signatureItems : menuItems.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-qc-surface border-t border-border-base text-qc-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Highlights</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary">
            Signature Culinary Creations
          </h2>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            A curated selection of our most beloved dishes, celebrating Malaysian heritage ingredients with refined culinary craftsmanship.
          </p>
        </div>

        {/* 6 Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="luxury-card group cursor-pointer flex flex-col overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden bg-qc-base">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {dish.isChefsPick && <ChefsPickBadge />}
                  {dish.isVegetarian && <VegetarianBadge />}
                  {!dish.isAvailable && <SoldOutBadge />}
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-3 right-3 bg-qc-base/90 border border-purple-600/40 px-3 py-1 rounded-sm shadow-md z-10 backdrop-blur-sm">
                  <span className="text-xs font-medium text-purple-500">RM</span>
                  <span className="text-base font-display font-bold text-qc-primary ml-1">{dish.price}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-display font-bold text-qc-primary group-hover:text-qc-secondary transition-colors">
                      {dish.name}
                    </h3>
                    <SpicyBadge level={dish.spicyLevel} className="shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-qc-body leading-relaxed font-light line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-base flex items-center justify-between text-xs text-purple-500 font-semibold uppercase tracking-wider">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Menu Action Button */}
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="btn-gold px-10 py-4 text-xs tracking-widest uppercase inline-flex items-center gap-2.5 shadow-gold-subtle"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Full Digital Menu (26+ Dishes &amp; Drinks)</span>
          </Link>
        </div>
      </div>

      {/* Dish Quick Detail Modal */}
      {selectedDish && (
        <Modal
          isOpen={Boolean(selectedDish)}
          onClose={() => setSelectedDish(null)}
          title={selectedDish.name}
          subtitle="Signature Plate Details"
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="h-64 rounded-sm overflow-hidden border border-border-base">
              <img
                src={selectedDish.imageUrl}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-purple-500">Price:</span>
                <span className="text-2xl font-display font-bold text-qc-primary">RM {selectedDish.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <SpicyBadge level={selectedDish.spicyLevel} />
                {selectedDish.isVegetarian && <VegetarianBadge />}
                {!selectedDish.isAvailable && <SoldOutBadge />}
              </div>
            </div>

            <p className="text-sm text-qc-body leading-relaxed font-light">
              {selectedDish.description}
            </p>

            {selectedDish.allergens && selectedDish.allergens.length > 0 && (
              <div className="p-3 bg-qc-base border border-border-base rounded-sm text-xs">
                <span className="text-purple-500 font-semibold uppercase tracking-wider block mb-1">
                  Allergen Advisory:
                </span>
                <span className="text-qc-body">{selectedDish.allergens.join(', ')}</span>
              </div>
            )}

            {selectedDish.pairingRecommendation && (
              <div className="p-3 bg-qc-surface/40 border border-purple-600/40 rounded-sm text-xs">
                <span className="text-qc-secondary font-semibold uppercase tracking-wider block mb-1">
                  Recommended Drink Pairing:
                </span>
                <span className="text-qc-body">{selectedDish.pairingRecommendation}</span>
              </div>
            )}

            <div className="pt-4 flex items-center justify-end gap-3">
              <Link
                to="/reservations"
                className="btn-gold text-xs px-6 py-3"
                onClick={() => setSelectedDish(null)}
              >
                Reserve Table for This Dish
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
