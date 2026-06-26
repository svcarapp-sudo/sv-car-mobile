import {useEffect} from 'react'
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {FadeSlideIn, showToast, staggerDelay} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

import {useSellerAnalytics} from '../../hooks/useSellerAnalytics'
import {localizeStatusList} from './chartMath'
import {SellerAccountError} from '../states'
import {AnalyticsHeader} from './AnalyticsHeader'
import {DistributionsSection} from './DistributionsSection'
import {LeaderboardSection} from './LeaderboardSection'
import {OffersFunnelRow} from './OffersFunnelRow'
import {SellerAnalyticsSkeleton} from './SellerAnalyticsSkeleton'
import {StockHealthRow} from './StockHealthRow'
import {TrendsSection} from './TrendsSection'

const ARABIC = {REFRESH_ERROR: 'تعذّر تحديث البيانات'}

/**
 * Seller "Insights" analytics: a selectable 7/30/90-day window over stock
 * health, the offers funnel, status/category distributions, daily trends, and a
 * most-viewed leaderboard. Each section fades/staggers in; pull-to-refresh keeps
 * existing content (toasting on failure), while the full-screen error/skeleton
 * are reserved for the initial load.
 */
export const SellerAnalyticsScreen = () => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const {loading, refreshing, error, analytics, days, setDays, reload} = useSellerAnalytics()

    useEffect(() => {
        if (error && analytics) showToast(ARABIC.REFRESH_ERROR, 'error')
    }, [error, analytics])

    if (loading && !analytics) return <SellerAnalyticsSkeleton />
    if (!analytics) return <SellerAccountError onRetry={() => void reload()} />

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
                <AnalyticsHeader days={days} onChange={setDays} />
                <View style={styles.body}>
                    <FadeSlideIn delay={staggerDelay(0)}>
                        <StockHealthRow analytics={analytics} />
                    </FadeSlideIn>
                    <FadeSlideIn delay={staggerDelay(1)}>
                        <OffersFunnelRow analytics={analytics} />
                    </FadeSlideIn>
                    <FadeSlideIn delay={staggerDelay(2)}>
                        <DistributionsSection
                            partsByStatus={localizeStatusList(analytics.partsByStatus)}
                            partsByCategory={analytics.partsByCategory}
                        />
                    </FadeSlideIn>
                    <FadeSlideIn delay={staggerDelay(3)}>
                        <TrendsSection
                            newListingsTrend={analytics.newListingsTrend}
                            matchedDemandTrend={analytics.matchedDemandTrend}
                        />
                    </FadeSlideIn>
                    <FadeSlideIn delay={staggerDelay(4)}>
                        <LeaderboardSection topParts={analytics.topParts} />
                    </FadeSlideIn>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    body: {padding: 20, gap: 24},
})
