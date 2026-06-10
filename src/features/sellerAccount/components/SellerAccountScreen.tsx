import React from 'react'
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native'
import {Snackbar} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useAppTheme} from '@/global/hooks'

import {useSellerAccount} from '../hooks'
import {SellerHero} from './sellerHero'
import {SellerOverviewCard} from './overview'
import {SellerPlanCard} from './subscription'
import {SellerAccountEmpty, SellerAccountError, SellerAccountSkeleton} from './states'

const ARABIC = {REFRESH_ERROR: 'تعذّر تحديث البيانات'}

/**
 * Seller dashboard: the authenticated seller's account details + summary KPIs.
 * Navy identity hero (with verified badge + member-since), a KPI overview grid,
 * and the subscription/plan card. Falls back to skeleton / empty / error states.
 *
 * A failed pull-to-refresh keeps the already-loaded content and surfaces a snackbar
 * rather than discarding the screen; the full-screen error is reserved for the case
 * where there is no data to show at all (initial load failure).
 */
export const SellerAccountScreen = () => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const {loading, refreshing, error, summary, reload, clearError} = useSellerAccount()

    if (loading && !summary) return <SellerAccountSkeleton />
    if (!summary) return <SellerAccountError onRetry={() => void reload()} />
    if (!summary.hasSellerProfile) return <SellerAccountEmpty />

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
                <SellerHero summary={summary} />
                <View style={styles.body}>
                    <SellerOverviewCard summary={summary} />
                    <SellerPlanCard summary={summary} />
                </View>
            </ScrollView>

            <Snackbar visible={error} onDismiss={clearError} duration={3500}>
                {ARABIC.REFRESH_ERROR}
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    body: {padding: 20, gap: 24},
})
