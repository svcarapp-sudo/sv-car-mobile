import {useCallback, useEffect, useState} from 'react'

import {ApiError} from '@/global/services'
import type {Offer} from '@/global/types'

import {offerService} from '../services/offerService'

const PAGE_SIZE = 50

export interface UseMyOffersResult {
    offers: Offer[]
    loading: boolean
    error: string | null
    reload: () => Promise<void>
    withdraw: (offerId: number) => Promise<void>
}

/** Loads every offer the authenticated seller has sent. */
export const useMyOffers = (): UseMyOffersResult => {
    const [offers, setOffers] = useState<Offer[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const reload = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const first = await offerService.getMyOffers(0, PAGE_SIZE)
            let all = first.offers
            for (let page = 1; page < first.totalPages; page++) {
                const next = await offerService.getMyOffers(page, PAGE_SIZE)
                all = all.concat(next.offers)
            }
            setOffers(all)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'تعذّر تحميل عروضك')
            setOffers([])
        } finally {
            setLoading(false)
        }
    }, [])

    const withdraw = useCallback(async (offerId: number) => {
        const updated = await offerService.respondToOffer(offerId, 'WITHDRAWN')
        setOffers(prev => prev.map(o => (o.id === offerId ? updated : o)))
    }, [])

    useEffect(() => {
        reload().catch(() => {})
    }, [reload])

    return {offers, loading, error, reload, withdraw}
}
