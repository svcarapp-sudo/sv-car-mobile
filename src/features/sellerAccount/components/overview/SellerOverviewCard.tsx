import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {SellerSummary} from '../../types'
import {SellerStatTile} from './SellerStatTile'

const ARABIC = {
    TITLE: 'نظرة عامة على النشاط',
    PARTS: 'قطعة معروضة',
    ACTIVE: 'نشطة',
    VIEWS: 'مشاهدة',
    FAVORITES: 'إضافة للمفضلة',
    REQUESTS: 'طلب قطعة',
    OFFERS: 'عرض مقبول',
    OPEN: 'مفتوح',
    SENT: 'مُرسلة',
}

const formatNumber = (n: number) => new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(n)

interface SellerOverviewCardProps {
    summary: SellerSummary
}

/** Grouped KPI overview — six related stats laid out as a 2×3 tile grid. */
export const SellerOverviewCard = ({summary}: SellerOverviewCardProps) => {
    const theme = useAppTheme()
    const openHint = summary.partRequestsOpen > 0 ? `${formatNumber(summary.partRequestsOpen)} ${ARABIC.OPEN}` : undefined
    const sentHint = summary.offersSent > 0 ? `${formatNumber(summary.offersSent)} ${ARABIC.SENT}` : undefined

    return (
        <View>
            <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC.TITLE}
            </Text>
            <View style={styles.grid}>
                <View style={styles.row}>
                    <SellerStatTile
                        icon='package-variant'
                        value={summary.totalPartsListed}
                        label={ARABIC.PARTS}
                        accent='primary'
                    />
                    <SellerStatTile
                        icon='check-decagram-outline'
                        value={summary.activeListings}
                        label={ARABIC.ACTIVE}
                        accent='success'
                    />
                </View>
                <View style={styles.row}>
                    <SellerStatTile icon='eye-outline' value={summary.totalViews} label={ARABIC.VIEWS} accent='info' />
                    <SellerStatTile
                        icon='heart-outline'
                        value={summary.favoritesReceived}
                        label={ARABIC.FAVORITES}
                        accent='tertiary'
                    />
                </View>
                <View style={styles.row}>
                    <SellerStatTile
                        icon='clipboard-text-outline'
                        value={summary.partRequestsTotal}
                        label={ARABIC.REQUESTS}
                        hint={openHint}
                        accent='primary'
                    />
                    <SellerStatTile
                        icon='tag-check-outline'
                        value={summary.offersAccepted}
                        label={ARABIC.OFFERS}
                        hint={sentHint}
                        accent='info'
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {fontWeight: '700', marginBottom: 14},
    grid: {gap: 10},
    row: {flexDirection: 'row', gap: 10},
})
