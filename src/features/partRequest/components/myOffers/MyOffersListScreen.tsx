import {useCallback, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import type {NavigationProp} from '@react-navigation/native'

import {FadeSlideIn, showToast, staggerDelay} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {Offer} from '@/global/types'
import {haptics} from '@/global/utils'

import {useMyOffers} from '../../hooks'
import {MyOfferCardItem} from './MyOfferCardItem'
import {MyOffersEmpty} from './MyOffersEmpty'
import {MyOffersSkeleton} from './MyOffersSkeleton'

const T = {WITHDRAWN: 'تم سحب العرض', WITHDRAW_ERROR: 'تعذّر سحب العرض'}

export const MyOffersListScreen = () => {
    const theme = useAppTheme()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const {offers, loading, reload, withdraw} = useMyOffers()
    const [withdrawingId, setWithdrawingId] = useState<number | null>(null)

    const goDetail = useCallback(
        (offer: Offer) => navigation.navigate('PartRequestDetail', {requestId: String(offer.partRequestId)}),
        [navigation]
    )

    const handleWithdraw = useCallback(
        async (offerId: number) => {
            setWithdrawingId(offerId)
            try {
                await withdraw(offerId)
                haptics.success()
                showToast(T.WITHDRAWN, 'success')
            } catch {
                showToast(T.WITHDRAW_ERROR, 'error')
            } finally {
                setWithdrawingId(null)
            }
        },
        [withdraw]
    )

    const renderItem = useCallback(
        ({item, index}: {item: Offer; index: number}) => (
            <FadeSlideIn delay={index < 8 ? staggerDelay(index) : 0}>
                <MyOfferCardItem
                    offer={item}
                    withdrawing={withdrawingId === item.id}
                    onPress={() => goDetail(item)}
                    onWithdraw={() => handleWithdraw(item.id)}
                />
            </FadeSlideIn>
        ),
        [goDetail, handleWithdraw, withdrawingId]
    )

    if (loading && offers.length === 0) {
        return (
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <MyOffersSkeleton />
            </View>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={offers}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                contentContainerStyle={[styles.listContent, offers.length === 0 && styles.emptyContent]}
                ListEmptyComponent={<MyOffersEmpty />}
                refreshControl={
                    <RefreshControl
                        refreshing={loading && offers.length > 0}
                        onRefresh={reload}
                        tintColor={theme.colors.tertiary}
                        colors={[theme.colors.tertiary]}
                        progressBackgroundColor={theme.colors.surface}
                    />
                }
                initialNumToRender={8}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {paddingTop: 12, paddingBottom: 28},
    emptyContent: {flexGrow: 1},
})
