import {apiClient} from '@/global/services'
import {partService, mapPartModelToPart} from '@/global/services/partService'
import type {PartModelResponse} from '@/global/services/partService'
import {partCategoriesService} from '@/global/services/partCategoriesService'
import type {CreatePartRequest, UpdatePartRequest, Part} from '@/global/types'


class MyPartsService {
    private readonly basePath = '/api/parts'

    /**
     * Get all parts created by the current user
     * Uses the dedicated /my-parts endpoint
     */
    async getMyParts(): Promise<Part[]> {
        const response = await apiClient.get<{
            parts: PartModelResponse[]
            total: number
            page: number
            limit: number
            totalPages: number
        }>(`${this.basePath}/my-parts`, {
            params: {page: 0, limit: 1000},
        })

        // Fetch categories to map categoryId to slug
        const categories = await partCategoriesService.getPartCategories().catch(() => [])

        return response.parts.map(part =>
            mapPartModelToPart(
                part,
                categories.map(c => ({id: c.id, slug: c.slug})),
            ),
        )
    }

    /**
     * Create a new part
     */
    async createPart(data: CreatePartRequest): Promise<Part> {
        return partService.createPart(data)
    }

    /**
     * Update an existing part
     */
    async updatePart(id: string, data: UpdatePartRequest): Promise<Part> {
        return partService.updatePart(id, data)
    }

    /**
     * Delete a part
     */
    async deletePart(id: string): Promise<void> {
        return partService.deletePart(id)
    }
}

export const myPartsService = new MyPartsService()
