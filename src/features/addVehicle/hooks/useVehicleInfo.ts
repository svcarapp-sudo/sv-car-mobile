import {useState, useEffect, useCallback, useMemo} from 'react'

import {catalogService} from '../services'
import {FUEL_TYPES, MAX_YEAR, MIN_YEAR} from '../constants'

import type {OriginApi, MakeApi, ModelApi} from '../services'

/**
 * Hook to fetch and manage catalog options: origins, makes, models (from backend).
 * Also exposes fuel types and years from local constants for the add-vehicle flow.
 */
export const useVehicleInfo = () => {
    const [loading, setLoading] = useState(true)
    const [origins, setOrigins] = useState<OriginApi[]>([])

    const years = useMemo(() => {
        const list: number[] = []

        for (let i = MAX_YEAR; i >= MIN_YEAR; i--) {
            list.push(i)
        }

        return list
    }, [])

    const fetchOrigins = useCallback(async () => {
        setLoading(true)
        try {
            const list = await catalogService.getOrigins()
            setOrigins(list)
        } catch (error) {
            console.error('Failed to fetch origins:', error)
            setOrigins([])
        } finally {
            setLoading(false)
        }
    }, [])

    const getMakes = useCallback(async (originId?: number | null): Promise<MakeApi[]> => {
        try {
            return await catalogService.getMakes(originId)
        } catch (error) {
            console.error('Failed to fetch makes:', error)

            return []
        }
    }, [])

    const getModels = useCallback(async (makeId: number): Promise<ModelApi[]> => {
        try {
            return await catalogService.getModels(makeId)
        } catch (error) {
            console.error('Failed to fetch models:', error)

            return []
        }
    }, [])

    useEffect(() => {
        fetchOrigins()
    }, [fetchOrigins])

    return {
        loading,
        origins,
        years,
        fuelTypes: FUEL_TYPES,
        getMakes,
        getModels,
        refreshOrigins: fetchOrigins,
    }
}
