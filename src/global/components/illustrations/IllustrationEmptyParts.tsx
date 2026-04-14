import React, {useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import Svg, {Circle, Ellipse, G, Path, Rect} from 'react-native-svg'

import {useAppTheme} from '@/global/hooks'

const AnimatedG = Animated.createAnimatedComponent(G)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface IllustrationEmptyPartsProps {
    size?: number
}

const TREAD_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
const SPOKE_ANGLES = [0, 72, 144, 216, 288]
const GEAR_TEETH = [0, 60, 120, 180, 240, 300]

export const IllustrationEmptyParts = ({size = 200}: IllustrationEmptyPartsProps) => {
    const theme = useAppTheme()
    const navy = theme.colors.primary
    const amber = theme.colors.tertiary
    const amberLight = theme.colors.tertiaryContainer
    const surface = theme.colors.surface

    const wheelRot = useRef(new Animated.Value(0)).current
    const gearRot = useRef(new Animated.Value(0)).current
    const badgeScale = useRef(new Animated.Value(1)).current
    const twinkleA = useRef(new Animated.Value(0.3)).current
    const twinkleB = useRef(new Animated.Value(0.8)).current

    useEffect(() => {
        const loops = [
            Animated.loop(
                Animated.timing(wheelRot, {toValue: 360, duration: 9000, easing: Easing.linear, useNativeDriver: false})
            ),
            Animated.loop(
                Animated.timing(gearRot, {toValue: -360, duration: 5000, easing: Easing.linear, useNativeDriver: false})
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(badgeScale, {
                        toValue: 1.12,
                        duration: 700,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: false,
                    }),
                    Animated.timing(badgeScale, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: false,
                    }),
                ])
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(twinkleA, {toValue: 1, duration: 1100, useNativeDriver: false}),
                    Animated.timing(twinkleA, {toValue: 0.3, duration: 1100, useNativeDriver: false}),
                ])
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(twinkleB, {toValue: 0.2, duration: 900, useNativeDriver: false}),
                    Animated.timing(twinkleB, {toValue: 0.9, duration: 900, useNativeDriver: false}),
                ])
            ),
        ]
        loops.forEach(l => l.start())
        return () => loops.forEach(l => l.stop())
    }, [wheelRot, gearRot, badgeScale, twinkleA, twinkleB])

    return (
        <Svg width={size} height={size * 0.9} viewBox='0 0 200 180' fill='none'>
            <Ellipse cx='105' cy='160' rx='74' ry='7' fill={navy} opacity='0.1' />
            <Circle cx='100' cy='92' r='72' fill={amberLight} opacity='0.5' />
            <Circle cx='100' cy='92' r='72' fill='none' stroke={amber} strokeWidth='1' strokeDasharray='2 5' opacity='0.35' />

            <AnimatedG rotation={gearRot} originX='37.5' originY='42' opacity='0.9'>
                {GEAR_TEETH.map(a => (
                    <Rect
                        key={`t-${a}`}
                        x='35'
                        y='22'
                        width='5'
                        height='7'
                        rx='1'
                        fill={amber}
                        transform={`rotate(${a} 37.5 42)`}
                    />
                ))}
                <Circle cx='37.5' cy='42' r='13' fill={amber} />
                <Circle cx='37.5' cy='42' r='8' fill={surface} />
                <Circle cx='37.5' cy='42' r='3' fill={navy} />
            </AnimatedG>

            <AnimatedG rotation={wheelRot} originX='105' originY='92'>
                <Circle cx='105' cy='92' r='52' fill={navy} />
                {TREAD_ANGLES.map(a => (
                    <Rect
                        key={`tr-${a}`}
                        x='102'
                        y='43'
                        width='6'
                        height='6'
                        fill='rgba(255,255,255,0.12)'
                        transform={`rotate(${a} 105 92)`}
                    />
                ))}
                <Circle cx='105' cy='92' r='44' fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='1' />
                <Circle cx='105' cy='92' r='38' fill={amber} />
                <Circle cx='105' cy='92' r='34' fill={surface} />
                {SPOKE_ANGLES.map(a => (
                    <Rect
                        key={`sp-${a}`}
                        x='103.5'
                        y='60'
                        width='3'
                        height='24'
                        rx='1.5'
                        fill={amber}
                        transform={`rotate(${a} 105 92)`}
                    />
                ))}
                <Circle cx='105' cy='92' r='14' fill={amber} />
                <Circle cx='105' cy='92' r='10' fill={navy} />
                <Circle cx='105' cy='92' r='4' fill={amber} />
            </AnimatedG>

            <Path d='M160 52 L172 52 L176 60 L172 68 L160 68 L156 60 Z' fill={amber} stroke={navy} strokeWidth='1.5' />
            <Circle cx='166' cy='60' r='3.5' fill={navy} />

            <AnimatedG scale={badgeScale} originX='175' originY='130'>
                <Circle cx='175' cy='130' r='14' fill={navy} />
                <Circle cx='175' cy='130' r='14' fill='none' stroke={amber} strokeWidth='1.5' opacity='0.4' />
                <Path d='M175 124 L175 136 M169 130 L181 130' stroke={amber} strokeWidth='2.8' strokeLinecap='round' />
            </AnimatedG>

            <AnimatedCircle cx='18' cy='110' r='3' fill={amber} opacity={twinkleA} />
            <AnimatedCircle cx='30' cy='145' r='2' fill={amber} opacity={twinkleB} />
            <AnimatedCircle cx='185' cy='88' r='2.5' fill={navy} opacity={twinkleA} />
            <AnimatedCircle cx='150' cy='165' r='2' fill={amber} opacity={twinkleB} />
            <AnimatedCircle cx='70' cy='25' r='2' fill={amber} opacity={twinkleA} />
            <Path d='M22 70 L26 74 M22 74 L26 70' stroke={amber} strokeWidth='1.5' strokeLinecap='round' opacity='0.5' />
            <Path d='M180 38 L184 42 M180 42 L184 38' stroke={navy} strokeWidth='1.3' strokeLinecap='round' opacity='0.35' />
        </Svg>
    )
}
