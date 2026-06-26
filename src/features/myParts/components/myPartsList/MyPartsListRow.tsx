import {FadeSlideIn, staggerDelay} from '@/global/components'
import type {Part, PartCategoryApi} from '@/global/types'

import {MyPartCardItem} from './MyPartCardItem'

interface MyPartsListRowProps {
    part: Part
    index: number
    categoryInfo: PartCategoryApi | null
    selectionMode: boolean
    selected: boolean
    onEdit: (id: string) => void
    onDelete: (id: string, name: string) => void
    onMarkSold: (id: string) => void
    onToggleHidden: (part: Part) => void
    onToggleSelect: (id: string) => void
}

export const MyPartsListRow = ({part, index, ...rest}: MyPartsListRowProps) => (
    <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0}>
        <MyPartCardItem part={part} {...rest} onLongPress={rest.onToggleSelect} />
    </FadeSlideIn>
)
