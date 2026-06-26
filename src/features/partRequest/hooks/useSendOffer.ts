import {useCallback, useState} from 'react'

import {ApiError} from '@/global/services'
import type {CreateOfferRequest, Offer} from '@/global/types'

import {offerService} from '../services/offerService'

export interface UseSendOfferResult {
    submitting: boolean
    error: string | null
    submit: (requestId: string, body: CreateOfferRequest) => Promise<Offer | null>
}

/** Submits a seller's price quote on a request. */
export const useSendOffer = (): UseSendOfferResult => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const submit = useCallback(async (requestId: string, body: CreateOfferRequest): Promise<Offer | null> => {
        setSubmitting(true)
        setError(null)
        try {
            return await offerService.createOffer(requestId, body)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'تعذّر إرسال العرض')
            return null
        } finally {
            setSubmitting(false)
        }
    }, [])

    return {submitting, error, submit}
}
