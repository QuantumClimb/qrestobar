import { SiteThemeDefinition } from '../types';
import { THEME_CATALOG } from '../themeCatalog';

/**
 * Heritage Spice Theme Preset
 * 
 * Warm, earthy terracotta, deep royal maroon, antique gold filigree, and fragrant saffron
 * celebrating Malaysia's rich culinary spices, slow-simmered rempahs, and clay pot craftsmanship.
 * Fixed-warm color mode policy with deep maroon framing and warm cream editorial sections.
 */

export const heritageSpiceThemePreset: SiteThemeDefinition = {
  metadata: {
    ...THEME_CATALOG['heritage-spice'],
    available: true,
  },

  typography: {
    fontDisplay: '"Cormorant Garamond", Georgia, serif',
    fontBody: '"Lato", system-ui, -apple-system, sans-serif',
    fontMono: '"IBM Plex Mono", monospace',
    fontSerif: '"Cormorant Garamond", Georgia, serif',
    letterSpacingDisplay: '0.04em',
    letterSpacingLogo: '0.24em',
  },

  layout: {
    cardRadius: '2px',
    buttonRadius: '2px',
    inputRadius: '2px',
    borderWidth: '1px',
    glowEffect: '0 0 25px rgba(232, 149, 50, 0.25)',
  },

  darkTokens: {
    // Surfaces
    bgPrimary: '#2B080E',
    bgSecondary: '#4A0E18',
    bgCard: '#371018',
    bgElevated: '#4A0E18',
    overlayColor: 'rgba(30, 5, 10, 0.65)',

    // Typography
    textPrimary: '#FFF4DF',
    textSecondary: '#F8EAD2',
    textMuted: '#C2AFA6',

    // Borders & Accents
    borderDefault: 'rgba(198, 154, 75, 0.35)',
    borderStrong: 'rgba(198, 154, 75, 0.65)',
    accentPrimary: '#C69A4B',
    accentHover: '#E89532',
    accentSurface: 'rgba(198, 154, 75, 0.15)',

    // Buttons
    buttonPrimaryBg: '#C69A4B',
    buttonPrimaryText: '#2B080E',
    buttonPrimaryBorder: '#C69A4B',
    buttonHoverBg: '#E89532',
    buttonHoverText: '#FFFFFF',
    buttonHoverBorder: '#E89532',

    // Form Controls
    inputBg: '#371018',
    inputText: '#FFF4DF',
    inputBorder: 'rgba(198, 154, 75, 0.35)',
    inputPlaceholder: '#80665A',
    inputFocusBorder: '#C69A4B',
    inputFocusRing: 'rgba(198, 154, 75, 0.25)',

    // Overlays & Header
    shadowColor: 'rgba(20, 3, 6, 0.85)',
    headerBg: 'rgba(43, 8, 14, 0.90)',
    headerBgScrolled: 'rgba(43, 8, 14, 0.98)',
    mobileMenuBg: 'rgba(43, 8, 14, 0.98)',
    logoTextColor: '#FFF4DF',

    // Specialized Visual Properties
    calendarIconFilter: 'none',
    cardImageGradient: 'rgba(43, 8, 14, 0.85)',
  },

  componentVariants: {
    announcementBarGradient: 'linear-gradient(90deg, #2B080E 0%, #4A0E18 50%, #2B080E 100%)',
    announcementBarBorder: '1px solid rgba(198, 154, 75, 0.40)',
    announcementBarTextColor: '#FFF4DF',
    announcementBarLinkColor: '#C69A4B',
    goldDividerGradient: 'linear-gradient(90deg, transparent, rgba(198, 154, 75, 0.50), transparent)',
    heroOverlayGradient: 'linear-gradient(to top, #2B080E 0%, rgba(43, 8, 14, 0.70) 50%, rgba(30, 5, 10, 0.60) 100%)',
    reservationCtaGradient: 'linear-gradient(to bottom, #2B080E 0%, #371018 50%, #2B080E 100%)',
  }
};
