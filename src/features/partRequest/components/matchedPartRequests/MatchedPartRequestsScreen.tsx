import {useCallback, useEffect} from 'react'
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import {FadeSlideIn, showToast, staggerDelay} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {resetMainTo} from '@/global/navigation/navActions'
import type {RootStackParamList} from '@/global/navigation/types'

import {usePartRequestsMatched} from '../../hooks'
import type {PartRequest} from '../../types'
import {PartRequestCardItem} from '../partRequestsList/PartRequestCardItem'
import {PartRequestsListFilters} from '../partRequestsList/PartRequestsListFilters'
import {PartRequestsListSkeleton} from '../partRequestsList/PartRequestsListSkeleton'
import {MatchedRequestsEmpty} from './MatchedRequestsEmpty'
import {MatchedRequestsHeader} from './MatchedRequestsHeader'

const T = {REFRESH_ERROR: 'تعذر تحديث القائمة', SECTION: 'الطلبات المطابقة'}

interface MatchedPartRequestsScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const MatchedPartRequestsScreen = ({navigation}: MatchedPartRequestsScreenProps) => {
    const theme = useAppTheme()
    const list = usePartRequestsMatched()
    const hasSpecializations = list.specializations.length > 0

    const goDetail = useCallback((id: string) => navigation?.navigate('PartRequestDetail', {requestId: id}), [navigation])
    // MyAccount is a top-level section — reset to it so it's a clean root.
    const goSetup = useCallback(() => resetMainTo('MyAccount'), [])

    useEffect(() => {
        if (list.error && list.requests.length > 0) showToast(T.REFRESH_ERROR, 'error')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list.error])

    const renderItem = useCallback(
        ({item, index}: {item: PartRequest; index: number}) => (
            <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0}>
                <PartRequestCardItem request={item} onPress={() => goDetail(item.id)} />
            </FadeSlideIn>
        ),
        [goDetail]
    )

    const renderEmpty = () => {
        if (list.loading) return <PartRequestsListSkeleton />
        if (list.error && list.requests.length === 0) {
            return <MatchedRequestsEmpty mode='error' onSetup={goSetup} onRetry={list.refresh} />
        }
        if (!hasSpecializations) return <MatchedRequestsEmpty mode='setup' onSetup={goSetup} onRetry={list.refresh} />
        return <MatchedRequestsEmpty mode='none' onSetup={goSetup} onRetry={list.refresh} />
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={list.requests}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, list.requests.length === 0 && styles.emptyContent]}
                ListHeaderComponent={
                    hasSpecializations ? (
                        <>
                            <MatchedRequestsHeader
                                total={list.total}
                                specializations={list.specializations}
                                search={list.search}
                                onSearchChange={list.setSearch}
                            />
                            <PartRequestsListFilters
                                condition={list.condition}
                                onConditionChange={list.setCondition}
                                hasResults={list.requests.length > 0}
                                sectionLabel={T.SECTION}
                            />
                        </>
                    ) : null
                }
                ListEmptyComponent={renderEmpty()}
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
                initialNumToRender={8}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {paddingBottom: 28},
    emptyContent: {flexGrow: 1},
    footer: {paddingVertical: 20, alignItems: 'center'},
})
