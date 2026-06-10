import {useCallback, useEffect, useState} from 'react'

import {sellerAccountService} from '../services/sellerAccountService'
import type {SellerSummary} from '../types'

interface UseSellerAccountResult {
    loading: boolean
    refreshing: boolean
    error: boolean
    summary: SellerSummary | null
    reload: () => Promise<void>
    clearError: () => void
}

/**
 * Loads the authenticated seller's account summary. Exposes a `reload` used both for
 * pull-to-refresh and for retrying after a network error.
 */
export const useSellerAccount = (): UseSellerAccountResult => {
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const [summary, setSummary] = useState<SellerSummary | null>(null)

    const load = useCallback(async (isRefresh: boolean) => {
        if (isRefresh) setRefreshing(true)
        else setLoading(true)
        setError(false)
        try {
            const data = await sellerAccountService.getSummary()
            setSummary(data)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useEffect(() => {
        void load(false)
    }, [load])

    const reload = useCallback(() => load(true), [load])
    const clearError = useCallback(() => setError(false), [])

    return {loading, refreshing, error, summary, reload, clearError}
}
