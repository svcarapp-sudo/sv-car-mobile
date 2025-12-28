import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

import type {Vehicle} from '@/shared/types'

interface VehicleState {
    vehicles: Vehicle[]
    selectedVehicleId: string | null
}

interface VehicleActions {
    addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => Vehicle
    updateVehicle: (id: string, updates: Partial<Vehicle>) => void
    deleteVehicle: (id: string) => void
    selectVehicle: (id: string | null) => void
    getSelectedVehicle: () => Vehicle | null
    getVehicleById: (id: string) => Vehicle | null
}

type VehicleStore = VehicleState & VehicleActions

const initialState: VehicleState = {
    vehicles: [],
    selectedVehicleId: null,
}

export const useVehicleStore = create<VehicleStore>()(
    devtools(
        persist(
            set => ({
                ...initialState,
                addVehicle: vehicleData => {
                    const newVehicle: Vehicle = {
                        ...vehicleData,
                        id: `vehicle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        displayName: vehicleData.displayName || `${vehicleData.make} ${vehicleData.model} ${vehicleData.year}`,
                        createdAt: Date.now(),
                    }
                    set(
                        state => ({
                            vehicles: [...state.vehicles, newVehicle],
                            selectedVehicleId: state.selectedVehicleId || newVehicle.id,
                        }),
                        false,
                        'addVehicle'
                    )

                    return newVehicle
                },
                updateVehicle: (id, updates) =>
                    set(
                        state => ({
                            vehicles: state.vehicles.map(v =>
                                v.id === id
                                    ? {
                                          ...v,
                                          ...updates,
                                          displayName:
                                              updates.displayName ||
                                              `${updates.make || v.make} ${updates.model || v.model} ${updates.year || v.year}`,
                                      }
                                    : v
                            ),
                        }),
                        false,
                        'updateVehicle'
                    ),
                deleteVehicle: id =>
                    set(
                        state => {
                            const newVehicles = state.vehicles.filter(v => v.id !== id)

                            let newSelectedId = state.selectedVehicleId

                            if (state.selectedVehicleId === id) {
                                newSelectedId = newVehicles.length > 0 ? newVehicles[0].id : null
                            }

                            return {
                                vehicles: newVehicles,
                                selectedVehicleId: newSelectedId,
                            }
                        },
                        false,
                        'deleteVehicle'
                    ),
                selectVehicle: id => set({selectedVehicleId: id}, false, 'selectVehicle'),
                getSelectedVehicle: (): Vehicle | null => {
                    // Access state directly to avoid circular reference
                    const currentState = useVehicleStore.getState()

                    if (!currentState.selectedVehicleId) {
                        return null
                    }

                    return currentState.vehicles.find((v: Vehicle) => v.id === currentState.selectedVehicleId) || null
                },
                getVehicleById: (id: string): Vehicle | null => {
                    // Access state directly to avoid circular reference
                    const currentState = useVehicleStore.getState()

                    return currentState.vehicles.find((v: Vehicle) => v.id === id) || null
                },
            }),
            {
                name: 'vehicle-storage',
                partialize: state => ({
                    vehicles: state.vehicles,
                    selectedVehicleId: state.selectedVehicleId,
                }),
            }
        ),
        {name: 'VehicleStore'}
    )
)
