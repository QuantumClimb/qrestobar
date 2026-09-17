import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useSiteTheme } from '../context/SiteThemeContext';
import { MenuFilterBar } from '../components/menu/MenuFilterBar';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { MenuDetailModal } from '../components/menu/MenuDetailModal';
import { MenuItem } from '../types/menu';

const MidnightEmberMenu = React.lazy(
  () => import('../themes/components/midnightEmber/MidnightEmberMenu')
);
const HeritageSpiceMenu = React.lazy(
  () => import('../themes/components/heritageSpice/HeritageSpiceMenu')
);
const BotanicalBistroMenu = React.lazy(
  () => import('../themes/components/botanicalBistro/BotanicalBistroMenu')
);

export const MenuPage: React.FC = () => {
  const { effectiveThemeId } = useSiteTheme();

  // Early branch: Midnight Ember presentation
  if (effectiveThemeId === 'midnight-ember') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <MidnightEmberMenu />
      </React.Suspense>
    );
  }

  // Early branch: Heritage Spice presentation
  if (effectiveThemeId === 'heritage-spice') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#2B080E]" />}>
        <HeritageSpiceMenu />
      </React.Suspense>
    );
  }

  // Early branch: Botanical Bistro presentation
  if (effectiveThemeId === 'botanical-bistro') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#F4F1E8]" />}>
        <BotanicalBistroMenu />
      </React.Suspense>
    );
  }

  const { menuItems, isLoading } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegetarianOnly, setIsVegetarianOnly] = useState(false);
  const [isSpicyOnly, setIsSpicyOnly] = useState(false);
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [isChefsPickOnly, setIsChefsPickOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Filtered menu calculation
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

  return (
    <div className="min-h-screen bg-qc-base text-qc-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <Utensils className="w-3.5 h-3.5" />
            <span>Digital Gastronomic Menu</span>
            <Utensils className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-qc-primary tracking-wide">
            Our Culinary &amp; Drink Offerings
          </h1>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            Explore authentic Malaysian culinary staples reimagined with premium fire grilling, slow reductions, and botanical mixology. All prices in Malaysian Ringgit (RM).
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-qc-surface/90 border border-border-base p-6 rounded-sm shadow-xl backdrop-blur-sm">
          <MenuFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isVegetarianOnly={isVegetarianOnly}
            onToggleVegetarian={() => setIsVegetarianOnly(!isVegetarianOnly)}
            isSpicyOnly={isSpicyOnly}
            onToggleSpicy={() => setIsSpicyOnly(!isSpicyOnly)}
            isAvailableOnly={isAvailableOnly}
            onToggleAvailable={() => setIsAvailableOnly(!isAvailableOnly)}
            isChefsPickOnly={isChefsPickOnly}
            onToggleChefsPick={() => setIsChefsPickOnly(!isChefsPickOnly)}
            totalResults={filteredItems.length}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-qc-body uppercase tracking-widest">Loading Fresh Menu Data...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Search State */
          <div className="py-20 text-center bg-qc-surface border border-border-base rounded-sm p-8 space-y-4">
            <p className="text-lg font-display font-bold text-qc-primary">No dishes match your filter selection</p>
            <p className="text-xs text-qc-body font-light max-w-md mx-auto">
              Try broadening your search term or unchecking some of the dietary filters to explore our full selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setIsVegetarianOnly(false);
                setIsSpicyOnly(false);
                setIsAvailableOnly(false);
                setIsChefsPickOnly(false);
                setSelectedCategory('all');
              }}
              className="btn-gold-outline text-xs px-6 py-2.5 uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Menu Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}

        {/* Bottom Booking Callout */}
        <div className="bg-qc-surface border border-purple-600/30 p-8 sm:p-12 rounded-sm text-center space-y-4 shadow-xl relative overflow-hidden transition-colors">
          <Sparkles className="w-6 h-6 text-purple-500 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
            Planning a Special Gathering or Tasting?
          </h2>
          <p className="text-xs sm:text-sm text-qc-body font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance to ensure preferred seating in our main dining room or outdoor alfresco terrace.
          </p>
          <div className="pt-2">
            <Link
              to="/reservations"
              className="btn-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <MenuDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
