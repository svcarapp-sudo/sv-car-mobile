import {useEffect, useMemo, useCallback, useState} from 'react'
import {StyleSheet, View, Animated, TouchableWithoutFeedback, Dimensions, PanResponder} from 'react-native'

import {AppDrawer} from './AppDrawer'
import {BottomNav} from './BottomNav'
import {useLayoutStore} from './layoutStore'

const {width} = Dimensions.get('window')
const DRAWER_WIDTH = width * 0.7
const CLOSED_X = DRAWER_WIDTH
const OPEN_X = 0

interface MainLayoutProps {
    children: React.ReactNode
    onLogout?: () => void
}

export const MainLayout = ({children, onLogout}: MainLayoutProps) => {
    const {isDrawerOpen, toggleDrawer} = useLayoutStore()

    const [drawerAnim] = useState(() => new Animated.Value(isDrawerOpen ? OPEN_X : CLOSED_X))
    const [backdropAnim] = useState(() => new Animated.Value(isDrawerOpen ? 1 : 0))

    const animateToValue = useCallback(
        (open: boolean) => {
            Animated.parallel([
                Animated.timing(drawerAnim, {
                    toValue: open ? OPEN_X : CLOSED_X,
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
        [drawerAnim, backdropAnim]
    )

    useEffect(() => {
        animateToValue(isDrawerOpen)
    }, [isDrawerOpen, animateToValue])

    // Drag to close (drag right)
    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => isDrawerOpen,
                onMoveShouldSetPanResponder: (_, g) => isDrawerOpen && g.dx > 5,

                onPanResponderMove: (_, g) => {
                    if (g.dx >= 0) {
                        const newX = Math.min(DRAWER_WIDTH, g.dx)
                        drawerAnim.setValue(newX)

                        const progress = 1 - newX / DRAWER_WIDTH
                        backdropAnim.setValue(progress)
                    }
                },

                onPanResponderRelease: (_, g) => {
                    const shouldClose = g.dx > DRAWER_WIDTH / 3 || g.vx > 0.5

                    animateToValue(!shouldClose)

                    if (shouldClose) {
                        toggleDrawer(false)
                    }
                },
            }),
        [isDrawerOpen, drawerAnim, backdropAnim, animateToValue, toggleDrawer]
    )

    return (
        <View style={styles.container}>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
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
