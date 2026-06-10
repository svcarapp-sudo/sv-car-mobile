import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Animated, Pressable, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Icon, Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'
import {haptics} from '@/global/utils'

import {MOTION} from '../motion'
import {useToastStore} from './toastStore'
import type {ToastData, ToastKind} from './toastStore'

const ICON_BY_KIND: Record<ToastKind, string> = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'information',
}

const COLOR_BY_KIND: Record<ToastKind, string> = {
    success: themeColors.successBright,
    error: themeColors.errorBright,
    info: themeColors.infoBright,
}

const HAPTIC_BY_KIND: Record<ToastKind, () => void> = {
    success: haptics.success,
    error: haptics.error,
    info: haptics.light,
}

/** Errors stay long enough to read; confirmations get out of the way fast. */
const DURATION_BY_KIND: Record<ToastKind, number> = {
    success: 2200,
    error: 3500,
    info: 2600,
}

/**
 * Single app-wide toast renderer (mounted once at the root). Dark pill that
 * slides up above the bottom nav, fires the matching notification haptic, and
 * auto-dismisses — tap to dismiss early. Triggered via `showToast(...)`.
 */
export const ToastHost = () => {
    const toast = useToastStore(s => s.toast)
    const hideInStore = useToastStore(s => s.hide)
    const insets = useSafeAreaInsets()

    const [current, setCurrent] = useState<ToastData | null>(null)
    const progress = useRef(new Animated.Value(0)).current
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const dismiss = useCallback(() => {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        Animated.timing(progress, {
            toValue: 0,
            duration: MOTION.duration.sm,
            easing: MOTION.easing.exit,
            useNativeDriver: true,
        }).start(({finished}) => {
            if (finished) {
                setCurrent(null)
                hideInStore()
            }
        })
    }, [progress, hideInStore])

    useEffect(() => {
        if (!toast) return
        if (hideTimer.current) clearTimeout(hideTimer.current)
        setCurrent(toast)
        HAPTIC_BY_KIND[toast.kind]()
        Animated.timing(progress, {
            toValue: 1,
            duration: MOTION.duration.md,
            easing: MOTION.easing.enter,
            useNativeDriver: true,
        }).start()
        hideTimer.current = setTimeout(dismiss, DURATION_BY_KIND[toast.kind])
        return () => {
            if (hideTimer.current) clearTimeout(hideTimer.current)
        }
    }, [toast, progress, dismiss])

    if (!current) return null

    const translateY = progress.interpolate({inputRange: [0, 1], outputRange: [24, 0]})

    return (
        <View pointerEvents='box-none' style={[styles.wrap, {bottom: insets.bottom + 76}]}>
            <Animated.View style={[styles.toast, {opacity: progress, transform: [{translateY}]}]}>
                <Pressable
                    onPress={dismiss}
                    style={styles.row}
                    accessibilityRole='alert'
                    accessibilityLiveRegion='polite'
                    accessibilityLabel={current.message}>
                    <Icon source={ICON_BY_KIND[current.kind]} size={20} color={COLOR_BY_KIND[current.kind]} />
                    <Text style={styles.message} numberOfLines={2}>
                        {current.message}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
    },
    toast: {
        maxWidth: '90%',
        backgroundColor: themeColors.surfaceDark,
        borderRadius: 14,
        ...shadows.lg,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    message: {
        flexShrink: 1,
        color: themeColors.onDarkHigh,
        fontSize: 14,
        lineHeight: 21,
    },
})
