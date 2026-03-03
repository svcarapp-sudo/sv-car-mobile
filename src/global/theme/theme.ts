import {configureFonts, MD3LightTheme, MD3Theme} from 'react-native-paper'

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
 * SV Car App Identity Theme
 * Industrial automotive palette:
 * - Primary: Deep Charcoal / Racing Blue
 * - Secondary: Industrial Slate
 * - Accent: Safety Orange / Racing Red
 */
export const createAppTheme = (isRTL: boolean = false): MD3Theme => {
    const baseTheme = {
        ...MD3LightTheme,
        fonts: createCairoFonts(),
        colors: {
            ...MD3LightTheme.colors,
            // Primary brand colors
            primary: '#1E293B', // Deep Slate Blue
            onPrimary: '#FFFFFF',
            primaryContainer: '#E2E8F0',
            onPrimaryContainer: '#0F172A',

            // Secondary / Industrial colors
            secondary: '#475569', // Muted Blue-Grey
            onSecondary: '#FFFFFF',
            secondaryContainer: '#F1F5F9',
            onSecondaryContainer: '#1E293B',

            // Accents / Status
            tertiary: '#F59E0B', // Racing Orange
            onTertiary: '#000000',
            error: '#EF4444', // Warning Red

            // Neutral / Background
            background: '#F8FAFC',
            surface: '#FFFFFF',
            surfaceVariant: '#F1F5F9',
            onSurface: '#0F172A',
            onSurfaceVariant: '#64748B',
            outline: '#CBD5E1',
        },
    }

    // Add isRTL if the theme type supports it
    return {
        ...baseTheme,
        ...(isRTL && {isRTL: true}),
    } as MD3Theme
}

// Default theme (LTR) for backwards compatibility
export const appTheme = createAppTheme(false)
