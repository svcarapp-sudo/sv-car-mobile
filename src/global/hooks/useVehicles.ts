import {useCallback} from 'react'

import type {Vehicle} from '@/global/types'

import {useVehicleStore} from '@/global/store'

export const useVehicles = () => {
    const {vehicle, setVehicle, removeVehicle, getVehicle} = useVehicleStore()

    const handleSetVehicle = useCallback(
        (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => setVehicle(vehicleData),
        [setVehicle]
    )

    const handleRemoveVehicle = useCallback(() => removeVehicle(), [removeVehicle])

    return {
        vehicle,
        setVehicle: handleSetVehicle,
        removeVehicle: handleRemoveVehicle,
        getVehicle,
    }
}
