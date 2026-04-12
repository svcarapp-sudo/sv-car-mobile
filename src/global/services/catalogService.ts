import {apiClient} from './ApiClient'
import {queryClient} from './queryClient'
import type {PartCategoryApi} from '@/global/types'

/** API response types for catalog endpoints */
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

/** Spring Data Page response shape */
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

/** Query key factory for catalog queries */
export const catalogKeys = {
    all: ['catalog'] as const,
    origins: () => [...catalogKeys.all, 'origins'] as const,
    makes: (originId?: number | null) => [...catalogKeys.all, 'makes', originId ?? 'all'] as const,
    models: (makeId: number) => [...catalogKeys.all, 'models', makeId] as const,
    partCategories: () => [...catalogKeys.all, 'part-categories'] as const,
}

/** Plain fetch functions — no caching, TanStack Query handles that */
export const catalogApi = {
    getOrigins: (): Promise<OriginApi[]> => apiClient.get<OriginApi[]>(`${CATALOG_PREFIX}/origins`),

    getMakes: async (originId?: number | null): Promise<MakeApi[]> => {
        const params: Record<string, string | number> = {page: 0, size: 200}
        if (originId != null) params.originId = originId
        const page = await apiClient.get<PageResponse<MakeApi>>(`${CATALOG_PREFIX}/makes`, {params})
        return page.content ?? []
    },

    getModels: async (makeId: number): Promise<ModelApi[]> => {
        const page = await apiClient.get<PageResponse<ModelApi>>(`${CATALOG_PREFIX}/models`, {
            params: {makeId, page: 0, size: 200},
        })
        return page.content ?? []
    },

    getPartCategories: (): Promise<PartCategoryApi[]> =>
        apiClient.get<PartCategoryApi[]>(`${CATALOG_PREFIX}/part-categories`),
}

/**
 * Fetch categories for mapping (categoryId → slug).
 * Uses queryClient.fetchQuery so it returns cached data if fresh.
 * Safe to call from services outside React.
 */
export async function getCategoriesForMapping(): Promise<Array<{id: number; slug: string}>> {
    try {
        const categories = await queryClient.fetchQuery({
            queryKey: catalogKeys.partCategories(),
            queryFn: catalogApi.getPartCategories,
        })
        return categories.map(c => ({id: c.id, slug: c.slug}))
    } catch {
        return []
    }
}
