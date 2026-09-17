import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Info,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { MenuItem, MENU_CATEGORIES } from '../../../types/menu';
import { HeritageSpicePageHero } from './HeritageSpicePageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/heritageSpice.css';

export const HeritageSpiceMenu: React.FC = () => {
  const { menuItems, isLoading } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegetarianOnly, setIsVegetarianOnly] = useState(false);
  const [isSpicyOnly, setIsSpicyOnly] = useState(false);
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [isChefsPickOnly, setIsChefsPickOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const openerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const getThemedReservationLink = () => withSiteThemePreview('/reservations', 'heritage-spice');

  const openModal = (item: MenuItem, triggerElement: HTMLElement | null) => {
    openerRef.current = triggerElement;
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    if (openerRef.current) {
      openerRef.current.focus();
    }
  };

  // Focus trap, Escape key, and body-scroll locking for modal
  useEffect(() => {
    if (!selectedItem) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

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
    <div className="min-h-screen bg-[#2B080E] text-[#FFF4DF] py-12 sm:py-16 selection:bg-[#C69A4B]/30 selection:text-[#FFF4DF] hs-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <HeritageSpicePageHero
          badge="Q-RESTOBAR · HERITAGE GASTRONOMY"
          title="Our Culinary Offerings"
          subtitle="Explore authentic Malaysian culinary staples reimagined with traditional charcoal grilling, rich slow reductions, and contemporary presentation."
        />

        {/* Search & Filter Control Panel */}
        <div className="bg-[#371018] border border-[#C69A4B]/35 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 relative">
          {/* Subtle antique gold top highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C69A4B] to-transparent opacity-60" />

          {/* Top Row: Search Input & Result Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, spices, ingredients..."
                className="w-full bg-[#2B080E] border border-[#C69A4B]/40 pl-10 pr-10 py-3 text-xs text-[#FFF4DF] rounded-xs focus:border-[#E89532] focus:outline-none placeholder-[#80665A] transition-colors"
                aria-label="Search menu items"
              />
              <Search className="w-4 h-4 text-[#C69A4B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C2AFA6] hover:text-[#FFF4DF] transition-colors p-1"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-[#C69A4B] tracking-wider uppercase flex items-center gap-1.5 self-end sm:self-center">
              <span>Showing {filteredItems.length} Offerings</span>
            </div>
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] rounded-xs transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#C69A4B] text-[#2B080E] font-bold shadow-md'
                      : 'bg-[#2B080E] border border-[#C69A4B]/30 text-[#F8EAD2] hover:text-[#FFF4DF] hover:border-[#C69A4B]/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Dietary & Preference Toggles */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#C69A4B]/20 text-xs">
            <span className="font-mono uppercase text-[11px] text-[#C2AFA6] tracking-wider mr-1">
              Filter By:
            </span>

            <button
              onClick={() => setIsChefsPickOnly(!isChefsPickOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isChefsPickOnly
                  ? 'bg-[#E89532] text-white font-bold shadow-sm'
                  : 'bg-[#2B080E] border border-[#C69A4B]/30 text-[#F8EAD2] hover:border-[#C69A4B]/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C69A4B]" />
              <span>Chef's Choice</span>
            </button>

            <button
              onClick={() => setIsVegetarianOnly(!isVegetarianOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isVegetarianOnly
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#2B080E] border border-[#C69A4B]/30 text-[#F8EAD2] hover:border-[#C69A4B]/60'
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
                  : 'bg-[#2B080E] border border-[#C69A4B]/30 text-[#F8EAD2] hover:border-[#C69A4B]/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#F87171]" />
              <span>Spicy</span>
            </button>

            <button
              onClick={() => setIsAvailableOnly(!isAvailableOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isAvailableOnly
                  ? 'bg-[#C69A4B]/25 border border-[#C69A4B] text-[#C69A4B] font-bold'
                  : 'bg-[#2B080E] border border-[#C69A4B]/30 text-[#F8EAD2] hover:border-[#C69A4B]/60'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-[#C69A4B]" />
              <span>Available Now</span>
            </button>
          </div>

        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#C69A4B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-[0.20em] text-[#C69A4B] font-mono">
              Loading Heritage Kitchen Offerings...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Filter State */
          <div className="py-24 text-center bg-[#371018] border border-[#C69A4B]/30 rounded-sm p-8 space-y-4 max-w-2xl mx-auto shadow-xl">
            <Utensils className="w-10 h-10 text-[#C69A4B] opacity-60 mx-auto" />
            <h3 className="hs-font-display text-2xl font-bold text-[#FFF4DF]">
              No dishes match your filter selection
            </h3>
            <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light max-w-md mx-auto leading-relaxed">
              Try adjusting your search keywords or clearing some of the dietary filters to explore our full selection.
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
                className="hs-btn-primary text-xs px-6 py-3"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Dish Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={(e) => openModal(item, e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(item, e.currentTarget);
                  }
                }}
                className="hs-menu-card cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-[#C69A4B]"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#2B080E]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#371018] text-[#80665A]">
                      <Utensils className="w-10 h-10 opacity-30" />
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-xs bg-[#2B080E]/90 border border-[#C69A4B]/40 text-[10px] font-semibold uppercase tracking-wider text-[#C69A4B] backdrop-blur-sm">
                      {item.category}
                    </span>

                    {item.isChefsPick && (
                      <span className="px-2.5 py-0.5 rounded-xs bg-[#E89532] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Chef's Choice</span>
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-xs bg-[#2B080E] border border-[#C69A4B]/50 text-[#C69A4B] text-xs font-bold font-mono shadow-lg">
                      RM {Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Sold Out Overlay */}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 backdrop-blur-xs">
                      <span className="px-3 py-1 rounded bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Sold Out Today</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FFFDF7]">
                  <div>
                    <h3 className="hs-font-display text-xl font-bold text-[#321B18] group-hover:text-[#C69A4B] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#80665A] font-light mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Metadata & CTA */}
                  <div className="pt-3 border-t border-[#C69A4B]/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {item.spicyLevel > 0 && (
                        <div className="flex items-center gap-0.5 text-[#E89532]" title={`Spiciness ${item.spicyLevel}/3`}>
                          {Array.from({ length: item.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                      {item.isVegetarian && (
                        <span className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          <span>Vegetarian</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-[#2B080E] group-hover:text-[#C69A4B] transition-colors flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-[#C69A4B]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Callout Banner */}
        <div className="bg-gradient-to-r from-[#371018] via-[#4A0E18] to-[#371018] border border-[#C69A4B]/40 p-8 sm:p-12 rounded-sm text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#C69A4B]/15 border border-[#C69A4B]/40 text-[#C69A4B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#E89532]" />
            <span>Table Reservations</span>
          </div>

          <h2 className="hs-font-display text-2xl sm:text-4xl font-bold text-[#FFF4DF]">
            Planning a Special Gathering or Tasting?
          </h2>

          <p className="text-xs sm:text-sm text-[#F8EAD2]/80 font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance to ensure preferred seating in our main dining room or outdoor alfresco terrace.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedReservationLink()}
              className="hs-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Menu Item Detail Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="heritage-modal-title"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Dialog Body */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-lg my-8 bg-[#371018] border-2 border-[#C69A4B]/50 rounded-sm shadow-2xl z-10 overflow-hidden transform transition-all animate-slide-up text-[#FFF4DF]"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-[#C2AFA6] hover:text-[#FFF4DF] p-1.5 bg-[#2B080E]/80 rounded-full border border-[#C69A4B]/30 hover:border-[#C69A4B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C69A4B]"
              aria-label="Close dish details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            {selectedItem.imageUrl && (
              <div className="relative aspect-[16/10] overflow-hidden bg-[#2B080E] border-b border-[#C69A4B]/30">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#371018] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#2B080E]/90 border border-[#C69A4B]/40 text-[10px] font-semibold uppercase tracking-wider text-[#C69A4B]">
                    {selectedItem.category}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 id="heritage-modal-title" className="hs-font-display text-2xl sm:text-3xl font-bold text-[#FFF4DF]">
                    {selectedItem.name}
                  </h3>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#C69A4B] shrink-0">
                    RM {Number(selectedItem.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {selectedItem.spicyLevel > 0 && (
                    <span className="text-xs text-[#E89532] flex items-center gap-1 font-mono">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Spiciness: {selectedItem.spicyLevel}/3</span>
                    </span>
                  )}
                  {selectedItem.isVegetarian && (
                    <span className="text-xs text-[#34D399] flex items-center gap-1 font-mono">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Vegetarian</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-mono uppercase text-[11px] text-[#C69A4B] tracking-wider mb-1">
                  Description &amp; Preparation
                </h4>
                <p className="text-xs sm:text-sm text-[#F8EAD2]/85 font-light leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Sommelier / Beverage Pairing if available */}
              {selectedItem.pairingRecommendation && (
                <div className="p-3 bg-[#2B080E] border border-[#C69A4B]/30 rounded-xs">
                  <h4 className="font-mono uppercase text-[11px] text-[#C69A4B] tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#E89532]" />
                    <span>Recommended Beverage Pairing</span>
                  </h4>
                  <p className="text-[#F8EAD2]/80 text-xs">
                    {selectedItem.pairingRecommendation}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                <div>
                  <h4 className="font-mono uppercase text-[11px] text-[#C2AFA6] tracking-wider mb-1">
                    Allergen Information
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.allergens.map((allergen, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-xs bg-[#2B080E] border border-[#C69A4B]/30 text-[10px] text-[#F8EAD2]"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[#C69A4B]/20 flex items-center justify-between">
                <button
                  onClick={closeModal}
                  className="hs-btn-outline px-5 py-2 text-xs"
                >
                  Close
                </button>
                <Link
                  to={getThemedReservationLink()}
                  className="hs-btn-primary px-6 py-2 text-xs"
                >
                  Book Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HeritageSpiceMenu;
