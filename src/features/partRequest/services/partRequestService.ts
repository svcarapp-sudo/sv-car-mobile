import {apiClient} from '@/global/services/ApiClient'

import type {
    CreatePartRequestPayload,
    UpdatePartRequestPayload,
    PartRequestListParams,
    PartRequestListResult,
    PartRequest,
    PartRequestApiResponse,
    PartRequestListApiResponse,
    PartRequestStatus,
} from '../types'

const BASE_PATH = '/api/part-requests'

const toTimestamp = (iso?: string | null): number | null => {
    if (!iso) return null
    const t = new Date(iso).getTime()
    return Number.isFinite(t) ? t : null
}

const mapApiToPartRequest = (api: PartRequestApiResponse): PartRequest => ({
    id: String(api.id),
    requesterUserId: api.requesterUserId,
    requesterName: api.requesterName ?? null,
    requesterCity: api.requesterCity ?? null,
    categoryId: api.categoryId,
    categorySlug: (api.categorySlug as PartRequest['categorySlug']) ?? null,
    categoryName: api.categoryName ?? null,
    makeId: api.makeId,
    makeName: api.makeName ?? null,
    modelId: api.modelId,
    modelName: api.modelName ?? null,
    year: api.year,
    title: api.title,
    description: api.description ?? null,
    budgetMin: api.budgetMin ?? null,
    budgetMax: api.budgetMax ?? null,
    conditionPreference: api.conditionPreference,
    contactPhone: api.contactPhone,
    city: api.city ?? null,
    status: api.status,
    imageUrls: api.imageUrls ?? [],
    expiresAt: toTimestamp(api.expiresAt),
    createdAt: toTimestamp(api.createdAt) ?? Date.now(),
    updatedAt: toTimestamp(api.updatedAt),
})

class PartRequestService {
    async list(params: PartRequestListParams = {}): Promise<PartRequestListResult> {
        const query: Record<string, string | number> = {}
        if (params.category) query.category = params.category
        if (params.status) query.status = params.status
        if (params.conditionPreference) query.conditionPreference = params.conditionPreference
        if (params.search) query.search = params.search
        if (params.makeId) query.makeId = params.makeId
        if (params.modelId) query.modelId = params.modelId
        if (params.year) query.year = params.year
        if (params.page != null) query.page = params.page
        if (params.limit != null) query.limit = params.limit

        const response = await apiClient.get<PartRequestListApiResponse>(BASE_PATH, {params: query})
        return {
            requests: response.requests.map(mapApiToPartRequest),
            total: response.total,
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages,
        }
    }

    async listMine(page = 0, limit = 50): Promise<PartRequestListResult> {
        const response = await apiClient.get<PartRequestListApiResponse>(`${BASE_PATH}/my-requests`, {
            params: {page, limit},
        })
        return {
            requests: response.requests.map(mapApiToPartRequest),
            total: response.total,
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages,
        }
    }

    async getById(id: string): Promise<PartRequest> {
        const response = await apiClient.get<PartRequestApiResponse>(`${BASE_PATH}/${id}`)
        return mapApiToPartRequest(response)
    }

    async create(payload: CreatePartRequestPayload): Promise<PartRequest> {
        const response = await apiClient.post<PartRequestApiResponse>(BASE_PATH, payload)
        return mapApiToPartRequest(response)
    }

    async update(id: string, payload: UpdatePartRequestPayload): Promise<PartRequest> {
        const response = await apiClient.patch<PartRequestApiResponse>(`${BASE_PATH}/${id}`, payload)
        return mapApiToPartRequest(response)
    }

    async updateStatus(id: string, status: PartRequestStatus): Promise<PartRequest> {
        const response = await apiClient.patch<PartRequestApiResponse>(`${BASE_PATH}/${id}/status`, {status})
        return mapApiToPartRequest(response)
    }

    async remove(id: string): Promise<void> {
        await apiClient.delete<void>(`${BASE_PATH}/${id}`)
    }
}

export const partRequestService = new PartRequestService()
