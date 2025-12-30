import type {Vehicle} from '@/shared/types'

// Request types
export interface CreateVehicleRequest {
    make: string
    model: string
    year: number
    engine?: string
    trim?: string
    displayName?: string
}

export interface UpdateVehicleRequest {
    make?: string
    model?: string
    year?: number
    engine?: string
    trim?: string
    displayName?: string
}

// Response types
export type VehicleResponse = Vehicle

export interface VehiclesListResponse {
    vehicles: Vehicle[]
    total: number
}

// Vehicle Option types
export interface Manufacturer {
    name: string
    icon: string
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

// API Error types
export interface VehicleApiError {
    message: string
    field?: string
}
