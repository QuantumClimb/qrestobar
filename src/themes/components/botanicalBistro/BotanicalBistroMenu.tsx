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
import { BotanicalBistroPageHero } from './BotanicalBistroPageHero';
import { withSiteThemePreview } from '../../themePreviewNavigation';
import '../../styles/botanicalBistro.css';

export const BotanicalBistroMenu: React.FC = () => {
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

  const getThemedReservationLink = () => withSiteThemePreview('/reservations', 'botanical-bistro');

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
    <div className="min-h-screen bg-[#F4F1E8] text-[#24352A] py-12 sm:py-16 selection:bg-[#3F6B4F]/20 selection:text-[#24352A] bb-font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <BotanicalBistroPageHero
          badge="OUR CULINARY SELECTION"
          title="Botanical & Charcoal Menu"
          subtitle="Carefully crafted dishes incorporating fresh-harvested local herbs, house-ground rempahs, and wood-fired grilling in the heart of Kuala Lumpur."
        />

        {/* Search & Filter Bar */}
        <div className="bg-[#FCFAF4] border border-[#3F6B4F]/20 p-6 rounded-md shadow-md space-y-5">
          {/* Top Row: Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#7B877E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish name, ingredient, or allergen (e.g. Rendang, Satay, Peanuts)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F1E8] border border-[#3F6B4F]/30 rounded-xs pl-10 pr-4 py-3 text-xs sm:text-sm text-[#24352A] placeholder-[#7B877E] focus:outline-none focus:border-[#3F6B4F] focus:ring-1 focus:ring-[#3F6B4F] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7B877E] hover:text-[#24352A]"
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
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] rounded-xs transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#3F6B4F] text-white font-bold shadow-sm'
                      : 'bg-[#F4F1E8] border border-[#3F6B4F]/25 text-[#556257] hover:text-[#24352A] hover:border-[#3F6B4F]/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Dietary & Preference Toggles */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#3F6B4F]/15 text-xs">
            <span className="font-mono uppercase text-[11px] text-[#7B877E] tracking-wider mr-1">
              Filter By:
            </span>

            <button
              onClick={() => setIsChefsPickOnly(!isChefsPickOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isChefsPickOnly
                  ? 'bg-[#B86B45] text-white font-bold shadow-sm'
                  : 'bg-[#F4F1E8] border border-[#3F6B4F]/25 text-[#556257] hover:border-[#3F6B4F]/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B86B45]" />
              <span>Chef's Choice</span>
            </button>

            <button
              onClick={() => setIsVegetarianOnly(!isVegetarianOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isVegetarianOnly
                  ? 'bg-[#3F6B4F] text-white font-bold shadow-sm'
                  : 'bg-[#F4F1E8] border border-[#3F6B4F]/25 text-[#556257] hover:border-[#3F6B4F]/50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-[#3F6B4F]" />
              <span>Vegetarian</span>
            </button>

            <button
              onClick={() => setIsSpicyOnly(!isSpicyOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isSpicyOnly
                  ? 'bg-[#C05621] text-white font-bold shadow-sm'
                  : 'bg-[#F4F1E8] border border-[#3F6B4F]/25 text-[#556257] hover:border-[#3F6B4F]/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#C05621]" />
              <span>Spicy</span>
            </button>

            <button
              onClick={() => setIsAvailableOnly(!isAvailableOnly)}
              className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-all text-xs ${
                isAvailableOnly
                  ? 'bg-[#3F6B4F]/20 border border-[#3F6B4F] text-[#3F6B4F] font-bold'
                  : 'bg-[#F4F1E8] border border-[#3F6B4F]/25 text-[#556257] hover:border-[#3F6B4F]/50'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-[#3F6B4F]" />
              <span>Available Now</span>
            </button>
          </div>

        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#3F6B4F] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-[0.20em] text-[#3F6B4F] font-mono">
              Loading Garden Kitchen Offerings...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Filter State */
          <div className="py-24 text-center bg-[#FCFAF4] border border-[#3F6B4F]/20 rounded-md p-8 space-y-4 max-w-2xl mx-auto shadow-sm">
            <Utensils className="w-10 h-10 text-[#3F6B4F] opacity-50 mx-auto" />
            <h3 className="bb-font-display text-2xl font-bold text-[#24352A]">
              No dishes match your filter selection
            </h3>
            <p className="text-xs sm:text-sm text-[#556257] font-light max-w-md mx-auto leading-relaxed">
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
                className="bb-btn-primary text-xs px-6 py-3"
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
                className="bb-card cursor-pointer group text-left overflow-hidden flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E3D6]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#E7E3D6] text-[#7B877E]">
                      <Utensils className="w-10 h-10 opacity-30" />
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="bb-badge shadow-sm">
                      {item.category}
                    </span>

                    {item.isChefsPick && (
                      <span className="bb-badge-terracotta shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Chef's Choice</span>
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-xs bg-[#24352A] text-[#FCFAF4] text-xs font-bold font-mono shadow-md">
                      RM {Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Sold Out Overlay */}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-xs">
                      <span className="px-3 py-1 rounded bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Sold Out Today</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FCFAF4]">
                  <div>
                    <h3 className="bb-font-display text-xl font-bold text-[#24352A] group-hover:text-[#3F6B4F] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#556257] font-light mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Metadata & CTA */}
                  <div className="pt-3 border-t border-[#3F6B4F]/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {item.spicyLevel > 0 && (
                        <div className="flex items-center gap-0.5 text-[#C05621]" title={`Spiciness ${item.spicyLevel}/3`}>
                          {Array.from({ length: item.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                      {item.isVegetarian && (
                        <span className="text-[11px] text-[#3F6B4F] font-medium flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          <span>Vegetarian</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-[#3F6B4F] group-hover:text-[#2F533C] transition-colors flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-[#3F6B4F]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Callout Banner */}
        <div className="bg-[#E7E3D6] border border-[#3F6B4F]/25 p-8 sm:p-12 rounded-md text-center space-y-5 shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#3F6B4F]/15 border border-[#3F6B4F]/30 text-[#3F6B4F] text-xs font-semibold uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#3F6B4F]" />
            <span>Table Reservations</span>
          </div>

          <h2 className="bb-font-display text-2xl sm:text-4xl font-bold text-[#24352A]">
            Planning a Special Gathering or Tasting?
          </h2>

          <p className="text-xs sm:text-sm text-[#556257] font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance to ensure preferred seating in our main dining room or outdoor garden terrace.
          </p>

          <div className="pt-2">
            <Link
              to={getThemedReservationLink()}
              className="bb-btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
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
          aria-labelledby="botanical-modal-title"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Dialog Body */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-lg my-8 bg-[#FCFAF4] border border-[#3F6B4F]/30 rounded-md shadow-2xl z-10 overflow-hidden transform transition-all animate-scale-up text-[#24352A]"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-[#7B877E] hover:text-[#24352A] p-1.5 bg-[#F4F1E8] rounded-full border border-[#3F6B4F]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3F6B4F]"
              aria-label="Close dish details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            {selectedItem.imageUrl && (
              <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E3D6] border-b border-[#3F6B4F]/20">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-4">
                  <span className="bb-badge">
                    {selectedItem.category}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 id="botanical-modal-title" className="bb-font-display text-2xl sm:text-3xl font-bold text-[#24352A]">
                    {selectedItem.name}
                  </h3>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#3F6B4F] shrink-0">
                    RM {Number(selectedItem.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {selectedItem.spicyLevel > 0 && (
                    <span className="text-xs text-[#C05621] flex items-center gap-1 font-mono">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Spiciness: {selectedItem.spicyLevel}/3</span>
                    </span>
                  )}
                  {selectedItem.isVegetarian && (
                    <span className="text-xs text-[#3F6B4F] flex items-center gap-1 font-mono">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Vegetarian</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-mono uppercase text-[11px] text-[#3F6B4F] tracking-wider mb-1">
                  Description &amp; Preparation
                </h4>
                <p className="text-xs sm:text-sm text-[#556257] font-light leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Sommelier / Beverage Pairing if available */}
              {selectedItem.pairingRecommendation && (
                <div className="p-3 bg-[#E7E3D6]/60 border border-[#3F6B4F]/25 rounded-xs">
                  <h4 className="font-mono uppercase text-[11px] text-[#3F6B4F] tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#3F6B4F]" />
                    <span>Recommended Beverage Pairing</span>
                  </h4>
                  <p className="text-[#556257] text-xs">
                    {selectedItem.pairingRecommendation}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                <div>
                  <h4 className="font-mono uppercase text-[11px] text-[#7B877E] tracking-wider mb-1">
                    Allergen Information
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.allergens.map((allergen, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-xs bg-[#E7E3D6] border border-[#3F6B4F]/20 text-[10px] text-[#24352A]"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[#3F6B4F]/15 flex items-center justify-between">
                <button
                  onClick={closeModal}
                  className="bb-btn-outline px-5 py-2 text-xs"
                >
                  Close
                </button>
                <Link
                  to={getThemedReservationLink()}
                  className="bb-btn-primary px-6 py-2 text-xs"
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

export default BotanicalBistroMenu;
