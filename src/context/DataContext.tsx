import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MenuItem } from '../types/menu';
import { Promotion } from '../types/promotion';
import { Reservation, ReservationFormData, ReservationStatus } from '../types/reservation';
import { RestaurantSettings } from '../types/settings';
import { menuService } from '../services/menuService';
import { promotionService } from '../services/promotionService';
import { reservationService } from '../services/reservationService';
import { settingsService } from '../services/settingsService';
import { storageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface DataContextType {
  menuItems: MenuItem[];
  promotions: Promotion[];
  reservations: Reservation[];
  settings: RestaurantSettings;
  isLoading: boolean;
  
  // Menu Actions
  addMenuItem: (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MenuItem>;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<MenuItem | null>;
  deleteMenuItem: (id: string) => Promise<boolean>;
  toggleMenuAvailable: (id: string) => Promise<void>;
  toggleMenuChefsPick: (id: string) => Promise<void>;
  
  // Reservation Actions
  createReservation: (formData: ReservationFormData) => Promise<Reservation>;
  updateReservationStatus: (id: string, status: ReservationStatus) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
  exportReservationsCsv: () => void;
  
  // Promotion Actions
  updatePromotion: (id: string, updates: Partial<Promotion>) => Promise<void>;
  togglePromotionActive: (id: string) => Promise<void>;
  
  // Settings Actions
  updateSettings: (updates: Partial<RestaurantSettings>) => Promise<void>;
  
  // Reset
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings>(storageService.getSettings());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial data
  const loadAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [menuData, promoData, resData, settingsData] = await Promise.all([
        menuService.getAll(),
        promotionService.getAll(),
        reservationService.getAll(),
        settingsService.getSettings()
      ]);
      setMenuItems(menuData);
      setPromotions(promoData);
      setReservations(resData);
      setSettings(settingsData);
    } catch (error) {
      console.error('Failed to load application data:', error);
      showToast({
        type: 'error',
        title: 'Error loading data',
        message: 'Could not retrieve data from storage.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Menu Methods
  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem = await menuService.create(item);
    setMenuItems(prev => [newItem, ...prev]);
    showToast({
      type: 'success',
      title: 'Menu item created',
      message: `${newItem.name} has been added to the menu.`
    });
    return newItem;
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    const updated = await menuService.update(id, updates);
    if (updated) {
      setMenuItems(prev => prev.map(item => item.id === id ? updated : item));
      showToast({
        type: 'success',
        title: 'Menu item updated',
        message: `${updated.name} has been updated.`
      });
    }
    return updated;
  };

  const deleteMenuItem = async (id: string) => {
    const itemToDelete = menuItems.find(i => i.id === id);
    const success = await menuService.delete(id);
    if (success) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
      showToast({
        type: 'info',
        title: 'Menu item deleted',
        message: `${itemToDelete?.name || 'Item'} has been removed.`
      });
    }
    return success;
  };

  const toggleMenuAvailable = async (id: string) => {
    const updated = await menuService.toggleAvailability(id);
    if (updated) {
      setMenuItems(prev => prev.map(item => item.id === id ? updated : item));
      showToast({
        type: 'info',
        title: updated.isAvailable ? 'Item Marked Available' : 'Item Marked Sold Out',
        message: `${updated.name} is now ${updated.isAvailable ? 'available' : 'marked as Sold Out'}.`
      });
    }
  };

  const toggleMenuChefsPick = async (id: string) => {
    const updated = await menuService.toggleChefsPick(id);
    if (updated) {
      setMenuItems(prev => prev.map(item => item.id === id ? updated : item));
      showToast({
        type: 'info',
        title: updated.isChefsPick ? "Added to Chef's Pick" : "Removed from Chef's Pick",
        message: `${updated.name} status updated.`
      });
    }
  };

  // Reservation Methods
  const createReservation = async (formData: ReservationFormData): Promise<Reservation> => {
    const newRes = await reservationService.create(formData);
    setReservations(prev => [newRes, ...prev]);
    showToast({
      type: 'success',
      title: 'Table Request Received',
      message: `Reservation ref: ${newRes.referenceNumber}`
    });
    return newRes;
  };

  const updateReservationStatus = async (id: string, status: ReservationStatus) => {
    const updated = await reservationService.updateStatus(id, status);
    if (updated) {
      setReservations(prev => prev.map(r => r.id === id ? updated : r));
      showToast({
        type: 'success',
        title: 'Reservation Status Updated',
        message: `Status changed to "${status.toUpperCase()}" for ${updated.fullName}`
      });
    }
  };

  const deleteReservation = async (id: string) => {
    const success = await reservationService.delete(id);
    if (success) {
      setReservations(prev => prev.filter(r => r.id !== id));
      showToast({
        type: 'info',
        title: 'Reservation Removed',
        message: 'Reservation record deleted.'
      });
    }
  };

  const exportReservationsCsv = () => {
    reservationService.exportToCsv(reservations);
    showToast({
      type: 'success',
      title: 'CSV Export Generated',
      message: `Exported ${reservations.length} reservation records.`
    });
  };

  // Promotion Methods
  const updatePromotion = async (id: string, updates: Partial<Promotion>) => {
    const updated = await promotionService.update(id, updates);
    if (updated) {
      setPromotions(prev => prev.map(p => p.id === id ? updated : p));
      showToast({
        type: 'success',
        title: 'Promotion Updated',
        message: `${updated.title} has been updated.`
      });
    }
  };

  const togglePromotionActive = async (id: string) => {
    const updated = await promotionService.toggleActive(id);
    if (updated) {
      setPromotions(prev => prev.map(p => p.id === id ? updated : p));
      showToast({
        type: 'info',
        title: updated.isActive ? 'Promotion Activated' : 'Promotion Paused',
        message: `${updated.title} is ${updated.isActive ? 'now live' : 'hidden from public'}.`
      });
    }
  };

  // Settings Methods
  const updateSettings = async (updates: Partial<RestaurantSettings>) => {
    const updated = await settingsService.updateSettings(updates);
    setSettings(updated);
    showToast({
      type: 'success',
      title: 'Restaurant Settings Saved',
      message: 'Changes applied across website.'
    });
  };

  // Reset to Demo
  const resetDemoData = () => {
    storageService.resetToDefaults();
    loadAllData();
    showToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'All menu items, promotions and reservations reset to factory defaults.'
    });
  };

  return (
    <DataContext.Provider
      value={{
        menuItems,
        promotions,
        reservations,
        settings,
        isLoading,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleMenuAvailable,
        toggleMenuChefsPick,
        createReservation,
        updateReservationStatus,
        deleteReservation,
        exportReservationsCsv,
        updatePromotion,
        togglePromotionActive,
        updateSettings,
        resetDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
