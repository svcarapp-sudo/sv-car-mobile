import {useCallback, useEffect, useRef, useState} from 'react'

import {ApiError} from '@/global/services'
import type {SellerSpecialization} from '@/global/types'

import {partRequestService} from '../services'
import type {PartRequest, PartRequestCondition} from '../types'

const PAGE_SIZE = 20

export interface UsePartRequestsMatchedResult {
    requests: PartRequest[]
    total: number
    specializations: SellerSpecialization[]
    loading: boolean
    loadingMore: boolean
    error: string | null
    search: string
    condition: PartRequestCondition | null
    hasMore: boolean
    setSearch: (next: string) => void
    setCondition: (next: PartRequestCondition | null) => void
    refresh: () => void
    loadMore: () => Promise<void>
}

/** Loads OPEN part requests matching the authenticated seller's specialization makes. */
export const usePartRequestsMatched = (): UsePartRequestsMatchedResult => {
    const [requests, setRequests] = useState<PartRequest[]>([])
    const [total, setTotal] = useState(0)
    const [specializations, setSpecializations] = useState<SellerSpecialization[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [condition, setCondition] = useState<PartRequestCondition | null>(null)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    const fetchIdRef = useRef(0)

    const fetchMatched = useCallback(async (c: PartRequestCondition | null, term: string) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true)
        setError(null)
        setPage(0)
        setHasMore(false)
        try {
            const result = await partRequestService.listMatched({
                conditionPreference: c,
                search: term || undefined,
                page: 0,
                limit: PAGE_SIZE,
            })
            if (fetchId !== fetchIdRef.current) return
            setRequests(result.requests)
            setTotal(result.total)
            setSpecializations(result.specializations)
            setHasMore(result.page + 1 < result.totalPages)
        } catch (err) {
            if (fetchId !== fetchIdRef.current) return
            setError(err instanceof ApiError ? err.message : 'Failed to load matched requests')
            setRequests([])
        } finally {
            if (fetchId === fetchIdRef.current) setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMatched(condition, search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [condition])

    const searchInitRef = useRef(false)
    useEffect(() => {
        if (!searchInitRef.current) {
            searchInitRef.current = true
            return
        }
        const handle = setTimeout(() => fetchMatched(condition, search), 400)
        return () => clearTimeout(handle)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const loadMore = useCallback(async () => {
        if (loadingMore || loading || !hasMore) return
        const nextPage = page + 1
        setLoadingMore(true)
        try {
            const result = await partRequestService.listMatched({
                conditionPreference: condition,
                search: search || undefined,
                page: nextPage,
                limit: PAGE_SIZE,
            })
            const seen = new Set(requests.map(r => r.id))
            setRequests(prev => [...prev, ...result.requests.filter(r => !seen.has(r.id))])
            setPage(nextPage)
            setHasMore(nextPage + 1 < result.totalPages)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to load more requests')
        } finally {
            setLoadingMore(false)
        }
    }, [loadingMore, loading, hasMore, page, condition, search, requests])

    const refresh = useCallback(() => fetchMatched(condition, search), [fetchMatched, condition, search])

    return {
        requests,
        total,
        specializations,
        loading,
        loadingMore,
        error,
        search,
        condition,
        hasMore,
        setSearch,
        setCondition,
        refresh,
        loadMore,
    }
}
