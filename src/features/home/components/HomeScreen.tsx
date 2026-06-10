import React, {useCallback, useEffect, useState} from 'react'
import {Alert, ScrollView, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {FadeSlideIn, showToast} from '@/global/components'
import {useAppTheme, useVehicleApi} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {MAX_VEHICLES, useAuthStore, useVehicleStore} from '@/global/store'
import type {PartCategory} from '@/global/types'
import {haptics} from '@/global/utils'

import {CategoryGrid} from './categoryGrid'
import {HomeHero} from './homeHero'
import {RecommendedRail} from './recommendedRail'
import {VehicleSwitcherSheet} from './vehicleSwitcher'

const ARABIC_TEXT = {
    DELETE_TITLE: 'حذف المركبة؟',
    DELETE_MESSAGE: 'لا يمكن التراجع عن هذا الإجراء',
    DELETE_CONFIRM: 'حذف',
    DELETE_CANCEL: 'إلغاء',
    DELETE_SUCCESS: 'تم حذف المركبة',
    DELETE_ERROR: 'تعذر حذف المركبة',
}

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

    useEffect(() => {
        fetchVehicles().catch(() => {})
    }, [fetchVehicles])

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
            haptics.selection()
            setActiveVehicle(id).catch(() => {})
            setSwitcherOpen(false)
        },
        [setActiveVehicle]
    )

    const handleDelete = useCallback(
        (id: string) => {
            Alert.alert(ARABIC_TEXT.DELETE_TITLE, ARABIC_TEXT.DELETE_MESSAGE, [
                {text: ARABIC_TEXT.DELETE_CANCEL, style: 'cancel'},
                {
                    text: ARABIC_TEXT.DELETE_CONFIRM,
                    style: 'destructive',
                    onPress: () => {
                        deleteVehicle(id)
                            .then(() => showToast(ARABIC_TEXT.DELETE_SUCCESS, 'success'))
                            .catch(() => showToast(ARABIC_TEXT.DELETE_ERROR, 'error'))
                    },
                },
            ])
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
                <FadeSlideIn delay={0}>
                    <HomeHero
                        userName={userName}
                        vehicle={vehicle}
                        vehicleCount={vehicles.length}
                        onAddVehicle={goAddVehicle}
                        onManageVehicles={() => setSwitcherOpen(true)}
                    />
                </FadeSlideIn>

                <FadeSlideIn delay={90}>
                    <CategoryGrid onSelectCategory={goCategory} onViewAll={goBrowseAll} />
                </FadeSlideIn>

                {vehicle && (
                    <FadeSlideIn delay={180}>
                        <RecommendedRail vehicle={vehicle} onSelectPart={goPart} onViewAll={goBrowseAll} />
                    </FadeSlideIn>
                )}
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
