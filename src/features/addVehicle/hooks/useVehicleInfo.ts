import {useState, useEffect, useCallback} from 'react'

import {vehicleInfoService} from '../services'

import type {Manufacturer, FuelType} from '../types'

/**
 * Hook to fetch and manage vehicle options (brands, models, fuel types, etc.)
 */
export const useVehicleInfo = () => {
    const [loading, setLoading] = useState(false)
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([])
    const [years, setYears] = useState<number[]>([])

    const fetchOptions = useCallback(async () => {
        setLoading(true)
        try {
            const options = await vehicleInfoService.getVehicleOptions()
            setManufacturers(options.manufacturers)
            setFuelTypes(options.fuelTypes)
            setYears(options.years)
        } catch (error) {
            console.error('Failed to fetch vehicle options:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    const getModels = useCallback(async (manufacturer: string) => {
        setLoading(true)
        try {
            return await vehicleInfoService.getModels(manufacturer)
        } catch (error) {
            console.error('Failed to fetch models:', error)

            return []
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchOptions()
    }, [fetchOptions])

    return {
        loading,
        manufacturers,
        fuelTypes,
        years,
        getModels,
        refresh: fetchOptions,
    }
}
