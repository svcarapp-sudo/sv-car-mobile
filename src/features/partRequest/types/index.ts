import type {PartCategory} from '@/global/types'

export type PartRequestStatus = 'OPEN' | 'FULFILLED' | 'CLOSED'

export type PartRequestCondition = 'NEW' | 'USED' | 'ANY'

export interface PartRequest {
    id: string
    requesterUserId: number
    requesterName?: string | null
    requesterCity?: string | null
    categoryId: number
    categorySlug?: PartCategory | null
    categoryName?: string | null
    makeId: number
    makeName?: string | null
    modelId: number
    modelName?: string | null
    year: number
    title: string
    description?: string | null
    budgetMin?: number | null
    budgetMax?: number | null
    conditionPreference: PartRequestCondition
    contactPhone: string
    city?: string | null
    status: PartRequestStatus
    imageUrls: string[]
    expiresAt?: number | null
    createdAt: number
    updatedAt?: number | null
}

export interface PartRequestApiResponse {
    id: number
    requesterUserId: number
    requesterName?: string | null
    requesterCity?: string | null
    categoryId: number
    categorySlug?: string | null
    categoryName?: string | null
    makeId: number
    makeName?: string | null
    modelId: number
    modelName?: string | null
    year: number
    title: string
    description?: string | null
    budgetMin?: number | null
    budgetMax?: number | null
    conditionPreference: PartRequestCondition
    contactPhone: string
    city?: string | null
    status: PartRequestStatus
    imageUrls?: string[] | null
    expiresAt?: string | null
    createdAt: string
    updatedAt?: string | null
}

export interface PartRequestListApiResponse {
    requests: PartRequestApiResponse[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface PartRequestListParams {
    category?: PartCategory | null
    status?: PartRequestStatus | null
    conditionPreference?: PartRequestCondition | null
    search?: string
    makeId?: number
    modelId?: number
    year?: number
    page?: number
    limit?: number
}

export interface CreatePartRequestPayload {
    categoryId: number
    makeId: number
    modelId: number
    year: number
    title: string
    description?: string
    budgetMin?: number
    budgetMax?: number
    conditionPreference: PartRequestCondition
    contactPhone: string
    city?: string
    imageUrls?: string[]
}

export type UpdatePartRequestPayload = Partial<CreatePartRequestPayload>

export interface PartRequestListResult {
    requests: PartRequest[]
    total: number
    page: number
    limit: number
    totalPages: number
}
