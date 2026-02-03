import {apiClient} from './ApiClient'
import type {
    PartCategory,
    Part,
    GetPartsRequest,
    CreatePartRequest,
    UpdatePartRequest,
    PartsListResponse,
    CompatibilityResponse,
} from '@/global/types'

class PartService {
    private readonly basePath = '/api/parts'

    async getParts(params?: GetPartsRequest): Promise<PartsListResponse> {
        const queryParams: Record<string, string | number> = {}

        if (params?.category) {
            queryParams.category = params.category
        }

        if (params?.search) {
            queryParams.search = params.search
        }

        if (params?.page) {
            queryParams.page = params.page
        }

        if (params?.limit) {
            queryParams.limit = params.limit
        }

        if (params?.sortBy) {
            queryParams.sortBy = params.sortBy
        }

        if (params?.sortOrder) {
            queryParams.sortOrder = params.sortOrder
        }

        return apiClient.get<PartsListResponse>(this.basePath, {params: queryParams})
    }

    async getPartsByCategory(category: PartCategory): Promise<Part[]> {
        const response = await this.getParts({category})

        return response.parts
    }

    async getPartById(id: string): Promise<Part> {
        return apiClient.get<Part>(`${this.basePath}/${id}`)
    }

    async createPart(data: CreatePartRequest): Promise<Part> {
        return apiClient.post<Part>(this.basePath, data)
    }

    async updatePart(id: string, data: UpdatePartRequest): Promise<Part> {
        return apiClient.patch<Part>(`${this.basePath}/${id}`, data)
    }

    async deletePart(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.basePath}/${id}`)
    }

    async checkCompatibility(partId: string): Promise<CompatibilityResponse> {
        return apiClient.post<CompatibilityResponse>(`${this.basePath}/${partId}/compatibility`, {})
    }

    async searchParts(query: string): Promise<Part[]> {
        const response = await this.getParts({search: query})

        return response.parts
    }
}

export const partService = new PartService()
