import {useEffect, useState, useCallback, useRef} from 'react'

import type {PartCategory, Part} from '@/global/types'

import {partService} from '@/global/services'
import {usePartsStore} from '@/global/store'

const PAGE_SIZE = 20

export const useParts = () => {
    const {parts, selectedCategory, selectCategory, setParts} = usePartsStore()
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    // Track current fetch to avoid race conditions
    const fetchIdRef = useRef(0)

    const fetchParts = useCallback(
        async (category: PartCategory | null | undefined, searchQuery: string) => {
            const fetchId = ++fetchIdRef.current
            setLoading(true)
            setError(null)
            setPage(0)
            setHasMore(false)
            try {
                const response = await partService.getParts({
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
        },
        [setParts]
    )

    // Skip the first search effect — the category effect already fetches on mount
    const searchChangedRef = useRef(false)

    useEffect(() => {
        fetchParts(selectedCategory, search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory])

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
            const response = await partService.getParts({
                category: selectedCategory || undefined,
                search: search || undefined,
                page: nextPage,
                limit: PAGE_SIZE,
            })
            const existingIds = new Set(parts.map(p => p.id))
            const newParts = response.parts.filter(p => !existingIds.has(p.id))
            setParts([...parts, ...newParts])
            setPage(nextPage)
            setHasMore(nextPage + 1 < response.totalPages)
        } catch (err) {
            setError((err as Error).message || 'Failed to load more parts')
        } finally {
            setLoadingMore(false)
        }
    }, [loadingMore, loading, hasMore, page, selectedCategory, search, parts, setParts])

    const handleSelectCategory = useCallback(
        async (category: PartCategory | null) => {
            selectCategory(category)
            setSearch('')
        },
        [selectCategory]
    )

    const refresh = useCallback(() => {
        fetchParts(selectedCategory, search)
    }, [fetchParts, selectedCategory, search])

    const getCategoryParts = useCallback(async (category: PartCategory): Promise<Part[]> => {
        try {
            return await partService.getPartsByCategory(category)
        } catch (err) {
            setError((err as Error).message || 'Failed to fetch parts by category')
            return []
        }
    }, [])

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
        selectCategory: handleSelectCategory,
        loadMore,
        refresh,
        getCategoryParts,
    }
}
