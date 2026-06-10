import React from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Svg, {Defs, LinearGradient, RadialGradient, Rect, Stop} from 'react-native-svg'

import {themeColors} from '@/global/theme'

interface HomeHeroBackdropProps {
    height: number
}

const NAVY_TOP = themeColors.primary
const NAVY_BOTTOM = themeColors.navyMid
const AMBER = themeColors.tertiary
const SHEEN = themeColors.onPrimary

/**
 * Layered hero backdrop: navy gradient + soft amber glow + frosted glass sheen.
 * Tuned for a calm, glassy feel — the amber is whispered, not shouted.
 */
export const HomeHeroBackdrop = ({height}: HomeHeroBackdropProps) => {
    const {width} = useWindowDimensions()

    return (
        <View pointerEvents='none' style={[styles.wrapper, {height}]}>
            <Svg width={width} height={height}>
                <Defs>
                    <LinearGradient id='heroNavy' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <Stop offset='0%' stopColor={NAVY_TOP} stopOpacity={1} />
                        <Stop offset='100%' stopColor={NAVY_BOTTOM} stopOpacity={1} />
                    </LinearGradient>

                    <RadialGradient id='heroGlow' cx='92%' cy='4%' r='72%' fx='92%' fy='4%'>
                        <Stop offset='0%' stopColor={AMBER} stopOpacity={0.13} />
                        <Stop offset='35%' stopColor={AMBER} stopOpacity={0.05} />
                        <Stop offset='75%' stopColor={AMBER} stopOpacity={0.012} />
                        <Stop offset='100%' stopColor={AMBER} stopOpacity={0} />
                    </RadialGradient>

                    <RadialGradient id='heroSheen' cx='78%' cy='-6%' r='55%' fx='78%' fy='-6%'>
                        <Stop offset='0%' stopColor={SHEEN} stopOpacity={0.07} />
                        <Stop offset='60%' stopColor={SHEEN} stopOpacity={0.018} />
                        <Stop offset='100%' stopColor={SHEEN} stopOpacity={0} />
                    </RadialGradient>

                    <LinearGradient id='heroFade' x1='0%' y1='65%' x2='0%' y2='100%'>
                        <Stop offset='0%' stopColor={NAVY_BOTTOM} stopOpacity={0} />
                        <Stop offset='100%' stopColor={NAVY_BOTTOM} stopOpacity={0.18} />
                    </LinearGradient>
                </Defs>

                <Rect x={0} y={0} width={width} height={height} fill='url(#heroNavy)' />
                <Rect x={0} y={0} width={width} height={height} fill='url(#heroGlow)' />
                <Rect x={0} y={0} width={width} height={height} fill='url(#heroSheen)' />
                <Rect x={0} y={0} width={width} height={height} fill='url(#heroFade)' />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        start: 0,
        end: 0,
        overflow: 'hidden',
    },
})
