import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/global/storage'
import type {Vehicle} from '@/global/types'

/** Hard cap on how many vehicles a single user can own. */
export const MAX_VEHICLES = 4

interface VehicleState {
    /** All vehicles owned by the current user (capped at MAX_VEHICLES). */
    vehicles: Vehicle[]
    /** The id of the vehicle the app is currently scoped to. */
    activeVehicleId: string | null
    /** Backwards-compatible field: kept in sync with the active vehicle. */
    vehicle: Vehicle | null
}

interface VehicleActions {
    /** Replace the full list (e.g. after fetching from API). Preserves active selection when possible. */
    setVehicles: (vehicles: Vehicle[]) => void
    /** Set/update a single vehicle in the list. New entries become the active selection. */
    setVehicle: (vehicle: Vehicle | Omit<Vehicle, 'id' | 'createdAt'>) => Vehicle
    /** Switch the active vehicle. No-op if id is not in the list. */
    setActiveVehicle: (id: string | null) => void
    /** Remove a vehicle from the list. If it was active, promotes most recent of the rest. */
    removeVehicleById: (id: string) => void
    /** Wipe everything (logout). */
    removeVehicle: () => void
    /** Convenience selectors. */
    getVehicle: () => Vehicle | null
    getActiveVehicle: () => Vehicle | null
}

type VehicleStore = VehicleState & VehicleActions

const initialState: VehicleState = {
    vehicles: [],
    activeVehicleId: null,
    vehicle: null,
}

const pickActive = (vehicles: Vehicle[], preferredId: string | null): Vehicle | null => {
    if (vehicles.length === 0) return null
    if (preferredId) {
        const match = vehicles.find(v => v.id === preferredId)
        if (match) return match
    }
    const sorted = [...vehicles].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    return sorted[0]
}

const generateLocalId = () => `vehicle_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

export const useVehicleStore = create<VehicleStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            setVehicles: vehicles => {
                const capped = vehicles.slice(0, MAX_VEHICLES)
                const active = pickActive(capped, get().activeVehicleId)
                set({
                    vehicles: capped,
                    activeVehicleId: active?.id ?? null,
                    vehicle: active,
                })
            },

            setVehicle: vehicleData => {
                const hasId = 'id' in vehicleData && vehicleData.id
                const incoming: Vehicle = hasId
                    ? (vehicleData as Vehicle)
                    : {
                          ...vehicleData,
                          id: generateLocalId(),
                          displayName: vehicleData.displayName || `${vehicleData.make} ${vehicleData.model} ${vehicleData.year}`,
                          createdAt: Date.now(),
                      }

                const existing = get().vehicles
                const idx = existing.findIndex(v => v.id === incoming.id)
                let next: Vehicle[]
                if (idx >= 0) {
                    next = existing.slice()
                    next[idx] = incoming
                } else {
                    next = [...existing, incoming].slice(0, MAX_VEHICLES)
                }

                set({vehicles: next, activeVehicleId: incoming.id, vehicle: incoming})
                return incoming
            },

            setActiveVehicle: id => {
                const list = get().vehicles
                if (id === null) {
                    set({activeVehicleId: null, vehicle: null})
                    return
                }
                const match = list.find(v => v.id === id)
                if (!match) return
                set({activeVehicleId: id, vehicle: match})
            },

            removeVehicleById: id => {
                const remaining = get().vehicles.filter(v => v.id !== id)
                const wasActive = get().activeVehicleId === id
                const nextActive = wasActive ? pickActive(remaining, null) : get().vehicle
                set({
                    vehicles: remaining,
                    activeVehicleId: nextActive?.id ?? null,
                    vehicle: nextActive,
                })
            },

            removeVehicle: () => set({...initialState}),

            getVehicle: () => get().vehicle,
            getActiveVehicle: () => get().vehicle,
        }),
        {
            name: 'vehicle-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
        }
    )
)
