import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'
import type {DimensionValue, StyleProp, ViewStyle} from 'react-native'

import {themeColors} from '@/global/theme'

export interface SkeletonProps {
    width?: DimensionValue
    height?: DimensionValue
    /** Corner radius; ignored when `circle` is set. */
    radius?: number
    /** Render as a circle (avatar placeholder) — height defaults to width. */
    circle?: boolean
    style?: StyleProp<ViewStyle>
}

/**
 * Content placeholder block with a slow, steady opacity pulse — the
 * LinkedIn/Facebook skeleton-screen pattern that reads as "content is coming"
 * instead of drawing attention to the wait like a spinner does. Compose
 * several to mirror the real layout of the screen being loaded.
 */
export const Skeleton = ({width = '100%', height = 16, radius = 8, circle = false, style}: SkeletonProps) => {
    const pulse = useRef(new Animated.Value(0.55)).current

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {toValue: 1, duration: 750, useNativeDriver: true}),
                Animated.timing(pulse, {toValue: 0.55, duration: 750, useNativeDriver: true}),
            ])
        )
        loop.start()
        return () => loop.stop()
    }, [pulse])

    const size = circle ? {width, height: width, borderRadius: 999} : {width, height, borderRadius: radius}

    return <Animated.View style={[{backgroundColor: themeColors.surfaceContainerHigh, opacity: pulse}, size, style]} />
}
