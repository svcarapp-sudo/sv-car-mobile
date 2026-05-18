import {useCallback, useState} from 'react'

import {ApiError} from '@/global/services'

import {partRequestService} from '../services'
import type {CreatePartRequestPayload, UpdatePartRequestPayload, PartRequest} from '../types'

export const useAddPartRequest = () => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const create = useCallback(async (payload: CreatePartRequestPayload): Promise<PartRequest> => {
        setSubmitting(true)
        setError(null)
        try {
            return await partRequestService.create(payload)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to create request'
            setError(message)
            throw err
        } finally {
            setSubmitting(false)
        }
    }, [])

    const update = useCallback(async (id: string, payload: UpdatePartRequestPayload): Promise<PartRequest> => {
        setSubmitting(true)
        setError(null)
        try {
            return await partRequestService.update(id, payload)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to update request'
            setError(message)
            throw err
        } finally {
            setSubmitting(false)
        }
    }, [])

    return {submitting, error, create, update}
}
