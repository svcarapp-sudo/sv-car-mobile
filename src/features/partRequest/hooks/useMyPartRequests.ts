import {useCallback, useEffect, useMemo, useState} from 'react'

import {ApiError} from '@/global/services'

import {partRequestService} from '../services'
import type {PartRequest, PartRequestStatus} from '../types'

export interface MyPartRequestCounts {
    all: number
    OPEN: number
    FULFILLED: number
    CLOSED: number
}

export const useMyPartRequests = () => {
    const [requests, setRequests] = useState<PartRequest[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [statusFilter, setStatusFilter] = useState<PartRequestStatus | null>(null)

    const fetchMine = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await partRequestService.listMine()
            setRequests(result.requests)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to load your requests')
        } finally {
            setLoading(false)
        }
    }, [])

    const remove = useCallback(async (id: string) => {
        setLoading(true)
        try {
            await partRequestService.remove(id)
            setRequests(prev => prev.filter(r => r.id !== id))
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to delete request')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const setStatus = useCallback(async (id: string, status: PartRequestStatus) => {
        try {
            const updated = await partRequestService.updateStatus(id, status)
            setRequests(prev => prev.map(r => (r.id === id ? updated : r)))
            return updated
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to update status')
            throw err
        }
    }, [])

    useEffect(() => {
        fetchMine().catch(() => {})
    }, [fetchMine])

    const counts = useMemo<MyPartRequestCounts>(
        () => ({
            all: requests.length,
            OPEN: requests.filter(r => r.status === 'OPEN').length,
            FULFILLED: requests.filter(r => r.status === 'FULFILLED').length,
            CLOSED: requests.filter(r => r.status === 'CLOSED').length,
        }),
        [requests]
    )

    const visibleRequests = useMemo(
        () => (statusFilter ? requests.filter(r => r.status === statusFilter) : requests),
        [requests, statusFilter]
    )

    return {requests, visibleRequests, counts, statusFilter, setStatusFilter, loading, error, fetchMine, remove, setStatus}
}
