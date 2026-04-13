import type {Vehicle} from '@/global/types'

// Re-export from global services for backward compatibility
export type {CreateVehicleRequest, UpdateVehicleRequest, VehicleResponseDto, VehiclesListResponseDto} from '@/global/services'

/** @deprecated use VehicleResponseDto for API; Vehicle for app state */
export type VehicleResponse = Vehicle

/** @deprecated use VehiclesListResponseDto */
export interface VehiclesListResponse {
    vehicles: Vehicle[]
    total: number
}

// Vehicle Option types (feature-specific, not in global)
export interface Manufacturer {
    name: string
    icon: string
    country?: string
}

export interface FuelType {
    id: string
    name: string
    icon: string
}

export interface VehicleOptionsResponse {
    manufacturers: Manufacturer[]
    fuelTypes: FuelType[]
    years: number[]
}

// API Error types (feature-specific)
export interface VehicleApiError {
    message: string
    field?: string
}
