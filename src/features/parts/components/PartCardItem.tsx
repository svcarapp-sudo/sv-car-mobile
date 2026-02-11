import {PartCard} from '@/global/components'
import {usePartCategories} from '@/global/hooks'
import type {Part} from '@/global/types'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

type MakeModelCache = Record<number, {name: string; logoUrl?: string | null}> & Record<string, {name: string}>

interface PartCardItemProps {
    part: Part
    navigation?: NavigationProp<RootStackParamList>
    makeModelCache?: MakeModelCache
}

export const PartCardItem = ({part, navigation, makeModelCache = {}}: PartCardItemProps) => {
    const {getBySlug, categories} = usePartCategories()

    const makeInfo = part.makeId ? makeModelCache[part.makeId] : null
    const modelInfo = part.modelId ? makeModelCache[`model_${part.modelId}`] : null
    const categoryInfo = getBySlug(part.category) || categories.find(c => c.id === part.categoryId)

    return (
        <PartCard
            part={part}
            makeInfo={makeInfo}
            modelInfo={modelInfo}
            categoryInfo={categoryInfo}
            onPress={() => navigation?.navigate('PartDetail', {partId: part.id})}
            showStockStatus={true}
        />
    )
}
