import type {PartConditionValue, PartStatus} from '@/global/types'

/** Arabic labels + semantic accent tokens for the part lifecycle (seller console). */

export const STATUS_LABEL: Record<PartStatus, string> = {
    ACTIVE: 'نشط',
    SOLD: 'مُباع',
    HIDDEN: 'مخفي',
}

export const CONDITION_LABEL: Record<PartConditionValue, string> = {
    NEW: 'جديد',
    USED: 'مستعمل',
    REFURBISHED: 'مجدّد',
}

/** Ordered condition options for selectors (default: USED). */
export const CONDITION_OPTIONS: PartConditionValue[] = ['NEW', 'USED', 'REFURBISHED']

export const LOW_STOCK_THRESHOLD = 3

export type StockLevel = 'out' | 'low' | 'ok'

/** Classify a stock quantity into a semantic level. Undefined → 'ok' (legacy parts). */
export const stockLevel = (qty?: number): StockLevel => {
    if (qty == null) return 'ok'
    if (qty <= 0) return 'out'
    if (qty <= LOW_STOCK_THRESHOLD) return 'low'
    return 'ok'
}

export const isLowOrOut = (qty?: number): boolean => {
    const level = stockLevel(qty)
    return level === 'low' || level === 'out'
}
