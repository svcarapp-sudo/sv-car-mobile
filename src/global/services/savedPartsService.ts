import {apiClient} from './ApiClient'
import {getCategoriesForMapping} from './catalogService'
import {mapPartModelToPart, type PartModelResponse} from '@/global/utils/partMapper'
import type {Part} from '@/global/types'

interface SavedPartsListResponseDto {
    parts: PartModelResponse[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface SavedPartsPagedResult {
    parts: Part[]
    total: number
    page: number
    limit: number
    totalPages: number
}

const BASE = '/api/me/saved-parts'

class SavedPartsService {
    async getIds(): Promise<string[]> {
        const response = await apiClient.get<{ids: number[]}>(`${BASE}/ids`)
        return (response.ids ?? []).map(String)
    }

    async save(partId: string): Promise<void> {
        await apiClient.post<void>(`${BASE}/${partId}`)
    }

    async unsave(partId: string): Promise<void> {
        await apiClient.delete<void>(`${BASE}/${partId}`)
    }

    async getPaged(page: number, limit: number): Promise<SavedPartsPagedResult> {
        const response = await apiClient.get<SavedPartsListResponseDto>(BASE, {params: {page, limit}})
        const categories = await getCategoriesForMapping()
        return {
            parts: (response.parts ?? []).map(p => mapPartModelToPart(p, categories)),
            total: response.total,
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages,
        }
    }
}

export const savedPartsService = new SavedPartsService()
