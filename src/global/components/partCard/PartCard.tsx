import type {Part, PartCategoryApi} from '@/global/types'
import {formatPrice} from '@/global/utils'

import {PressableScale} from '../motion'
import {PartCardGrid} from './PartCardGrid'

interface PartCardProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
    onPress?: () => void
    accessibilityLabel?: string
}

export const PartCard = ({part, categoryInfo, onPress, accessibilityLabel}: PartCardProps) => {
    const content = <PartCardGrid part={part} categoryInfo={categoryInfo} />

    if (onPress) {
        return (
            <PressableScale
                onPress={onPress}
                scaleTo={0.97}
                accessibilityRole='button'
                accessibilityLabel={accessibilityLabel ?? `${part.name}، ${formatPrice(part.price)} ر.س`}>
                {content}
            </PressableScale>
        )
    }

    return content
}
