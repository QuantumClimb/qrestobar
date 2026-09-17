import { SiteThemeId, SiteThemeDefinition } from './types';
import { originalThemePreset } from './presets/original';
import { midnightEmberThemePreset } from './presets/midnightEmber';
import { heritageSpiceThemePreset } from './presets/heritageSpice';

/**
 * Runtime Theme Registry
 * 
 * Only themes with verified, complete runtime implementation are registered here.
 */
export const RUNTIME_THEME_REGISTRY: Partial<Record<SiteThemeId, SiteThemeDefinition>> = {
  'original': originalThemePreset,
  'midnight-ember': midnightEmberThemePreset,
  'heritage-spice': heritageSpiceThemePreset,
};

/**
 * Checks if a theme is fully implemented and available for runtime activation.
 */
export const isRuntimeThemeAvailable = (
  themeId: string | null | undefined
): themeId is 'original' | 'midnight-ember' => {
  if (!themeId) return false;
  const match = RUNTIME_THEME_REGISTRY[themeId as SiteThemeId];
  return Boolean(match && match.metadata.available);
};

/**
 * Returns the theme definition for a given theme ID.
 * Safely falls back to the Original Theme definition if the theme is unavailable or unknown.
 */
export const getRuntimeThemeDefinition = (themeId: string | null | undefined): SiteThemeDefinition => {
  if (themeId && RUNTIME_THEME_REGISTRY[themeId as SiteThemeId]) {
    return RUNTIME_THEME_REGISTRY[themeId as SiteThemeId]!;
  }
  return RUNTIME_THEME_REGISTRY['original']!;
};

