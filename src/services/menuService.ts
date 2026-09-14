import { MenuItem, MenuCategoryType } from '../types/menu';
import { storageService } from './storageService';

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    return storageService.getMenuItems();
  },

  async getByCategory(category: MenuCategoryType): Promise<MenuItem[]> {
    const items = storageService.getMenuItems();
    return items.filter(item => item.category === category);
  },

  async getSignatures(): Promise<MenuItem[]> {
    const items = storageService.getMenuItems();
    // Return either explicitly flagged chef's pick or top signature dishes
    return items.filter(item => item.isChefsPick && item.isAvailable).slice(0, 6);
  },

  async getDrinks(): Promise<MenuItem[]> {
    const items = storageService.getMenuItems();
    return items.filter(item => item.category === 'cocktails' || item.category === 'mocktails');
  },

  async getById(id: string): Promise<MenuItem | undefined> {
    const items = storageService.getMenuItems();
    return items.find(item => item.id === id);
  },

  async create(itemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<MenuItem> {
    const items = storageService.getMenuItems();
    const newItem: MenuItem = {
      ...itemData,
      id: `menu-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.unshift(newItem);
    storageService.saveMenuItems(items);
    return newItem;
  },

  async update(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
    const items = storageService.getMenuItems();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem: MenuItem = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    items[index] = updatedItem;
    storageService.saveMenuItems(items);
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const items = storageService.getMenuItems();
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    storageService.saveMenuItems(filtered);
    return true;
  },

  async toggleAvailability(id: string): Promise<MenuItem | null> {
    const items = storageService.getMenuItems();
    const item = items.find(i => i.id === id);
    if (!item) return null;
    return this.update(id, { isAvailable: !item.isAvailable });
  },

  async toggleChefsPick(id: string): Promise<MenuItem | null> {
    const items = storageService.getMenuItems();
    const item = items.find(i => i.id === id);
    if (!item) return null;
    return this.update(id, { isChefsPick: !item.isChefsPick });
  }
};
