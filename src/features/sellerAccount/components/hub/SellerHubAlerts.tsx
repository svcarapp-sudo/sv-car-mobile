import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {SellerSummary} from '../../types'

const ARABIC = {
    ALL_GOOD: 'كل شيء على ما يرام — لا تنبيهات حالياً',
    OUT_OF_STOCK: 'قطعة نفد مخزونها',
    LOW_STOCK: 'قطعة مخزونها منخفض',
    PENDING_OFFERS: 'عرض بانتظار رد المشتري',
    MATCHED: 'طلب يطابق تخصّصك',
}

type Tone = 'error' | 'warning' | 'info' | 'accent' | 'success'

interface AlertRow {
    key: string
    icon: string
    text: string
    tone: Tone
    onPress?: () => void
}

interface Props {
    summary: SellerSummary
    onInventory: () => void
    onOffers: () => void
    onMatched: () => void
}

/** Actionable alert strip — each urgent metric is a tappable row that jumps to where it's resolved. */
export const SellerHubAlerts = ({summary, onInventory, onOffers, onMatched}: Props) => {
    const theme = useAppTheme()
    const num = (n: number) => new Intl.NumberFormat('ar-SA').format(n)

    const toneColor: Record<Tone, {fg: string; bg: string}> = {
        error: {fg: theme.colors.error, bg: theme.colors.errorContainer},
        warning: {fg: theme.colors.warning, bg: theme.colors.warningContainer},
        info: {fg: theme.colors.info, bg: theme.colors.infoContainer},
        accent: {fg: theme.colors.tertiary, bg: theme.colors.accentContainer},
        success: {fg: theme.colors.success, bg: theme.colors.successContainer},
    }

    const alerts: AlertRow[] = []
    if (summary.outOfStockCount > 0)
        alerts.push({
            key: 'oos',
            icon: 'alert-octagon-outline',
            tone: 'error',
            onPress: onInventory,
            text: `${num(summary.outOfStockCount)} ${ARABIC.OUT_OF_STOCK}`,
        })
    if (summary.lowStockCount > 0)
        alerts.push({
            key: 'low',
            icon: 'alert-outline',
            tone: 'warning',
            onPress: onInventory,
            text: `${num(summary.lowStockCount)} ${ARABIC.LOW_STOCK}`,
        })
    if (summary.offersPending > 0)
        alerts.push({
            key: 'off',
            icon: 'tag-text-outline',
            tone: 'info',
            onPress: onOffers,
            text: `${num(summary.offersPending)} ${ARABIC.PENDING_OFFERS}`,
        })
    if (summary.matchedRequestsCount > 0)
        alerts.push({
            key: 'match',
            icon: 'clipboard-search-outline',
            tone: 'accent',
            onPress: onMatched,
            text: `${num(summary.matchedRequestsCount)} ${ARABIC.MATCHED}`,
        })

    const rows: AlertRow[] = alerts.length
        ? alerts
        : [{key: 'ok', icon: 'check-circle-outline', tone: 'success', text: ARABIC.ALL_GOOD}]

    return (
        <View style={styles.wrap}>
            {rows.map(a => {
                const c = toneColor[a.tone]
                return (
                    <PressableScale
                        key={a.key}
                        onPress={a.onPress}
                        withHaptic={!!a.onPress}
                        containerStyle={styles.row}
                        style={[styles.inner, {backgroundColor: c.bg}]}>
                        <View style={[styles.iconChip, {backgroundColor: theme.colors.surface}]}>
                            <Icon source={a.icon} size={18} color={c.fg} />
                        </View>
                        <Text style={[styles.text, {color: c.fg}]} numberOfLines={2}>
                            {a.text}
                        </Text>
                        {!!a.onPress && <Icon source='chevron-left' size={22} color={c.fg} />}
                    </PressableScale>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {gap: 8},
    row: {borderRadius: 14},
    inner: {flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14},
    iconChip: {width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center'},
    text: {flex: 1, fontSize: 13, fontWeight: '700'},
})
