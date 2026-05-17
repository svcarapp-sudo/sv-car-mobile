import {useEffect, useRef, useState} from 'react'

import {apiClient} from '@/global/services/ApiClient'
import {getCategoriesForMapping} from '@/global/services/catalogService'
import {useVehicleStore} from '@/global/store'
import type {Part} from '@/global/types'
import {mapPartModelToPart, type PartModelResponse} from '@/global/utils/partMapper'

interface RecommendedResponse {
    parts: PartModelResponse[]
    total: number
    page: number
    limit: number
    totalPages: number
}

interface UseRecommendedPartsResult {
    parts: Part[]
    loading: boolean
    error: string | null
    refresh: () => void
}

/**
 * Fetches a small set of parts compatible with the user's saved vehicle.
 * Returns empty array (no error) if no vehicle is saved — caller decides whether to render.
 */
export const useRecommendedParts = (limit = 8): UseRecommendedPartsResult => {
    const vehicle = useVehicleStore(s => s.vehicle)
    const [parts, setParts] = useState<Part[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fetchIdRef = useRef(0)
    const [refreshTick, setRefreshTick] = useState(0)

    useEffect(() => {
        if (!vehicle?.makeId) {
            setParts([])
            setLoading(false)
            setError(null)
            return
        }

        const fetchId = ++fetchIdRef.current
        setLoading(true)
        setError(null)

        const run = async () => {
            try {
                const queryParams: Record<string, string | number> = {
                    makeId: vehicle.makeId as number,
                    page: 0,
                    limit,
                    sortBy: 'createdAt',
                    sortOrder: 'desc',
                }
                if (vehicle.modelId) queryParams.modelId = vehicle.modelId
                if (vehicle.year) queryParams.year = vehicle.year

                const response = await apiClient.get<RecommendedResponse>('/api/parts', {params: queryParams})
                const categories = await getCategoriesForMapping()

                if (fetchId !== fetchIdRef.current) return
                setParts(response.parts.map(p => mapPartModelToPart(p, categories)))
            } catch (err) {
                if (fetchId !== fetchIdRef.current) return
                setError((err as Error).message || 'Failed to load recommended parts')
                setParts([])
            } finally {
                if (fetchId === fetchIdRef.current) setLoading(false)
            }
        }

        run()
    }, [vehicle?.makeId, vehicle?.modelId, vehicle?.year, limit, refreshTick])

    return {
        parts,
        loading,
        error,
        refresh: () => setRefreshTick(t => t + 1),
    }
}
