import React, {useEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Text, useTheme} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import type {RootStackParamList} from '@/global/navigation/types'
import {useVehicles, useParts} from '@/global/hooks'
import type {PartCategory} from '@/global/types'
import {useVehicleApi} from '@/features/addVehicle/hooks'
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
    const theme = useTheme()

    useEffect(() => {
        if (!vehicle) {
            fetchVehicle().catch(() => {})
        }
    }, [vehicle, fetchVehicle])

    const handleAddVehicle = () => {
        navigation?.navigate('AddVehicle')
    }

    const handleChangeVehicle = () => {
        navigation?.navigate('AddVehicle', vehicle ? {vehicleId: vehicle.id} : undefined)
    }

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
                <View style={styles.header}>
                    <Text variant='headlineSmall' style={[styles.welcomeText, {color: theme.colors.onSurface}]}>
                        مرحباً بك
                    </Text>
                    <Text variant='bodyLarge' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                        ابحث عن قطع الغيار المناسبة لسيارتك
                    </Text>
                </View>

                {!vehicle ? (
                    <EmptyState onAddVehicle={handleAddVehicle} />
                ) : (
                    <>
                        <VehicleSummary vehicle={vehicle} onChangeVehicle={handleChangeVehicle} />
                        <CategoryGrid onSelectCategory={handleSelectCategory} onViewAll={handleViewAllParts} />
                    </>
                )}
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
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    welcomeText: {
        fontWeight: '400',
        letterSpacing: 0,
        marginBottom: 8,
        lineHeight: 32,
    },
    subtitle: {
        marginTop: 0,
        letterSpacing: 0.5,
        lineHeight: 20,
        opacity: 0.87,
    },
})
