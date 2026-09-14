import React from 'react';
import { Search, Flame, Leaf, Sparkles, Check, X } from 'lucide-react';
import { MENU_CATEGORIES } from '../../types/menu';

interface MenuFilterBarProps {
  selectedCategory: string; // 'all' or MenuCategoryType
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isVegetarianOnly: boolean;
  onToggleVegetarian: () => void;
  isSpicyOnly: boolean;
  onToggleSpicy: () => void;
  isAvailableOnly: boolean;
  onToggleAvailable: () => void;
  isChefsPickOnly: boolean;
  onToggleChefsPick: () => void;
  totalResults: number;
}

export const MenuFilterBar: React.FC<MenuFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  isVegetarianOnly,
  onToggleVegetarian,
  isSpicyOnly,
  onToggleSpicy,
  isAvailableOnly,
  onToggleAvailable,
  isChefsPickOnly,
  onToggleChefsPick,
  totalResults
}) => {
  const hasActiveFilters = isVegetarianOnly || isSpicyOnly || isAvailableOnly || isChefsPickOnly || searchQuery.trim().length > 0;

  const handleClearAll = () => {
    onSearchChange('');
    if (isVegetarianOnly) onToggleVegetarian();
    if (isSpicyOnly) onToggleSpicy();
    if (isAvailableOnly) onToggleAvailable();
    if (isChefsPickOnly) onToggleChefsPick();
    onSelectCategory('all');
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs Scrollable Horizontal Bar */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all font-mono ${
              selectedCategory === 'all'
                ? 'text-qc-primary font-bold'
                : 'text-qc-body hover:text-qc-primary'
            }`}
            style={
              selectedCategory === 'all'
                ? { background: 'var(--accent-surface)', border: '1px solid var(--accent-primary)' }
                : { background: 'transparent', border: '1px solid var(--border-default)' }
            }
          >
            All Items
          </button>

          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all font-mono ${
                selectedCategory === cat.id
                  ? 'text-qc-primary font-bold'
                  : 'text-qc-body hover:text-qc-primary'
              }`}
              style={
                selectedCategory === cat.id
                  ? { background: 'var(--accent-surface)', border: '1px solid var(--accent-primary)' }
                  : { background: 'transparent', border: '1px solid var(--border-default)' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input & Quick Filter Badges */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-t border-border-base/80">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-qc-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dish, drink, ingredient or spice..."
            className="w-full bg-qc-surface border border-border-strong/80 pl-10 pr-9 py-2.5 text-xs text-qc-primary placeholder-qc-muted rounded-sm focus:outline-none focus:border-purple-600/80 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-qc-muted hover:text-qc-primary"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Chef's Pick Filter */}
          <button
            onClick={onToggleChefsPick}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-sm border transition-all ${
              isChefsPickOnly
                ? 'bg-purple-600/15 text-qc-primary border-purple-600 font-semibold'
                : 'bg-qc-surface text-qc-body border-border-strong hover:text-qc-primary'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Chef's Pick</span>
            {isChefsPickOnly && <Check className="w-3 h-3 text-purple-500 ml-1" />}
          </button>

          {/* Vegetarian Filter */}
          <button
            onClick={onToggleVegetarian}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-sm border transition-all ${
              isVegetarianOnly
                ? 'bg-emerald-950/20 text-emerald-600 dark:text-emerald-300 border-emerald-500 font-semibold'
                : 'bg-qc-surface text-qc-body border-border-strong hover:text-qc-primary'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vegetarian</span>
            {isVegetarianOnly && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
          </button>

          {/* Spicy Filter */}
          <button
            onClick={onToggleSpicy}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-sm border transition-all ${
              isSpicyOnly
                ? 'bg-red-950/20 text-red-600 dark:text-red-300 border-red-500 font-semibold'
                : 'bg-qc-surface text-qc-body border-border-strong hover:text-qc-primary'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Spicy Dishes</span>
            {isSpicyOnly && <Check className="w-3 h-3 text-red-400 ml-1" />}
          </button>

          {/* Available Now Filter */}
          <button
            onClick={onToggleAvailable}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-sm border transition-all ${
              isAvailableOnly
                ? 'bg-purple-600/15 text-qc-primary border-purple-600 font-semibold'
                : 'bg-qc-surface text-qc-body border-border-strong hover:text-qc-primary'
            }`}
          >
            <span>Available Now</span>
            {isAvailableOnly && <Check className="w-3 h-3 text-purple-500 ml-1" />}
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs text-purple-500 hover:text-qc-primary underline px-2 py-1"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-qc-body pt-1 font-light">
        <span>Showing <strong className="text-purple-500 font-semibold">{totalResults}</strong> dishes &amp; beverages</span>
        {selectedCategory !== 'all' && (
          <span className="italic text-qc-body">
            {MENU_CATEGORIES.find(c => c.id === selectedCategory)?.description}
          </span>
        )}
      </div>
    </div>
  );
};
