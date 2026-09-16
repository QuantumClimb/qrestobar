import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Calendar, 
  Utensils, 
  AlertCircle, 
  Leaf, 
  X, 
  Info 
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { MenuItem, MENU_CATEGORIES } from '../../../types/menu';
import { MidnightEmberPageHero } from './MidnightEmberPageHero';
import { Modal } from '../../../components/common/Modal';

export const MidnightEmberMenu: React.FC = () => {
  const { menuItems, isLoading } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegetarianOnly, setIsVegetarianOnly] = useState(false);
  const [isSpicyOnly, setIsSpicyOnly] = useState(false);
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [isChefsPickOnly, setIsChefsPickOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const getThemedReservationLink = () => {
    return import.meta.env.DEV ? '/reservations?siteThemePreview=midnight-ember' : '/reservations';
  };

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Vegetarian match
      if (isVegetarianOnly && !item.isVegetarian) {
        return false;
      }

      // Spicy match
      if (isSpicyOnly && item.spicyLevel === 0) {
        return false;
      }

      // Available only
      if (isAvailableOnly && !item.isAvailable) {
        return false;
      }

      // Chef's pick only
      if (isChefsPickOnly && !item.isChefsPick) {
        return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesAllergens = item.allergens?.some(a => a.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesAllergens) {
          return false;
        }
      }

      return true;
    });
  }, [
    menuItems,
    selectedCategory,
    isVegetarianOnly,
    isSpicyOnly,
    isAvailableOnly,
    isChefsPickOnly,
    searchQuery
  ]);

  const categories = [
    { id: 'all', label: 'All Dishes & Drinks' },
    ...MENU_CATEGORIES.map(c => ({ id: c.id, label: c.label }))
  ];

  return (
    <div className="min-h-screen bg-[#101010] text-[#F5EFE6] py-12 sm:py-16 selection:bg-[#D8662C]/30 selection:text-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <MidnightEmberPageHero
          badge="Q - RESTOBAR · ARTISANAL DINING"
          title="Our Menu"
          subtitle="Crafted with fire, flavour and character. Explore authentic Malaysian culinary staples reimagined with artisanal charcoal grilling and botanical mixology."
        />

        {/* Search & Category Filter Section */}
        <div className="bg-[#14110F] border border-[#D8AA5B]/25 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6">
          
          {/* Top Row: Search Input & Result Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, spices, ingredients..."
                className="w-full bg-[#1A1613] border border-[#D8AA5B]/30 pl-10 pr-10 py-3 text-xs text-[#F5EFE6] rounded-xs focus:border-[#D8662C] focus:outline-none placeholder-[#88796B]"
              />
              <Search className="w-4 h-4 text-[#D8AA5B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94877A] hover:text-[#F5EFE6]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-[#D8AA5B] tracking-wider uppercase flex items-center gap-1.5 self-end sm:self-center">
              <span>Showing {filteredItems.length} Offerings</span>
            </div>
          </div>

          {/* Category Pills Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] rounded-xs transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#D8662C] text-white font-bold shadow-md'
                      : 'bg-[#1A1613] border border-[#D8AA5B]/20 text-[#CFC3B5] hover:text-[#F5EFE6] hover:border-[#D8AA5B]/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Dietary & Preference Toggles */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#D8AA5B]/15 text-xs">
            <span className="font-mono uppercase text-[11px] text-[#94877A] tracking-wider mr-1">
              Filter By:
            </span>

            <button
              onClick={() => setIsChefsPickOnly(!isChefsPickOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isChefsPickOnly
                  ? 'bg-[#D8AA5B] text-[#101010] font-bold shadow-sm'
                  : 'bg-[#1A1613] border border-[#D8AA5B]/25 text-[#CFC3B5] hover:border-[#D8AA5B]/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8662C]" />
              <span>Chef's Picks</span>
            </button>

            <button
              onClick={() => setIsVegetarianOnly(!isVegetarianOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isVegetarianOnly
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#1A1613] border border-[#D8AA5B]/25 text-[#CFC3B5] hover:border-[#D8AA5B]/60'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Vegetarian</span>
            </button>

            <button
              onClick={() => setIsSpicyOnly(!isSpicyOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isSpicyOnly
                  ? 'bg-[#B91C1C] text-white font-bold shadow-sm'
                  : 'bg-[#1A1613] border border-[#D8AA5B]/25 text-[#CFC3B5] hover:border-[#D8AA5B]/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#F87171]" />
              <span>Spicy</span>
            </button>

            <button
              onClick={() => setIsAvailableOnly(!isAvailableOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isAvailableOnly
                  ? 'bg-[#D8662C]/20 border border-[#D8662C] text-[#D8AA5B] font-bold'
                  : 'bg-[#1A1613] border border-[#D8AA5B]/25 text-[#CFC3B5] hover:border-[#D8AA5B]/60'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-[#D8662C]" />
              <span>Available Now</span>
            </button>
          </div>

        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#D8662C] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-[0.20em] text-[#D8AA5B] font-mono">
              Loading Ember Kitchen Records...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center bg-[#14110F] border border-[#D8AA5B]/25 rounded-sm p-8 space-y-4 max-w-2xl mx-auto">
            <Utensils className="w-10 h-10 text-[#D8662C] opacity-60 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#F5EFE6]">
              No dishes match your filter selection
            </h3>
            <p className="text-xs sm:text-sm text-[#CFC3B5] font-light max-w-md mx-auto leading-relaxed">
              Try adjusting your search keywords or clearing some of the dietary filters to view our full menu.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setIsVegetarianOnly(false);
                  setIsSpicyOnly(false);
                  setIsAvailableOnly(false);
                  setIsChefsPickOnly(false);
                }}
                className="me-btn-primary text-xs px-6 py-3"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Menu Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="me-card flex flex-col justify-between overflow-hidden cursor-pointer group relative"
              >
                {/* Food Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#101010]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1A1613] text-[#94877A]">
                      <Utensils className="w-10 h-10 opacity-30" />
                    </div>
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613] via-transparent to-transparent opacity-80" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-xs bg-[#101010]/85 border border-[#D8AA5B]/30 text-[10px] font-semibold uppercase tracking-wider text-[#D8AA5B] backdrop-blur-sm">
                      {item.category}
                    </span>

                    {item.isChefsPick && (
                      <span className="px-2 py-0.5 rounded-xs bg-[#D8AA5B] text-[#101010] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Chef's Pick</span>
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-xs bg-[#D8662C] text-white text-xs font-bold font-mono shadow-lg">
                      RM {Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Sold Out Overlay */}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-20">
                      <span className="px-3 py-1 rounded bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Sold Out Today</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F5EFE6] group-hover:text-[#D8AA5B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#CFC3B5] font-light mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Tags */}
                  <div className="pt-3 border-t border-[#D8AA5B]/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {item.spicyLevel > 0 && (
                        <div className="flex items-center gap-0.5 text-[#D8662C]" title={`Spiciness ${item.spicyLevel}/3`}>
                          {Array.from({ length: item.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                      {item.isVegetarian && (
                        <span className="text-[11px] text-[#34D399] font-medium flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          <span>Vegetarian</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold text-[#D8AA5B] group-hover:text-[#E47B3D] transition-colors flex items-center gap-1">
                      <span>View Details</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Callout Banner */}
        <div className="bg-gradient-to-r from-[#1A1613] via-[#211A15] to-[#1A1613] border border-[#D8AA5B]/35 p-8 sm:p-12 rounded-sm text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D8662C]/20 border border-[#D8AA5B]/40 text-[#D8AA5B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D8662C]" />
            <span>Chef's Table &amp; Wine Pairings</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F5EFE6]">
            Planning a Special Gathering or Tasting?
          </h2>

          <p className="text-xs sm:text-sm text-[#CFC3B5] font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance to guarantee preferred seating in our main dining room or outdoor sunset terrace.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedReservationLink()}
              className="me-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table Online</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.name}
          subtitle={`RM ${Number(selectedItem.price).toFixed(2)} · ${selectedItem.category.toUpperCase()}`}
          maxWidth="md"
        >
          <div className="space-y-5 text-xs text-[#F5EFE6]">
            {/* Image banner */}
            {selectedItem.imageUrl && (
              <div className="rounded-sm overflow-hidden aspect-video border border-[#D8AA5B]/30">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="font-mono uppercase text-[11px] text-[#D8AA5B] tracking-wider mb-1">
                Description &amp; Preparation
              </h4>
              <p className="text-[#CFC3B5] font-light leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Pairings & Allergens */}
            {selectedItem.pairingRecommendation && (
              <div className="p-3 bg-[#1A1613] border border-[#D8AA5B]/20 rounded-xs">
                <h4 className="font-mono uppercase text-[11px] text-[#D8AA5B] tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#D8662C]" />
                  <span>Sommelier &amp; Mixologist Pairing</span>
                </h4>
                <p className="text-[#CFC3B5] text-[11px]">
                  {selectedItem.pairingRecommendation}
                </p>
              </div>
            )}

            {selectedItem.allergens && selectedItem.allergens.length > 0 && (
              <div>
                <h4 className="font-mono uppercase text-[11px] text-[#94877A] tracking-wider mb-1">
                  Allergen Advisory
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.allergens.map((allergen, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#1A1613] border border-[#D8AA5B]/20 text-[10px] text-[#CFC3B5]"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#D8AA5B]/20 flex items-center justify-between">
              <span className="font-mono text-xs text-[#D8AA5B] font-bold">
                RM {Number(selectedItem.price).toFixed(2)}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="me-btn-outline px-4 py-2 text-xs"
                >
                  Close
                </button>
                <Link
                  to={getThemedReservationLink()}
                  className="me-btn-primary px-5 py-2 text-xs"
                >
                  Book Table
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MidnightEmberMenu;
