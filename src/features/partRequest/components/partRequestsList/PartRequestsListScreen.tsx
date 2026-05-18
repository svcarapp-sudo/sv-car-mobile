import {useCallback} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ActivityIndicator, FAB} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

import {usePartRequestsList} from '../../hooks'
import type {PartRequest} from '../../types'
import {PartRequestCardItem} from './PartRequestCardItem'
import {PartRequestsListEmpty} from './PartRequestsListEmpty'
import {PartRequestsListFilters} from './PartRequestsListFilters'
import {PartRequestsListHeader} from './PartRequestsListHeader'

const ARABIC_TEXT = {ADD_PART_REQUEST: 'انشر طلباً'}

interface PartRequestsListScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartRequestsListScreen = ({navigation}: PartRequestsListScreenProps) => {
    const theme = useAppTheme()
    const list = usePartRequestsList()

    const isFiltered = list.search.trim().length > 0 || list.status !== 'OPEN' || list.condition !== null

    const goDetail = useCallback((id: string) => navigation?.navigate('PartRequestDetail', {requestId: id}), [navigation])

    const goAdd = useCallback(() => navigation?.navigate('AddPartRequest'), [navigation])
    const goMyRequests = useCallback(() => navigation?.navigate('MyPartRequests'), [navigation])

    const resetFilters = useCallback(() => {
        list.setSearch('')
        list.setStatus('OPEN')
        list.setCondition(null)
    }, [list])

    const renderItem = useCallback(
        ({item}: {item: PartRequest}) => <PartRequestCardItem request={item} onPress={() => goDetail(item.id)} />,
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
                        <PartRequestsListFilters
                            status={list.status}
                            condition={list.condition}
                            onStatusChange={list.setStatus}
                            onConditionChange={list.setCondition}
                        />
                    </>
                }
                ListEmptyComponent={
                    <PartRequestsListEmpty
                        loading={list.loading && list.requests.length === 0}
                        isFiltered={isFiltered}
                        onAdd={goAdd}
                        onReset={resetFilters}
                    />
                }
                ListFooterComponent={
                    list.loadingMore ? (
                        <View style={styles.footer}>
                            <ActivityIndicator size='small' color={theme.colors.tertiary} />
                        </View>
                    ) : null
                }
                refreshing={list.loading && list.requests.length > 0}
                onRefresh={list.refresh}
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
    listContent: {paddingHorizontal: 16, paddingBottom: 96},
    emptyContent: {flexGrow: 1, paddingHorizontal: 0},
    footer: {paddingVertical: 20, alignItems: 'center'},
    fab: {position: 'absolute', margin: 16, end: 0, bottom: 0, borderRadius: 16},
})
