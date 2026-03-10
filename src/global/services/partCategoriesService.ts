import {apiClient} from './ApiClient'
import type {PartCategoryApi} from '@/global/types'

let cachedCategories: PartCategoryApi[] | null = null
let pendingRequest: Promise<PartCategoryApi[]> | null = null

export const partCategoriesService = {
    async getPartCategories(): Promise<PartCategoryApi[]> {
        if (cachedCategories) return cachedCategories

        // Deduplicate concurrent requests
        if (pendingRequest) return pendingRequest

        pendingRequest = apiClient
            .get<PartCategoryApi[]>('/api/catalog/part-categories')
            .then(result => {
                cachedCategories = result
                pendingRequest = null
                return result
            })
            .catch(err => {
                pendingRequest = null
                throw err
            })

        return pendingRequest
    },
}
