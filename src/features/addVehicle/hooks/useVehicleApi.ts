import {useState, useCallback} from 'react'

import {ApiError} from '@/shared/services'

import {vehicleService} from '../services'
import {useVehicleStore} from '../store'

import type {CreateVehicleRequest} from '../types'

/**
 * Hook for vehicle API operations
 * This integrates with the backend API service
 */
export const useVehicleApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchVehicle = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const vehicles = await vehicleService.getVehicles()

            // Update store with the first vehicle if available
            if (vehicles.length > 0) {
                useVehicleStore.getState().setVehicle(vehicles[0])
            } else {
                useVehicleStore.getState().removeVehicle()
            }

            return vehicles[0] || null
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const createVehicle = useCallback(async (data: CreateVehicleRequest) => {
        setLoading(true)
        setError(null)

        try {
            const vehicle = await vehicleService.createVehicle(data)
            useVehicleStore.getState().setVehicle(vehicle)

            return vehicle
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to create vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const deleteVehicle = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)

        try {
            await vehicleService.deleteVehicle(id)
            useVehicleStore.getState().removeVehicle()
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to delete vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        error,
        fetchVehicle,
        createVehicle,
        deleteVehicle,
    }
}
