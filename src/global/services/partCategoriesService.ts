import {apiClient} from './ApiClient'
import type {PartCategoryApi} from '@/global/types'

export const partCategoriesService = {
    async getPartCategories(): Promise<PartCategoryApi[]> {
        return apiClient.get<PartCategoryApi[]>('/api/catalog/part-categories')
    },
}
