import { RestaurantSettings } from '../types/settings';
import { storageService } from './storageService';

export const settingsService = {
  async getSettings(): Promise<RestaurantSettings> {
    return storageService.getSettings();
  },

  async updateSettings(updates: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    const current = storageService.getSettings();
    const updated = {
      ...current,
      ...updates
    };
    storageService.saveSettings(updated);
    return updated;
  }
};
