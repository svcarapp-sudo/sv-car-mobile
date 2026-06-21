import {useCallback, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native'
import {FAB} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import {FadeSlideIn, showToast, staggerDelay} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {haptics} from '@/global/utils'

import {useMyPartRequests} from '../../hooks'
import type {PartRequest, PartRequestStatus} from '../../types'
import {MyPartRequestCardItem} from './MyPartRequestCardItem'
import {MyPartRequestsDeleteDialog} from './MyPartRequestsDeleteDialog'
import {MyPartRequestsEmpty} from './MyPartRequestsEmpty'
import {MyPartRequestsFilters} from './MyPartRequestsFilters'
import {MyPartRequestsHeader} from './MyPartRequestsHeader'
import {MyPartRequestsSkeleton} from './MyPartRequestsSkeleton'

const T = {ADD: 'طلب جديد', DELETED: 'تم حذف الطلب', DELETE_ERROR: 'تعذر الحذف', STATUS_ERROR: 'تعذر تحديث حالة الطلب'}

interface MyPartRequestsListScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

interface PendingDelete {
    id: string
    title: string
}

export const MyPartRequestsListScreen = ({navigation}: MyPartRequestsListScreenProps) => {
    const theme = useAppTheme()
    const {visibleRequests, counts, statusFilter, setStatusFilter, loading, fetchMine, remove, setStatus} = useMyPartRequests()
    const [pending, setPending] = useState<PendingDelete | null>(null)
    const [deleting, setDeleting] = useState(false)

    const isInitialLoading = loading && counts.all === 0

    const goAdd = useCallback(() => navigation?.navigate('AddPartRequest'), [navigation])
    const goDetail = useCallback((id: string) => navigation?.navigate('PartRequestDetail', {requestId: id}), [navigation])
    const goBrowseAll = useCallback(() => navigation?.navigate('PartRequestsList'), [navigation])

    const handleConfirmDelete = async () => {
        if (!pending) return
        setDeleting(true)
        try {
            await remove(pending.id)
            setPending(null)
            showToast(T.DELETED, 'success')
        } catch {
            showToast(T.DELETE_ERROR, 'error')
        } finally {
            setDeleting(false)
        }
    }

    const handleStatusChange = useCallback(
        (id: string, status: PartRequestStatus) => {
            setStatus(id, status)
                .then(() => haptics.selection())
                .catch(() => showToast(T.STATUS_ERROR, 'error'))
        },
        [setStatus]
    )

    const renderItem = useCallback(
        ({item, index}: {item: PartRequest; index: number}) => (
            <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0}>
                <MyPartRequestCardItem
                    request={item}
                    onPress={() => goDetail(item.id)}
                    onDelete={() => setPending({id: item.id, title: item.title})}
                    onStatusChange={status => handleStatusChange(item.id, status)}
                />
            </FadeSlideIn>
        ),
        [goDetail, handleStatusChange]
    )

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={visibleRequests}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, visibleRequests.length === 0 && styles.emptyContent]}
                ListHeaderComponent={
                    <>
                        <MyPartRequestsHeader onBrowseAll={goBrowseAll} />
                        {counts.all > 0 ? (
                            <MyPartRequestsFilters status={statusFilter} counts={counts} onChange={setStatusFilter} />
                        ) : null}
                    </>
                }
                ListEmptyComponent={
                    isInitialLoading ? (
                        <MyPartRequestsSkeleton />
                    ) : (
                        <MyPartRequestsEmpty
                            isFiltered={statusFilter != null}
                            onAdd={goAdd}
                            onReset={() => setStatusFilter(null)}
                        />
                    )
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading && counts.all > 0}
                        onRefresh={fetchMine}
                        tintColor={theme.colors.tertiary}
                        colors={[theme.colors.tertiary]}
                        progressBackgroundColor={theme.colors.surface}
                    />
                }
                initialNumToRender={8}
                showsVerticalScrollIndicator={false}
            />
            <FAB
                icon='plus'
                label={T.ADD}
                style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                color={theme.colors.onPrimary}
                onPress={goAdd}
            />
            <MyPartRequestsDeleteDialog
                visible={pending != null}
                title={pending?.title}
                submitting={deleting}
                onCancel={() => setPending(null)}
                onConfirm={handleConfirmDelete}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {paddingTop: 6, paddingBottom: 96},
    emptyContent: {flexGrow: 1},
    fab: {position: 'absolute', margin: 16, end: 0, bottom: 0, borderRadius: 16},
})
