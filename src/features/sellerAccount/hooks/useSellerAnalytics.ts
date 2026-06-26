import {useCallback, useEffect, useState} from 'react'

import {sellerAccountService} from '../services/sellerAccountService'
import type {SellerAnalytics} from '../types'

/** Selectable look-back windows for the insights screen. */
export type AnalyticsRange = 7 | 30 | 90

interface UseSellerAnalyticsResult {
    loading: boolean
    refreshing: boolean
    error: boolean
    analytics: SellerAnalytics | null
    days: AnalyticsRange
    setDays: (days: AnalyticsRange) => void
    reload: () => Promise<void>
}

/**
 * Loads the authenticated seller's "Insights" analytics for a selectable day
 * range (7 / 30 / 90). Changing the range refetches; `reload` is reused for
 * pull-to-refresh and for retrying after a network error.
 */
export const useSellerAnalytics = (): UseSellerAnalyticsResult => {
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const [analytics, setAnalytics] = useState<SellerAnalytics | null>(null)
    const [days, setDaysState] = useState<AnalyticsRange>(30)

    const load = useCallback(async (range: AnalyticsRange, isRefresh: boolean) => {
        if (isRefresh) setRefreshing(true)
        else setLoading(true)
        setError(false)
        try {
            const data = await sellerAccountService.getAnalytics(range)
            setAnalytics(data)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useEffect(() => {
        void load(days, false)
    }, [days, load])

    const setDays = useCallback((next: AnalyticsRange) => setDaysState(next), [])
    const reload = useCallback(() => load(days, true), [days, load])

    return {loading, refreshing, error, analytics, days, setDays, reload}
}
