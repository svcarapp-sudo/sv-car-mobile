import {useState, useCallback} from 'react'

import {apiClient, ApiError} from '@/global/services'
import {getCategoriesForMapping} from '@/global/services/catalogService'
import {mapPartModelToPart, type PartModelResponse} from '@/global/utils/partMapper'
import type {CreatePartRequest, Part} from '@/global/types'

const PARTS_PATH = '/api/parts'

export const useAddPart = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createPart = useCallback(async (data: CreatePartRequest): Promise<Part> => {
        setLoading(true)
        setError(null)

        try {
            const response = await apiClient.post<PartModelResponse>(PARTS_PATH, data)
            const categories = await getCategoriesForMapping()
            return mapPartModelToPart(response, categories)
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
