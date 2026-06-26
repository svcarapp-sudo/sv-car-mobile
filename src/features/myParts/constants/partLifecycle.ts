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

export type StockLevel = 'out' | 'ok'

/** Classify a stock quantity. Undefined → 'ok' (legacy parts), 0 or less → 'out'. */
export const stockLevel = (qty?: number): StockLevel => {
    if (qty == null) return 'ok'
    return qty <= 0 ? 'out' : 'ok'
}
