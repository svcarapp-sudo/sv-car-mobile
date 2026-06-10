import {useMemo, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {FAB} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {FadeSlideIn, showToast, staggerDelay} from '@/global/components'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {Part} from '@/global/types'

import {useMyParts} from '../../hooks/useMyParts'
import {useMyPartsFilters} from '../../hooks/useMyPartsFilters'
import {MyPartCardItem} from './MyPartCardItem'
import {MyPartsDeleteDialog} from './MyPartsDeleteDialog'
import {MyPartsFilterBar} from './MyPartsFilterBar'
import {MyPartsListEmpty} from './MyPartsListEmpty'
import {MyPartsListSkeleton} from './MyPartsListSkeleton'
import {MyPartsSearchBar} from './MyPartsSearchBar'
import {MyPartsStatsStrip} from './MyPartsStatsStrip'

const ARABIC_TEXT = {ADD_PART: 'إضافة قطعة', DELETED: 'تم حذف الإعلان', DELETE_ERROR: 'تعذر الحذف'}

interface MyPartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'MyParts'>
    navigation?: NavigationProp<RootStackParamList>
}

interface PendingDelete {
    id: string
    name: string
}

export const MyPartsListScreen = ({navigation}: MyPartsListScreenProps) => {
    const theme = useAppTheme()
    const {parts, loading, deletePart, fetchMyParts} = useMyParts()
    const {getBySlug, categories} = useCatalog()
    const filters = useMyPartsFilters(parts, categories)

    const [pending, setPending] = useState<PendingDelete | null>(null)
    const [deleting, setDeleting] = useState(false)

    const stats = useMemo(() => {
        const totalValue = parts.reduce((sum, p) => sum + p.price, 0)
        const cats = new Set(parts.map(p => p.categoryId).filter(Boolean) as number[])
        return {count: parts.length, totalValue, categoriesCount: cats.size}
    }, [parts])

    const getCategoryInfo = (part: Part) => {
        return getBySlug(part.category) || categories.find(c => c.id === part.categoryId) || null
    }

    const handleConfirmDelete = async () => {
        if (!pending) return
        setDeleting(true)
        try {
            await deletePart(pending.id)
            setPending(null)
            showToast(ARABIC_TEXT.DELETED, 'success')
        } catch {
            showToast(ARABIC_TEXT.DELETE_ERROR, 'error')
        } finally {
            setDeleting(false)
        }
    }

    const showToolbar = parts.length > 0
    const showEmpty = filters.filtered.length === 0

    const renderHeader = () => {
        if (!showToolbar) return null
        return (
            <View style={styles.header}>
                <MyPartsStatsStrip count={stats.count} totalValue={stats.totalValue} categoriesCount={stats.categoriesCount} />
                <MyPartsSearchBar value={filters.search} onChange={filters.setSearch} />
                <MyPartsFilterBar
                    categories={filters.availableCategories}
                    activeCategoryId={filters.activeCategoryId}
                    onSelectCategory={filters.setActiveCategoryId}
                    sort={filters.sort}
                    onChangeSort={filters.setSort}
                />
            </View>
        )
    }

    if (loading && parts.length === 0) {
        return (
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <MyPartsListSkeleton />
            </View>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={filters.filtered}
                renderItem={({item, index}) => (
                    <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0}>
                        <MyPartCardItem
                            part={item}
                            onEdit={id => navigation?.navigate('EditPart', {partId: id})}
                            onDelete={(id, name) => setPending({id, name})}
                            categoryInfo={getCategoryInfo(item)}
                        />
                    </FadeSlideIn>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, showEmpty && styles.emptyContent]}
                refreshing={loading}
                onRefresh={fetchMyParts}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <MyPartsListEmpty
                        loading={loading && parts.length === 0}
                        isFiltered={showToolbar && filters.isFiltered}
                        onResetFilters={filters.resetFilters}
                        navigation={navigation}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
            <FAB
                icon='plus'
                label={ARABIC_TEXT.ADD_PART}
                style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                color={theme.colors.onPrimary}
                onPress={() => navigation?.navigate('AddPart')}
            />
            <MyPartsDeleteDialog
                visible={pending != null}
                partName={pending?.name}
                submitting={deleting}
                onCancel={() => setPending(null)}
                onConfirm={handleConfirmDelete}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {padding: 16, paddingBottom: 92},
    emptyContent: {flexGrow: 1},
    header: {paddingTop: 4},
    fab: {position: 'absolute', margin: 16, end: 0, bottom: 0, borderRadius: 16},
})
