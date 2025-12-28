import {useState, useCallback} from 'react'

import {ApiError} from '@/shared/services'

import {vehicleService} from '../services'
import {useVehicleStore} from '../store'

import type {CreateVehicleRequest, UpdateVehicleRequest} from '../types'

/**
 * Hook for vehicle API operations
 * This integrates with the backend API service
 */
export const useVehicleApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchVehicles = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const vehicles = await vehicleService.getVehicles()
            // Update store with fetched vehicles
            vehicles.forEach(vehicle => {
                const existingVehicles = useVehicleStore.getState().vehicles

                if (!existingVehicles.find(v => v.id === vehicle.id)) {
                    useVehicleStore.getState().addVehicle(vehicle)
                }
            })

            return vehicles
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch vehicles'
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
            useVehicleStore.getState().addVehicle(vehicle)

            return vehicle
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to create vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const updateVehicle = useCallback(async (id: string, data: UpdateVehicleRequest) => {
        setLoading(true)
        setError(null)

        try {
            const vehicle = await vehicleService.updateVehicle(id, data)
            useVehicleStore.getState().updateVehicle(id, vehicle)

            return vehicle
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to update vehicle'
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
            useVehicleStore.getState().deleteVehicle(id)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to delete vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const setSelectedVehicle = useCallback(async (id: string | null) => {
        setLoading(true)
        setError(null)

        try {
            await vehicleService.setSelectedVehicle(id)
            useVehicleStore.getState().selectVehicle(id)
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to set selected vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        error,
        fetchVehicles,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        setSelectedVehicle,
    }
}
