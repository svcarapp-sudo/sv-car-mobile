import {useEffect, useRef, useState} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

interface StatsStripProps {
    count: number
    totalValue: number
    categoriesCount: number
}

const ARABIC_TEXT = {
    LISTED: 'قطعة معروضة',
    VALUE: 'قيمة المخزون',
    CATEGORIES: 'فئات',
    CURRENCY: 'ر.س',
}

const formatNumber = (n: number) => new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(n)

const useCountUp = (target: number, duration = 600) => {
    const [display, setDisplay] = useState(target)
    const anim = useRef(new Animated.Value(0)).current
    const previous = useRef(target)
    useEffect(() => {
        const from = previous.current
        const to = target
        anim.setValue(0)
        const listener = anim.addListener(({value}) => setDisplay(Math.round(from + (to - from) * value)))
        Animated.timing(anim, {toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false}).start(() => {
            previous.current = to
        })
        return () => anim.removeListener(listener)
    }, [target, duration, anim])
    return display
}

interface StatTileProps {
    icon: string
    value: string
    label: string
    accent: 'primary' | 'tertiary' | 'success'
}

const StatTile = ({icon, value, label, accent}: StatTileProps) => {
    const theme = useAppTheme()
    const accentMap = {
        primary: {bg: theme.colors.primaryContainer, fg: theme.colors.primary, ring: theme.colors.surface},
        tertiary: {bg: theme.colors.accentContainer, fg: theme.colors.tertiary, ring: theme.colors.surface},
        success: {bg: theme.colors.successContainer, fg: theme.colors.success, ring: theme.colors.surface},
    }
    const c = accentMap[accent]
    return (
        <View style={[styles.tile, {backgroundColor: c.bg}]}>
            <View style={[styles.iconRing, {backgroundColor: c.ring}]}>
                <Icon source={icon} size={16} color={c.fg} />
            </View>
            <Text style={[styles.value, {color: c.fg}]} numberOfLines={1}>
                {value}
            </Text>
            <Text style={[styles.label, {color: c.fg}]} numberOfLines={1}>
                {label}
            </Text>
        </View>
    )
}

export const MyPartsStatsStrip = ({count, totalValue, categoriesCount}: StatsStripProps) => {
    const animatedCount = useCountUp(count)
    const animatedValue = useCountUp(totalValue)
    const animatedCats = useCountUp(categoriesCount)
    return (
        <View style={styles.row}>
            <StatTile icon='package-variant' value={formatNumber(animatedCount)} label={ARABIC_TEXT.LISTED} accent='primary' />
            <StatTile
                icon='cash-multiple'
                value={`${formatNumber(animatedValue)} ${ARABIC_TEXT.CURRENCY}`}
                label={ARABIC_TEXT.VALUE}
                accent='tertiary'
            />
            <StatTile icon='shape-outline' value={formatNumber(animatedCats)} label={ARABIC_TEXT.CATEGORIES} accent='success' />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', gap: 10, marginBottom: 14},
    tile: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderRadius: 16,
        gap: 4,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    iconRing: {width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 2},
    value: {fontSize: 17, fontWeight: '800', letterSpacing: -0.3},
    label: {fontSize: 10, fontWeight: '600', opacity: 0.85},
})
