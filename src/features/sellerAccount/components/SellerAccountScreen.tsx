import React, {useEffect} from 'react'
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {FadeSlideIn, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

import {useSellerAccount} from '../hooks'
import {MatchedRequestsCard} from './matched'
import {SellerHero} from './sellerHero'
import {SellerOverviewCard} from './overview'
import {SellerPlanCard} from './subscription'
import {SellerHubAlerts, SellerQuickActions, SellerSectionCard, type QuickActionKey} from './hub'
import {SellerAccountEmpty, SellerAccountError, SellerAccountSkeleton} from './states'

const ARABIC = {
    REFRESH_ERROR: 'تعذّر تحديث البيانات',
    INSIGHTS: 'التحليلات والأداء',
    INSIGHTS_SUB: 'المبيعات والمشاهدات والطلب على قطعك',
}

type Nav = NativeStackNavigationProp<RootStackParamList>

/**
 * Seller Hub — the seller's command center. Identity hero, an actionable alert strip,
 * quick actions, KPI overview, matched demand, an Insights entry card, and the plan card.
 * Falls back to skeleton / empty / error states; a failed pull-to-refresh keeps content.
 */
export const SellerAccountScreen = () => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation<Nav>()
    const {loading, refreshing, error, summary, reload, clearError} = useSellerAccount()

    useEffect(() => {
        if (error && summary) {
            showToast(ARABIC.REFRESH_ERROR, 'error')
            clearError()
        }
    }, [error, summary, clearError])

    if (loading && !summary) return <SellerAccountSkeleton />
    if (!summary) return <SellerAccountError onRetry={() => void reload()} />
    if (!summary.hasSellerProfile) return <SellerAccountEmpty />

    const quickAction = (key: QuickActionKey) => {
        if (key === 'add') navigation.navigate('AddPart')
        else if (key === 'inventory') navigation.navigate('MyParts')
        else if (key === 'requests') navigation.navigate('MatchedPartRequests')
        else navigation.navigate('MyOffers')
    }

    return (
        <View style={[styles.flex, {backgroundColor: theme.colors.background}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: insets.bottom + 24}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => void reload()}
                        colors={[theme.colors.primary]}
                        tintColor={theme.colors.primary}
                    />
                }>
                <FadeSlideIn>
                    <SellerHero summary={summary} />
                    <View style={styles.body}>
                        <SellerHubAlerts
                            summary={summary}
                            onInventory={() => navigation.navigate('MyParts')}
                            onOffers={() => navigation.navigate('MyOffers')}
                            onMatched={() => navigation.navigate('MatchedPartRequests')}
                        />
                        <SellerQuickActions onPress={quickAction} />
                        <SellerOverviewCard summary={summary} />
                        <MatchedRequestsCard count={summary.matchedRequestsCount} specializations={summary.specializations} />
                        <SellerSectionCard
                            icon='chart-box-outline'
                            title={ARABIC.INSIGHTS}
                            subtitle={ARABIC.INSIGHTS_SUB}
                            onPress={() => navigation.navigate('SellerAnalytics')}
                        />
                        <SellerPlanCard summary={summary} />
                    </View>
                </FadeSlideIn>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    body: {padding: 20, gap: 20},
})
