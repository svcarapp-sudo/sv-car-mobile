import React, {useRef, useState} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import type {ImageProps} from 'react-native'
import {Icon} from 'react-native-paper'

import {themeColors} from '@/global/theme'

export interface FadeInImageProps extends ImageProps {
    /** Fade duration once the image has loaded. */
    duration?: number
    /** Icon shown while loading and when the image fails to load. */
    fallbackIcon?: string
    fallbackIconSize?: number
}

/**
 * Image with progressive-loading polish: a soft placeholder is visible until
 * the image decodes, then the photo fades in (~250ms) instead of popping —
 * the pattern used by Instagram/Pinterest/Airbnb feeds. On load failure the
 * placeholder icon stays, so cards never show a broken empty box.
 */
export const FadeInImage = ({
    duration = 250,
    fallbackIcon = 'image-off-outline',
    fallbackIconSize = 28,
    style,
    ...rest
}: FadeInImageProps) => {
    const opacity = useRef(new Animated.Value(0)).current
    const [failed, setFailed] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const handleLoad = () => {
        setLoaded(true)
        Animated.timing(opacity, {toValue: 1, duration, useNativeDriver: true}).start()
    }

    return (
        <View style={[styles.container, style]}>
            {(!loaded || failed) && (
                <View style={styles.placeholder}>
                    <Icon source={fallbackIcon} size={fallbackIconSize} color={themeColors.accentHalf} />
                </View>
            )}
            {!failed && (
                <Animated.Image
                    {...rest}
                    style={[StyleSheet.absoluteFill, {opacity}]}
                    onLoad={handleLoad}
                    onError={() => setFailed(true)}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: themeColors.accentSubtle,
    },
    placeholder: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
