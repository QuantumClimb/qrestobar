import { Promotion } from '../types/promotion';
import { storageService } from './storageService';

export const promotionService = {
  async getAll(): Promise<Promotion[]> {
    return storageService.getPromotions();
  },

  async getActive(): Promise<Promotion[]> {
    const list = storageService.getPromotions();
    return list.filter(p => p.isActive).sort((a, b) => a.priority - b.priority);
  },

  async getById(id: string): Promise<Promotion | undefined> {
    const list = storageService.getPromotions();
    return list.find(p => p.id === id || p.slug === id);
  },

  async update(id: string, updates: Partial<Promotion>): Promise<Promotion | null> {
    const list = storageService.getPromotions();
    const index = list.findIndex(p => p.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates
    };
    storageService.savePromotions(list);
    return list[index];
  },

  async toggleActive(id: string): Promise<Promotion | null> {
    const list = storageService.getPromotions();
    const promo = list.find(p => p.id === id);
    if (!promo) return null;
    return this.update(id, { isActive: !promo.isActive });
  }
};
