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

// API Error types
export interface VehicleApiError {
    message: string
    field?: string
}
