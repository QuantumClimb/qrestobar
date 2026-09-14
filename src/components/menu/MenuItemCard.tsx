import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MenuItem, MENU_CATEGORIES } from '../../types/menu';
import { SpicyBadge, ChefsPickBadge, VegetarianBadge, SoldOutBadge } from '../common/Badge';

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => {
  const categoryLabel = MENU_CATEGORIES.find(c => c.id === item.category)?.label || item.category;

  return (
    <div
      onClick={onClick}
      className={`luxury-card group flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 ${
        !item.isAvailable ? 'opacity-75' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-qc-base">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
            !item.isAvailable ? 'grayscale contrast-125' : ''
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }} />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isChefsPick && <ChefsPickBadge />}
          {item.isVegetarian && <VegetarianBadge />}
          {!item.isAvailable && <SoldOutBadge />}
        </div>

        {/* Price Pill */}
        <div className="absolute bottom-3 right-3 bg-qc-base/90 border border-purple-600/40 px-3 py-1 rounded-sm shadow-md z-10 backdrop-blur-sm">
          <span className="text-[11px] font-medium text-purple-500">RM</span>
          <span className="text-base font-display font-bold text-qc-primary ml-1">{item.price}</span>
        </div>
      </div>

      {/* Item Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-semibold text-purple-500 uppercase tracking-widest">
              {categoryLabel}
            </span>
            <SpicyBadge level={item.spicyLevel} />
          </div>

          <h3 className="text-lg font-display font-bold text-qc-primary group-hover:text-qc-secondary transition-colors mb-2">
            {item.name}
          </h3>

          <p className="text-xs text-qc-body leading-relaxed font-light line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-border-base/80 flex items-center justify-between text-xs text-purple-500 font-semibold uppercase tracking-wider">
          <span className="text-[11px]">View Plate Details</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
