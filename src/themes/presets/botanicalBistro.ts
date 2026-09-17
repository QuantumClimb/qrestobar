import { SiteThemeDefinition } from '../types';
import { THEME_CATALOG } from '../themeCatalog';

/**
 * Botanical Bistro Theme Preset
 * 
 * A fresh, upscale garden-restaurant atmosphere featuring sage green,
 * olive tones, warm ivory, natural wood accents, and muted terracotta.
 * Fixed-light color mode policy with lush botanical elegance.
 */

export const botanicalBistroThemePreset: SiteThemeDefinition = {
  metadata: {
    ...THEME_CATALOG['botanical-bistro'],
    available: true, // Registered for DEV runtime preview; catalog remains false for Theme Studio
  },

  typography: {
    fontDisplay: '"Cormorant Garamond", Georgia, serif',
    fontBody: '"Inter", system-ui, -apple-system, sans-serif',
    fontMono: '"IBM Plex Mono", monospace',
    fontSerif: '"Cormorant Garamond", Georgia, serif',
    letterSpacingDisplay: '0.03em',
    letterSpacingLogo: '0.22em',
  },

  layout: {
    cardRadius: '6px',
    buttonRadius: '4px',
    inputRadius: '4px',
    borderWidth: '1px',
    glowEffect: '0 0 25px rgba(63, 107, 79, 0.20)',
  },

  darkTokens: {
    // Surfaces
    bgPrimary: '#F4F1E8',
    bgSecondary: '#E7E3D6',
    bgCard: '#FCFAF4',
    bgElevated: '#DDE7D5',
    overlayColor: 'rgba(36, 53, 42, 0.65)',

    // Typography
    textPrimary: '#24352A',
    textSecondary: '#556257',
    textMuted: '#7B877E',

    // Borders & Accents
    borderDefault: 'rgba(63, 107, 79, 0.24)',
    borderStrong: 'rgba(63, 107, 79, 0.45)',
    accentPrimary: '#3F6B4F',
    accentHover: '#507D5F',
    accentSurface: 'rgba(63, 107, 79, 0.12)',

    // Buttons
    buttonPrimaryBg: '#3F6B4F',
    buttonPrimaryText: '#FFFFFF',
    buttonPrimaryBorder: '#3F6B4F',
    buttonHoverBg: '#507D5F',
    buttonHoverText: '#FFFFFF',
    buttonHoverBorder: '#507D5F',

    // Form Controls
    inputBg: '#FCFAF4',
    inputText: '#24352A',
    inputBorder: 'rgba(63, 107, 79, 0.24)',
    inputPlaceholder: '#7B877E',
    inputFocusBorder: '#3F6B4F',
    inputFocusRing: 'rgba(63, 107, 79, 0.20)',

    // Overlays & Header
    shadowColor: 'rgba(36, 53, 42, 0.15)',
    headerBg: 'rgba(244, 241, 232, 0.92)',
    headerBgScrolled: 'rgba(244, 241, 232, 0.98)',
    mobileMenuBg: 'rgba(244, 241, 232, 0.98)',
    logoTextColor: '#24352A',

    // Specialized Visual Properties
    calendarIconFilter: 'none',
    cardImageGradient: 'rgba(36, 53, 42, 0.80)',
  },

  componentVariants: {
    announcementBarGradient: 'linear-gradient(90deg, #3F6B4F 0%, #24352A 50%, #3F6B4F 100%)',
    announcementBarBorder: '1px solid rgba(63, 107, 79, 0.35)',
    announcementBarTextColor: '#FCFAF4',
    announcementBarLinkColor: '#F4F1E8',
    goldDividerGradient: 'linear-gradient(90deg, transparent, rgba(63, 107, 79, 0.40), transparent)',
    heroOverlayGradient: 'linear-gradient(to top, #F4F1E8 0%, rgba(244, 241, 232, 0.75) 50%, rgba(36, 53, 42, 0.40) 100%)',
    reservationCtaGradient: 'linear-gradient(to bottom, #FCFAF4 0%, #E7E3D6 100%)',
  }
};
