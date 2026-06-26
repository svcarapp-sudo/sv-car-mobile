import type {LabelCount, TrendPoint} from '../../types'

/** Largest count in a series, floored at 1 so divisions never hit zero. */
export const seriesMax = (items: {count: number}[]): number => Math.max(1, ...items.map(i => i.count))

/** Proportional fill in the 0–100 range for a single value against a max. */
export const percentOf = (count: number, max: number): number => (max <= 0 ? 0 : Math.round((count / max) * 100))

/** True when every point in the series is zero (nothing to plot). */
export const allZero = (items: {count: number}[]): boolean => items.every(i => i.count === 0)

/** Maps the English status labels coming from the API to Arabic for display. */
const STATUS_AR: Record<string, string> = {ACTIVE: 'نشط', SOLD: 'مُباع', HIDDEN: 'مخفي'}

export const localizeStatus = (label: string): string => STATUS_AR[label] ?? label

/** Status distribution with Arabic labels, ready for the bar list. */
export const localizeStatusList = (items: LabelCount[]): LabelCount[] =>
    items.map(i => ({label: localizeStatus(i.label), count: i.count}))

/** Short day/month axis caption (e.g. "12/6") from an ISO yyyy-MM-dd date. */
export const shortDate = (iso: string): string => {
    const parts = iso.split('-')
    if (parts.length < 3) return iso
    return `${Number(parts[2])}/${Number(parts[1])}`
}

/** First and last axis captions for a trend series; empty strings when absent. */
export const trendAxis = (points: TrendPoint[]): {start: string; end: string} => {
    if (points.length === 0) return {start: '', end: ''}
    return {start: shortDate(points[0].date), end: shortDate(points[points.length - 1].date)}
}
