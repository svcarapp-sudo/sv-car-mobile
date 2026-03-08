import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, TextInput} from 'react-native-paper'
import {useParts, usePartCategories, useMakeModelCache, useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {NavigationProp, RouteProp} from '@react-navigation/native'
import {PartCardItem} from './PartCardItem'
import {PartsListHeader} from './PartsListHeader'
import {PartsListEmpty} from './PartsListEmpty'

const ARABIC_TEXT = {
    SEARCH_PLACEHOLDER: 'ابحث عن قطعة...',
}

interface PartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'PartsList'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListScreen = ({route, navigation}: PartsListScreenProps) => {
    const {parts, total, selectedCategory, loading, loadingMore, search, setSearch, hasMore, loadMore, refresh} = useParts()
    const {getBySlug} = usePartCategories()
    const theme = useAppTheme()
    const makeModelCache = useMakeModelCache({parts})

    const category = route?.params?.category ?? selectedCategory
    const categoryFromApi = category ? getBySlug(category) : null
    const categoryName = categoryFromApi?.name || category || null

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            {categoryName && <PartsListHeader categoryName={categoryName} partsCount={total} />}

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    mode='outlined'
                    placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER}
                    value={search}
                    onChangeText={setSearch}
                    left={<TextInput.Icon icon='magnify' />}
                    right={search ? <TextInput.Icon icon='close' onPress={() => setSearch('')} /> : undefined}
                    style={styles.searchInput}
                    outlineStyle={styles.searchOutline}
                    dense
                />
            </View>

            <FlatList
                data={parts}
                renderItem={({item}) => <PartCardItem part={item} navigation={navigation} makeModelCache={makeModelCache} />}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, parts.length === 0 && styles.emptyContent]}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={refresh}
                onEndReached={hasMore ? loadMore : undefined}
                onEndReachedThreshold={0.4}
                ListEmptyComponent={<PartsListEmpty loading={loading} categoryName={categoryName} navigation={navigation} />}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={styles.footer}>
                            <ActivityIndicator size='small' color={theme.colors.primary} />
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    searchInput: {
        fontSize: 14,
    },
    searchOutline: {
        borderRadius: 12,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 24,
    },
    emptyContent: {
        flexGrow: 1,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
})
