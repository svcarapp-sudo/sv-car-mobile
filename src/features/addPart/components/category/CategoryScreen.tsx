import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'

import {CategoryTileGrid} from '@/global/components'
import type {PartCategoryApi} from '@/global/types'

interface CategoryScreenProps {
    categories: PartCategoryApi[]
    loading: boolean
    valueId: number | null
    onSelect: (id: number, name: string) => void
    onNext: () => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    contentTopInset?: number
}

/** Add-Part category step: the shared CategoryTileGrid (same as Home), auto-advancing. */
export const CategoryScreen = ({
    categories,
    loading,
    valueId,
    onSelect,
    onNext,
    onScroll,
    contentTopInset = 0,
}: CategoryScreenProps) => {
    const handleSelect = (category: PartCategoryApi) => {
        onSelect(category.id, category.name)
        onNext()
    }

    return (
        <CategoryTileGrid
            categories={categories}
            selectedId={valueId}
            loading={loading}
            onSelect={handleSelect}
            onScroll={onScroll}
            contentTopInset={contentTopInset}
        />
    )
}
