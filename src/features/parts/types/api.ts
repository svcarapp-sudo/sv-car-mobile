import type {Part, PartCategory} from '@/shared/types'

// Request types
export interface GetPartsRequest {
    category?: PartCategory
    // Note: vehicleId is not needed - backend automatically uses user's selected vehicle
    search?: string
    page?: number
    limit?: number
    sortBy?: 'price' | 'name' | 'rating'
    sortOrder?: 'asc' | 'desc'
}

export interface CreatePartRequest {
    name: string
    description?: string
    category: PartCategory
    price: number
    imageUrl?: string
    sku?: string
    brand?: string
    compatibleVehicles: {
        make: string
        model: string
        yearFrom?: number
        yearTo?: number
        engine?: string
        trim?: string
    }[]
    inStock?: boolean
    rating?: number
}

export interface UpdatePartRequest {
    name?: string
    description?: string
    category?: PartCategory
    price?: number
    imageUrl?: string
    sku?: string
    brand?: string
    compatibleVehicles?: {
        make: string
        model: string
        yearFrom?: number
        yearTo?: number
        engine?: string
        trim?: string
    }[]
    inStock?: boolean
    rating?: number
}

// Response types
export type PartResponse = Part

export interface PartsListResponse {
    parts: Part[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// Note: vehicleId is not needed - backend automatically uses user's selected vehicle
export interface CheckCompatibilityRequest {
    partId: string
}

export interface CompatibilityResponse {
    isCompatible: boolean
    exactMatch: boolean
    reason?: string
}

// API Error types
export interface PartApiError {
    message: string
    field?: string
}
