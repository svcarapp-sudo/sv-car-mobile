import {useCallback} from 'react'
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native'
import {ActivityIndicator, FAB} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import {FadeSlideIn, staggerDelay} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

import {usePartRequestsList} from '../../hooks'
import type {PartRequest} from '../../types'
import {PartRequestCardItem} from './PartRequestCardItem'
import {PartRequestsListEmpty} from './PartRequestsListEmpty'
import {PartRequestsListFilters} from './PartRequestsListFilters'
import {PartRequestsListHeader} from './PartRequestsListHeader'
import {PartRequestsListSkeleton} from './PartRequestsListSkeleton'

const ARABIC_TEXT = {ADD_PART_REQUEST: 'انشر طلباً'}

interface PartRequestsListScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartRequestsListScreen = ({navigation}: PartRequestsListScreenProps) => {
    const theme = useAppTheme()
    const list = usePartRequestsList()

    const isFiltered = list.search.trim().length > 0 || list.condition !== null

    const goDetail = useCallback((id: string) => navigation?.navigate('PartRequestDetail', {requestId: id}), [navigation])

    const goAdd = useCallback(() => navigation?.navigate('AddPartRequest'), [navigation])
    const goMyRequests = useCallback(() => navigation?.navigate('MyPartRequests'), [navigation])

    const resetFilters = useCallback(() => {
        list.setSearch('')
        list.setCondition(null)
    }, [list])

    const renderItem = useCallback(
        ({item, index}: {item: PartRequest; index: number}) => (
            <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0}>
                <PartRequestCardItem request={item} onPress={() => goDetail(item.id)} />
            </FadeSlideIn>
        ),
        [goDetail]
    )

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={list.requests}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, list.requests.length === 0 && styles.emptyContent]}
                ListHeaderComponent={
                    <>
                        <PartRequestsListHeader
                            total={list.total}
                            search={list.search}
                            onSearchChange={list.setSearch}
                            onOpenMyRequests={goMyRequests}
                        />
                        <PartRequestsListFilters condition={list.condition} onConditionChange={list.setCondition} />
                    </>
                }
                ListEmptyComponent={
                    list.loading ? (
                        <PartRequestsListSkeleton />
                    ) : (
                        <PartRequestsListEmpty loading={false} isFiltered={isFiltered} onAdd={goAdd} onReset={resetFilters} />
                    )
                }
                ListFooterComponent={
                    list.loadingMore ? (
                        <View style={styles.footer}>
                            <ActivityIndicator size='small' color={theme.colors.tertiary} />
                        </View>
                    ) : null
                }
                refreshControl={
                    <RefreshControl
                        refreshing={list.loading && list.requests.length > 0}
                        onRefresh={list.refresh}
                        tintColor={theme.colors.tertiary}
                        colors={[theme.colors.tertiary]}
                        progressBackgroundColor={theme.colors.surface}
                    />
                }
                onEndReached={list.hasMore ? list.loadMore : undefined}
                onEndReachedThreshold={0.4}
                showsVerticalScrollIndicator={false}
            />
            <FAB
                icon='plus'
                label={ARABIC_TEXT.ADD_PART_REQUEST}
                style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                color={theme.colors.onPrimary}
                onPress={goAdd}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {paddingHorizontal: 12, paddingBottom: 96},
    emptyContent: {flexGrow: 1, paddingHorizontal: 0},
    footer: {paddingVertical: 20, alignItems: 'center'},
    fab: {position: 'absolute', margin: 16, end: 0, bottom: 0, borderRadius: 16},
})
