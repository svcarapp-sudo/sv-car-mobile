import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {formatPrice, toAsciiDigits} from '@/global/utils'

const CURRENCY = 'ر.س'

const formatBudget = (min?: number | null, max?: number | null): string => {
    if (min != null && max != null) return `${formatPrice(min)} - ${formatPrice(max)} ${CURRENCY}`
    if (max != null) return `حتى ${formatPrice(max)} ${CURRENCY}`
    if (min != null) return `من ${formatPrice(min)} ${CURRENCY}`
    return 'الميزانية مفتوحة'
}

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const formatRelative = (timestamp: number): string => {
    const elapsed = Math.max(0, Date.now() - timestamp)
    try {
        const rtf = new Intl.RelativeTimeFormat('ar', {numeric: 'auto'})
        if (elapsed < HOUR) return toAsciiDigits(rtf.format(-Math.max(1, Math.round(elapsed / MINUTE)), 'minute'))
        if (elapsed < DAY) return toAsciiDigits(rtf.format(-Math.round(elapsed / HOUR), 'hour'))
        if (elapsed < 30 * DAY) return toAsciiDigits(rtf.format(-Math.round(elapsed / DAY), 'day'))
        return toAsciiDigits(rtf.format(-Math.round(elapsed / (30 * DAY)), 'month'))
    } catch {
        return ''
    }
}

interface PartRequestCardFooterProps {
    budgetMin?: number | null
    budgetMax?: number | null
    city?: string | null
    createdAt: number
}

/** Ledger row of the request card: amber budget line, city and relative age. */
export const PartRequestCardFooter = ({budgetMin, budgetMax, city, createdAt}: PartRequestCardFooterProps) => {
    const theme = useAppTheme()
    const age = formatRelative(createdAt)

    return (
        <View style={[styles.footer, {borderTopColor: theme.colors.outlineVariant}]}>
            <View style={styles.budgetWrap}>
                <Icon source='cash-multiple' size={15} color={theme.colors.tertiary} />
                <Text style={[styles.budget, {color: themeColors.textPrice}]} numberOfLines={1}>
                    {formatBudget(budgetMin, budgetMax)}
                </Text>
            </View>
            <View style={styles.metaWrap}>
                {city ? (
                    <View style={styles.metaItem}>
                        <Icon source='map-marker-outline' size={12} color={theme.colors.onSurfaceVariant} />
                        <Text style={[styles.metaText, styles.city, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {city}
                        </Text>
                    </View>
                ) : null}
                {age ? (
                    <View style={styles.metaItem}>
                        <Icon source='clock-outline' size={12} color={theme.colors.onSurfaceVariant} />
                        <Text style={[styles.metaText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {age}
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    budgetWrap: {flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1},
    budget: {fontSize: 13, fontWeight: '800', letterSpacing: -0.2, flexShrink: 1},
    metaWrap: {flexDirection: 'row', alignItems: 'center', gap: 8},
    metaItem: {flexDirection: 'row', alignItems: 'center', gap: 3},
    metaText: {fontSize: 10.5, fontWeight: '600'},
    city: {maxWidth: 72},
})
