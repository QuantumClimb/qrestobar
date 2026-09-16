import { SiteThemeId, SiteThemeDefinition } from './types';
import { isRuntimeThemeAvailable } from './runtimeThemeRegistry';

/**
 * Explicit list of CSS variable property names managed by the Site Theme Engine.
 * Used to ensure cleanup only removes engine-owned variables and never touches
 * unrelated inline styles on the document element.
 */
export const OWNED_CSS_VARIABLES: readonly string[] = [
  // Surfaces
  '--bg-primary',
  '--bg-secondary',
  '--bg-card',
  '--bg-elevated',
  '--overlay-color',

  // Typography
  '--text-primary',
  '--text-secondary',
  '--text-muted',

  // Borders & Accents
  '--border-default',
  '--border-strong',
  '--accent-primary',
  '--accent-hover',
  '--accent-surface',

  // Buttons
  '--button-primary-bg',
  '--button-primary-text',
  '--button-primary-border',
  '--button-hover-bg',
  '--button-hover-text',
  '--button-hover-border',

  // Form Controls
  '--input-bg',
  '--input-text',
  '--input-border',
  '--input-placeholder',
  '--input-focus-border',
  '--input-focus-ring',

  // Overlays & Header
  '--shadow-color',
  '--header-bg',
  '--header-bg-scrolled',
  '--mobile-menu-bg',
  '--logo-text-color',

  // Specialized Visual Properties
  '--calendar-icon-filter',
  '--card-image-gradient',

  // Theme Shape & Component Custom Properties
  '--theme-card-radius',
  '--theme-button-radius',
  '--theme-input-radius',
  '--theme-glow-effect',
  '--announcement-bar-gradient',
  '--announcement-bar-border',
  '--announcement-bar-text-color',
  '--announcement-bar-link-color',
  '--gold-divider-gradient',
  '--hero-overlay-gradient',
  '--reservation-cta-gradient',
] as const;

/**
 * Validates and safely resolves any input string/value to an available SiteThemeId.
 * Falls back to 'original' for unknown, invalid, or unavailable premium theme IDs.
 */
export const resolveSiteThemeId = (value: unknown): SiteThemeId => {
  if (typeof value === 'string' && isRuntimeThemeAvailable(value)) {
    return value;
  }
  return 'original';
};

/**
 * Sets the `data-site-theme` attribute on the root document element.
 * Note: This never modifies or touches `data-theme="dark|light"`.
 */
export const setSiteThemeAttribute = (themeId: SiteThemeId): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-site-theme', themeId);
};

/**
 * Clears only CSS custom properties that are explicitly owned by the site-theme engine.
 * Unrelated document inline styles and class attributes are completely preserved.
 */
export const clearSiteThemeOverrides = (): void => {
  if (typeof document === 'undefined') return;
  const rootStyle = document.documentElement.style;
  for (const varName of OWNED_CSS_VARIABLES) {
    rootStyle.removeProperty(varName);
  }
};

/**
 * Applies a site-theme definition to the document.
 * 
 * CRITICAL ORIGINAL-THEME BEHAVIOR:
 * When 'original' is active, it sets `data-site-theme="original"`, clears any previously
 * injected site-theme overrides, and allows the existing `index.css` and `ThemeContext`
 * to remain 100% the visual source of truth without injecting override variables.
 */
