import {configureFonts, MD3LightTheme} from 'react-native-paper'
import type {MD3Theme} from 'react-native-paper'

/**
 * Cairo font family constants.
 * Cairo is a modern Arabic+Latin font optimised for screen readability.
 */
export const CAIRO_REGULAR = 'Cairo_400Regular'
export const CAIRO_MEDIUM = 'Cairo_500Medium'
export const CAIRO_SEMIBOLD = 'Cairo_600SemiBold'
export const CAIRO_BOLD = 'Cairo_700Bold'

const createCairoFonts = () => {
    // Apply Cairo Regular as the base for every MD3 variant
    const base = configureFonts({config: {fontFamily: CAIRO_REGULAR}})

    // Override variants that need heavier weights
    return {
        ...base,
        // Medium-weight variants (500)
        titleMedium: {...base.titleMedium, fontFamily: CAIRO_MEDIUM},
        titleSmall: {...base.titleSmall, fontFamily: CAIRO_MEDIUM},
        labelLarge: {...base.labelLarge, fontFamily: CAIRO_MEDIUM},
        labelMedium: {...base.labelMedium, fontFamily: CAIRO_MEDIUM},
        labelSmall: {...base.labelSmall, fontFamily: CAIRO_MEDIUM},
    }
}

/**
 * Extended custom color tokens beyond MD3.
 * Import `themeColors` for static StyleSheet usage (e.g. shadowColor).
 * Use `useAppTheme()` hook for dynamic runtime usage inside components.
 */
const customColors = {
    // Accent (Amber #F59E0B) extended palette
    accentContainer: '#FFF7ED',
    accentSoft: 'rgba(245, 158, 11, 0.12)',
    accentMuted: 'rgba(245, 158, 11, 0.15)',
    accentSubtle: 'rgba(245, 158, 11, 0.04)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
    accentFaded: 'rgba(245, 158, 11, 0.06)',
    accentHalf: 'rgba(245, 158, 11, 0.6)',
    accentDivider: 'rgba(245, 158, 11, 0.08)',
    accentGlow: 'rgba(245, 158, 11, 0.1)',

    // Success status
    success: '#16A34A',
    successBright: '#22C55E',
    successContainer: '#F0FDF4',

    // Error extended
    errorDark: '#DC2626',
    errorContainer: '#FEF2F2',

    // Dark surface (stepper, vehicle header, dark cards)
    surfaceDark: '#0F172A',

    // On-dark text/icon hierarchy (white at varying opacities)
    onDarkHigh: 'rgba(255,255,255,0.85)',
    onDarkIcon: 'rgba(255,255,255,0.8)',
    onDarkMedium: 'rgba(255,255,255,0.7)',
    onDarkLow: 'rgba(255,255,255,0.6)',
    onDarkMuted: 'rgba(255,255,255,0.25)',
    onDarkDisabled: 'rgba(255,255,255,0.2)',

    // On-dark surface/border layers
    onDarkOverlay: 'rgba(255,255,255,0.14)',
    onDarkContainer: 'rgba(255,255,255,0.12)',
    onDarkSurface: 'rgba(255,255,255,0.1)',
    onDarkBorder: 'rgba(255,255,255,0.18)',
    onDarkDivider: 'rgba(255,255,255,0.08)',
    onDarkSurfaceLight: 'rgba(255,255,255,0.06)',
    onDarkFaint: 'rgba(255,255,255,0.04)',

    // Shadows
    shadow: '#0F172A',
    shadowLight: '#000000',

    // Overlays / Scrims
    backdrop: 'rgba(0,0,0,0.5)',
    scrim: 'rgba(0,0,0,0.1)',
    scrimLight: 'rgba(0,0,0,0.08)',
}

/**
 * Full flattened color palette for static usage (e.g. StyleSheet.create).
 * Combines MD3 overrides + custom tokens.
 */
export const themeColors = {
    // Primary brand colors
    primary: '#1E293B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E2E8F0',
    onPrimaryContainer: '#0F172A',

    // Secondary / Industrial
    secondary: '#475569',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#F1F5F9',
    onSecondaryContainer: '#1E293B',

    // Accent
    tertiary: '#F59E0B',
    onTertiary: '#000000',

    // Status
    error: '#EF4444',

    // Neutral / Background
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9',
    onSurface: '#0F172A',
    onSurfaceVariant: '#64748B',
    outline: '#CBD5E1',

    // Custom tokens
    ...customColors,
} as const

/**
 * Extended theme type with custom color tokens.
 */
export type AppTheme = MD3Theme & {
    colors: MD3Theme['colors'] & typeof customColors
}

/**
 * SV Car App Identity Theme
 * Industrial automotive palette:
 * - Primary: Deep Charcoal / Racing Blue
 * - Secondary: Industrial Slate
 * - Accent: Safety Orange / Racing Amber
 */
export const createAppTheme = (isRTL: boolean = false): AppTheme => {
    const baseTheme = {
        ...MD3LightTheme,
        fonts: createCairoFonts(),
        colors: {
            ...MD3LightTheme.colors,
            primary: themeColors.primary,
            onPrimary: themeColors.onPrimary,
            primaryContainer: themeColors.primaryContainer,
            onPrimaryContainer: themeColors.onPrimaryContainer,
            secondary: themeColors.secondary,
            onSecondary: themeColors.onSecondary,
            secondaryContainer: themeColors.secondaryContainer,
            onSecondaryContainer: themeColors.onSecondaryContainer,
            tertiary: themeColors.tertiary,
            onTertiary: themeColors.onTertiary,
            error: themeColors.error,
            background: themeColors.background,
            surface: themeColors.surface,
            surfaceVariant: themeColors.surfaceVariant,
            onSurface: themeColors.onSurface,
            onSurfaceVariant: themeColors.onSurfaceVariant,
            outline: themeColors.outline,

            // Extended custom tokens
            ...customColors,
        },
    }

    return {
        ...baseTheme,
        ...(isRTL && {isRTL: true}),
    } as AppTheme
}

// Default theme (LTR) for backwards compatibility
export const appTheme = createAppTheme(false)
