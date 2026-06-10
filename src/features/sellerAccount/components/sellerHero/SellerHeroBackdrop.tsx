import React from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Svg, {Defs, LinearGradient, RadialGradient, Rect, Stop} from 'react-native-svg'

import {themeColors} from '@/global/theme'

interface SellerHeroBackdropProps {
    height: number
}

const NAVY_TOP = themeColors.primary
const NAVY_BOTTOM = '#243558'
const AMBER = themeColors.tertiary

/**
 * Layered navy hero backdrop with a whispered amber glow + glass sheen.
 * Mirrors the home hero language; duplicated locally to respect feature isolation.
 */
export const SellerHeroBackdrop = ({height}: SellerHeroBackdropProps) => {
    const {width} = useWindowDimensions()

    return (
        <View pointerEvents='none' style={[styles.wrapper, {height}]}>
            <Svg width={width} height={height}>
                <Defs>
                    <LinearGradient id='sellerNavy' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <Stop offset='0%' stopColor={NAVY_TOP} stopOpacity={1} />
                        <Stop offset='100%' stopColor={NAVY_BOTTOM} stopOpacity={1} />
                    </LinearGradient>

                    <RadialGradient id='sellerGlow' cx='90%' cy='6%' r='75%' fx='90%' fy='6%'>
                        <Stop offset='0%' stopColor={AMBER} stopOpacity={0.16} />
                        <Stop offset='38%' stopColor={AMBER} stopOpacity={0.06} />
                        <Stop offset='78%' stopColor={AMBER} stopOpacity={0.014} />
                        <Stop offset='100%' stopColor={AMBER} stopOpacity={0} />
                    </RadialGradient>

                    <RadialGradient id='sellerSheen' cx='20%' cy='-8%' r='60%' fx='20%' fy='-8%'>
                        <Stop offset='0%' stopColor='#FFFFFF' stopOpacity={0.08} />
                        <Stop offset='60%' stopColor='#FFFFFF' stopOpacity={0.02} />
                        <Stop offset='100%' stopColor='#FFFFFF' stopOpacity={0} />
                    </RadialGradient>
                </Defs>

                <Rect x={0} y={0} width={width} height={height} fill='url(#sellerNavy)' />
                <Rect x={0} y={0} width={width} height={height} fill='url(#sellerGlow)' />
                <Rect x={0} y={0} width={width} height={height} fill='url(#sellerSheen)' />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {position: 'absolute', top: 0, start: 0, end: 0, overflow: 'hidden'},
})
