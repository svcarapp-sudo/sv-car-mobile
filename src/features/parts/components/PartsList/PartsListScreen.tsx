import React, {useCallback, useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {ActivityIndicator, TextInput} from 'react-native-paper'
import {useCatalog, useAppTheme} from '@/global/hooks'
import {useParts} from '../../hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {NavigationProp, RouteProp} from '@react-navigation/native'
import {PartCardItem} from './PartCardItem'
import {PartsListHeader} from './PartsListHeader'
import {PartsListEmpty} from './PartsListEmpty'

const ARABIC_TEXT = {
    SEARCH_PLACEHOLDER: 'ابحث عن قطعة...',
}

const HEADER_HEIGHT = 110

interface PartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'PartsList'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListScreen = ({route, navigation}: PartsListScreenProps) => {
    const routeCategory = route?.params?.category ?? null
    const {parts, total, loading, loadingMore, search, setSearch, hasMore, loadMore, refresh} = useParts(routeCategory)
    const {getBySlug, categories} = useCatalog()
    const theme = useAppTheme()

    const categoryFromApi = routeCategory ? getBySlug(routeCategory) : null
    const categoryName = categoryFromApi?.name || routeCategory || null

    const scrollY = useRef(new Animated.Value(0)).current
    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp',
    })

    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})

    const renderItem = useCallback(
        ({item}: {item: (typeof parts)[0]}) => <PartCardItem part={item} navigation={navigation} categories={categories} />,
        [navigation, categories],
    )

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            {/* Collapsible header */}
            <Animated.View style={[styles.headerWrap, {transform: [{translateY: headerTranslate}], backgroundColor: theme.colors.background}]}>
                {categoryName && <PartsListHeader categoryName={categoryName} partsCount={total} />}
                <View style={styles.searchContainer}>
                    <TextInput
                        mode="outlined"
                        placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER}
                        value={search}
                        onChangeText={setSearch}
                        left={<TextInput.Icon icon="magnify" />}
                        right={search ? <TextInput.Icon icon="close" onPress={() => setSearch('')} /> : undefined}
                        style={styles.searchInput}
                        outlineStyle={[styles.searchOutline, {borderColor: theme.colors.outlineVariant}]}
                        dense
                    />
                </View>
            </Animated.View>

            <Animated.FlatList
                data={parts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, parts.length === 0 && styles.emptyContent]}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={refresh}
                onEndReached={hasMore ? loadMore : undefined}
                onEndReachedThreshold={0.4}
                onScroll={onScroll}
                scrollEventThrottle={16}
                ListEmptyComponent={<PartsListEmpty loading={loading} categoryName={categoryName} navigation={navigation} />}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={styles.footer}>
                            <ActivityIndicator size="small" color={theme.colors.primary} />
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    headerWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    searchContainer: {paddingHorizontal: 16, paddingTop: 4, paddingBottom: 8},
    searchInput: {fontSize: 14},
    searchOutline: {borderRadius: 12},
    listContent: {paddingHorizontal: 16, paddingTop: HEADER_HEIGHT, paddingBottom: 24},
    emptyContent: {flexGrow: 1},
    footer: {paddingVertical: 20, alignItems: 'center'},
})
