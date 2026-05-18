import React from 'react'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'

const ARABIC_TEXT = {
    ACTIVE: 'الحالية',
    EDIT: 'تعديل',
    DELETE: 'حذف',
}

interface VehicleSwitcherRowProps {
    vehicle: Vehicle
    active: boolean
    onSelect: () => void
    onEdit: () => void
    onDelete?: () => void
}

export const VehicleSwitcherRow = ({vehicle, active, onSelect, onEdit, onDelete}: VehicleSwitcherRowProps) => {
    const specs = [vehicle.year && String(vehicle.year), vehicle.fuelType, vehicle.engine].filter(Boolean) as string[]

    return (
        <Pressable
            onPress={onSelect}
            style={({pressed}) => [styles.row, active && styles.rowActive, pressed && styles.rowPressed]}
            accessibilityRole='button'
            accessibilityState={{selected: active}}>
            {active && <View style={styles.startBar} />}

            <View style={[styles.logoBox, active && styles.logoBoxActive]}>
                {vehicle.makeLogoUrl ? (
                    <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                ) : (
                    <Icon source='car-side' size={22} color={themeColors.primary} />
                )}
            </View>

            <View style={styles.info}>
                <View style={styles.titleRow}>
                    <Text style={styles.name} numberOfLines={1}>
                        {vehicle.make} {vehicle.model}
                    </Text>
                    {active && (
                        <View style={styles.activePill}>
                            <Icon source='check-circle' size={11} color={themeColors.onTertiary} />
                            <Text style={styles.activePillText}>{ARABIC_TEXT.ACTIVE}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.specs} numberOfLines={1}>
                    {specs.join(' · ')}
                </Text>
            </View>

            <View style={styles.actions}>
                <Pressable
                    onPress={onEdit}
                    hitSlop={6}
                    style={({pressed}) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
                    accessibilityLabel={ARABIC_TEXT.EDIT}>
                    <Icon source='pencil-outline' size={16} color={themeColors.primary} />
                </Pressable>
                {onDelete && (
                    <Pressable
                        onPress={onDelete}
                        hitSlop={6}
                        style={({pressed}) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
                        accessibilityLabel={ARABIC_TEXT.DELETE}>
                        <Icon source='trash-can-outline' size={16} color={themeColors.error} />
                    </Pressable>
                )}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        gap: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        backgroundColor: themeColors.surface,
        marginBottom: 10,
        overflow: 'hidden',
    },
    rowActive: {backgroundColor: themeColors.accentSubtle, borderColor: themeColors.accentBorder},
    rowPressed: {opacity: 0.7, transform: [{scale: 0.99}]},
    startBar: {position: 'absolute', start: 0, top: 0, bottom: 0, width: 3, backgroundColor: themeColors.tertiary},
    logoBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: themeColors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBoxActive: {backgroundColor: themeColors.surface},
    logo: {width: 28, height: 28},
    info: {flex: 1},
    titleRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2},
    name: {fontSize: 15, fontWeight: '700', color: themeColors.onSurface, letterSpacing: -0.2, flexShrink: 1},
    activePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: themeColors.tertiary,
    },
    activePillText: {fontSize: 10, fontWeight: '700', color: themeColors.onTertiary},
    specs: {fontSize: 12, fontWeight: '500', color: themeColors.onSurfaceVariant},
    actions: {flexDirection: 'row', alignItems: 'center', gap: 4},
    iconBtn: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.surfaceContainerLow,
    },
    iconBtnPressed: {opacity: 0.65, transform: [{scale: 0.92}]},
})
