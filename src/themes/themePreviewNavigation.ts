import { SiteThemeId } from './types';
import { RUNTIME_THEME_REGISTRY } from './runtimeThemeRegistry';

/**
 * Generic helper to preserve site theme preview query parameters in DEV mode only.
 * In production or for the 'original' theme, returns clean URLs while preserving existing query params and hashes.
 */
export function withSiteThemePreview(
  path: string,
  effectiveThemeId?: SiteThemeId | string | null
): string {
  // If not in DEV or if theme is original / unspecified, return path unchanged
  if (!import.meta.env.DEV || !effectiveThemeId || effectiveThemeId === 'original') {
    return path;
  }

  // Validate that the theme is a registered runtime theme in this codebase
  if (!RUNTIME_THEME_REGISTRY[effectiveThemeId as SiteThemeId]) {
    return path;
  }


  // Preserve hash fragment if present (e.g. /menu#starters)
  const [urlWithoutHash, hash] = path.split('#');
  const [basePath, search] = urlWithoutHash.split('?');
  const params = new URLSearchParams(search || '');

  // Inject preview parameter
  params.set('siteThemePreview', effectiveThemeId);

  const queryString = params.toString();
  const resPath = queryString ? `${basePath}?${queryString}` : basePath;
  return hash ? `${resPath}#${hash}` : resPath;
}
