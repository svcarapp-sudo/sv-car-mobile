import {useState, useEffect, useCallback} from 'react'

import {partCategoriesService} from '@/global/services'
import type {PartCategoryApi} from '@/global/types'

export const usePartCategories = () => {
    const [categories, setCategories] = useState<PartCategoryApi[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCategories = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const list = await partCategoriesService.getPartCategories()
            setCategories(Array.isArray(list) ? list : [])
        } catch (err) {
            console.error('Failed to fetch part categories:', err)
            setCategories([])
            setError((err as Error)?.message ?? 'فشل تحميل الفئات')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const getBySlug = useCallback(
        (slug: string): PartCategoryApi | undefined => {
            return categories.find(c => c.slug === slug)
        },
        [categories]
    )

    return {
        categories,
        loading,
        error,
        getBySlug,
        refresh: fetchCategories,
    }
}
