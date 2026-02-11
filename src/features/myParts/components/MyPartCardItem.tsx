import {PartCard} from '@/global/components'
import {IconButton} from 'react-native-paper'
import {StyleSheet, View} from 'react-native'
import {usePartCategories} from '@/global/hooks'
import type {Part} from '@/global/types'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'
import {useTheme} from 'react-native-paper'

type MakeModelCache = Record<number, {name: string; logoUrl?: string | null}> & Record<string, {name: string}>

interface MyPartCardItemProps {
    part: Part
    navigation?: NavigationProp<RootStackParamList>
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
    makeModelCache?: MakeModelCache
}

export const MyPartCardItem = ({part, onEdit, onDelete, makeModelCache = {}}: MyPartCardItemProps) => {
    const theme = useTheme()
    const {getBySlug, categories} = usePartCategories()

    const makeInfo = part.makeId ? makeModelCache[part.makeId] : null
    const modelInfo = part.modelId ? makeModelCache[`model_${part.modelId}`] : null
    const categoryInfo = getBySlug(part.category) || categories.find(c => c.id === part.categoryId)

    return (
        <View style={styles.container}>
            <PartCard part={part} makeInfo={makeInfo} modelInfo={modelInfo} categoryInfo={categoryInfo} />
            <View style={styles.actions}>
                <IconButton
                    icon='pencil'
                    size={20}
                    iconColor={theme.colors.primary}
                    onPress={() => onEdit(part.id)}
                />
                <IconButton
                    icon='delete'
                    size={20}
                    iconColor={theme.colors.error}
                    onPress={() => onDelete(part.id, part.name)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginBottom: 12,
    },
    actions: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
    },
})
