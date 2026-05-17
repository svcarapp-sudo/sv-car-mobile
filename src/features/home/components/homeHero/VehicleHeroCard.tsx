import React from 'react'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'

const ARABIC_TEXT = {
    MY_VEHICLE: 'مركبتي الحالية',
    EDIT: 'تعديل',
    COMPATIBLE_LABEL: 'متوافقة',
}

interface VehicleHeroCardProps {
    vehicle: Partial<Vehicle>
    onChangeVehicle: () => void
}

const Spec = ({text}: {text: string}) => (
    <View style={styles.specChip}>
        <Text style={styles.specText}>{text}</Text>
    </View>
)

export const VehicleHeroCard = ({vehicle, onChangeVehicle}: VehicleHeroCardProps) => {
    const specs = [vehicle.year && String(vehicle.year), vehicle.fuelType, vehicle.engine].filter(Boolean) as string[]

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
                    onPress={onChangeVehicle}
                    style={({pressed}) => [styles.editBtn, pressed && styles.editBtnPressed]}
                    hitSlop={8}
                    accessibilityLabel={ARABIC_TEXT.EDIT}>
                    <Icon source='pencil-outline' size={18} color={themeColors.primary} />
                </Pressable>
            </View>

            <View style={styles.footer}>
                <Icon source='shield-check-outline' size={14} color={themeColors.tertiary} />
                <Text style={styles.footerText}>جميع القطع المعروضة {ARABIC_TEXT.COMPATIBLE_LABEL} مع مركبتك</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
        backgroundColor: themeColors.surface,
        paddingTop: 16,
        paddingBottom: 12,
        paddingHorizontal: 14,
        overflow: 'hidden',
        ...shadows.lg,
    },
    accentEdge: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        end: 0,
        width: 4,
        backgroundColor: themeColors.tertiary,
        opacity: 0.95,
    },
    row: {flexDirection: 'row', alignItems: 'center'},
    logoBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: themeColors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 12,
    },
    logo: {width: 36, height: 36},
    info: {flex: 1, marginEnd: 8},
    labelRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2},
    dot: {width: 5, height: 5, borderRadius: 3, backgroundColor: themeColors.tertiary},
    label: {fontSize: 11, fontWeight: '600', letterSpacing: 0.4, color: themeColors.onSurfaceVariant},
    name: {fontSize: 18, fontWeight: '700', letterSpacing: -0.3, color: themeColors.onSurface, marginBottom: 6},
    specsRow: {flexDirection: 'row', gap: 6, flexWrap: 'wrap'},
    specChip: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        backgroundColor: themeColors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
    },
    specText: {fontSize: 11, fontWeight: '600', color: themeColors.onSurfaceVariant},
    editBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: themeColors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editBtnPressed: {opacity: 0.7, transform: [{scale: 0.96}]},
    footer: {
        marginTop: 14,
        paddingTop: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: themeColors.outlineVariant,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {fontSize: 11.5, fontWeight: '500', color: themeColors.onSurfaceVariant, flex: 1},
})
