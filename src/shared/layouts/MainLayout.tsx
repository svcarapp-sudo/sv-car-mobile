import {useEffect, useMemo, useCallback} from 'react'

import {StyleSheet, View, Animated, TouchableWithoutFeedback, Dimensions, PanResponder} from 'react-native'

import {AppDrawer} from './AppDrawer'
import {BottomNav} from './BottomNav'
import {useLayoutStore} from './layoutStore'

const {width} = Dimensions.get('window')
const DRAWER_WIDTH = width * 0.7

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = ({children}: MainLayoutProps) => {
    const {isDrawerOpen, toggleDrawer} = useLayoutStore()

    // Using useMemo for stable Animated values
    const drawerAnim = useMemo(() => new Animated.Value(-DRAWER_WIDTH), [])
    const backdropAnim = useMemo(() => new Animated.Value(0), [])

    const animateToValue = useCallback(
        (open: boolean) => {
            const toValue = open ? 0 : -DRAWER_WIDTH
            const backdropToValue = open ? 1 : 0

            Animated.parallel([
                Animated.timing(drawerAnim, {
                    toValue,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropAnim, {
                    toValue: backdropToValue,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                if (!open && isDrawerOpen) {
                    toggleDrawer(false)
                }
            })
        },
        [drawerAnim, backdropAnim, isDrawerOpen, toggleDrawer]
    )

    useEffect(() => {
        animateToValue(isDrawerOpen)
    }, [isDrawerOpen, animateToValue])

    // PanResponder for drag-to-close
    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => isDrawerOpen,
                onMoveShouldSetPanResponder: (_, gestureState) => {
                    return isDrawerOpen && Math.abs(gestureState.dx) > 5
                },
                onPanResponderMove: (_, gestureState) => {
                    if (gestureState.dx < 0) {
                        const newX = Math.max(-DRAWER_WIDTH, gestureState.dx)
                        drawerAnim.setValue(newX)
                        const progress = (DRAWER_WIDTH + newX) / DRAWER_WIDTH
                        backdropAnim.setValue(progress)
                    }
                },
                onPanResponderRelease: (_, gestureState) => {
                    if (gestureState.dx < -DRAWER_WIDTH / 4 || gestureState.vx < -0.3) {
                        animateToValue(false)
                    } else {
                        animateToValue(true)
                    }
                },
            }),
        [isDrawerOpen, drawerAnim, backdropAnim, animateToValue]
    )

    return (
        <View style={styles.container}>
            <View style={styles.content}>{children}</View>

            <BottomNav />

            {/* Backdrop - Always in tree but pointerEvents handles touchability */}
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
                <AppDrawer onClose={() => toggleDrawer(false)} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingBottom: 60, // BottomNav height
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99,
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        zIndex: 100,
        elevation: 16,
    },
})
