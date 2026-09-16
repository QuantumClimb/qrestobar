import { MenuItem, MenuCategoryType } from '../types/menu';
import { storageService } from './storageService';
import { supabase, isDemoMode } from './supabaseClient';

// Helper to map DB row (snake_case) to Frontend MenuItem (camelCase)
const mapDbToMenuItem = (row: any): MenuItem => ({
  id: row.id,
  name: row.name,
  category: row.category_id as MenuCategoryType,
  price: Number(row.price),
  description: row.description,
  imageUrl: row.image_url,
  spicyLevel: row.spicy_level ?? 0,
  isVegetarian: Boolean(row.is_vegetarian),
  isChefsPick: Boolean(row.is_chefs_pick),
  isAvailable: Boolean(row.is_available),
  allergens: row.allergens || [],
  pairingRecommendation: row.pairing_recommendation || '',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Helper to map Frontend MenuItem to DB row (snake_case)
const mapMenuItemToDb = (item: Partial<MenuItem>) => {
  const payload: Record<string, any> = {};
  if (item.name !== undefined) payload.name = item.name;
  if (item.category !== undefined) payload.category_id = item.category;
  if (item.price !== undefined) payload.price = item.price;
  if (item.description !== undefined) payload.description = item.description;
  if (item.imageUrl !== undefined) payload.image_url = item.imageUrl;
  if (item.spicyLevel !== undefined) payload.spicy_level = item.spicyLevel;
  if (item.isVegetarian !== undefined) payload.is_vegetarian = item.isVegetarian;
  if (item.isChefsPick !== undefined) payload.is_chefs_pick = item.isChefsPick;
  if (item.isAvailable !== undefined) payload.is_available = item.isAvailable;
  if (item.allergens !== undefined) payload.allergens = item.allergens;
  if (item.pairingRecommendation !== undefined) payload.pairing_recommendation = item.pairingRecommendation;
  return payload;
};

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(mapDbToMenuItem);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }
    return storageService.getMenuItems();
  },

  async getByCategory(category: MenuCategoryType): Promise<MenuItem[]> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('category_id', category);

        if (!error && data) {
          return data.map(mapDbToMenuItem);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }
    const items = storageService.getMenuItems();
    return items.filter(item => item.category === category);
  },

  async getSignatures(): Promise<MenuItem[]> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_chefs_pick', true)
          .eq('is_available', true)
          .limit(6);

        if (!error && data) {
          return data.map(mapDbToMenuItem);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }
    const items = storageService.getMenuItems();
    return items.filter(item => item.isChefsPick && item.isAvailable).slice(0, 6);
  },

  async getDrinks(): Promise<MenuItem[]> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .in('category_id', ['cocktails', 'mocktails']);

        if (!error && data) {
          return data.map(mapDbToMenuItem);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }
    const items = storageService.getMenuItems();
    return items.filter(item => item.category === 'cocktails' || item.category === 'mocktails');
  },

  async getById(id: string): Promise<MenuItem | undefined> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('id', id)
          .single();

        if (!error && data) {
          return mapDbToMenuItem(data);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }
    const items = storageService.getMenuItems();
    return items.find(item => item.id === id);
  },

  async create(itemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<MenuItem> {
    if (!isDemoMode() && supabase) {
      try {
        const dbPayload = mapMenuItemToDb(itemData);
        const { data, error } = await supabase
          .from('menu_items')
          .insert([dbPayload])
          .select()
          .single();

        if (!error && data) {
          return mapDbToMenuItem(data);
        }
      } catch (err) {
        console.warn('Supabase create failed, falling back to local storage:', err);
      }
    }

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
    if (!isDemoMode() && supabase) {
      try {
        const dbPayload = mapMenuItemToDb(updates);
        const { data, error } = await supabase
          .from('menu_items')
          .update(dbPayload)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          return mapDbToMenuItem(data);
        }
      } catch (err) {
        console.warn('Supabase update failed, falling back to local storage:', err);
      }
    }

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
    if (!isDemoMode() && supabase) {
      try {
        const { error } = await supabase
          .from('menu_items')
          .delete()
          .eq('id', id);

        if (!error) return true;
      } catch (err) {
        console.warn('Supabase delete failed, falling back to local storage:', err);
      }
    }

    const items = storageService.getMenuItems();
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    storageService.saveMenuItems(filtered);
    return true;
  },

  async toggleAvailability(id: string): Promise<MenuItem | null> {
    const item = await this.getById(id);
    if (!item) return null;
    return this.update(id, { isAvailable: !item.isAvailable });
  },

  async toggleChefsPick(id: string): Promise<MenuItem | null> {
    const item = await this.getById(id);
    if (!item) return null;
    return this.update(id, { isChefsPick: !item.isChefsPick });
  }
};
