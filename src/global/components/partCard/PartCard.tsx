import {TouchableOpacity} from 'react-native'

import type {Part, PartCategoryApi} from '@/global/types'

import {PartCardGrid} from './PartCardGrid'

interface PartCardProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
    onPress?: () => void
}

export const PartCard = ({part, categoryInfo, onPress}: PartCardProps) => {
    const content = <PartCardGrid part={part} categoryInfo={categoryInfo} />

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
                {content}
            </TouchableOpacity>
        )
    }

    return content
}
