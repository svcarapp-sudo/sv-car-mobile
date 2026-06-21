import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'

const T = {EDIT: 'تعديل', DELETE: 'حذف'}

interface VehiclePickerRowProps {
    vehicle: Vehicle
    active: boolean
    onSelect: () => void
    onEdit?: () => void
    onDelete?: () => void
}

/**
 * Selectable vehicle row. A leading ring marks selection (filled amber + check
 * when active); edit/delete appear only when their handlers are provided.
 */
export const VehiclePickerRow = ({vehicle, active, onSelect, onEdit, onDelete}: VehiclePickerRowProps) => {
    const specs = [vehicle.year && String(vehicle.year), vehicle.fuelType, vehicle.engine].filter(Boolean) as string[]

    return (
        <Pressable
            onPress={onSelect}
            style={({pressed}) => [styles.row, active && styles.rowActive, pressed && styles.rowPressed]}
            accessibilityRole='button'
            accessibilityState={{selected: active}}>
            <View style={[styles.ring, active && styles.ringActive]}>
                {active && <Icon source='check' size={15} color={themeColors.onPrimary} />}
            </View>

            <View style={[styles.logoBox, active && styles.logoBoxActive]}>
                {vehicle.makeLogoUrl ? (
                    <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                ) : (
                    <Icon source='car-side' size={22} color={themeColors.primary} />
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {vehicle.make} {vehicle.model}
                </Text>
                <Text style={styles.specs} numberOfLines={1}>
                    {specs.join(' · ')}
                </Text>
            </View>

            {(onEdit || onDelete) && (
                <View style={styles.actions}>
                    {onEdit && (
                        <Pressable
                            onPress={onEdit}
                            hitSlop={8}
                            style={({pressed}) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
                            accessibilityLabel={T.EDIT}>
                            <Icon source='pencil-outline' size={17} color={themeColors.primary} />
                        </Pressable>
                    )}
                    {onDelete && (
                        <Pressable
                            onPress={onDelete}
                            hitSlop={8}
                            style={({pressed}) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
                            accessibilityLabel={T.DELETE}>
                            <Icon source='trash-can-outline' size={17} color={themeColors.error} />
                        </Pressable>
                    )}
                </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 12,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: themeColors.outlineVariant,
        backgroundColor: themeColors.surface,
        marginBottom: 10,
    },
    rowActive: {backgroundColor: themeColors.scrimLight, borderColor: themeColors.primary},
    rowPressed: {opacity: 0.7, transform: [{scale: 0.99}]},
    ring: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: themeColors.outline,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringActive: {backgroundColor: themeColors.primary, borderColor: themeColors.primary},
    logoBox: {
        width: 46,
        height: 46,
        borderRadius: 13,
        backgroundColor: themeColors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBoxActive: {backgroundColor: themeColors.surface},
    logo: {width: 30, height: 30},
    info: {flex: 1},
    name: {fontSize: 15, fontWeight: '700', color: themeColors.onSurface, letterSpacing: -0.2},
    specs: {fontSize: 12, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 2},
    actions: {flexDirection: 'row', alignItems: 'center', gap: 6},
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.surfaceContainerLow,
    },
    iconBtnPressed: {opacity: 0.65, transform: [{scale: 0.92}]},
})
