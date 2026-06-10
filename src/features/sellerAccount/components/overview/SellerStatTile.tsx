import {useEffect, useRef, useState} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

export type StatAccent = 'primary' | 'tertiary' | 'success' | 'info'

const formatNumber = (n: number) => new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(n)

/** Animated count-up: rises from the currently displayed value to the target. */
const useCountUp = (target: number, duration = 650) => {
    const [display, setDisplay] = useState(0)
    const anim = useRef(new Animated.Value(0)).current
    const displayRef = useRef(0)
    useEffect(() => {
        const from = displayRef.current
        const to = target
        if (from === to) return
        anim.setValue(0)
        const listener = anim.addListener(({value}) => {
            const next = Math.round(from + (to - from) * value)
            displayRef.current = next
            setDisplay(next)
        })
        Animated.timing(anim, {toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false}).start()
        return () => anim.removeListener(listener)
    }, [target, duration, anim])
    return display
}

interface SellerStatTileProps {
    icon: string
    value: number
    label: string
    hint?: string
    accent: StatAccent
}

export const SellerStatTile = ({icon, value, label, hint, accent}: SellerStatTileProps) => {
    const theme = useAppTheme()
    const animated = useCountUp(value)
    const accentMap: Record<StatAccent, {bg: string; fg: string}> = {
        primary: {bg: theme.colors.primaryContainer, fg: theme.colors.primary},
        tertiary: {bg: theme.colors.accentContainer, fg: theme.colors.tertiary},
        success: {bg: theme.colors.successContainer, fg: theme.colors.success},
        info: {bg: theme.colors.infoContainer, fg: theme.colors.info},
    }
    const c = accentMap[accent]

    return (
        <View style={[styles.tile, {backgroundColor: c.bg}]}>
            <View style={[styles.iconRing, {backgroundColor: theme.colors.surface}]}>
                <Icon source={icon} size={16} color={c.fg} />
            </View>
            <Text style={[styles.value, {color: c.fg}]} numberOfLines={1}>
                {formatNumber(animated)}
            </Text>
            <Text style={[styles.label, {color: c.fg}]} numberOfLines={1}>
                {label}
            </Text>
            {!!hint && (
                <Text style={[styles.hint, {color: c.fg}]} numberOfLines={1}>
                    {hint}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 16,
        gap: 4,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    iconRing: {width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginBottom: 2},
    value: {fontSize: 20, fontWeight: '800', letterSpacing: -0.4},
    label: {fontSize: 11, fontWeight: '700', opacity: 0.9},
    hint: {fontSize: 9.5, fontWeight: '600', opacity: 0.7, marginTop: -1},
})