export const applySiteTheme = (
  themeDefinition: SiteThemeDefinition,
  colorMode: 'dark' | 'light' = 'dark'
): void => {
  if (typeof document === 'undefined') return;

  const themeId = themeDefinition.metadata.id;

  // 1. Always set data-site-theme attribute
  setSiteThemeAttribute(themeId);

  // 2. Original Theme: keep visual source of truth in index.css (no inline overrides)
  if (themeId === 'original') {
    clearSiteThemeOverrides();
    return;
  }

  // 3. For custom runtime themes in future milestones, inject tokens safely:
  // (In Milestone 2, only 'original' is runtime available, so this branch is prepared for future presets)
  const tokens = (colorMode === 'light' && themeDefinition.lightTokens)
    ? themeDefinition.lightTokens
    : themeDefinition.darkTokens;

  const rootStyle = document.documentElement.style;

  rootStyle.setProperty('--bg-primary', tokens.bgPrimary);
  rootStyle.setProperty('--bg-secondary', tokens.bgSecondary);
  rootStyle.setProperty('--bg-card', tokens.bgCard);
  rootStyle.setProperty('--bg-elevated', tokens.bgElevated);
  rootStyle.setProperty('--overlay-color', tokens.overlayColor);

  rootStyle.setProperty('--text-primary', tokens.textPrimary);
  rootStyle.setProperty('--text-secondary', tokens.textSecondary);
  rootStyle.setProperty('--text-muted', tokens.textMuted);

  rootStyle.setProperty('--border-default', tokens.borderDefault);
  rootStyle.setProperty('--border-strong', tokens.borderStrong);
  rootStyle.setProperty('--accent-primary', tokens.accentPrimary);
  rootStyle.setProperty('--accent-hover', tokens.accentHover);
  rootStyle.setProperty('--accent-surface', tokens.accentSurface);

  rootStyle.setProperty('--button-primary-bg', tokens.buttonPrimaryBg);
  rootStyle.setProperty('--button-primary-text', tokens.buttonPrimaryText);
  rootStyle.setProperty('--button-primary-border', tokens.buttonPrimaryBorder);
  rootStyle.setProperty('--button-hover-bg', tokens.buttonHoverBg);
  rootStyle.setProperty('--button-hover-text', tokens.buttonHoverText);
  rootStyle.setProperty('--button-hover-border', tokens.buttonHoverBorder);

  rootStyle.setProperty('--input-bg', tokens.inputBg);
  rootStyle.setProperty('--input-text', tokens.inputText);
  rootStyle.setProperty('--input-border', tokens.inputBorder);
  rootStyle.setProperty('--input-placeholder', tokens.inputPlaceholder);
  rootStyle.setProperty('--input-focus-border', tokens.inputFocusBorder);
  rootStyle.setProperty('--input-focus-ring', tokens.inputFocusRing);

  rootStyle.setProperty('--shadow-color', tokens.shadowColor);
  rootStyle.setProperty('--header-bg', tokens.headerBg);
  rootStyle.setProperty('--header-bg-scrolled', tokens.headerBgScrolled);
  rootStyle.setProperty('--mobile-menu-bg', tokens.mobileMenuBg);
  rootStyle.setProperty('--logo-text-color', tokens.logoTextColor);

  rootStyle.setProperty('--calendar-icon-filter', tokens.calendarIconFilter);
  rootStyle.setProperty('--card-image-gradient', tokens.cardImageGradient);

  if (themeDefinition.layout) {
    rootStyle.setProperty('--theme-card-radius', themeDefinition.layout.cardRadius);
    rootStyle.setProperty('--theme-button-radius', themeDefinition.layout.buttonRadius);
    rootStyle.setProperty('--theme-input-radius', themeDefinition.layout.inputRadius);
    if (themeDefinition.layout.glowEffect) {
      rootStyle.setProperty('--theme-glow-effect', themeDefinition.layout.glowEffect);
    }
  }

  if (themeDefinition.componentVariants) {
    const cv = themeDefinition.componentVariants;
    if (cv.announcementBarGradient) rootStyle.setProperty('--announcement-bar-gradient', cv.announcementBarGradient);
    if (cv.announcementBarBorder) rootStyle.setProperty('--announcement-bar-border', cv.announcementBarBorder);
    if (cv.announcementBarTextColor) rootStyle.setProperty('--announcement-bar-text-color', cv.announcementBarTextColor);
    if (cv.announcementBarLinkColor) rootStyle.setProperty('--announcement-bar-link-color', cv.announcementBarLinkColor);
    if (cv.goldDividerGradient) rootStyle.setProperty('--gold-divider-gradient', cv.goldDividerGradient);
    if (cv.heroOverlayGradient) rootStyle.setProperty('--hero-overlay-gradient', cv.heroOverlayGradient);
    if (cv.reservationCtaGradient) rootStyle.setProperty('--reservation-cta-gradient', cv.reservationCtaGradient);
  }
};
