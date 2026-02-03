import {useEffect, useState, useCallback} from 'react'

import type {PartCategory, Part} from '@/global/types'

import {partService} from '@/global/services'
import {usePartsStore} from '@/global/store'

export const useParts = () => {
    const {parts, selectedCategory, selectCategory, setParts} = usePartsStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchParts = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await partService.getParts({
                    category: selectedCategory || undefined,
                })
                setParts(response.parts)
            } catch (err) {
                setError((err as Error).message || 'Failed to fetch parts')
                setParts([])
            } finally {
                setLoading(false)
            }
        }
        fetchParts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory])

    const handleSelectCategory = useCallback(
        async (category: PartCategory | null) => {
            selectCategory(category)
            setLoading(true)
            setError(null)
            try {
                const response = await partService.getParts({
                    category: category || undefined,
                })
                setParts(response.parts)
            } catch (err) {
                setError((err as Error).message || 'Failed to fetch parts')
            } finally {
                setLoading(false)
            }
        },
        [selectCategory, setParts]
    )

    const getCategoryParts = useCallback(async (category: PartCategory): Promise<Part[]> => {
        try {
            return await partService.getPartsByCategory(category)
        } catch (err) {
            setError((err as Error).message || 'Failed to fetch parts by category')

            return []
        }
    }, [])

    return {
        parts,
        selectedCategory,
        loading,
        error,
        selectCategory: handleSelectCategory,
        getCategoryParts,
    }
}
