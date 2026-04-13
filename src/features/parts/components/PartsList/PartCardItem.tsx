import {PartCard} from '../partCard'
import type {Part, PartCategoryApi} from '@/global/types'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

interface PartCardItemProps {
    part: Part
    navigation?: NavigationProp<RootStackParamList>
    categories?: PartCategoryApi[]
}

export const PartCardItem = ({part, navigation, categories = []}: PartCardItemProps) => {
    const categoryInfo = categories.find(c => c.slug === part.category) || categories.find(c => c.id === part.categoryId)

    return (
        <PartCard part={part} categoryInfo={categoryInfo} onPress={() => navigation?.navigate('PartDetail', {partId: part.id})} />
    )
}
