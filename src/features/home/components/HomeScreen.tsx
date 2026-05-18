import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {useAppTheme, useVehicleApi} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {MAX_VEHICLES, useAuthStore, useVehicleStore} from '@/global/store'
import type {PartCategory} from '@/global/types'

import {CategoryGrid} from './categoryGrid'
import {HomeHero} from './homeHero'
import {RecommendedRail} from './recommendedRail'
import {VehicleSwitcherSheet} from './vehicleSwitcher'

interface HomeScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const theme = useAppTheme()
    const vehicle = useVehicleStore(s => s.vehicle)
    const vehicles = useVehicleStore(s => s.vehicles)
    const activeVehicleId = useVehicleStore(s => s.activeVehicleId)
    const userName = useAuthStore(s => s.user?.name)
    const {fetchVehicles, setActiveVehicle, deleteVehicle} = useVehicleApi()

    const [switcherOpen, setSwitcherOpen] = useState(false)
    const fade = useRef(new Animated.Value(0)).current
    const slide = useRef(new Animated.Value(16)).current

    useEffect(() => {
        fetchVehicles().catch(() => {})
    }, [fetchVehicles])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {toValue: 1, duration: 480, useNativeDriver: true}),
            Animated.timing(slide, {toValue: 0, duration: 480, useNativeDriver: true}),
        ]).start()
    }, [fade, slide])

    const goAddVehicle = useCallback(() => {
        setSwitcherOpen(false)
        navigation?.navigate('AddVehicle')
    }, [navigation])

    const goEditVehicle = useCallback(
        (id?: string) => {
            setSwitcherOpen(false)
            const targetId = id ?? vehicle?.id
            navigation?.navigate('AddVehicle', targetId ? {vehicleId: targetId} : undefined)
        },
        [navigation, vehicle?.id]
    )

    const goCategory = (category: PartCategory) => navigation?.navigate('PartsList', {category})
    const goBrowseAll = () => navigation?.navigate('PartsList', {category: null})
    const goPart = (partId: string) => navigation?.navigate('PartDetail', {partId})

    const handleSwitch = useCallback(
        (id: string) => {
            setActiveVehicle(id).catch(() => {})
            setSwitcherOpen(false)
        },
        [setActiveVehicle]
    )

    const handleDelete = useCallback(
        (id: string) => {
            deleteVehicle(id).catch(() => {})
        },
        [deleteVehicle]
    )

    const canAdd = vehicles.length < MAX_VEHICLES
    const handleAddFromSwitcher = () => {
        if (canAdd) goAddVehicle()
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces>
                <Animated.View style={{opacity: fade, transform: [{translateY: slide}]}}>
                    <HomeHero
                        userName={userName}
                        vehicle={vehicle}
                        vehicleCount={vehicles.length}
                        onAddVehicle={goAddVehicle}
                        onManageVehicles={() => setSwitcherOpen(true)}
                    />

                    <CategoryGrid onSelectCategory={goCategory} onViewAll={goBrowseAll} />

                    {vehicle && <RecommendedRail vehicle={vehicle} onSelectPart={goPart} onViewAll={goBrowseAll} />}
                </Animated.View>
            </ScrollView>

            <VehicleSwitcherSheet
                visible={switcherOpen}
                onClose={() => setSwitcherOpen(false)}
                vehicles={vehicles}
                activeVehicleId={activeVehicleId}
                onSelect={handleSwitch}
                onEdit={goEditVehicle}
                onDelete={handleDelete}
                onAdd={handleAddFromSwitcher}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    scroll: {flex: 1},
    scrollContent: {paddingBottom: 40},
})
