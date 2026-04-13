import {TouchableOpacity} from 'react-native'
import {PartCardContent} from './PartCardContent'
import type {Part, PartCategoryApi} from '@/global/types'

interface PartCardProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
    onPress?: () => void
}

export const PartCard = ({part, categoryInfo, onPress}: PartCardProps) => {
    const content = <PartCardContent part={part} categoryInfo={categoryInfo} />

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        )
    }

    return content
}
