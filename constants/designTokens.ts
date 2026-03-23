/**
 * SwingArc Design System - "The Kinetic Vault"
 * Athletic Editorial HUD aesthetic
 *
 * Based on DESIGN.md - high-end sports broadcast UI
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Background
  backgroundPrimary: '#0a0e14',      // The Deep Void
  backgroundDim: '#0a0e14',          // Base layer

  // Surfaces (for tonal layering)
  surfaceContainerLow: '#0f141a',    // Section layer
  surfaceContainer: '#1b2028',       // Card/panel base
  surfaceContainerHighest: '#20262f', // Active component
  surfaceBright: '#2a3038',          // Glass elements (at 60% opacity)

  // Primary actions & energy
  primary: '#00fd86',                // Neon Green - main actions
  primaryDim: '#00c966',             // Darker green for gradients
  primaryContainer: '#00fd8640',     // 25% opacity green for fills

  // Secondary (achievement/gold)
  secondary: '#feb700',              // Gold
  secondaryFixed: '#feb700',         // Gold for scores
  secondaryContainer: '#feb70040',   // 25% opacity gold

  // Tertiary (alerts/errors)
  tertiary: '#ff7168',               // Red for strikes/errors
  tertiaryContainer: '#ff716840',    // 25% opacity red

  // Outline & borders
  outlineVariant: '#ffffff26',       // 15% white for ghost borders

  // Text
  textPrimary: '#ffffff',            // Pure white
  textSecondary: '#ffffffb3',        // 70% white
  textTertiary: '#ffffff80',         // 50% white
};

// ============================================================================
// SPACING SCALE (4px base unit)
// ============================================================================

export const spacing = {
  1: 4,      // 0.25rem equivalent
  2: 8,      // 0.5rem
  3: 12,     // 0.75rem
  4: 16,     // 1rem - container padding
  6: 24,     // 1.5rem
  8: 32,     // 2rem
  12: 48,    // 3rem - section gaps
  16: 64,    // 4rem - large section gaps
  20: 80,    // 5rem
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Display (Space Grotesk - for scores, large numbers)
  displayLg: {
    fontSize: 56,      // 3.5rem
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  displayMd: {
    fontSize: 45,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },

  // Headlines (Space Grotesk - for section headers)
  headlineLg: {
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  headlineSm: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },

  // Body (Inter - for descriptions)
  bodyLg: {
    fontSize: 18,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  bodyMd: {
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },

  // Labels (Inter - for UI labels, always uppercase)
  labelLg: {
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  labelMd: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  labelSm: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
};

// ============================================================================
// EFFECTS & VISUAL TOKENS
// ============================================================================

export const effects = {
  // Glassmorphism (React Native doesn't support backdrop-filter)
  glass: {
    backgroundColor: '#2a303899', // surfaceBright at 60% opacity
  },

  // Neon glow (for primary buttons)
  neonGlow: {
    shadowColor: '#00fd86',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  // Border radii
  borderRadius: {
    sm: 4,
    md: 8,    // Max for cards per design system
    lg: 20,   // For buttons
    pill: 999, // Full pill shape
  },
};

// ============================================================================
// COMPONENT PRESETS
// ============================================================================

export const components = {
  // Primary action button (neon green with glow)
  primaryButton: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: effects.borderRadius.lg,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[4],
    ...effects.neonGlow,
  },

  // Debug button (subtle)
  debugButton: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: effects.borderRadius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },

  // Diamond indicator (for strikes)
  diamondIndicator: {
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
  },
};
