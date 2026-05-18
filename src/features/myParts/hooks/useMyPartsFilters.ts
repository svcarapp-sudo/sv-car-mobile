import {useMemo, useState} from 'react'

import type {Part, PartCategoryApi} from '@/global/types'

export type MyPartsSortKey = 'newest' | 'priceDesc' | 'priceAsc' | 'nameAsc'

export interface MyPartsFiltersState {
    search: string
    setSearch: (v: string) => void
    sort: MyPartsSortKey
    setSort: (v: MyPartsSortKey) => void
    activeCategoryId: number | null
    setActiveCategoryId: (id: number | null) => void
    availableCategories: PartCategoryApi[]
    filtered: Part[]
    isFiltered: boolean
    resetFilters: () => void
}

const matchesSearch = (part: Part, query: string): boolean => {
    if (!query) return true
    const haystack = `${part.name} ${part.sku ?? ''} ${part.brand ?? ''}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
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

    const availableCategories = useMemo(() => {
        const ids = new Set<number>()
        for (const p of parts) if (p.categoryId != null) ids.add(p.categoryId)
        return categories.filter(c => ids.has(c.id))
    }, [parts, categories])

    const filtered = useMemo(() => {
        const byCategory = activeCategoryId == null ? parts : parts.filter(p => p.categoryId === activeCategoryId)
        const bySearch = byCategory.filter(p => matchesSearch(p, search.trim()))
        return sortParts(bySearch, sort)
    }, [parts, activeCategoryId, search, sort])

    const isFiltered = search.trim().length > 0 || activeCategoryId != null

    const resetFilters = () => {
        setSearch('')
        setActiveCategoryId(null)
    }

    return {
        search,
        setSearch,
        sort,
        setSort,
        activeCategoryId,
        setActiveCategoryId,
        availableCategories,
        filtered,
        isFiltered,
        resetFilters,
    }
}
