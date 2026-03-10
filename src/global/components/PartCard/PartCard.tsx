import {TouchableOpacity} from 'react-native'
import {PartCardContent} from './PartCardContent'
import type {Part, PartCategoryApi} from '@/global/types'

interface PartCardProps {
    part: Part
    makeInfo?: {name: string; logoUrl?: string | null} | null
    modelInfo?: {name: string} | null
    categoryInfo?: PartCategoryApi | null
    onPress?: () => void
    showActions?: boolean
    onEdit?: () => void
    onDelete?: () => void
    showStockStatus?: boolean
}

export const PartCard = ({part, makeInfo, modelInfo, categoryInfo, onPress, showStockStatus = false}: PartCardProps) => {
    const content = (
        <PartCardContent
            part={part}
            makeInfo={makeInfo}
            modelInfo={modelInfo}
            categoryInfo={categoryInfo}
            showStockStatus={showStockStatus}
        />
    )

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        )
    }

    return content
}
