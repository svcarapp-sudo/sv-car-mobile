import React, {useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import Svg, {Circle, Defs, Ellipse, G, Path, RadialGradient, Rect, Stop} from 'react-native-svg'

import {useAppTheme} from '@/global/hooks'

const AnimatedG = Animated.createAnimatedComponent(G)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface IllustrationEmptyPartsProps {
    size?: number
}

export const IllustrationEmptyParts = ({size = 200}: IllustrationEmptyPartsProps) => {
    const theme = useAppTheme()
    const navy = theme.colors.primary
    const amber = theme.colors.tertiary
    const amberLight = theme.colors.tertiaryContainer
    const surface = theme.colors.surface

    const bob = useRef(new Animated.Value(0)).current
    const twinkleA = useRef(new Animated.Value(0.4)).current
    const twinkleB = useRef(new Animated.Value(0.7)).current

    useEffect(() => {
        const loops = [
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bob, {
                        toValue: -6,
                        duration: 1600,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: false,
                    }),
                    Animated.timing(bob, {
                        toValue: 0,
                        duration: 1600,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: false,
                    }),
                ])
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(twinkleA, {toValue: 1, duration: 1200, useNativeDriver: false}),
                    Animated.timing(twinkleA, {toValue: 0.3, duration: 1200, useNativeDriver: false}),
                ])
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(twinkleB, {toValue: 0.3, duration: 1000, useNativeDriver: false}),
                    Animated.timing(twinkleB, {toValue: 0.9, duration: 1000, useNativeDriver: false}),
                ])
            ),
        ]
        loops.forEach(l => l.start())
        return () => loops.forEach(l => l.stop())
    }, [bob, twinkleA, twinkleB])

    return (
        <Svg width={size} height={size * 0.9} viewBox='0 0 200 180' fill='none'>
            <Defs>
                <RadialGradient id='emptyHalo' cx='50%' cy='45%' r='50%'>
                    <Stop offset='0%' stopColor={amberLight} stopOpacity={0.7} />
                    <Stop offset='100%' stopColor={amberLight} stopOpacity={0} />
                </RadialGradient>
            </Defs>

            {/* Soft halo */}
            <Circle cx='100' cy='84' r='82' fill='url(#emptyHalo)' />

            {/* Ground shadow */}
            <Ellipse cx='100' cy='162' rx='56' ry='4.5' fill={navy} opacity='0.09' />

            {/* Magnifier — animated bob */}
            <AnimatedG y={bob}>
                {/* Lens body */}
                <Circle cx='88' cy='80' r='46' fill={surface} stroke={navy} strokeWidth='5' />

                {/* Glass refraction highlight */}
                <Path d='M58 68 Q70 50 92 50' stroke={amber} strokeWidth='3' strokeLinecap='round' fill='none' opacity='0.7' />

                {/* Inside lens — empty result (dashed rounded box) */}
                <Rect
                    x='62'
                    y='60'
                    width='52'
                    height='40'
                    rx='8'
                    fill='none'
                    stroke={navy}
                    strokeWidth='2'
                    strokeDasharray='5 4'
                    opacity='0.32'
                />

                {/* Handle */}
                <Path d='M122 114 L150 142' stroke={navy} strokeWidth='10' strokeLinecap='round' />

                {/* Handle grip cap */}
                <Circle cx='152' cy='144' r='5' fill={amber} />
            </AnimatedG>

            {/* Sparkles */}
            <AnimatedCircle cx='160' cy='52' r='3' fill={amber} opacity={twinkleA} />
            <AnimatedCircle cx='32' cy='126' r='2.5' fill={amber} opacity={twinkleB} />
            <AnimatedCircle cx='168' cy='118' r='2' fill={navy} opacity={twinkleA} />
        </Svg>
    )
}
