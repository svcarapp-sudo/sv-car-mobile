import {CategoryTileGrid} from '@/global/components'
import type {PartCategoryApi} from '@/global/types'

interface CategoryStepProps {
    categories: PartCategoryApi[]
    selectedId: number | null
    onSelect: (id: number) => void
}

/** Category picker reusing the shared CategoryTileGrid (same look as Home). */
export const CategoryStep = ({categories, selectedId, onSelect}: CategoryStepProps) => (
    <CategoryTileGrid categories={categories} selectedId={selectedId} onSelect={category => onSelect(category.id)} />
)
