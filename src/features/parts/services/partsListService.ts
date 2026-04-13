import {apiClient} from '@/global/services/ApiClient'
import {getCategoriesForMapping} from '@/global/services/catalogService'
import {mapPartModelToPart, type PartModelResponse} from '@/global/utils/partMapper'
import {useVehicleStore} from '@/global/store'
import type {GetPartsRequest, PartsListResponse, CreatePartRequest, UpdatePartRequest, Part, PartCategory} from '@/global/types'

class PartsListService {
    private readonly basePath = '/api/parts'

    private getVehicleParams(): {makeId?: number; modelId?: number; year?: number} {
        const vehicle = useVehicleStore.getState().vehicle
        if (!vehicle) return {}
        return {
            makeId: vehicle.makeId,
            modelId: vehicle.modelId,
            year: vehicle.year,
        }
    }

    async getParts(params?: GetPartsRequest): Promise<PartsListResponse> {
        const vehicleParams = this.getVehicleParams()
        const queryParams: Record<string, string | number> = {}

        if (vehicleParams.makeId) queryParams.makeId = vehicleParams.makeId
        if (vehicleParams.modelId) queryParams.modelId = vehicleParams.modelId
        if (vehicleParams.year) queryParams.year = vehicleParams.year

        if (params?.category) queryParams.category = params.category
        if (params?.search) queryParams.search = params.search
        if (params?.page != null) queryParams.page = params.page
        if (params?.limit != null) queryParams.limit = params.limit
        if (params?.sortBy) queryParams.sortBy = params.sortBy
        if (params?.sortOrder) queryParams.sortOrder = params.sortOrder

        const response = await apiClient.get<{
            parts: PartModelResponse[]
            total: number
            page: number
            limit: number
            totalPages: number
        }>(this.basePath, {params: queryParams})

        const categories = await getCategoriesForMapping()

        return {
            parts: response.parts.map(part => mapPartModelToPart(part, categories)),
            total: response.total,
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages,
        }
    }

    async getPartsByCategory(category: PartCategory): Promise<Part[]> {
        const response = await this.getParts({category})
        return response.parts
    }

    async getPartById(id: string): Promise<Part> {
        const response = await apiClient.get<PartModelResponse>(`${this.basePath}/${id}`)
        const categories = await getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async searchParts(query: string): Promise<Part[]> {
        const response = await this.getParts({search: query})
        return response.parts
    }

    async createPart(data: CreatePartRequest): Promise<Part> {
        const response = await apiClient.post<PartModelResponse>(this.basePath, data)
        const categories = await getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async updatePart(id: string, data: UpdatePartRequest): Promise<Part> {
        const response = await apiClient.patch<PartModelResponse>(`${this.basePath}/${id}`, data)
        const categories = await getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async deletePart(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.basePath}/${id}`)
    }
}

export const partsListService = new PartsListService()
