import {useCallback, useEffect, useRef, useState} from 'react'

import {ApiError, savedPartsService} from '@/global/services'
import {useSavedPartsStore} from '@/global/store'
import type {Part} from '@/global/types'

const PAGE_SIZE = 20

export const useSavedPartsList = () => {
    const idsCount = useSavedPartsStore(s => s.ids.length)
    const [parts, setParts] = useState<Part[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)
    const fetchIdRef = useRef(0)

    const fetchFirstPage = useCallback(async () => {
        const fetchId = ++fetchIdRef.current
        setLoading(true)
        setError(null)
        try {
            const result = await savedPartsService.getPaged(0, PAGE_SIZE)
            if (fetchId !== fetchIdRef.current) return
            setParts(result.parts)
            setTotal(result.total)
            setPage(0)
            setHasMore(result.page + 1 < result.totalPages)
        } catch (err) {
            if (fetchId !== fetchIdRef.current) return
            setError(err instanceof ApiError ? err.message : 'Failed to load saved parts')
            setParts([])
        } finally {
            if (fetchId === fetchIdRef.current) setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchFirstPage()
    }, [fetchFirstPage, idsCount])

    const loadMore = useCallback(async () => {
        if (loadingMore || loading || !hasMore) return
        const nextPage = page + 1
        setLoadingMore(true)
        try {
            const result = await savedPartsService.getPaged(nextPage, PAGE_SIZE)
            const existingIds = new Set(parts.map(p => p.id))
            const newParts = result.parts.filter(p => !existingIds.has(p.id))
            setParts(prev => [...prev, ...newParts])
            setPage(nextPage)
            setHasMore(nextPage + 1 < result.totalPages)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to load more')
        } finally {
            setLoadingMore(false)
        }
    }, [loadingMore, loading, hasMore, page, parts])

    return {parts, total, loading, loadingMore, error, hasMore, loadMore, refresh: fetchFirstPage}
}
