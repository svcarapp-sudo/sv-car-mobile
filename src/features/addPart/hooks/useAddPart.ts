import {useState, useCallback} from 'react'

import {partService} from '@/global/services/partService'
import {ApiError} from '@/global/services'
import type {CreatePartRequest, Part} from '@/global/types'

export const useAddPart = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createPart = useCallback(async (data: CreatePartRequest): Promise<Part> => {
        setLoading(true)
        setError(null)

        try {
            return await partService.createPart(data)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to create part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {loading, error, createPart}
}
