import {useCallback} from 'react'

import type {Vehicle} from '@/shared/types'

import {useVehicleStore} from '../store'

export const useVehicles = () => {
    const {vehicle, setVehicle, removeVehicle, getVehicle} = useVehicleStore()

    const handleSetVehicle = useCallback(
        (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
            return setVehicle(vehicleData)
        },
        [setVehicle]
    )

    const handleRemoveVehicle = useCallback(() => {
        removeVehicle()
    }, [removeVehicle])

    return {
        vehicle,
        setVehicle: handleSetVehicle,
        removeVehicle: handleRemoveVehicle,
        getVehicle,
    }
}
