import React from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Svg, {Defs, LinearGradient, RadialGradient, Rect, Stop} from 'react-native-svg'

import {themeColors} from '@/global/theme'

interface HomeHeroBackdropProps {
    height: number
}

const NAVY_TOP = themeColors.primary
const NAVY_BOTTOM = '#243558'
const AMBER = themeColors.tertiary

/**
 * Two-layer hero backdrop: navy gradient + amber radial glow.
 * Anchored top-trailing so eyes land on the brand accent first.
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

                    <RadialGradient id='heroGlow' cx='90%' cy='8%' r='65%' fx='90%' fy='8%'>
                        <Stop offset='0%' stopColor={AMBER} stopOpacity={0.32} />
                        <Stop offset='45%' stopColor={AMBER} stopOpacity={0.12} />
                        <Stop offset='100%' stopColor={AMBER} stopOpacity={0} />
                    </RadialGradient>

                    <LinearGradient id='heroFade' x1='0%' y1='65%' x2='0%' y2='100%'>
                        <Stop offset='0%' stopColor={NAVY_BOTTOM} stopOpacity={0} />
                        <Stop offset='100%' stopColor={NAVY_BOTTOM} stopOpacity={0.18} />
                    </LinearGradient>
                </Defs>

                <Rect x={0} y={0} width={width} height={height} fill='url(#heroNavy)' />
                <Rect x={0} y={0} width={width} height={height} fill='url(#heroGlow)' />
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
