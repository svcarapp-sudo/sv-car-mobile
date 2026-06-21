import {useCallback, useMemo, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {FadeSlideIn, VehiclePickerSheet, staggerDelay, useVehiclePicker} from '@/global/components'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

import {useParts} from '../../hooks'
import {PartCardItem} from './PartCardItem'
import {PartsListEmpty} from './PartsListEmpty'
import {PartsListFilters} from './PartsListFilters'
import {PartsListHeader} from './PartsListHeader'
import {PartsListSkeleton} from './PartsListSkeleton'
import {PartsListSortSheet, SORT_LABELS, type SortOption} from './PartsListSortSheet'

interface PartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'PartsList'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListScreen = ({route, navigation}: PartsListScreenProps) => {
    const routeCategory = route?.params?.category ?? null
    const {parts, total, loading, loadingMore, search, setSearch, hasMore, loadMore, refresh} = useParts(routeCategory)
    const {getBySlug, categories} = useCatalog()
    const theme = useAppTheme()

    const [inStockOnly, setInStockOnly] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const [sort, setSort] = useState<SortOption>('newest')

    const goAddVehicle = () => navigation?.navigate('AddVehicle')
    const {openPicker, sheetProps} = useVehiclePicker(goAddVehicle)
    const categoryName = (routeCategory ? getBySlug(routeCategory)?.name : null) || routeCategory || null

    const visibleParts = useMemo(() => {
        let list = parts
        if (inStockOnly) list = list.filter(p => p.inStock)
        if (sort === 'price_asc') list = list.slice().sort((a, b) => a.price - b.price)
        if (sort === 'price_desc') list = list.slice().sort((a, b) => b.price - a.price)
        if (sort === 'name') list = list.slice().sort((a, b) => a.name.localeCompare(b.name))
        return list
    }, [parts, inStockOnly, sort])

    const renderItem = useCallback(
        ({item, index}: {item: (typeof parts)[0]; index: number}) => (
            <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0} style={styles.itemSlot}>
                <PartCardItem part={item} navigation={navigation} categories={categories} />
            </FadeSlideIn>
        ),
        [navigation, categories]
    )

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={visibleParts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                ListHeaderComponent={
                    <View style={styles.headerWrap}>
                        <PartsListHeader
                            categoryName={categoryName}
                            partsCount={total}
                            search={search}
                            onSearchChange={setSearch}
                            onChangeVehicle={openPicker}
                            onAddVehicle={goAddVehicle}
                        />
                        <PartsListFilters
                            inStockOnly={inStockOnly}
                            onToggleInStock={() => setInStockOnly(v => !v)}
                            onOpenSort={() => setSortOpen(true)}
                            sortLabel={SORT_LABELS[sort]}
                        />
                    </View>
                }
                contentContainerStyle={[styles.listContent, visibleParts.length === 0 && styles.emptyContent]}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={refresh}
                onEndReached={hasMore ? loadMore : undefined}
                onEndReachedThreshold={0.4}
                ListEmptyComponent={
                    loading ? (
                        <PartsListSkeleton />
                    ) : (
                        <PartsListEmpty loading={false} categoryName={categoryName} navigation={navigation} />
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

            <PartsListSortSheet visible={sortOpen} selected={sort} onSelect={setSort} onDismiss={() => setSortOpen(false)} />
            <VehiclePickerSheet {...sheetProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    headerWrap: {marginHorizontal: -16, marginBottom: 8},
    listContent: {paddingHorizontal: 16, paddingBottom: 28},
    emptyContent: {flexGrow: 1},
    gridRow: {gap: 0, marginHorizontal: -5, marginBottom: 10},
    itemSlot: {flex: 1},
    footer: {paddingVertical: 20, alignItems: 'center'},
})
