import { SiteThemeId } from '../themes/types';
import { isRuntimeThemeAvailable } from '../themes/runtimeThemeRegistry';

/**
 * Storage Key dedicated strictly to the Site Theme Engine.
 * Must NOT collide with the light/dark mode key ("theme") or legacy keys.
 */
export const SITE_THEME_STORAGE_KEY = 'qresto_site_theme_id_v1';

export const siteThemeService = {
  /**
   * Retrieves the currently stored SiteThemeId from LocalStorage.
   * Safely returns 'original' if the key is missing, invalid, unavailable, or on storage failure.
   */
  getStoredSiteThemeId(): SiteThemeId {
    if (typeof window === 'undefined') return 'original';
    try {
      const stored = localStorage.getItem(SITE_THEME_STORAGE_KEY);
      if (!stored) return 'original';
      
      if (isRuntimeThemeAvailable(stored)) {
        return stored;
      }
      return 'original';
    } catch {
      return 'original';
    }
  },

  /**
   * Persists the active SiteThemeId to LocalStorage.
   * Only stores themes that are confirmed to be runtime-available.
   */
  storeSiteThemeId(themeId: SiteThemeId): { success: boolean; error?: string } {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Window environment not available' };
    }

    if (!isRuntimeThemeAvailable(themeId)) {
      return {
        success: false,
        error: `Theme "${themeId}" is not currently available for runtime activation.`
      };
    }

    try {
      localStorage.setItem(SITE_THEME_STORAGE_KEY, themeId);
      return { success: true };
    } catch (err) {
      console.warn('LocalStorage write failed for site theme:', err);
      return { success: false, error: 'Storage write failed' };
    }
  },

  /**
   * Clears the stored site theme, effectively restoring default 'original' on next read.
   */
  clearStoredSiteThemeId(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(SITE_THEME_STORAGE_KEY);
    } catch (err) {
      console.warn('LocalStorage clear failed for site theme:', err);
    }
  }
};
