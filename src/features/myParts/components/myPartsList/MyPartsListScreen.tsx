import {useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {FAB} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {showToast} from '@/global/components'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {Part} from '@/global/types'

import {useMyParts} from '../../hooks/useMyParts'
import {useMyPartsActions} from '../../hooks/useMyPartsActions'
import {useMyPartsFilters} from '../../hooks/useMyPartsFilters'
import {MyPartsBulkBar} from './MyPartsBulkBar'
import {MyPartsDeleteDialog} from './MyPartsDeleteDialog'
import {MyPartsListEmpty} from './MyPartsListEmpty'
import {MyPartsListHeader} from './MyPartsListHeader'
import {MyPartsListRow} from './MyPartsListRow'
import {MyPartsListSkeleton} from './MyPartsListSkeleton'

const T = {ADD_PART: 'إضافة قطعة', DELETED: 'تم حذف الإعلان', DELETE_ERROR: 'تعذر الحذف'}

interface MyPartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'MyParts'>
    navigation?: NavigationProp<RootStackParamList>
}

export const MyPartsListScreen = ({navigation}: MyPartsListScreenProps) => {
    const theme = useAppTheme()
    const mp = useMyParts()
    const {parts, loading, deletePart, fetchMyParts, selectionMode, selectedIds, toggleSelect, clearSelection} = mp
    const actions = useMyPartsActions(mp)
    const {getBySlug, categories} = useCatalog()
    const filters = useMyPartsFilters(parts, categories)

    const [pending, setPending] = useState<{id: string; name: string} | null>(null)
    const [deleting, setDeleting] = useState(false)

    const getCategoryInfo = (part: Part) => getBySlug(part.category) || categories.find(c => c.id === part.categoryId) || null

    const handleConfirmDelete = async () => {
        if (!pending) return
        setDeleting(true)
        try {
            await deletePart(pending.id)
            setPending(null)
            showToast(T.DELETED, 'success')
        } catch {
            showToast(T.DELETE_ERROR, 'error')
        } finally {
            setDeleting(false)
        }
    }

    const showToolbar = parts.length > 0
    const showEmpty = filters.filtered.length === 0

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
                    <MyPartsListRow
                        part={item}
                        index={index}
                        categoryInfo={getCategoryInfo(item)}
                        selectionMode={selectionMode}
                        selected={selectedIds.has(item.id)}
                        onEdit={id => navigation?.navigate('EditPart', {partId: id})}
                        onDelete={(id, name) => setPending({id, name})}
                        onMarkSold={actions.markSold}
                        onToggleHidden={actions.toggleHidden}
                        onToggleSelect={toggleSelect}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, showEmpty && styles.emptyContent]}
                refreshing={loading}
                onRefresh={fetchMyParts}
                ListHeaderComponent={showToolbar ? <MyPartsListHeader parts={parts} filters={filters} /> : null}
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
            {selectionMode ? (
                <MyPartsBulkBar
                    count={selectedIds.size}
                    busy={actions.bulkBusy}
                    onAction={actions.runBulkAction}
                    onClose={clearSelection}
                />
            ) : (
                <FAB
                    icon='plus'
                    label={T.ADD_PART}
                    style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                    color={theme.colors.onPrimary}
                    onPress={() => navigation?.navigate('AddPart')}
                />
            )}
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
    fab: {position: 'absolute', margin: 16, end: 0, bottom: 0, borderRadius: 16},
})
