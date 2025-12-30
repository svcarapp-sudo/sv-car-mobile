import {useEffect, useMemo} from 'react'

import {StyleSheet, View, Animated, Easing} from 'react-native'

import {Text, useTheme} from 'react-native-paper'

import type {RootStackParamList} from '../navigation/types'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

interface LaunchScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Launch'>
}

export const LaunchScreen = ({navigation}: LaunchScreenProps) => {
    const theme = useTheme()

    // Animation values
    const fadeAnim = useMemo(() => new Animated.Value(0), [])
    const scaleAnim = useMemo(() => new Animated.Value(0.85), [])
    const translateYAnim = useMemo(() => new Animated.Value(20), [])
    const rotateAnim = useMemo(() => new Animated.Value(0), [])

    useEffect(() => {
        // Main entrance sequence
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
        ]).start()

        // Rotating gear/loader animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start()

        const timer = setTimeout(() => {
            navigation.replace('Main')
        }, 3000)

        return () => clearTimeout(timer)
    }, [fadeAnim, scaleAnim, translateYAnim, rotateAnim, navigation])

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
            <Animated.View
                style={[
                    styles.logoWrapper,
                    {
                        opacity: fadeAnim,
                        transform: [{scale: scaleAnim}, {translateY: translateYAnim}],
                    },
                ]}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        SV-<Text style={{color: theme.colors.tertiary}}>CAR</Text>
                    </Text>
                    <View style={[styles.accentBar, {backgroundColor: theme.colors.tertiary}]} />
                </View>

                <Text style={[styles.tagline, {color: theme.colors.onPrimary}]}>ULTIMATE PARTS & SERVICES</Text>
            </Animated.View>

            {/* Custom Automotive Loader */}
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
                <Text style={[styles.loadingText, {color: theme.colors.onPrimary}]}>INITIALIZING SYSTEMS...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logoWrapper: {
        alignItems: 'center',
        zIndex: 10,
        marginTop: -100, // Move upwards from center
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 54,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1.5,
        lineHeight: 52,
    },
    accentBar: {
        height: 5,
        width: 140,
        marginTop: 4,
        borderRadius: 2.5,
    },
    tagline: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 6,
        marginTop: 16,
        opacity: 0.9,
    },
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
