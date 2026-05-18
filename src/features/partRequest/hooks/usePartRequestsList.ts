import {useCallback, useEffect, useRef, useState} from 'react'

import {ApiError} from '@/global/services'

import {partRequestService} from '../services'
import type {PartRequestCondition, PartRequest, PartRequestStatus} from '../types'

const PAGE_SIZE = 20

export interface UsePartRequestsListResult {
    requests: PartRequest[]
    total: number
    loading: boolean
    loadingMore: boolean
    error: string | null
    search: string
    status: PartRequestStatus | null
    condition: PartRequestCondition | null
    hasMore: boolean
    setSearch: (next: string) => void
    setStatus: (next: PartRequestStatus | null) => void
    setCondition: (next: PartRequestCondition | null) => void
    refresh: () => void
    loadMore: () => Promise<void>
}

export const usePartRequestsList = (): UsePartRequestsListResult => {
    const [requests, setRequests] = useState<PartRequest[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<PartRequestStatus | null>('OPEN')
    const [condition, setCondition] = useState<PartRequestCondition | null>(null)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    const fetchIdRef = useRef(0)

    const fetchRequests = useCallback(async (s: PartRequestStatus | null, c: PartRequestCondition | null, term: string) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true)
        setError(null)
        setPage(0)
        setHasMore(false)
        try {
            const result = await partRequestService.list({
                status: s,
                conditionPreference: c,
                search: term || undefined,
                page: 0,
                limit: PAGE_SIZE,
            })
            if (fetchId !== fetchIdRef.current) return
            setRequests(result.requests)
            setTotal(result.total)
            setHasMore(result.page + 1 < result.totalPages)
        } catch (err) {
            if (fetchId !== fetchIdRef.current) return
            const message = err instanceof ApiError ? err.message : 'Failed to load part requests'
            setError(message)
            setRequests([])
        } finally {
            if (fetchId === fetchIdRef.current) setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRequests(status, condition, search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, condition])

    const searchInitRef = useRef(false)
    useEffect(() => {
        if (!searchInitRef.current) {
            searchInitRef.current = true
            return
        }
        const handle = setTimeout(() => {
            fetchRequests(status, condition, search)
        }, 400)
        return () => clearTimeout(handle)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const loadMore = useCallback(async () => {
        if (loadingMore || loading || !hasMore) return
        const nextPage = page + 1
        setLoadingMore(true)
        try {
            const result = await partRequestService.list({
                status,
                conditionPreference: condition,
                search: search || undefined,
                page: nextPage,
                limit: PAGE_SIZE,
            })
            const seen = new Set(requests.map(r => r.id))
            const fresh = result.requests.filter(r => !seen.has(r.id))
            setRequests(prev => [...prev, ...fresh])
            setPage(nextPage)
            setHasMore(nextPage + 1 < result.totalPages)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to load more requests')
        } finally {
            setLoadingMore(false)
        }
    }, [loadingMore, loading, hasMore, page, status, condition, search, requests])

    const refresh = useCallback(() => {
        fetchRequests(status, condition, search)
    }, [fetchRequests, status, condition, search])

    return {
        requests,
        total,
        loading,
        loadingMore,
        error,
        search,
        status,
        condition,
        hasMore,
        setSearch,
        setStatus,
        setCondition,
        refresh,
        loadMore,
    }
}
