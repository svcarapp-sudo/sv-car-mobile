import {useState, useCallback} from 'react'

import {ApiError} from '@/shared/services'
import type {PartCategory} from '@/shared/types'

import {partService} from '../services'
import {usePartsStore} from '../store'

import type {GetPartsRequest, CreatePartRequest, UpdatePartRequest} from '../types'

/**
 * Hook for parts API operations
 * This integrates with the backend API service
 * Backend automatically filters by user's selected vehicle
 */
export const usePartApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchParts = useCallback(async (params?: GetPartsRequest) => {
        setLoading(true)
        setError(null)

        try {
            const response = await partService.getParts(params)
            // Update store with fetched parts
            usePartsStore.getState().setParts(response.parts)

            return response
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
            const parts = await partService.getPartsByCategory(category)
            // Update store with fetched parts
            usePartsStore.getState().setParts(parts)

            return parts
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
            const parts = await partService.searchParts(query)

            return parts
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
            return await partService.getPartById(id)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Check compatibility with user's selected vehicle
     * Backend automatically uses user's selected vehicle
     */
    const checkCompatibility = useCallback(async (partId: string) => {
        setLoading(true)
        setError(null)

        try {
            return await partService.checkCompatibility(partId)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to check compatibility'
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
            const part = await partService.createPart(data)
            usePartsStore.getState().addPart(part)

            return part
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
            const part = await partService.updatePart(id, data)
            usePartsStore.getState().updatePart(id, part)

            return part
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
            await partService.deletePart(id)
            usePartsStore.getState().deletePart(id)
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
        checkCompatibility,
        createPart,
        updatePart,
        deletePart,
    }
}
