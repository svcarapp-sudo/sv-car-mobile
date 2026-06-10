import {useEffect, useMemo} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

interface LaunchGearProps {
    caption: string
}

/** Rotating automotive gear loader shown at the bottom of the launch screen. */
export const LaunchGear = ({caption}: LaunchGearProps) => {
    const theme = useAppTheme()
    const rotateAnim = useMemo(() => new Animated.Value(0), [])

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        )
        loop.start()
        return () => loop.stop()
    }, [rotateAnim])

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <View style={styles.loaderContainer}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
                <View style={[styles.gear, {borderColor: theme.colors.tertiary}]}>
                    {['0deg', '45deg', '90deg', '135deg'].map(deg => (
                        <View
                            key={deg}
                            style={[styles.gearTooth, {backgroundColor: theme.colors.tertiary, transform: [{rotate: deg}]}]}
                        />
                    ))}
                </View>
            </Animated.View>
            <Text style={[styles.loadingText, {color: theme.colors.onPrimary}]}>{caption}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        bottom: 80,
        alignItems: 'center',
    },
    gear: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gearTooth: {
        position: 'absolute',
        width: 4,
        height: 36,
        borderRadius: 2,
    },
    loadingText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        marginTop: 20,
        opacity: 0.6,
    },
})
