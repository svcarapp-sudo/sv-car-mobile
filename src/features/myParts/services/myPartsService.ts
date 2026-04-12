import {apiClient} from '@/global/services'
import {catalogService} from '@/global/services/catalogService'
import {mapPartModelToPart, type PartModelResponse} from '@/global/utils/partMapper'
import type {CreatePartRequest, UpdatePartRequest, Part} from '@/global/types'

class MyPartsService {
    private readonly basePath = '/api/parts'

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

        const categories = await catalogService.getCategoriesForMapping()

        return response.parts.map(part => mapPartModelToPart(part, categories))
    }

    async createPart(data: CreatePartRequest): Promise<Part> {
        const response = await apiClient.post<PartModelResponse>(this.basePath, data)
        const categories = await catalogService.getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async updatePart(id: string, data: UpdatePartRequest): Promise<Part> {
        const response = await apiClient.patch<PartModelResponse>(`${this.basePath}/${id}`, data)
        const categories = await catalogService.getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async deletePart(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.basePath}/${id}`)
    }
}

export const myPartsService = new MyPartsService()
