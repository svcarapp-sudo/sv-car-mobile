import React from 'react'
import {Image, Pressable, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'
import {styles} from './VehicleHeroCard.styles'

const ARABIC_TEXT = {
    MY_VEHICLE: 'مركبتي الحالية',
    MANAGE: 'إدارة',
    COMPATIBLE_LABEL: 'متوافقة',
}

interface VehicleHeroCardProps {
    vehicle: Partial<Vehicle>
    vehicleCount?: number
    onManage: () => void
}

const Spec = ({text}: {text: string}) => (
    <View style={styles.specChip}>
        <Text style={styles.specText}>{text}</Text>
    </View>
)

export const VehicleHeroCard = ({vehicle, vehicleCount = 1, onManage}: VehicleHeroCardProps) => {
    const specs = [vehicle.year && String(vehicle.year), vehicle.fuelType, vehicle.engine].filter(Boolean) as string[]
    const showCount = vehicleCount >= 2

    return (
        <View style={styles.card}>
            <View style={styles.accentEdge} />

            <View style={styles.row}>
                <View style={styles.logoBox}>
                    {vehicle.makeLogoUrl ? (
                        <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                    ) : (
                        <Icon source='car-side' size={30} color={themeColors.primary} />
                    )}
                </View>

                <View style={styles.info}>
                    <View style={styles.labelRow}>
                        <View style={styles.dot} />
                        <Text style={styles.label}>{ARABIC_TEXT.MY_VEHICLE}</Text>
                    </View>
                    <Text style={styles.name} numberOfLines={1}>
                        {vehicle.make} {vehicle.model}
                    </Text>
                    <View style={styles.specsRow}>
                        {specs.slice(0, 3).map(s => (
                            <Spec key={s} text={s} />
                        ))}
                    </View>
                </View>

                <Pressable
                    onPress={onManage}
                    style={({pressed}) => [styles.manageBtn, pressed && styles.manageBtnPressed]}
                    hitSlop={8}
                    accessibilityRole='button'
                    accessibilityLabel={ARABIC_TEXT.MANAGE}>
                    <Icon source='garage-variant' size={16} color={themeColors.onTertiary} />
                    <Text style={styles.manageBtnText}>{ARABIC_TEXT.MANAGE}</Text>
                    {showCount && (
                        <View style={styles.manageCountChip}>
                            <Text style={styles.manageCountText}>{vehicleCount}</Text>
                        </View>
                    )}
                </Pressable>
            </View>

            <View style={styles.footer}>
                <Icon source='shield-check-outline' size={14} color={themeColors.tertiary} />
                <Text style={styles.footerText}>جميع القطع المعروضة {ARABIC_TEXT.COMPATIBLE_LABEL} مع مركبتك</Text>
            </View>
        </View>
    )
}
