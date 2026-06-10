import React, {useRef} from 'react'
import {Animated, Pressable} from 'react-native'
import type {GestureResponderEvent, PressableProps, StyleProp, ViewStyle} from 'react-native'

import {haptics} from '@/global/utils'

export interface PressableScaleProps extends Omit<PressableProps, 'style'> {
    /** Visual styles — applied to the animated inner view. */
    style?: StyleProp<ViewStyle>
    /** Layout styles for the outer Pressable (flex, width in grids/rows). */
    containerStyle?: StyleProp<ViewStyle>
    /** Scale while pressed. */
    scaleTo?: number
    /** Opacity while pressed. */
    dimTo?: number
    /** Fire a selection haptic when the press activates. */
    withHaptic?: boolean
    children?: React.ReactNode
}

/**
 * Pressable with the springy scale-down + dim feedback used by premium apps
 * (Airbnb/Instagram-style card press). Drop-in replacement for
 * TouchableOpacity on cards, tiles, rows and chips so every touch in the app
 * responds with the same physical feel. Scale and opacity ride one animated
 * value on the native driver.
 */
export const PressableScale = ({
    style,
    containerStyle,
    scaleTo = 0.97,
    dimTo = 0.92,
    withHaptic = false,
    onPress,
    onPressIn,
    onPressOut,
    children,
    ...rest
}: PressableScaleProps) => {
    const pressed = useRef(new Animated.Value(0)).current

    const animateTo = (toValue: number) => {
        Animated.spring(pressed, {
            toValue,
            speed: 50,
            bounciness: toValue === 0 ? 5 : 0,
            useNativeDriver: true,
        }).start()
    }

    const handlePressIn = (e: GestureResponderEvent) => {
        animateTo(1)
        onPressIn?.(e)
    }

    const handlePressOut = (e: GestureResponderEvent) => {
        animateTo(0)
        onPressOut?.(e)
    }

    const handlePress = (e: GestureResponderEvent) => {
        if (withHaptic) haptics.selection()
        onPress?.(e)
    }

    const scale = pressed.interpolate({inputRange: [0, 1], outputRange: [1, scaleTo]})
    const opacity = pressed.interpolate({inputRange: [0, 1], outputRange: [1, dimTo]})

    return (
        <Pressable style={containerStyle} onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
            <Animated.View style={[style, {transform: [{scale}], opacity}]}>{children}</Animated.View>
        </Pressable>
    )
}
