import React from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import type {Vehicle} from '@/global/types'

const ARABIC_TEXT = {
    MY_VEHICLE: 'مركبتي',
    CHANGE: 'تغيير',
    FILTERED_HINT: 'جميع القطع تظهر حسب مركبتك',
}

interface VehicleSummaryProps {
    vehicle: Partial<Vehicle>
    onChangeVehicle: () => void
}

export const VehicleSummary = ({vehicle, onChangeVehicle}: VehicleSummaryProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.wrapper}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.content}>
                    {/* Logo */}
                    <View style={[styles.logoBox, {backgroundColor: theme.colors.primaryContainer}]}>
                        {vehicle.makeLogoUrl ? (
                            <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                        ) : (
                            <Icon source='car-side' size={24} color={theme.colors.primary} />
                        )}
                    </View>

                    {/* Info */}
                    <View style={styles.info}>
                        <Text style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.MY_VEHICLE}</Text>
                        <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                        <View style={styles.specs}>
                            {vehicle.year && <SpecTag text={String(vehicle.year)} theme={theme} />}
                            {vehicle.fuelType && <SpecTag text={vehicle.fuelType} theme={theme} />}
                            {vehicle.engine && <SpecTag text={vehicle.engine} theme={theme} />}
                        </View>
                    </View>

                    {/* Change button */}
                    <TouchableOpacity
                        style={[styles.changeBtn, {backgroundColor: theme.colors.primaryContainer}]}
                        onPress={onChangeVehicle}
                        activeOpacity={0.7}>
                        <Icon source='pencil-outline' size={14} color={theme.colors.primary} />
                        <Text style={[styles.changeText, {color: theme.colors.primary}]}>{ARABIC_TEXT.CHANGE}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filter hint below card */}
            <View style={styles.hintRow}>
                <Icon source='filter-check-outline' size={14} color={theme.colors.tertiary} />
                <Text style={[styles.hintText, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.FILTERED_HINT}</Text>
            </View>
        </View>
    )
}

const SpecTag = ({text, theme}: {text: string; theme: ReturnType<typeof useAppTheme>}) => (
    <View style={[specStyles.tag, {backgroundColor: theme.colors.surfaceVariant}]}>
        <Text style={[specStyles.text, {color: theme.colors.onSurfaceVariant}]}>{text}</Text>
    </View>
)

const specStyles = StyleSheet.create({
    tag: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6},
    text: {fontSize: 11, fontWeight: '500'},
})

const styles = StyleSheet.create({
    wrapper: {marginBottom: 16},
    card: {
        borderRadius: 16,
        ...shadows.md,
    },
    content: {flexDirection: 'row', alignItems: 'center', padding: 14},
    logoBox: {width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginEnd: 12},
    logo: {width: 28, height: 28},
    info: {flex: 1, marginEnd: 10},
    label: {fontSize: 10, fontWeight: '500', letterSpacing: 0.3, marginBottom: 1},
    name: {fontSize: 17, fontWeight: '700', letterSpacing: -0.2, marginBottom: 6},
    specs: {flexDirection: 'row', gap: 5, flexWrap: 'wrap'},
    changeBtn: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10},
    changeText: {fontSize: 11, fontWeight: '600'},
    hintRow: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8, paddingHorizontal: 4},
    hintText: {fontSize: 12, fontWeight: '500'},
})
