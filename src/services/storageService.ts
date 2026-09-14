import { INITIAL_MENU } from '../data/initialMenu';
import { INITIAL_PROMOTIONS } from '../data/initialPromotions';
import { INITIAL_RESERVATIONS } from '../data/initialReservations';
import { INITIAL_SETTINGS } from '../data/initialSettings';
import { MenuItem } from '../types/menu';
import { Promotion } from '../types/promotion';
import { Reservation } from '../types/reservation';
import { RestaurantSettings } from '../types/settings';

const STORAGE_KEYS = {
  MENU: 'qresto_menu_items_v8',
  PROMOTIONS: 'qresto_promotions_v8',
  RESERVATIONS: 'qresto_reservations_v8',
  SETTINGS: 'qresto_settings_v8',
  IS_INITIALIZED: 'qresto_initialized_v8',
};

export const storageService = {
  // Initialize storage with demo data if not yet present
  init(): void {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.IS_INITIALIZED)) {
        localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU));
        localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(INITIAL_PROMOTIONS));
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        localStorage.setItem(STORAGE_KEYS.IS_INITIALIZED, 'true');
      }
    } catch (error) {
      console.warn('LocalStorage access issue, fallback in-memory will be used:', error);
    }
  },

  // Reset all to demo defaults
  resetToDefaults(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU));
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(INITIAL_PROMOTIONS));
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      localStorage.setItem(STORAGE_KEYS.IS_INITIALIZED, 'true');
    } catch (error) {
      console.error('Failed to reset storage to defaults:', error);
    }
  },

  // Menu items
  getMenuItems(): MenuItem[] {
    try {
      this.init();
      const data = localStorage.getItem(STORAGE_KEYS.MENU);
      return data ? JSON.parse(data) : INITIAL_MENU;
    } catch {
      return INITIAL_MENU;
    }
  },

  saveMenuItems(items: MenuItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving menu items:', e);
    }
  },

  // Promotions
  getPromotions(): Promotion[] {
    try {
      this.init();
      const data = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
      return data ? JSON.parse(data) : INITIAL_PROMOTIONS;
    } catch {
      return INITIAL_PROMOTIONS;
    }
  },

  savePromotions(promotions: Promotion[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions));
    } catch (e) {
      console.error('Error saving promotions:', e);
    }
  },

  // Reservations
  getReservations(): Reservation[] {
    try {
      this.init();
      const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return data ? JSON.parse(data) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  },

  saveReservations(reservations: Reservation[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.error('Error saving reservations:', e);
    }
  },

  // Settings
  getSettings(): RestaurantSettings {
    try {
      this.init();
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settings: RestaurantSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }
};
