import React, {useEffect, useMemo, useCallback, useState} from 'react'
import {StyleSheet, View, Animated, TouchableWithoutFeedback, Dimensions, PanResponder, I18nManager} from 'react-native'

import {themeColors} from '@/global/theme'
import {AppHeader} from './AppHeader'
import {AppDrawer} from './AppDrawer'
import {BottomNav} from './bottomNav'
import {useLayoutStore} from './layoutStore'

const {width} = Dimensions.get('window')
const DRAWER_WIDTH = width * 0.7

interface MainLayoutProps {
    children: React.ReactNode
    onLogout?: () => void
}

export const MainLayout = ({children, onLogout}: MainLayoutProps) => {
    const {isDrawerOpen, toggleDrawer} = useLayoutStore()

    const isRTL = I18nManager.isRTL
    // In RTL: drawer at right edge, slides right to hide (positive translateX)
    // In LTR: drawer at left edge, slides left to hide (negative translateX)
    const closedX = isRTL ? DRAWER_WIDTH : -DRAWER_WIDTH
    const openX = 0

    const [drawerAnim] = useState(() => new Animated.Value(isDrawerOpen ? openX : closedX))
    const [backdropAnim] = useState(() => new Animated.Value(isDrawerOpen ? 1 : 0))

    const animateToValue = useCallback(
        (open: boolean) => {
            Animated.parallel([
                Animated.timing(drawerAnim, {
                    toValue: open ? openX : closedX,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropAnim, {
                    toValue: open ? 1 : 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start()
        },
        [drawerAnim, backdropAnim, closedX, openX]
    )

    useEffect(() => {
        animateToValue(isDrawerOpen)
    }, [isDrawerOpen, animateToValue])

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => isDrawerOpen,
                // RTL: drag right (dx > 0) to close; LTR: drag left (dx < 0) to close
                onMoveShouldSetPanResponder: (_, g) => isDrawerOpen && (isRTL ? g.dx > 5 : g.dx < -5),

                onPanResponderMove: (_, g) => {
                    if (isRTL) {
                        // RTL: drag from 0 (open) toward DRAWER_WIDTH (closed)
                        if (g.dx >= 0) {
                            const newX = Math.min(DRAWER_WIDTH, g.dx)
                            drawerAnim.setValue(newX)
                            backdropAnim.setValue(1 - newX / DRAWER_WIDTH)
                        }
                    } else {
                        // LTR: drag from 0 (open) toward -DRAWER_WIDTH (closed)
                        if (g.dx <= 0) {
                            const newX = Math.max(-DRAWER_WIDTH, g.dx)
                            drawerAnim.setValue(newX)
                            backdropAnim.setValue(1 - Math.abs(newX) / DRAWER_WIDTH)
                        }
                    }
                },

                onPanResponderRelease: (_, g) => {
                    const distance = isRTL ? g.dx : -g.dx
                    const velocity = isRTL ? g.vx : -g.vx
                    const shouldClose = distance > DRAWER_WIDTH / 3 || velocity > 0.5

                    animateToValue(!shouldClose)

                    if (shouldClose) {
                        toggleDrawer(false)
                    }
                },
            }),
        [isDrawerOpen, isRTL, drawerAnim, backdropAnim, animateToValue, toggleDrawer]
    )

    return (
        <View style={styles.container}>
            <AppHeader />
            <View style={styles.content}>{children}</View>
            <BottomNav />

            {/* Backdrop */}
            <Animated.View pointerEvents={isDrawerOpen ? 'auto' : 'none'} style={[styles.backdrop, {opacity: backdropAnim}]}>
                <TouchableWithoutFeedback onPress={() => toggleDrawer(false)}>
                    <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>
            </Animated.View>

            {/* Drawer */}
            <Animated.View
                {...panResponder.panHandlers}
                pointerEvents={isDrawerOpen ? 'auto' : 'none'}
                style={[styles.drawerContainer, {transform: [{translateX: drawerAnim}]}]}>
                <AppDrawer onClose={() => toggleDrawer(false)} onLogout={onLogout} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    content: {
        flex: 1,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: themeColors.backdrop,
        zIndex: 99,
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        start: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        zIndex: 100,
        elevation: 16,
    },
})
