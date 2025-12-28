import {useCallback} from 'react'

import type {Vehicle} from '@/shared/types'

import {useVehicleStore} from '../store'

export const useVehicles = () => {
    const {
        vehicles,
        selectedVehicleId,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        selectVehicle,
        getSelectedVehicle,
        getVehicleById,
    } = useVehicleStore()

    const selectedVehicle = selectedVehicleId ? getSelectedVehicle() : null

    const handleAddVehicle = useCallback(
        (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
            return addVehicle(vehicleData)
        },
        [addVehicle]
    )

    const handleUpdateVehicle = useCallback(
        (id: string, updates: Partial<Vehicle>) => {
            updateVehicle(id, updates)
        },
        [updateVehicle]
    )

    const handleDeleteVehicle = useCallback(
        (id: string) => {
            deleteVehicle(id)
        },
        [deleteVehicle]
    )

    const handleSelectVehicle = useCallback(
        (id: string | null) => {
            selectVehicle(id)
        },
        [selectVehicle]
    )

    return {
        vehicles,
        selectedVehicle,
        selectedVehicleId,
        addVehicle: handleAddVehicle,
        updateVehicle: handleUpdateVehicle,
        deleteVehicle: handleDeleteVehicle,
        selectVehicle: handleSelectVehicle,
        getVehicleById,
    }
}
