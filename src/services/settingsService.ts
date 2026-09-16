import { RestaurantSettings } from '../types/settings';
import { storageService } from './storageService';
import { supabase, isDemoMode } from './supabaseClient';

const mapDbToSettings = (row: any): RestaurantSettings => ({
  name: row.name || 'Q-RESTOBAR',
  secondaryName: row.secondary_name || 'KUALA LUMPUR',
  tagline: row.tagline || '',
  secondaryTagline: row.secondary_tagline || '',
  locationArea: row.location_area || '',
  addressLine1: row.address_line1 || '',
  addressLine2: row.address_line2 || '',
  city: row.city || '',
  postcode: row.postcode || '',
  phone: row.phone || '',
  whatsapp: row.whatsapp || '',
  email: row.email || '',
  openingHoursDisplay: row.opening_hours_display || '',
  openingHoursWeekday: row.opening_hours_weekday || '',
  openingHoursWeekend: row.opening_hours_weekend || '',
  dressCode: row.dress_code || '',
  announcementBarText: row.announcement_bar_text || '',
  announcementBarActive: Boolean(row.announcement_bar_active),
  googleMapsEmbedUrl: row.google_maps_embed_url || '',
  instagramUrl: row.instagram_url || '',
  facebookUrl: row.facebook_url || '',
  tiktokUrl: row.tiktok_url || ''
});

export const settingsService = {
  async getSettings(): Promise<RestaurantSettings> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('restaurant_settings')
          .select('*')
          .limit(1)
          .single();

        if (!error && data) {
          return mapDbToSettings(data);
        }
      } catch (err) {
        console.warn('Supabase fetch settings failed, falling back to local storage:', err);
      }
    }
    return storageService.getSettings();
  },

  async updateSettings(updates: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    if (!isDemoMode() && supabase) {
      try {
        const payload: Record<string, any> = {};
        if (updates.name !== undefined) payload.name = updates.name;
        if (updates.secondaryName !== undefined) payload.secondary_name = updates.secondaryName;
        if (updates.tagline !== undefined) payload.tagline = updates.tagline;
        if (updates.secondaryTagline !== undefined) payload.secondary_tagline = updates.secondaryTagline;
        if (updates.locationArea !== undefined) payload.location_area = updates.locationArea;
        if (updates.addressLine1 !== undefined) payload.address_line1 = updates.addressLine1;
        if (updates.addressLine2 !== undefined) payload.address_line2 = updates.addressLine2;
        if (updates.city !== undefined) payload.city = updates.city;
        if (updates.postcode !== undefined) payload.postcode = updates.postcode;
        if (updates.phone !== undefined) payload.phone = updates.phone;
        if (updates.whatsapp !== undefined) payload.whatsapp = updates.whatsapp;
        if (updates.email !== undefined) payload.email = updates.email;
        if (updates.openingHoursDisplay !== undefined) payload.opening_hours_display = updates.openingHoursDisplay;
        if (updates.openingHoursWeekday !== undefined) payload.opening_hours_weekday = updates.openingHoursWeekday;
        if (updates.openingHoursWeekend !== undefined) payload.opening_hours_weekend = updates.openingHoursWeekend;
        if (updates.dressCode !== undefined) payload.dress_code = updates.dressCode;
        if (updates.announcementBarText !== undefined) payload.announcement_bar_text = updates.announcementBarText;
        if (updates.announcementBarActive !== undefined) payload.announcement_bar_active = updates.announcementBarActive;
        if (updates.googleMapsEmbedUrl !== undefined) payload.google_maps_embed_url = updates.googleMapsEmbedUrl;
        if (updates.instagramUrl !== undefined) payload.instagram_url = updates.instagramUrl;
        if (updates.facebookUrl !== undefined) payload.facebook_url = updates.facebookUrl;
        if (updates.tiktokUrl !== undefined) payload.tiktok_url = updates.tiktokUrl;

        const { data, error } = await supabase
          .from('restaurant_settings')
          .update(payload)
          .eq('id', 'default-settings')
          .select()
          .single();

        if (!error && data) {
          const updated = mapDbToSettings(data);
          storageService.saveSettings(updated);
          return updated;
        }
      } catch (err) {
        console.warn('Supabase update settings failed, falling back to local storage:', err);
      }
    }

    const current = storageService.getSettings();
    const updated = {
      ...current,
      ...updates
    };
    storageService.saveSettings(updated);
    return updated;
  }
};
