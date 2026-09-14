import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, AlertTriangle, Wine } from 'lucide-react';
import { MenuItem, MENU_CATEGORIES } from '../../types/menu';
import { SpicyBadge, ChefsPickBadge, VegetarianBadge, SoldOutBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface MenuDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const categoryLabel = MENU_CATEGORIES.find(c => c.id === item.category)?.label || item.category;

  return (
    <Modal
      isOpen={Boolean(item)}
      onClose={onClose}
      title={item.name}
      subtitle={categoryLabel}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Large Image */}
        <div className="relative h-64 sm:h-72 rounded-sm overflow-hidden border border-border-base bg-qc-base">
          <img
            src={item.imageUrl}
            alt={item.name}
            className={`w-full h-full object-cover ${!item.isAvailable ? 'grayscale contrast-125' : ''}`}
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isChefsPick && <ChefsPickBadge />}
            {item.isVegetarian && <VegetarianBadge />}
            {!item.isAvailable && <SoldOutBadge />}
          </div>
          <div className="absolute bottom-4 right-4 bg-qc-base/95 border border-purple-600/50 px-4 py-1.5 rounded-sm shadow-xl backdrop-blur-md">
            <span className="text-xs font-semibold text-purple-500">RM</span>
            <span className="text-2xl font-display font-bold text-qc-primary ml-1.5">{item.price}</span>
          </div>
        </div>

        {/* Header & Badges */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-border-base">
          <div className="flex items-center gap-3">
            <span className="text-xs text-purple-500 uppercase font-semibold tracking-widest">
              {categoryLabel}
            </span>
            <SpicyBadge level={item.spicyLevel} />
          </div>

          <div className="text-xs text-qc-body font-light">
            Price includes all service &amp; culinary preparation
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-500 mb-2">
            Culinary Description &amp; Ingredients
          </h4>
          <p className="text-sm text-qc-primary leading-relaxed font-light">
            {item.description}
          </p>
        </div>

        {/* Pairing & Allergens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {item.pairingRecommendation && (
            <div className="p-3.5 bg-qc-surface/30 border border-purple-600/40 rounded-sm">
              <div className="flex items-center gap-1.5 text-qc-secondary text-xs font-semibold uppercase tracking-wider mb-1">
                <Wine className="w-3.5 h-3.5" />
                <span>Recommended Pairing</span>
              </div>
              <p className="text-xs text-qc-body leading-relaxed font-light">
                {item.pairingRecommendation}
              </p>
            </div>
          )}

          {item.allergens && item.allergens.length > 0 && (
            <div className="p-3.5 bg-qc-base border border-border-base rounded-sm">
              <div className="flex items-center gap-1.5 text-purple-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Allergen Notice</span>
              </div>
              <p className="text-xs text-qc-body leading-relaxed font-light">
                Contains: {item.allergens.join(', ')}. Please notify your server of severe allergies.
              </p>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-border-base flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="btn-ghost-ivory text-xs px-5 py-2.5 border border-border-strong"
          >
            Back to Menu
          </button>

          <Link
            to="/reservations"
            className="btn-gold text-xs px-6 py-2.5 flex items-center gap-2"
            onClick={onClose}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Table to Taste This</span>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
