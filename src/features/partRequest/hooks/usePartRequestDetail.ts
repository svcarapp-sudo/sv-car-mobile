import {useCallback, useEffect, useState} from 'react'

import {ApiError} from '@/global/services'

import {partRequestService} from '../services'
import type {PartRequest} from '../types'

export const usePartRequestDetail = (id: string | undefined) => {
    const [request, setRequest] = useState<PartRequest | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchDetail = useCallback(async () => {
        if (!id) return
        setLoading(true)
        setError(null)
        try {
            const data = await partRequestService.getById(id)
            setRequest(data)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to load request')
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchDetail().catch(() => {})
    }, [fetchDetail])

    return {request, loading, error, refresh: fetchDetail}
}
