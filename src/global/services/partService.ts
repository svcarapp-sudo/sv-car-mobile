import {apiClient} from './ApiClient'
import {partCategoriesService} from './partCategoriesService'
import type {
    PartCategory,
    Part,
    GetPartsRequest,
    CreatePartRequest,
    UpdatePartRequest,
    PartsListResponse,
    CompatibilityResponse,
} from '@/global/types'

/** Backend PartModel response (matches PartModel from backend) */
export interface PartModelResponse {
    id: number
    sellerUserId: number
    makeId: number
    modelId: number
    year: number
    categoryId?: number
    name: string
    description?: string | null
    price: number
    imageUrl?: string | null
    sku?: string | null
    createdAt?: string | number
    updatedAt?: string | number
}

/**
 * Maps backend PartModel response to mobile Part type
 */
export function mapPartModelToPart(
    model: PartModelResponse,
    categories?: Array<{id: number; slug: string}>,
): Part {
    // Find category slug by categoryId
    let categorySlug: PartCategory = 'other'
    if (model.categoryId && categories) {
        const category = categories.find(c => c.id === model.categoryId)
        if (category) {
            categorySlug = category.slug as PartCategory
        }
    }

    return {
        id: String(model.id),
        name: model.name,
        description: model.description || undefined,
        category: categorySlug,
        categoryId: model.categoryId,
        price: typeof model.price === 'number' ? model.price : parseFloat(String(model.price)),
        imageUrl: model.imageUrl || undefined,
        sku: model.sku || undefined,
        brand: undefined, // Backend doesn't have brand
        makeId: model.makeId,
        modelId: model.modelId,
        year: model.year,
        compatibleVehicles: [
            {
                make: '', // Would need to fetch make name separately
                model: '', // Would need to fetch model name separately
                yearFrom: model.year,
                yearTo: model.year,
            },
        ],
        inStock: true, // Default to true since backend doesn't track stock
        rating: undefined,
    }
}

class PartService {
    private readonly basePath = '/api/parts'
    private categoriesCache: Array<{id: number; slug: string}> | null = null

    private async getCategoriesForMapping(): Promise<Array<{id: number; slug: string}>> {
        if (this.categoriesCache) {
            return this.categoriesCache
        }
        try {
            const categories = await partCategoriesService.getPartCategories()
            this.categoriesCache = categories.map(c => ({id: c.id, slug: c.slug}))
            return this.categoriesCache
        } catch {
            return []
        }
    }

    async getParts(params?: GetPartsRequest): Promise<PartsListResponse> {
        const queryParams: Record<string, string | number> = {}

        if (params?.category) {
            queryParams.category = params.category
        }

        if (params?.search) {
            queryParams.search = params.search
        }

        if (params?.page != null) {
            queryParams.page = params.page
        }

        if (params?.limit != null) {
            queryParams.limit = params.limit
        }

        if (params?.sortBy) {
            queryParams.sortBy = params.sortBy
        }

        if (params?.sortOrder) {
            queryParams.sortOrder = params.sortOrder
        }

        const response = await apiClient.get<{
            parts: PartModelResponse[]
            total: number
            page: number
            limit: number
            totalPages: number
        }>(this.basePath, {params: queryParams})

        // Fetch categories to map categoryId to slug
        const categories = await this.getCategoriesForMapping()

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
        const categories = await this.getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async createPart(data: CreatePartRequest): Promise<Part> {
        const response = await apiClient.post<PartModelResponse>(this.basePath, data)
        const categories = await this.getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
    }

    async updatePart(id: string, data: UpdatePartRequest): Promise<Part> {
        const response = await apiClient.patch<PartModelResponse>(`${this.basePath}/${id}`, data)
        const categories = await this.getCategoriesForMapping()
        return mapPartModelToPart(response, categories)
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
