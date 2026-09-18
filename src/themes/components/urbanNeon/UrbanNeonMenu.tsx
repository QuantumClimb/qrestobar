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
import { UrbanNeonPageHero } from './UrbanNeonPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/urbanNeon.css';

export const UrbanNeonMenu: React.FC = () => {
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

  const getThemedReservationLink = () => withSiteThemePreview('/reservations', 'urban-neon');

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
  }, [menuItems, selectedCategory, isVegetarianOnly, isSpicyOnly, isAvailableOnly, isChefsPickOnly, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    ...MENU_CATEGORIES
  ];

  return (
    <div className="min-h-screen bg-[#090B18] text-white py-12 sm:py-16 selection:bg-[#20E3D2]/30 selection:text-white un-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <UrbanNeonPageHero
          badge="CYBER GASTRONOMY &amp; GRILL"
          title="Digital Nightlife Menu"
          subtitle="Charcoal flame-grilled Wagyu, artisanal burgers, seafood clays, and electric craft mixology crafted for late-night Kuala Lumpur dining."
        />

        {/* Search & Filter Bar */}
        <div className="bg-[#131B2E] border border-[#20E3D2]/30 p-6 rounded-lg shadow-[0_0_20px_rgba(32,227,210,0.15)] space-y-5">
          {/* Top Row: Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#20E3D2] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish name, ingredient, or allergen (e.g. Steak, Burger, Peanuts)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111827] border border-[#20E3D2]/40 rounded pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#20E3D2] focus:ring-1 focus:ring-[#20E3D2] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-[#20E3D2]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] rounded transition-all whitespace-nowrap shrink-0 un-font-display ${
                    isSelected
                      ? 'bg-[#20E3D2] text-[#090B18] shadow-[0_0_15px_rgba(32,227,210,0.4)]'
                      : 'bg-[#111827] border border-white/10 text-gray-300 hover:text-white hover:border-[#20E3D2]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Dietary & Preference Toggles */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs">
            <span className="font-mono uppercase text-[11px] text-gray-400 tracking-wider mr-1">
              Filter By:
            </span>

            <button
              onClick={() => setIsChefsPickOnly(!isChefsPickOnly)}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs ${
                isChefsPickOnly
                  ? 'bg-[#EC4899] text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                  : 'bg-[#111827] border border-white/10 text-gray-300 hover:border-[#EC4899]/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Chef's Choice</span>
            </button>

            <button
              onClick={() => setIsVegetarianOnly(!isVegetarianOnly)}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs ${
                isVegetarianOnly
                  ? 'bg-[#20E3D2] text-[#090B18] font-bold shadow-[0_0_12px_rgba(32,227,210,0.4)]'
                  : 'bg-[#111827] border border-white/10 text-gray-300 hover:border-[#20E3D2]/50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-[#20E3D2]" />
              <span>Vegetarian</span>
            </button>

            <button
              onClick={() => setIsSpicyOnly(!isSpicyOnly)}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs ${
                isSpicyOnly
                  ? 'bg-[#EF4444] text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                  : 'bg-[#111827] border border-white/10 text-gray-300 hover:border-[#EF4444]/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Spicy</span>
            </button>

            <button
              onClick={() => setIsAvailableOnly(!isAvailableOnly)}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs ${
                isAvailableOnly
                  ? 'bg-[#20E3D2]/20 border border-[#20E3D2] text-[#20E3D2] font-bold'
                  : 'bg-[#111827] border border-white/10 text-gray-300 hover:border-[#20E3D2]/50'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-[#20E3D2]" />
              <span>Available Now</span>
            </button>
          </div>

        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#20E3D2] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_15px_#20E3D2]" />
            <p className="text-xs uppercase tracking-[0.20em] text-[#20E3D2] font-mono">
              Loading Kitchen &amp; Cocktail Data...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Filter State */
          <div className="py-24 text-center bg-[#131B2E] border border-[#20E3D2]/30 rounded-lg p-8 space-y-4 max-w-2xl mx-auto shadow-xl">
            <Utensils className="w-10 h-10 text-[#20E3D2] opacity-50 mx-auto" />
            <h3 className="un-font-display text-2xl font-bold text-white">
              No dishes match your filter selection
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto leading-relaxed">
              Try adjusting your search terms or clearing filters to explore our full selection.
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
                className="un-btn-cyan text-xs px-6 py-3"
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
                className="un-card cursor-pointer group text-left overflow-hidden flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#20E3D2]"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111827]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#111827] text-gray-600">
                      <Utensils className="w-10 h-10 opacity-30" />
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="un-badge-cyan shadow-md">
                      {item.category}
                    </span>

                    {item.isChefsPick && (
                      <span className="un-badge-magenta shadow-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Chef's Choice</span>
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded bg-[#090B18] text-[#20E3D2] text-xs font-bold font-mono border border-[#20E3D2]/40 shadow-md">
                      RM {Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Sold Out Overlay */}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 backdrop-blur-xs">
                      <span className="px-3 py-1 rounded bg-[#DC2626] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Sold Out Today</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#131B2E]">
                  <div>
                    <h3 className="un-font-display text-xl font-bold text-white group-hover:text-[#20E3D2] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-light mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Metadata & CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {item.spicyLevel > 0 && (
                        <div className="flex items-center gap-0.5 text-[#EF4444]" title={`Spiciness ${item.spicyLevel}/3`}>
                          {Array.from({ length: item.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                      {item.isVegetarian && (
                        <span className="text-[11px] text-[#20E3D2] font-medium flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          <span>Vegetarian</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-[#20E3D2] group-hover:text-white transition-colors flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-[#20E3D2]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Callout Banner */}
        <div className="bg-[#131B2E] border border-[#20E3D2]/40 p-8 sm:p-12 rounded-lg text-center space-y-5 shadow-[0_0_30px_rgba(32,227,210,0.15)] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#20E3D2]/15 border border-[#20E3D2]/40 text-[#20E3D2] text-xs font-bold uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>

          <h2 className="un-font-display text-2xl sm:text-4xl font-bold text-white">
            Planning a Group Gathering or VIP Night?
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance to ensure preferred seating near the main lounge stage or outdoor terrace.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedReservationLink()}
              className="un-btn-cyan px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
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
          aria-labelledby="urban-modal-title"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Dialog Body */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-lg my-8 bg-[#131B2E] border-2 border-[#20E3D2]/50 rounded-lg shadow-[0_0_40px_rgba(32,227,210,0.3)] z-10 overflow-hidden transform transition-all animate-scale-up text-white"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-gray-300 hover:text-white p-2 bg-[#111827] rounded-full border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#20E3D2] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close dish details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            {selectedItem.imageUrl && (
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111827] border-b border-white/10">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-4">
                  <span className="un-badge-cyan">
                    {selectedItem.category}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 id="urban-modal-title" className="un-font-display text-2xl sm:text-3xl font-bold text-white">
                    {selectedItem.name}
                  </h3>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#20E3D2] shrink-0">
                    RM {Number(selectedItem.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {selectedItem.spicyLevel > 0 && (
                    <span className="text-xs text-[#EF4444] flex items-center gap-1 font-mono">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Spiciness: {selectedItem.spicyLevel}/3</span>
                    </span>
                  )}
                  {selectedItem.isVegetarian && (
                    <span className="text-xs text-[#20E3D2] flex items-center gap-1 font-mono">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Vegetarian</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-mono uppercase text-[11px] text-[#20E3D2] tracking-wider mb-1">
                  Description &amp; Preparation
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Recommended Beverage Pairing if available */}
              {selectedItem.pairingRecommendation && (
                <div className="p-3 bg-[#111827] border border-[#20E3D2]/30 rounded">
                  <h4 className="font-mono uppercase text-[11px] text-[#20E3D2] tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#20E3D2]" />
                    <span>Recommended Beverage Pairing</span>
                  </h4>
                  <p className="text-gray-300 text-xs">
                    {selectedItem.pairingRecommendation}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                <div>
                  <h4 className="font-mono uppercase text-[11px] text-gray-400 tracking-wider mb-1">
                    Allergen Information
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.allergens.map((allergen, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded bg-[#111827] border border-white/10 text-[10px] text-gray-300"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={closeModal}
                  className="un-btn-outline px-5 py-2.5 text-xs min-h-[44px]"
                >
                  Close
                </button>
                <Link
                  to={getThemedReservationLink()}
                  className="un-btn-cyan px-6 py-2.5 text-xs font-bold uppercase min-h-[44px] flex items-center justify-center"
                  onClick={closeModal}
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

export default UrbanNeonMenu;
