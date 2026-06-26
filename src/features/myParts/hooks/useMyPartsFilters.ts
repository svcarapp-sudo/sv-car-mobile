import {useMemo, useState} from 'react'

import type {Part, PartCategoryApi} from '@/global/types'

export type MyPartsSortKey = 'newest' | 'priceDesc' | 'priceAsc' | 'nameAsc'
export type MyPartsStatusFilter = 'all' | 'active' | 'sold' | 'hidden'

export interface FilterCriteria {
    status: MyPartsStatusFilter
    categoryId: number | null
    search: string
}

export interface MyPartsFiltersState {
    search: string
    setSearch: (v: string) => void
    sort: MyPartsSortKey
    setSort: (v: MyPartsSortKey) => void
    activeCategoryId: number | null
    setActiveCategoryId: (id: number | null) => void
    statusFilter: MyPartsStatusFilter
    setStatusFilter: (v: MyPartsStatusFilter) => void
    availableCategories: PartCategoryApi[]
    filtered: Part[]
    isFiltered: boolean
    resetFilters: () => void
}

const matchesStatus = (part: Part, filter: MyPartsStatusFilter): boolean => {
    switch (filter) {
        case 'active':
            return (part.status ?? 'ACTIVE') === 'ACTIVE'
        case 'sold':
            return part.status === 'SOLD'
        case 'hidden':
            return part.status === 'HIDDEN'
        case 'all':
        default:
            return true
    }
}

const matchesSearch = (part: Part, query: string): boolean => {
    if (!query) return true
    const haystack = `${part.name} ${part.sku ?? ''} ${part.brand ?? ''}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
}

/**
 * Apply status + category + search (without sorting). Shared by the hook and by
 * the filter dialog, which uses it for the live result count and per-chip facet
 * counts.
 */
export const filterParts = (parts: Part[], {status, categoryId, search}: FilterCriteria): Part[] => {
    const byStatus = parts.filter(p => matchesStatus(p, status))
    const byCategory = categoryId == null ? byStatus : byStatus.filter(p => p.categoryId === categoryId)
    return byCategory.filter(p => matchesSearch(p, search.trim()))
}

const sortParts = (parts: Part[], sort: MyPartsSortKey): Part[] => {
    const copy = [...parts]
    switch (sort) {
        case 'priceDesc':
            return copy.sort((a, b) => b.price - a.price)
        case 'priceAsc':
            return copy.sort((a, b) => a.price - b.price)
        case 'nameAsc':
            return copy.sort((a, b) => a.name.localeCompare(b.name, 'ar'))
        case 'newest':
        default:
            return copy.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    }
}

export const useMyPartsFilters = (parts: Part[], categories: PartCategoryApi[]): MyPartsFiltersState => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<MyPartsSortKey>('newest')
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
    const [statusFilter, setStatusFilter] = useState<MyPartsStatusFilter>('all')

    const availableCategories = useMemo(() => {
        const ids = new Set<number>()
        for (const p of parts) if (p.categoryId != null) ids.add(p.categoryId)
        return categories.filter(c => ids.has(c.id))
    }, [parts, categories])

    const filtered = useMemo(
        () => sortParts(filterParts(parts, {status: statusFilter, categoryId: activeCategoryId, search}), sort),
        [parts, activeCategoryId, statusFilter, search, sort]
    )

    const isFiltered = search.trim().length > 0 || activeCategoryId != null || statusFilter !== 'all'

    const resetFilters = () => {
        setSearch('')
        setActiveCategoryId(null)
        setStatusFilter('all')
    }

    return {
        search,
        setSearch,
        sort,
        setSort,
        activeCategoryId,
        setActiveCategoryId,
        statusFilter,
        setStatusFilter,
        availableCategories,
        filtered,
        isFiltered,
        resetFilters,
    }
}
