import { SiteThemeId } from './types';

/**
 * Helper to preserve site theme preview query parameters in DEV mode only.
 * In production or for the 'original' theme, returns clean URLs or preserves non-theme params.
 */
export function withSiteThemePreview(path: string, effectiveThemeId?: SiteThemeId | string): string {
  // If not in DEV or if theme is original / unspecified, return path unchanged
  if (!import.meta.env.DEV || !effectiveThemeId || effectiveThemeId === 'original') {
    return path;
  }

  // Parse path and existing query parameters
  const [basePath, search] = path.split('?');
  const params = new URLSearchParams(search || '');

  // Inject preview parameter
  params.set('siteThemePreview', effectiveThemeId);

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}
