import React, {useState} from 'react'
import {StyleSheet, View, type LayoutChangeEvent} from 'react-native'

import type {Vehicle} from '@/global/types'
import {HomeGreeting} from './HomeGreeting'
import {HomeHeroBackdrop} from './HomeHeroBackdrop'
import {VehicleEmptyHeroCard} from './VehicleEmptyHeroCard'
import {VehicleHeroCard} from './VehicleHeroCard'

/** Initial backdrop height — replaced once the real hero measures via onLayout. */
const INITIAL_HEIGHT = 300

interface HomeHeroProps {
    userName?: string | null
    vehicle: Partial<Vehicle> | null
    onAddVehicle: () => void
    onChangeVehicle: () => void
}

export const HomeHero = ({userName, vehicle, onAddVehicle, onChangeVehicle}: HomeHeroProps) => {
    const [height, setHeight] = useState(INITIAL_HEIGHT)

    const onLayout = (e: LayoutChangeEvent) => {
        const next = e.nativeEvent.layout.height
        if (Math.abs(next - height) > 0.5) setHeight(next)
    }

    return (
        <View style={styles.wrapper} onLayout={onLayout}>
            <HomeHeroBackdrop height={height} />

            <View style={styles.content}>
                <HomeGreeting name={userName} />

                {vehicle ? (
                    <VehicleHeroCard vehicle={vehicle} onChangeVehicle={onChangeVehicle} />
                ) : (
                    <VehicleEmptyHeroCard onAddVehicle={onAddVehicle} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 4,
        paddingBottom: 56,
        position: 'relative',
        zIndex: 1,
    },
})
