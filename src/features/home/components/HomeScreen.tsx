import React, {useEffect, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import {useAppTheme} from '@/global/hooks'
import type {NavigationProp} from '@react-navigation/native'

import type {RootStackParamList} from '@/global/navigation/types'
import {useParts, useVehicleApi} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import {useVehicles} from '../hooks'
import type {PartCategory} from '@/global/types'
import {GreetingSection} from './GreetingSection'
import {EmptyState} from './EmptyState'
import {VehicleSummary} from './VehicleSummary'
import {CategoryGrid} from './CategoryGrid'

interface HomeScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const {vehicle} = useVehicles()
    const {selectCategory} = useParts()
    const {fetchVehicle} = useVehicleApi()
    const user = useAuthStore(s => s.user)
    const theme = useAppTheme()

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

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces>
                <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
                    <GreetingSection userName={user?.name} />

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
})
