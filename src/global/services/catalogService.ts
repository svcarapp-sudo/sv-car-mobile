import {apiClient} from './ApiClient'
import {RequestCache} from '@/global/utils/requestCache'
import type {PartCategoryApi} from '@/global/types'

/** API response types for catalog endpoints (origins, makes, models) */
export interface OriginApi {
    id: number
    name: string
    sortOrder: number
    makeCount?: number
    modelCount?: number
}

export interface MakeApi {
    id: string
    name: string
    logoUrl?: string | null
    originCountry?: string | null
    originId?: number | null
    sortOrder: number
}

export interface ModelApi {
    id: string
    makeId: number
    name: string
    sortOrder: number
}

/** Spring Data Page response shape (VIA_DTO) */
export interface PageResponse<T> {
    content: T[]
    page: {
        totalElements: number
        totalPages: number
        size: number
        number: number
    }
}

const CATALOG_PREFIX = '/api/catalog'
const cache = new RequestCache(30)

export const catalogService = {
    async getOrigins(): Promise<OriginApi[]> {
        return cache.get('origins', () => apiClient.get<OriginApi[]>(`${CATALOG_PREFIX}/origins`))
    },

    async getMakes(originId?: number | null): Promise<MakeApi[]> {
        const key = `makes_${originId ?? 'all'}`
        return cache.get(key, async () => {
            const params: Record<string, string | number> = {page: 0, size: 200}
            if (originId != null) params.originId = originId
            const page = await apiClient.get<PageResponse<MakeApi>>(`${CATALOG_PREFIX}/makes`, {params})
            return page.content ?? []
        })
    },

    async getModels(makeId: number): Promise<ModelApi[]> {
        return cache.get(`models_${makeId}`, async () => {
            const page = await apiClient.get<PageResponse<ModelApi>>(`${CATALOG_PREFIX}/models`, {
                params: {makeId, page: 0, size: 200},
            })
            return page.content ?? []
        })
    },

    async getPartCategories(): Promise<PartCategoryApi[]> {
        return cache.get('part-categories', () =>
            apiClient.get<PartCategoryApi[]>(`${CATALOG_PREFIX}/part-categories`),
        )
    },

    /** Lightweight projection used by part mappers (categoryId → slug). */
    async getCategoriesForMapping(): Promise<Array<{id: number; slug: string}>> {
        try {
            const categories = await this.getPartCategories()
            return categories.map(c => ({id: c.id, slug: c.slug}))
        } catch {
            return []
        }
    },

    invalidateCache() {
        cache.invalidate()
    },
}
