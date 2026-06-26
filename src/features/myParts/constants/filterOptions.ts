import type {MyPartsSortKey, MyPartsStatusFilter} from '../hooks/useMyPartsFilters'

/** Static option lists for the My Parts filter dialog (Arabic labels + icons). */

export const STATUS_OPTIONS: {key: MyPartsStatusFilter; label: string; icon: string}[] = [
    {key: 'all', label: 'الكل', icon: 'view-grid-outline'},
    {key: 'active', label: 'نشط', icon: 'check-circle-outline'},
    {key: 'sold', label: 'مُباع', icon: 'tag-check-outline'},
    {key: 'hidden', label: 'مخفي', icon: 'eye-off-outline'},
]

export const SORT_OPTIONS: {key: MyPartsSortKey; label: string; icon: string}[] = [
    {key: 'newest', label: 'الأحدث', icon: 'clock-outline'},
    {key: 'priceDesc', label: 'الأعلى سعراً', icon: 'arrow-down'},
    {key: 'priceAsc', label: 'الأقل سعراً', icon: 'arrow-up'},
    {key: 'nameAsc', label: 'الاسم (أ-ي)', icon: 'sort-alphabetical-ascending'},
]
