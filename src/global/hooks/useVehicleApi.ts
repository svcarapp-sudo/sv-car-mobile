import {useCallback, useState} from 'react'

import {ApiError, vehicleService, type CreateVehicleRequest, type UpdateVehicleRequest} from '@/global/services'
import {MAX_VEHICLES, useVehicleStore} from '@/global/store'

export class VehicleLimitError extends Error {
    constructor() {
        super(`Reached vehicle limit (${MAX_VEHICLES})`)
        this.name = 'VehicleLimitError'
    }
}

/**
 * Multi-vehicle aware API hook. Backed by a list + activeVehicleId
 * in the store; legacy `vehicle` field stays in sync for existing callers.
 */
export const useVehicleApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /** Backwards-compatible alias for fetchVehicles(). Returns active vehicle (or first). */
    const fetchVehicle = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const list = await vehicleService.getVehicles()
            useVehicleStore.getState().setVehicles(list)
            return useVehicleStore.getState().vehicle
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch vehicles'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchVehicles = fetchVehicle

    const createVehicle = useCallback(async (data: CreateVehicleRequest) => {
        setLoading(true)
        setError(null)
        try {
            const current = useVehicleStore.getState().vehicles
            if (current.length >= MAX_VEHICLES) throw new VehicleLimitError()

            const vehicle = await vehicleService.createVehicle(data)
            useVehicleStore.getState().setVehicle(vehicle)
            await vehicleService.setSelectedVehicle(vehicle.id)
            return vehicle
        } catch (err) {
            let message: string
            if (err instanceof VehicleLimitError) {
                message = `لا يمكنك إضافة أكثر من ${MAX_VEHICLES} مركبات`
            } else if (err instanceof ApiError) {
                message = err.message
            } else {
                message = 'Failed to create vehicle'
            }
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
            useVehicleStore.getState().setVehicle(vehicle)
            await vehicleService.setSelectedVehicle(vehicle.id)
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
            useVehicleStore.getState().removeVehicleById(id)
            const nextActive = useVehicleStore.getState().vehicle
            await vehicleService.setSelectedVehicle(nextActive?.id ?? null).catch(() => {})
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to delete vehicle'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const setActiveVehicle = useCallback(async (id: string) => {
        useVehicleStore.getState().setActiveVehicle(id)
        try {
            await vehicleService.setSelectedVehicle(id)
        } catch {
            // best-effort sync: local switch already applied
        }
    }, [])

    return {
        loading,
        error,
        fetchVehicle,
        fetchVehicles,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        setActiveVehicle,
    }
}
