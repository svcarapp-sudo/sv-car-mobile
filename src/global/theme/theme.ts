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
    const base = configureFonts({config: {fontFamily: CAIRO_REGULAR}})
    return {
        ...base,
        titleMedium: {...base.titleMedium, fontFamily: CAIRO_MEDIUM},
        titleSmall: {...base.titleSmall, fontFamily: CAIRO_MEDIUM},
        labelLarge: {...base.labelLarge, fontFamily: CAIRO_MEDIUM},
        labelMedium: {...base.labelMedium, fontFamily: CAIRO_MEDIUM},
        labelSmall: {...base.labelSmall, fontFamily: CAIRO_MEDIUM},
    }
}

/**
 * SV Car Light Theme Palette
 *
 * Identity: Deep Navy (#1A2744) + Rich Amber (#D97706)
 * Premium automotive marketplace feel with WCAG AA compliance.
 */
const customColors = {
    // Accent / Tertiary extended (amber)
    accentContainer: '#FEF3C7',
    accentSoft: 'rgba(217, 119, 6, 0.12)',
    accentMuted: 'rgba(217, 119, 6, 0.15)',
    accentSubtle: 'rgba(217, 119, 6, 0.04)',
    accentBorder: 'rgba(217, 119, 6, 0.3)',
    accentFaded: 'rgba(217, 119, 6, 0.06)',
    accentHalf: 'rgba(217, 119, 6, 0.6)',
    accentDivider: 'rgba(217, 119, 6, 0.08)',
    accentGlow: 'rgba(217, 119, 6, 0.1)',

    // Semantic — Success
    success: '#16A34A',
    successBright: '#22C55E',
    successContainer: '#DCFCE7',
    onSuccessContainer: '#14532D',

    // Semantic — Error extended
    errorDark: '#B91C1C',
    errorContainer: '#FEE2E2',
    onErrorContainer: '#7F1D1D',

    // Semantic — Warning
    warning: '#EA580C',
    warningContainer: '#FFF7ED',
    onWarningContainer: '#7C2D12',

    // Semantic — Info
    info: '#2563EB',
    infoContainer: '#DBEAFE',
    onInfoContainer: '#1E3A5F',

    // Dark surface (stepper, dark cards)
    surfaceDark: '#0F172A',

    // On-dark text/icon hierarchy
    onDarkHigh: 'rgba(255,255,255,0.87)',
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

    // Surface hierarchy (MD3 elevation)
    surfaceContainerLow: '#F3F5F8',
    surfaceContainer: '#ECEEF2',
    surfaceContainerHigh: '#E3E6EB',

    // Text hierarchy
    textPrice: '#92400E',

    // Shadows
    shadow: '#1A2744',
    shadowLight: '#000000',

    // Overlays / Scrims
    backdrop: 'rgba(26,39,68,0.5)',
    scrim: 'rgba(26,39,68,0.1)',
    scrimLight: 'rgba(26,39,68,0.08)',
}

/**
 * Full flattened color palette for static usage (StyleSheet.create).
 * Combines MD3 overrides + custom tokens.
 */
export const themeColors = {
    // Primary — Deep Navy
    primary: '#1A2744',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D4DDEF',
    onPrimaryContainer: '#0E1829',

    // Secondary — Cool Slate
    secondary: '#506070',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E0E6ED',
    onSecondaryContainer: '#2A3440',

    // Tertiary — Rich Amber
    tertiary: '#D97706',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FEF3C7',
    onTertiaryContainer: '#92400E',

    // Error
    error: '#DC2626',
    onError: '#FFFFFF',

    // Background / Surface
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceVariant: '#E2E6EC',
    onSurface: '#1A2744',
    onSurfaceVariant: '#5A6577',
    outline: '#C8CDD5',
    outlineVariant: '#DFE3E8',

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
 * Deep Navy + Rich Amber — premium automotive marketplace
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
