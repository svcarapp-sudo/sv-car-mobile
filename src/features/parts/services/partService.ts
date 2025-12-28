import {apiClient} from '@/shared/services'
import type {PartCategory} from '@/shared/types'

import type {
    Part,
    GetPartsRequest,
    CreatePartRequest,
    UpdatePartRequest,
    PartResponse,
    PartsListResponse,
    CompatibilityResponse,
} from '../types'

class PartService {
    private readonly basePath = '/parts'

    /**
     * Get parts with optional filtering
     * Backend automatically filters by user's selected vehicle
     */
    async getParts(params?: GetPartsRequest): Promise<PartsListResponse> {
        const queryParams: Record<string, string | number> = {}

        if (params?.category) {
            queryParams.category = params.category
        }

        // Note: vehicleId is not needed - backend automatically uses user's selected vehicle
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

    /**
     * Get parts by category
     * Backend automatically filters by user's selected vehicle
     */
    async getPartsByCategory(category: PartCategory): Promise<Part[]> {
        const response = await this.getParts({category})

        return response.parts
    }

    /**
     * Get a single part by ID
     * Backend automatically includes compatibility info for user's selected vehicle
     */
    async getPartById(id: string): Promise<Part> {
        return apiClient.get<PartResponse>(`${this.basePath}/${id}`)
    }

    /**
     * Create a new part (admin function)
     */
    async createPart(data: CreatePartRequest): Promise<Part> {
        return apiClient.post<PartResponse>(this.basePath, data)
    }

    /**
     * Update an existing part (admin function)
     */
    async updatePart(id: string, data: UpdatePartRequest): Promise<Part> {
        return apiClient.patch<PartResponse>(`${this.basePath}/${id}`, data)
    }

    /**
     * Delete a part (admin function)
     */
    async deletePart(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.basePath}/${id}`)
    }

    /**
     * Check if a part is compatible with user's selected vehicle
     * Backend automatically uses user's selected vehicle
     */
    async checkCompatibility(partId: string): Promise<CompatibilityResponse> {
        return apiClient.post<CompatibilityResponse>(`${this.basePath}/${partId}/compatibility`, {})
    }

    /**
     * Search parts by query string
     * Backend automatically filters by user's selected vehicle
     */
    async searchParts(query: string): Promise<Part[]> {
        const response = await this.getParts({search: query})

        return response.parts
    }
}

// Export singleton instance
export const partService = new PartService()
