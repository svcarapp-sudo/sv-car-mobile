import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/global/storage'
import type {Vehicle} from '@/global/types'

interface VehicleState {
    vehicle: Vehicle | null
}

interface VehicleActions {
    /** Set from API (full Vehicle) or from add form (omit id/createdAt, will be generated) */
    setVehicle: (vehicle: Vehicle | Omit<Vehicle, 'id' | 'createdAt'>) => Vehicle
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
                const hasId = 'id' in vehicleData && vehicleData.id
                const newVehicle: Vehicle = hasId
                    ? (vehicleData as Vehicle)
                    : {
                          ...vehicleData,
                          id: `vehicle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                          displayName:
                              vehicleData.displayName ||
                              `${vehicleData.make} ${vehicleData.model} ${vehicleData.year}`,
                          createdAt: Date.now(),
                      }
                set({vehicle: newVehicle})

                return newVehicle
            },
            removeVehicle: () => set({vehicle: null}),
            getVehicle: () => get().vehicle,
        }),
        {
            name: 'vehicle-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
        }
    )
)
