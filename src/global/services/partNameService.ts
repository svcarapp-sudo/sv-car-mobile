import {apiClient} from './ApiClient'

export interface PartNameSuggestion {
    id: number
    nameAr: string
    nameEn: string | null
    categoryId: number
}

const PART_NAMES_PREFIX = '/api/catalog/part-names'

export const partNameApi = {
    search: (q: string, categoryId?: number | null, limit = 10): Promise<PartNameSuggestion[]> => {
        const params: Record<string, string | number> = {limit}
        if (q) params.q = q
        if (categoryId != null) params.categoryId = categoryId
        return apiClient.get<PartNameSuggestion[]>(`${PART_NAMES_PREFIX}/search`, {params})
    },
}

export const partNameKeys = {
    all: ['part-names'] as const,
    search: (q: string, categoryId?: number | null) => [...partNameKeys.all, 'search', q, categoryId ?? 'any'] as const,
}
