import {apiClient} from '@/global/services'

/** API response types for catalog endpoints (origins, makes, models) */
export interface OriginApi {
    id: number
    name: string
    makeCount?: number
    modelCount?: number
}

export interface MakeApi {
    id: string
    name: string
    logoUrl?: string | null
    originCountry?: string | null
    originId?: number | null
}

export interface ModelApi {
    id: string
    makeId: number
    name: string
}

/** Spring Data Page response shape */
export interface PageResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    size: number
    number: number
    first?: boolean
    last?: boolean
}

const CATALOG_PREFIX = '/api/catalog'

export const catalogService = {
    async getOrigins(): Promise<OriginApi[]> {
        return apiClient.get<OriginApi[]>(`${CATALOG_PREFIX}/origins`)
    },

    async getMakes(originId?: number | null): Promise<MakeApi[]> {
        const params: Record<string, string | number> = {page: 0, size: 200}

        if (originId != null) {
            params.originId = originId
        }

        const page = await apiClient.get<PageResponse<MakeApi>>(`${CATALOG_PREFIX}/makes`, {params})

        return page.content ?? []
    },

    async getModels(makeId: number): Promise<ModelApi[]> {
        const page = await apiClient.get<PageResponse<ModelApi>>(`${CATALOG_PREFIX}/models`, {
            params: {makeId, page: 0, size: 200},
        })

        return page.content ?? []
    },
}
