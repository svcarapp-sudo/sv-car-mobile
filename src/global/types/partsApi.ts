import type {Part, PartCategory} from '@/global/types'

export interface GetPartsRequest {
    category?: PartCategory
    search?: string
    page?: number
    limit?: number
    sortBy?: 'price' | 'name' | 'rating'
    sortOrder?: 'asc' | 'desc'
}

export interface CompatibilityInput {
    makeId: number
    modelId: number
    yearFrom: number
    yearTo: number
}

export interface CreatePartRequest {
    compatibilities: CompatibilityInput[]
    categoryId: number
    name: string
    description?: string
    price: number
    imageUrl?: string
    sku?: string
}

export interface UpdatePartRequest {
    compatibilities?: CompatibilityInput[]
    categoryId?: number
    name?: string
    description?: string
    price?: number
    imageUrl?: string
    sku?: string
}

export type PartResponse = Part

export interface PartsListResponse {
    parts: Part[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface PartApiError {
    message: string
    field?: string
}
