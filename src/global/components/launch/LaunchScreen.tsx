import {useEffect, useMemo} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {useAuthStore} from '@/global/store'

import type {RootStackParamList} from '../../navigation/types'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {LaunchGear} from './LaunchGear'

/** Brand moment, kept short — content beats splash time (Apple HIG). */
const LAUNCH_DURATION_MS = 1600

interface LaunchScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Launch'>
}

export const LaunchScreen = ({navigation}: LaunchScreenProps) => {
    const theme = useAppTheme()
    const isAuthenticated = useAuthStore(s => s.isAuthenticated)
    const hasSeenOnboarding = useAuthStore(s => s.hasSeenOnboarding)

    const fadeAnim = useMemo(() => new Animated.Value(0), [])
    const scaleAnim = useMemo(() => new Animated.Value(0.85), [])
    const translateYAnim = useMemo(() => new Animated.Value(20), [])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
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
                duration: 800,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
        ]).start()

        const timer = setTimeout(() => {
            if (isAuthenticated) {
                navigation.replace('Main')
            } else if (!hasSeenOnboarding) {
                navigation.replace('Onboarding')
            } else {
                navigation.replace('Login')
            }
        }, LAUNCH_DURATION_MS)

        return () => clearTimeout(timer)
    }, [fadeAnim, scaleAnim, translateYAnim, navigation, isAuthenticated, hasSeenOnboarding])

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

            <LaunchGear caption='INITIALIZING SYSTEMS...' />
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
        color: themeColors.onPrimary,
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
})
