import {StyleSheet, View} from 'react-native'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {MyPartCardBody} from './MyPartCardBody'
import {MyPartCardActions} from './MyPartCardActions'
import type {Part, PartCategoryApi} from '@/global/types'

interface MakeInfo {
    name: string
    logoUrl?: string | null
}
interface ModelInfo {
    name: string
}

type MakeModelCache = Record<number, MakeInfo> & Record<string, ModelInfo>

interface MyPartCardItemProps {
    part: Part
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
    makeModelCache?: MakeModelCache
    categoryInfo?: PartCategoryApi | null
}

export const MyPartCardItem = ({part, onEdit, onDelete, makeModelCache = {}, categoryInfo}: MyPartCardItemProps) => {
    const theme = useAppTheme()

    const makeInfo = part.makeId ? (makeModelCache[part.makeId] as MakeInfo | undefined) : null
    const modelInfo = part.modelId ? (makeModelCache[`model_${part.modelId}`] as ModelInfo | undefined) : null
    const vehicleLabel = [makeInfo?.name, modelInfo?.name, part.year].filter(Boolean).join(' ')

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <MyPartCardBody
                imageUrl={part.imageUrl}
                name={part.name}
                price={part.price}
                vehicleLabel={vehicleLabel}
                makeLogoUrl={makeInfo?.logoUrl}
                categoryInfo={categoryInfo}
            />
            <MyPartCardActions
                partId={part.id}
                partName={part.name}
                sku={part.sku}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
})
