import { SiteThemeDefinition } from './types';
import { originalThemePreset } from './presets/original';

/**
 * Runtime Theme Registry
 * 
 * Only themes with verified, complete runtime implementation are registered here.
 * For Milestone 2, only 'original' is runtime available.
 */
export const RUNTIME_THEME_REGISTRY: Record<'original', SiteThemeDefinition> = {
  original: originalThemePreset,
};

/**
 * Checks if a theme is fully implemented and available for runtime activation.
 */
export const isRuntimeThemeAvailable = (themeId: string | null | undefined): themeId is 'original' => {
  if (!themeId) return false;
  return themeId === 'original' && Boolean(RUNTIME_THEME_REGISTRY.original?.metadata.available);
};

/**
 * Returns the theme definition for a given theme ID.
 * Safely falls back to the Original Theme definition if the theme is unavailable or unknown.
 */
export const getRuntimeThemeDefinition = (themeId: string | null | undefined): SiteThemeDefinition => {
  if (themeId && isRuntimeThemeAvailable(themeId)) {
    return RUNTIME_THEME_REGISTRY[themeId];
  }
  return RUNTIME_THEME_REGISTRY.original;
};
