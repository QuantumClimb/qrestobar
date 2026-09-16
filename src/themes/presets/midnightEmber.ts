import { SiteThemeDefinition } from '../types';
import { THEME_CATALOG } from '../themeCatalog';

/**
 * Midnight Ember Theme Preset
 * 
 * An intimate, speakeasy mood evoking aged oak barrels, smoldering charcoal embers,
 * burnt-orange accents, and warm golden brass highlights. Fixed-dark color mode.
 */

export const midnightEmberThemePreset: SiteThemeDefinition = {
  metadata: {
    ...THEME_CATALOG['midnight-ember'],
    available: true,
  },

  typography: {
    fontDisplay: '"Playfair Display", Georgia, serif',
    fontBody: '"Montserrat", system-ui, sans-serif',
    fontMono: '"IBM Plex Mono", monospace',
    fontSerif: '"Cinzel", Georgia, serif',
    letterSpacingDisplay: '0.02em',
    letterSpacingLogo: '0.24em',
  },

  layout: {
    cardRadius: '4px',
    buttonRadius: '2px',
    inputRadius: '2px',
    borderWidth: '1px',
    glowEffect: '0 0 25px rgba(216, 102, 44, 0.35)',
  },

  darkTokens: {
    // Surfaces
    bgPrimary: '#101010',
    bgSecondary: '#14110F',
    bgCard: '#1A1613',
    bgElevated: '#211A15',
    overlayColor: 'rgba(5, 4, 3, 0.72)',

    // Typography
    textPrimary: '#F5EFE6',
    textSecondary: '#CFC3B5',
    textMuted: '#94877A',

    // Borders & Accents
    borderDefault: 'rgba(216, 170, 91, 0.22)',
    borderStrong: 'rgba(216, 170, 91, 0.46)',
    accentPrimary: '#D8662C',
    accentHover: '#E47B3D',
    accentSurface: 'rgba(216, 102, 44, 0.14)',

    // Buttons
    buttonPrimaryBg: '#D8662C',
    buttonPrimaryText: '#FFFFFF',
    buttonPrimaryBorder: '#E47B3D',
    buttonHoverBg: '#E47B3D',
    buttonHoverText: '#FFFFFF',
    buttonHoverBorder: '#D8AA5B',

    // Form Controls
    inputBg: '#14110F',
    inputText: '#F5EFE6',
    inputBorder: 'rgba(216, 170, 91, 0.30)',
    inputPlaceholder: '#88796B',
    inputFocusBorder: '#D8662C',
    inputFocusRing: 'rgba(216, 102, 44, 0.20)',

    // Overlays & Header
    shadowColor: 'rgba(0, 0, 0, 0.85)',
    headerBg: 'rgba(16, 16, 16, 0.88)',
    headerBgScrolled: 'rgba(16, 16, 16, 0.98)',
    mobileMenuBg: 'rgba(20, 17, 15, 0.98)',
    logoTextColor: '#F5EFE6',

    // Specialized
    calendarIconFilter: 'invert(1)',
    cardImageGradient: 'rgba(26, 22, 19, 0.95)',
  },

  componentVariants: {
    announcementBarGradient: 'linear-gradient(90deg, #1C0D05 0%, #7C2D12 50%, #2A1208 100%)',
    announcementBarBorder: '1px solid rgba(216, 170, 91, 0.40)',
    announcementBarTextColor: '#F5EFE6',
    announcementBarLinkColor: '#D8AA5B',
    goldDividerGradient: 'linear-gradient(90deg, transparent, rgba(216, 170, 91, 0.45), transparent)',
    heroOverlayGradient: 'linear-gradient(to top, #101010 0%, rgba(16, 16, 16, 0.65) 60%, transparent 100%)',
    reservationCtaGradient: 'linear-gradient(to bottom, #14110F 0%, rgba(20, 17, 15, 0.85) 50%, #101010 100%)',
  }
};
