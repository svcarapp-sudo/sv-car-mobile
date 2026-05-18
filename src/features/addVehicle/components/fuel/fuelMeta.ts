import type {AppTheme} from '@/global/theme/theme'

export interface FuelMeta {
    descriptor: string
    badge?: string
    tint: (theme: AppTheme) => {bg: string; fg: string}
}

const amber = (theme: AppTheme) => ({bg: theme.colors.accentSoft, fg: theme.colors.tertiary})
const slate = (theme: AppTheme) => ({bg: theme.colors.secondaryContainer, fg: theme.colors.secondary})
const green = (theme: AppTheme) => ({bg: theme.colors.successContainer, fg: theme.colors.success})
const blue = (theme: AppTheme) => ({bg: theme.colors.infoContainer, fg: theme.colors.info})

const FALLBACK: FuelMeta = {
    descriptor: '',
    tint: amber,
}

const REGISTRY: Record<string, FuelMeta> = {
    gasoline: {
        descriptor: 'الوقود الأكثر استخداماً للسيارات العادية',
        badge: 'شائع',
        tint: amber,
    },
    diesel: {
        descriptor: 'كفاءة عالية وقوة سحب للمسافات الطويلة',
        tint: slate,
    },
    electric: {
        descriptor: 'صديق للبيئة وأقل تكلفة للتشغيل',
        badge: 'صديق للبيئة',
        tint: green,
    },
    hybrid: {
        descriptor: 'يجمع بين الوقود والكهرباء بكفاءة',
        badge: 'صديق للبيئة',
        tint: green,
    },
    plugin_hybrid: {
        descriptor: 'هجين متطوّر يدعم الشحن الخارجي',
        badge: 'متطوّر',
        tint: blue,
    },
}

export const getFuelMeta = (id: string): FuelMeta => REGISTRY[id] ?? FALLBACK
