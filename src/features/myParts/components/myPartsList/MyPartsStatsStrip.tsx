import {useEffect, useRef, useState} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {FadeSlideIn} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import {formatPrice} from '@/global/utils'

interface StatsHeroProps {
    count: number
    totalValue: number
    categoriesCount: number
}

const T = {
    LISTED: 'قطعة معروضة',
    VALUE: 'قيمة المخزون',
    CATEGORIES: 'فئات',
    AVG: 'متوسط السعر',
    CURRENCY: 'ر.س',
}

/** Eased count-up so the headline numbers animate on data changes (Western digits). */
const useCountUp = (target: number, duration = 600) => {
    const [display, setDisplay] = useState(target)
    const anim = useRef(new Animated.Value(0)).current
    const previous = useRef(target)
    useEffect(() => {
        const from = previous.current
        anim.setValue(0)
        const listener = anim.addListener(({value}) => setDisplay(Math.round(from + (target - from) * value)))
        Animated.timing(anim, {toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false}).start(() => {
            previous.current = target
        })
        return () => anim.removeListener(listener)
    }, [target, duration, anim])
    return display
}

interface ContextPillProps {
    icon: string
    text: string
    tone: 'neutral' | 'success'
}

const ContextPill = ({icon, text, tone}: ContextPillProps) => {
    const theme = useAppTheme()
    const fg = tone === 'success' ? theme.colors.success : theme.colors.onSurfaceVariant
    return (
        <View style={styles.pill}>
            <Icon source={icon} size={13} color={fg} />
            <Text style={[styles.pillText, {color: fg}]} numberOfLines={1}>
                {text}
            </Text>
        </View>
    )
}

/**
 * Hero summary card for the My Parts list. One dominant KPI (listed count) reads
 * first, stock value second, with category and average-price context smallest — a
 * size-driven hierarchy instead of equally-weighted tiles. Per-status counts live
 * on the filter chips below, so nothing is duplicated here.
 */
export const MyPartsStatsStrip = ({count, totalValue, categoriesCount}: StatsHeroProps) => {
    const theme = useAppTheme()
    const animatedCount = useCountUp(count)
    const animatedValue = useCountUp(totalValue)
    const avg = count > 0 ? Math.round(totalValue / count) : 0

    return (
        <FadeSlideIn>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.topRow}>
                    <View style={styles.primaryBlock}>
                        <View style={[styles.medallion, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Icon source='package-variant-closed' size={22} color={theme.colors.primary} />
                        </View>
                        <View style={styles.primaryText}>
                            <Text style={[styles.bigNumber, {color: theme.colors.onSurface}]} numberOfLines={1}>
                                {formatPrice(animatedCount)}
                            </Text>
                            <Text style={[styles.bigLabel, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {T.LISTED}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.valueBlock}>
                        <Text style={[styles.valueLabel, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {T.VALUE}
                        </Text>
                        <Text style={[styles.valueNumber, {color: theme.colors.tertiary}]} numberOfLines={1}>
                            {formatPrice(animatedValue)} {T.CURRENCY}
                        </Text>
                    </View>
                </View>

                <View style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />

                <View style={styles.footerRow}>
                    <ContextPill icon='shape-outline' text={`${formatPrice(categoriesCount)} ${T.CATEGORIES}`} tone='neutral' />
                    <View style={[styles.sep, {backgroundColor: theme.colors.outlineVariant}]} />
                    <ContextPill icon='trending-up' text={`${formatPrice(avg)} ${T.CURRENCY} ${T.AVG}`} tone='neutral' />
                </View>
            </View>
        </FadeSlideIn>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 20, padding: 16, marginBottom: 14, ...shadows.md, shadowColor: themeColors.shadow},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12},
    primaryBlock: {flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 0},
    medallion: {width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center'},
    primaryText: {flexShrink: 0},
    bigNumber: {fontSize: 30, fontWeight: '800', letterSpacing: -0.4, lineHeight: 40},
    bigLabel: {fontSize: 12, fontWeight: '600', opacity: 0.9},
    valueBlock: {alignItems: 'flex-end', flexShrink: 1, minWidth: 0},
    valueLabel: {fontSize: 11, fontWeight: '600', opacity: 0.9, marginBottom: 2},
    valueNumber: {fontSize: 17, fontWeight: '800', letterSpacing: -0.3},
    divider: {height: StyleSheet.hairlineWidth, marginVertical: 12, opacity: 0.7},
    footerRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    pill: {flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1},
    pillText: {fontSize: 11, fontWeight: '700'},
    sep: {width: 1, height: 12, opacity: 0.7},
})
