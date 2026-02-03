import type {Vehicle} from '@/global/types'

/** Backend API: create vehicle payload */
export interface CreateVehicleRequest {
    makeId: number
    modelId: number
    year: number
    fuelType?: string | null
    engine?: string | null
    trim?: string | null
    vin?: string | null
    displayName?: string | null
}

/** Backend API: update vehicle payload */
export interface UpdateVehicleRequest {
    makeId: number
    modelId: number
    year: number
    fuelType?: string | null
    engine?: string | null
    trim?: string | null
    vin?: string | null
    displayName?: string | null
}

/** Backend API: single vehicle response */
export interface VehicleResponseDto {
    id: string
    makeId: number
    modelId: number
    makeName?: string | null
    modelName?: string | null
    makeLogoUrl?: string | null
    year: number
    fuelType?: string | null
    engine?: string | null
    trim?: string | null
    vin?: string | null
    displayName?: string | null
    createdAt?: number | null
}

/** @deprecated use VehicleResponseDto for API; Vehicle for app state */
export type VehicleResponse = Vehicle

export interface VehiclesListResponseDto {
    vehicles: VehicleResponseDto[]
    total: number
}

/** @deprecated use VehiclesListResponseDto */
export interface VehiclesListResponse {
    vehicles: Vehicle[]
    total: number
}

// Vehicle Option types
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

// API Error types
export interface VehicleApiError {
    message: string
    field?: string
}
