import {StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import type {RootStackParamList} from '@/global/navigation/types'
import type {Part, PartCategoryApi} from '@/global/types'

import {PartCard} from '@/global/components'

interface PartCardItemProps {
    part: Part
    navigation?: NavigationProp<RootStackParamList>
    categories?: PartCategoryApi[]
}

export const PartCardItem = ({part, navigation, categories = []}: PartCardItemProps) => {
    const categoryInfo = categories.find(c => c.slug === part.category) || categories.find(c => c.id === part.categoryId)

    return (
        <View style={styles.gridItem}>
            <PartCard
                part={part}
                categoryInfo={categoryInfo}
                onPress={() => navigation?.navigate('PartDetail', {partId: part.id})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {flex: 1, paddingHorizontal: 5},
})
