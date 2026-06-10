import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'
import type {StyleProp, ViewStyle} from 'react-native'

import {MOTION} from './motionTokens'

export interface FadeSlideInProps {
    /** Entrance delay in ms — combine with staggerDelay(index) for lists. */
    delay?: number
    /** Slide distance in px (positive = enters from below). */
    distance?: number
    duration?: number
    style?: StyleProp<ViewStyle>
    children: React.ReactNode
}

/**
 * Mount entrance: fade + decelerated upward slide (Material 3 "emphasized
 * decelerate" feel). Wrap screen sections and list items; pass a staggered
 * delay so siblings cascade in.
 */
export const FadeSlideIn = ({delay = 0, distance = 14, duration = MOTION.duration.md, style, children}: FadeSlideInProps) => {
    const progress = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration,
            delay,
            easing: MOTION.easing.enter,
            useNativeDriver: true,
        }).start()
    }, [progress, delay, duration])

    const translateY = progress.interpolate({inputRange: [0, 1], outputRange: [distance, 0]})

    return <Animated.View style={[style, {opacity: progress, transform: [{translateY}]}]}>{children}</Animated.View>
}
