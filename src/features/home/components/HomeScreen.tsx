import React, {useEffect, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import {Text, useTheme, Icon} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import type {RootStackParamList} from '@/global/navigation/types'
import {useParts, useVehicleApi} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import {useVehicles} from '../hooks'
import type {PartCategory} from '@/global/types'
import {EmptyState} from './EmptyState'
import {VehicleSummary} from './VehicleSummary'
import {CategoryGrid} from './CategoryGrid'

const ARABIC_TEXT = {
    GOOD_MORNING: 'صباح الخير',
    GOOD_EVENING: 'مساء الخير',
    FIND_PARTS: 'ابحث عن قطع الغيار المناسبة لسيارتك',
}

const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return ARABIC_TEXT.GOOD_MORNING
    return ARABIC_TEXT.GOOD_EVENING
}

interface HomeScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const {vehicle} = useVehicles()
    const {selectCategory} = useParts()
    const {fetchVehicle} = useVehicleApi()
    const user = useAuthStore(s => s.user)
    const theme = useTheme()

    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current

    useEffect(() => {
        if (!vehicle) {
            fetchVehicle().catch(() => {})
        }
    }, [vehicle, fetchVehicle])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start()
    }, [fadeAnim, slideAnim])

    const handleAddVehicle = () => navigation?.navigate('AddVehicle')
    const handleChangeVehicle = () => navigation?.navigate('AddVehicle', vehicle ? {vehicleId: vehicle.id} : undefined)
    const handleSelectCategory = (category: PartCategory) => {
        selectCategory(category)
        navigation?.navigate('PartsList', {category})
    }
    const handleViewAllParts = () => {
        selectCategory(null)
        navigation?.navigate('PartsList', {category: null})
    }
    const greeting = getTimeGreeting()
    const userName = user?.name

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces>
                <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
                    {/* Greeting Section */}
                    <View style={styles.greetingSection}>
                        <View style={styles.greetingContent}>
                            <Text variant='headlineMedium' style={[styles.greetingText, {color: theme.colors.onSurface}]}>
                                {greeting}
                                {userName ? ` ${userName}` : ''}
                            </Text>
                            <Text variant='bodyLarge' style={[styles.subtitleText, {color: theme.colors.onSurfaceVariant}]}>
                                {ARABIC_TEXT.FIND_PARTS}
                            </Text>
                        </View>
                        <View style={[styles.greetingBadge, {backgroundColor: theme.colors.tertiary}]}>
                            <Icon source='steering' size={26} color='#000' />
                        </View>
                    </View>

                    {!vehicle ? (
                        <EmptyState onAddVehicle={handleAddVehicle} />
                    ) : (
                        <>
                            <VehicleSummary vehicle={vehicle} onChangeVehicle={handleChangeVehicle} />
                            <CategoryGrid onSelectCategory={handleSelectCategory} onViewAll={handleViewAllParts} />
                        </>
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 40,
    },
    greetingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
        paddingHorizontal: 4,
    },
    greetingContent: {
        flex: 1,
    },
    greetingText: {
        fontWeight: '700',
        letterSpacing: -0.5,
        marginBottom: 6,
        lineHeight: 36,
    },
    subtitleText: {
        letterSpacing: 0.15,
        lineHeight: 22,
        opacity: 0.75,
    },
    greetingBadge: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 16,
    },
})
