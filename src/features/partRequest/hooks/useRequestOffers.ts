import {useCallback, useEffect, useState} from 'react'

import {ApiError} from '@/global/services'
import type {Offer} from '@/global/types'

import {offerService} from '../services/offerService'

export interface UseRequestOffersResult {
    offers: Offer[]
    loading: boolean
    error: string | null
    reload: () => Promise<void>
    accept: (offerId: number) => Promise<Offer>
    decline: (offerId: number) => Promise<Offer>
}

/** Requester-only: offers received on a single request, with accept/decline. */
export const useRequestOffers = (requestId: string | undefined): UseRequestOffersResult => {
    const [offers, setOffers] = useState<Offer[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const reload = useCallback(async () => {
        if (!requestId) return
        setLoading(true)
        setError(null)
        try {
            setOffers(await offerService.getOffersForRequest(requestId))
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'تعذّر تحميل العروض')
            setOffers([])
        } finally {
            setLoading(false)
        }
    }, [requestId])

    const respond = useCallback(async (offerId: number, status: 'ACCEPTED' | 'DECLINED') => {
        const updated = await offerService.respondToOffer(offerId, status)
        setOffers(prev => prev.map(o => (o.id === offerId ? updated : o)))
        return updated
    }, [])

    const accept = useCallback((offerId: number) => respond(offerId, 'ACCEPTED'), [respond])
    const decline = useCallback((offerId: number) => respond(offerId, 'DECLINED'), [respond])

    useEffect(() => {
        reload().catch(() => {})
    }, [reload])

    return {offers, loading, error, reload, accept, decline}
}
