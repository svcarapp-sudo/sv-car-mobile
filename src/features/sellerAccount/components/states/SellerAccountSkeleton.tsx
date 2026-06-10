import React, {useEffect, useRef} from 'react'
import {Animated, StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native'

import {useAppTheme} from '@/global/hooks'

/** Soft opacity pulse shared across every skeleton shape. */
const usePulse = () => {
    const v = useRef(new Animated.Value(0.5)).current
    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(v, {toValue: 1, duration: 700, useNativeDriver: true}),
                Animated.timing(v, {toValue: 0.5, duration: 700, useNativeDriver: true}),
            ])
        )
        loop.start()
        return () => loop.stop()
    }, [v])
    return v
}

interface BlockProps {
    style: StyleProp<ViewStyle>
    opacity: Animated.Value
    color: string
}

const Block = ({style, opacity, color}: BlockProps) => <Animated.View style={[style, {backgroundColor: color, opacity}]} />

/** Grayscale placeholder that mirrors the real hero + KPI grid + plan card layout. */
export const SellerAccountSkeleton = () => {
    const theme = useAppTheme()
    const opacity = usePulse()
    const base = theme.colors.surfaceVariant
    const onDark = theme.colors.onDarkSurface

    return (
        <View style={[styles.flex, {backgroundColor: theme.colors.background}]}>
            <View style={[styles.hero, {backgroundColor: theme.colors.primary}]}>
                <Block style={styles.eyebrow} opacity={opacity} color={onDark} />
                <View style={styles.identity}>
                    <Block style={styles.avatar} opacity={opacity} color={onDark} />
                    <View style={styles.identityText}>
                        <Block style={styles.nameBar} opacity={opacity} color={onDark} />
                        <Block style={styles.typeBar} opacity={opacity} color={onDark} />
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <Block style={styles.sectionTitle} opacity={opacity} color={base} />
                <View style={styles.row}>
                    <Block style={styles.tile} opacity={opacity} color={base} />
                    <Block style={styles.tile} opacity={opacity} color={base} />
                </View>
                <View style={styles.row}>
                    <Block style={styles.tile} opacity={opacity} color={base} />
                    <Block style={styles.tile} opacity={opacity} color={base} />
                </View>
                <Block style={[styles.sectionTitle, styles.spaced]} opacity={opacity} color={base} />
                <Block style={styles.planCard} opacity={opacity} color={base} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    hero: {paddingHorizontal: 20, paddingTop: 22, paddingBottom: 28, borderBottomLeftRadius: 28, borderBottomRightRadius: 28},
    eyebrow: {width: 90, height: 12, borderRadius: 6, marginBottom: 18},
    identity: {flexDirection: 'row', alignItems: 'center', gap: 14},
    avatar: {width: 64, height: 64, borderRadius: 32},
    identityText: {flex: 1, gap: 10},
    nameBar: {width: '60%', height: 18, borderRadius: 8},
    typeBar: {width: '40%', height: 12, borderRadius: 6},
    body: {padding: 20, gap: 10},
    sectionTitle: {width: 150, height: 16, borderRadius: 8, marginBottom: 4},
    spaced: {marginTop: 14},
    row: {flexDirection: 'row', gap: 10},
    tile: {flex: 1, height: 104, borderRadius: 16},
    planCard: {height: 96, borderRadius: 16},
})
