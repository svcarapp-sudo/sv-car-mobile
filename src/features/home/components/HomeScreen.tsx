import React, {useEffect, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {useAppTheme, useVehicleApi} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {useAuthStore, useVehicleStore} from '@/global/store'
import type {PartCategory} from '@/global/types'

import {CategoryGrid} from './categoryGrid'
import {HomeHero} from './homeHero'
import {QuickActions} from './quickActions'
import {RecommendedRail} from './recommendedRail'

interface HomeScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const theme = useAppTheme()
    const vehicle = useVehicleStore(s => s.vehicle)
    const userName = useAuthStore(s => s.user?.name)
    const {fetchVehicle} = useVehicleApi()

    const fade = useRef(new Animated.Value(0)).current
    const slide = useRef(new Animated.Value(16)).current

    useEffect(() => {
        if (!vehicle) fetchVehicle().catch(() => {})
    }, [vehicle, fetchVehicle])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {toValue: 1, duration: 480, useNativeDriver: true}),
            Animated.timing(slide, {toValue: 0, duration: 480, useNativeDriver: true}),
        ]).start()
    }, [fade, slide])

    const goAddVehicle = () => navigation?.navigate('AddVehicle')
    const goEditVehicle = () => navigation?.navigate('AddVehicle', vehicle ? {vehicleId: vehicle.id} : undefined)
    const goCategory = (category: PartCategory) => navigation?.navigate('PartsList', {category})
    const goBrowseAll = () => navigation?.navigate('PartsList', {category: null})
    const goPart = (partId: string) => navigation?.navigate('PartDetail', {partId})
    const goMyParts = () => navigation?.navigate('MyParts')
    const goAddPart = () => navigation?.navigate('AddPart')
    const goMyAccount = () => navigation?.navigate('MyAccount')

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces>
                <Animated.View style={{opacity: fade, transform: [{translateY: slide}]}}>
                    <HomeHero userName={userName} vehicle={vehicle} onAddVehicle={goAddVehicle} onChangeVehicle={goEditVehicle} />

                    <QuickActions onMyParts={goMyParts} onAddPart={goAddPart} onViewAll={goBrowseAll} onMyAccount={goMyAccount} />

                    <CategoryGrid onSelectCategory={goCategory} onViewAll={goBrowseAll} />

                    {vehicle && <RecommendedRail vehicle={vehicle} onSelectPart={goPart} onViewAll={goBrowseAll} />}
                </Animated.View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    scroll: {flex: 1},
    scrollContent: {paddingBottom: 40},
})
