import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Sparkles, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { MenuItem, MENU_CATEGORIES } from '../../types/menu';
import { MenuItemFormModal } from './MenuItemFormModal';
import { Modal } from '../common/Modal';
import { SpicyBadge } from '../common/Badge';

export const AdminMenu: React.FC = () => {
  const {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleMenuAvailable,
    toggleMenuChefsPick
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // Filtered menu
  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesCat && matchesQuery;
  });

  const handleCreateOrUpdate = async (formData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      await updateMenuItem(editingItem.id, formData);
      setEditingItem(null);
    } else {
      await addMenuItem(formData);
    }
  };

  const confirmDeleteItem = async () => {
    if (itemToDelete) {
      await deleteMenuItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name or description..."
            className="w-full bg-qc-surface border border-border-strong/80 pl-10 pr-9 py-2 text-xs text-qc-primary placeholder-charcoal-600 rounded-sm focus:outline-none focus:border-purple-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-600 hover:text-qc-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Add New Item Button */}
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="btn-gold text-xs px-4 py-2.5 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-charcoal-950 font-bold shadow-sm'
              : 'bg-qc-surface text-qc-body border border-border-base hover:text-qc-primary'
          }`}
        >
          All Categories ({menuItems.length})
        </button>
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-charcoal-950 font-bold shadow-sm'
                : 'bg-qc-surface text-qc-body border border-border-base hover:text-qc-primary'
            }`}
          >
            {cat.label} ({menuItems.filter((i) => i.category === cat.id).length})
          </button>
        ))}
      </div>

      {/* Menu Items Table */}
      <div className="bg-qc-surface border border-border-base rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-qc-body">
            <thead className="bg-qc-base text-purple-500 font-semibold uppercase tracking-wider border-b border-border-base text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Dish / Item Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (RM)</th>
                <th className="py-3.5 px-4 text-center">Chef's Pick</th>
                <th className="py-3.5 px-4 text-center">Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/80">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-qc-body">
                    <p className="text-sm font-medium">No menu items found.</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-qc-card/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-2.5 px-4">
                      <div className="w-12 h-12 rounded overflow-hidden bg-qc-base border border-border-strong shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Name & Spice */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-qc-primary">{item.name}</span>
                        <SpicyBadge level={item.spicyLevel} />
                        {item.isVegetarian && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                            Veg
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-qc-body line-clamp-1 max-w-sm mt-0.5">
                        {item.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-4 capitalize text-qc-primary">
                      {MENU_CATEGORIES.find((c) => c.id === item.category)?.label || item.category}
                    </td>

                    {/* Price */}
                    <td className="py-2.5 px-4 font-display font-bold text-qc-secondary text-sm">
                      RM {item.price}
                    </td>

                    {/* Chef's Pick Toggle */}
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => toggleMenuChefsPick(item.id)}
                        className={`p-1.5 rounded transition-all ${
                          item.isChefsPick
                            ? 'text-purple-500 bg-purple-600/20 border border-purple-600/50'
                            : 'text-charcoal-600 hover:text-qc-primary hover:bg-qc-elevated'
                        }`}
                        title={item.isChefsPick ? "Remove from Chef's Pick" : "Set as Chef's Pick"}
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Availability Toggle */}
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => toggleMenuAvailable(item.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded transition-all ${
                          item.isAvailable
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                            : 'bg-qc-surface/80 text-red-300 border border-red-800/60'
                        }`}
                      >
                        {item.isAvailable ? 'In Stock' : 'Sold Out'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-qc-body hover:text-qc-secondary rounded hover:bg-qc-elevated transition-colors"
                          title="Edit Menu Item"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setItemToDelete(item)}
                          className="p-1.5 text-qc-body hover:text-red-400 rounded hover:bg-qc-elevated transition-colors"
                          title="Delete Menu Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      <MenuItemFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialItem={editingItem}
      />

      {/* Delete Item Confirmation Modal */}
      {itemToDelete && (
        <Modal
          isOpen={Boolean(itemToDelete)}
          onClose={() => setItemToDelete(null)}
          title="Delete Menu Item"
          subtitle="Warning: Destructive Action"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-qc-primary">
              Are you sure you want to remove <strong className="text-purple-500">{itemToDelete.name}</strong> from the menu?
            </p>
            <p className="text-red-400">This action will remove the item from all public menu views.</p>

            <div className="pt-4 border-t border-border-base flex items-center justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="btn-ghost-ivory text-xs px-4 py-2 border border-border-strong"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteItem}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-qc-primary text-xs font-bold uppercase rounded-sm transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
