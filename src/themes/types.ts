/**
 * Q-RESTOBAR — Theme System Core Type Definitions
 * 
 * Defines strict types for theme identification, access entitlement tiers,
 * color mode policies, token specifications, typography, and theme definitions.
 */

export type SiteThemeId =
  | 'original'
  | 'midnight-ember'
  | 'heritage-spice'
  | 'botanical-bistro'
  | 'urban-neon'
  | 'coastal-linen';

export type SiteThemeAccess = 'included' | 'premium';

export type ColorModePolicy = 'user-toggle' | 'fixed-dark' | 'fixed-light' | 'fixed-warm';

export interface ThemeMetadata {
  id: SiteThemeId;
  name: string;
  tagline: string;
  description: string;
  access: SiteThemeAccess;
  colorModePolicy: ColorModePolicy;
  previewImage: string;
  available: boolean;
  accentColor: string;
  secondaryAccent?: string;
  tags?: string[];
  badge?: string;
}

export interface ThemeTokens {
  // Surfaces
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  bgElevated: string;
  overlayColor: string;

  // Typography
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Borders & Accents
  borderDefault: string;
  borderStrong: string;
  accentPrimary: string;
  accentHover: string;
  accentSurface: string;

  // Buttons
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  buttonPrimaryBorder: string;
  buttonHoverBg: string;
  buttonHoverText: string;
  buttonHoverBorder: string;

  // Form Controls
  inputBg: string;
  inputText: string;
  inputBorder: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  inputFocusRing: string;

  // Overlays & Header
  shadowColor: string;
  headerBg: string;
  headerBgScrolled: string;
  mobileMenuBg: string;
  logoTextColor: string;

  // Specialized Visual Properties
  calendarIconFilter: string;
  cardImageGradient: string;
}

export interface ThemeTypography {
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  fontSerif: string;
  letterSpacingDisplay?: string;
  letterSpacingLogo?: string;
}

export interface ThemeLayout {
  cardRadius: string;
  buttonRadius: string;
  inputRadius: string;
  borderWidth?: string;
  glowEffect?: string;
}

export interface ThemeComponentVariants {
  announcementBarGradient?: string;
  announcementBarBorder?: string;
  announcementBarTextColor?: string;
  announcementBarLinkColor?: string;
  goldDividerGradient?: string;
  heroOverlayGradient?: string;
  reservationCtaGradient?: string;
}

export interface SiteThemeDefinition {
  metadata: ThemeMetadata;
  typography: ThemeTypography;
  layout: ThemeLayout;
  darkTokens: ThemeTokens;
  lightTokens?: ThemeTokens;
  componentVariants?: ThemeComponentVariants;
}
