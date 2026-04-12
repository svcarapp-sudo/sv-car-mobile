import {useState, useCallback} from 'react'

import {ApiError} from '@/global/services'
import type {PartCategory, GetPartsRequest, CreatePartRequest, UpdatePartRequest} from '@/global/types'
import {partsListService} from '../services'

export const usePartApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchParts = useCallback(async (params?: GetPartsRequest) => {
        setLoading(true)
        setError(null)
        try {
            return await partsListService.getParts(params)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch parts'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchPartsByCategory = useCallback(async (category: PartCategory) => {
        setLoading(true)
        setError(null)
        try {
            return await partsListService.getPartsByCategory(category)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch parts by category'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const searchParts = useCallback(async (query: string) => {
        setLoading(true)
        setError(null)
        try {
            return await partsListService.searchParts(query)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to search parts'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const getPartById = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            return await partsListService.getPartById(id)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const createPart = useCallback(async (data: CreatePartRequest) => {
        setLoading(true)
        setError(null)
        try {
            return await partsListService.createPart(data)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to create part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const updatePart = useCallback(async (id: string, data: UpdatePartRequest) => {
        setLoading(true)
        setError(null)
        try {
            return await partsListService.updatePart(id, data)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to update part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const deletePart = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await partsListService.deletePart(id)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to delete part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        error,
        fetchParts,
        fetchPartsByCategory,
        searchParts,
        getPartById,
        createPart,
        updatePart,
        deletePart,
    }
}
