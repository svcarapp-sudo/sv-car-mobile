import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/shared/storage'
import type {Vehicle} from '@/shared/types'

interface VehicleState {
    vehicle: Vehicle | null
}

interface VehicleActions {
    setVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => Vehicle
    removeVehicle: () => void
    getVehicle: () => Vehicle | null
}

type VehicleStore = VehicleState & VehicleActions

const initialState: VehicleState = {
    vehicle: null,
}

export const useVehicleStore = create<VehicleStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            setVehicle: vehicleData => {
                const newVehicle: Vehicle = {
                    ...vehicleData,
                    id: `vehicle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    displayName: vehicleData.displayName || `${vehicleData.make} ${vehicleData.model} ${vehicleData.year}`,
                    createdAt: Date.now(),
                }
                set({vehicle: newVehicle})

                return newVehicle
            },
            removeVehicle: () => set({vehicle: null}),
            getVehicle: () => {
                return get().vehicle
            },
        }),
        {
            name: 'vehicle-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
        }
    )
)
