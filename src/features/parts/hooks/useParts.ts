import {useEffect, useState, useCallback, useRef} from 'react'

import type {PartCategory, Part} from '@/global/types'

import {useVehicleStore} from '@/global/store'

import {partsListService} from '../services'

const PAGE_SIZE = 20

export const useParts = (initialCategory?: PartCategory | null) => {
    const vehicle = useVehicleStore(s => s.vehicle)
    const [parts, setParts] = useState<Part[]>([])
    const [selectedCategory, setSelectedCategory] = useState<PartCategory | null>(initialCategory ?? null)
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    // Track current fetch to avoid race conditions
    const fetchIdRef = useRef(0)

    const fetchParts = useCallback(async (category: PartCategory | null | undefined, searchQuery: string) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true)
        setError(null)
        setPage(0)
        setHasMore(false)
        try {
            const response = await partsListService.getParts({
                category: category || undefined,
                search: searchQuery || undefined,
                page: 0,
                limit: PAGE_SIZE,
            })
            if (fetchId !== fetchIdRef.current) return
            setParts(response.parts)
            setTotal(response.total)
            setHasMore(response.page + 1 < response.totalPages)
        } catch (err) {
            if (fetchId !== fetchIdRef.current) return
            setError((err as Error).message || 'Failed to fetch parts')
            setParts([])
        } finally {
            if (fetchId === fetchIdRef.current) {
                setLoading(false)
            }
        }
    }, [])

    // Skip the first search effect — the category effect already fetches on mount
    const searchChangedRef = useRef(false)

    useEffect(() => {
        fetchParts(selectedCategory, search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, vehicle?.id])

    // Debounce search — skip on initial mount (category effect already fetched)
    useEffect(() => {
        if (!searchChangedRef.current) {
            searchChangedRef.current = true
            return
        }
        const timer = setTimeout(() => {
            fetchParts(selectedCategory, search)
        }, 400)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const loadMore = useCallback(async () => {
        if (loadingMore || loading || !hasMore) return
        const nextPage = page + 1
        setLoadingMore(true)
        try {
            const response = await partsListService.getParts({
                category: selectedCategory || undefined,
                search: search || undefined,
                page: nextPage,
                limit: PAGE_SIZE,
            })
            const existingIds = new Set(parts.map(p => p.id))
            const newParts = response.parts.filter(p => !existingIds.has(p.id))
            setParts(prev => [...prev, ...newParts])
            setPage(nextPage)
            setHasMore(nextPage + 1 < response.totalPages)
        } catch (err) {
            setError((err as Error).message || 'Failed to load more parts')
        } finally {
            setLoadingMore(false)
        }
    }, [loadingMore, loading, hasMore, page, selectedCategory, search, parts])

    const selectCategory = useCallback((category: PartCategory | null) => {
        setSelectedCategory(category)
        setSearch('')
    }, [])

    const refresh = useCallback(() => {
        fetchParts(selectedCategory, search)
    }, [fetchParts, selectedCategory, search])

    return {
        parts,
        selectedCategory,
        total,
        loading,
        loadingMore,
        error,
        search,
        setSearch,
        hasMore,
        selectCategory,
        loadMore,
        refresh,
    }
}
