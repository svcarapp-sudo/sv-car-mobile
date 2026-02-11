import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {useTheme} from 'react-native-paper'
import {useParts, useMakeModelCache} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {NavigationProp, RouteProp} from '@react-navigation/native'
import {PartCardItem} from './PartCardItem'
import {PartsListHeader} from './PartsListHeader'
import {PartsListEmpty} from './PartsListEmpty'

interface PartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'PartsList'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListScreen = ({route, navigation}: PartsListScreenProps) => {
    const {parts, selectedCategory, loading, getBySlug} = useParts()
    const theme = useTheme()
    const makeModelCache = useMakeModelCache({parts})

    const category = route?.params?.category ?? selectedCategory
    const categoryFromApi = category ? getBySlug(category) : null
    const categoryName = categoryFromApi?.name || category || null

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            {categoryName && <PartsListHeader categoryName={categoryName} partsCount={parts.length} />}
            <FlatList
                data={parts}
                renderItem={({item}) => <PartCardItem part={item} navigation={navigation} makeModelCache={makeModelCache} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                onRefresh={() => {
                    // Refresh handled by useParts hook
                }}
                ListEmptyComponent={<PartsListEmpty loading={loading} categoryName={categoryName} navigation={navigation} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
})
