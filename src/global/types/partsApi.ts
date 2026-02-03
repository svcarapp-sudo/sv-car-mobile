import type {Part, PartCategory} from '@/global/types'

export interface GetPartsRequest {
    category?: PartCategory
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
    compatibleVehicles: {make: string; model: string; yearFrom?: number; yearTo?: number; engine?: string; trim?: string}[]
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
    compatibleVehicles?: {make: string; model: string; yearFrom?: number; yearTo?: number; engine?: string; trim?: string}[]
    inStock?: boolean
    rating?: number
}

export type PartResponse = Part

export interface PartsListResponse {
    parts: Part[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface CheckCompatibilityRequest {
    partId: string
}

export interface CompatibilityResponse {
    isCompatible: boolean
    exactMatch: boolean
    reason?: string
}

export interface PartApiError {
    message: string
    field?: string
}
