import {useCallback} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import {PartCard} from '@/global/components'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

import {useSavedPartsList} from '../hooks'
import {SavedPartsEmpty} from './SavedPartsEmpty'
import {SavedPartsHeader} from './SavedPartsHeader'

interface SavedPartsScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const SavedPartsScreen = ({navigation}: SavedPartsScreenProps) => {
    const {parts, total, loading, loadingMore, hasMore, loadMore, refresh} = useSavedPartsList()
    const {categories, getBySlug} = useCatalog()
    const theme = useAppTheme()

    const renderItem = useCallback(
        ({item}: {item: (typeof parts)[0]}) => (
            <View style={styles.gridItem}>
                <PartCard
                    part={item}
                    categoryInfo={getBySlug(item.category) ?? categories.find(c => c.id === item.categoryId)}
                    onPress={() => navigation?.navigate('PartDetail', {partId: item.id})}
                />
            </View>
        ),
        [navigation, getBySlug, categories]
    )

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={parts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                ListHeaderComponent={parts.length > 0 ? <SavedPartsHeader total={total} /> : null}
                contentContainerStyle={[styles.listContent, parts.length === 0 && styles.emptyContent]}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={refresh}
                onEndReached={hasMore ? loadMore : undefined}
                onEndReachedThreshold={0.4}
                ListEmptyComponent={
                    loading ? (
                        <View style={styles.loadingWrap}>
                            <ActivityIndicator size='large' color={theme.colors.tertiary} />
                        </View>
                    ) : (
                        <SavedPartsEmpty navigation={navigation} />
                    )
                }
                ListFooterComponent={
                    loadingMore ? (
                        <View style={styles.footer}>
                            <ActivityIndicator size='small' color={theme.colors.tertiary} />
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {paddingHorizontal: 16, paddingBottom: 28},
    emptyContent: {flexGrow: 1, paddingHorizontal: 0},
    gridRow: {gap: 0, marginHorizontal: -5, marginBottom: 10},
    gridItem: {flex: 1, paddingHorizontal: 5},
    loadingWrap: {flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 280},
    footer: {paddingVertical: 20, alignItems: 'center'},
})
