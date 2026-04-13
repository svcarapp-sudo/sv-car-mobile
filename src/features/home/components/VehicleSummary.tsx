import React from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'

const ARABIC_TEXT = {
    MY_VEHICLE: 'مركبتي',
    CHANGE: 'تغيير',
    BROWSE_PARTS: 'تصفح قطع الغيار المتوافقة',
}

interface VehicleSummaryProps {
    vehicle: Partial<Vehicle>
    onChangeVehicle: () => void
}

export const VehicleSummary = ({vehicle, onChangeVehicle}: VehicleSummaryProps) => {
    const theme = useAppTheme()
    const displayName = vehicle.displayName || `${vehicle.make} ${vehicle.model}`

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outline}]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={[styles.headerDot, {backgroundColor: theme.colors.tertiary}]} />
                    <Text style={[styles.headerLabel, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.MY_VEHICLE}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.changeBtn, {backgroundColor: theme.colors.tertiary}]}
                    onPress={onChangeVehicle}
                    activeOpacity={0.75}>
                    <Icon source="pencil-outline" size={13} color={theme.colors.onTertiary} />
                    <Text style={[styles.changeText, {color: theme.colors.onTertiary}]}>{ARABIC_TEXT.CHANGE}</Text>
                </TouchableOpacity>
            </View>

            {/* Main */}
            <View style={styles.main}>
                <View style={[styles.logoBox, {backgroundColor: theme.colors.surfaceVariant}]}>
                    {vehicle.makeLogoUrl ? (
                        <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode="contain" />
                    ) : (
                        <Icon source="car-side" size={28} color={theme.colors.primary} />
                    )}
                </View>

                <View style={styles.details}>
                    <Text style={[styles.vehicleName, {color: theme.colors.onSurface}]} numberOfLines={1}>
                        {displayName}
                    </Text>

                    <View style={styles.specs}>
                        {vehicle.year && (
                            <View style={[styles.specChip, {backgroundColor: theme.colors.primaryContainer}]}>
                                <Icon source="calendar-outline" size={11} color={theme.colors.primary} />
                                <Text style={[styles.specText, {color: theme.colors.primary}]}>{vehicle.year}</Text>
                            </View>
                        )}
                        {vehicle.fuelType && (
                            <View style={[styles.specChip, {backgroundColor: theme.colors.accentContainer}]}>
                                <Icon source="gas-station-outline" size={11} color={theme.colors.tertiary} />
                                <Text style={[styles.specText, {color: theme.colors.tertiary}]}>{vehicle.fuelType}</Text>
                            </View>
                        )}
                        {vehicle.engine && (
                            <View style={[styles.specChip, {backgroundColor: theme.colors.surfaceVariant}]}>
                                <Icon source="engine-outline" size={11} color={theme.colors.onSurfaceVariant} />
                                <Text style={[styles.specText, {color: theme.colors.onSurfaceVariant}]}>{vehicle.engine}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={[styles.footer, {backgroundColor: theme.colors.surfaceVariant}]}>
                <Icon source="information-outline" size={14} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.footerText, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.BROWSE_PARTS}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: StyleSheet.hairlineWidth,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 4,
    },
    headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 6},
    headerDot: {width: 6, height: 6, borderRadius: 3},
    headerLabel: {fontSize: 12, fontWeight: '600', letterSpacing: 0.3},
    changeBtn: {flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10},
    changeText: {fontSize: 12, fontWeight: '700'},
    main: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 12},
    logoBox: {width: 60, height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginEnd: 14},
    logo: {width: 34, height: 34},
    details: {flex: 1},
    vehicleName: {fontSize: 19, fontWeight: '700', letterSpacing: -0.3, marginBottom: 8},
    specs: {flexDirection: 'row', gap: 6, flexWrap: 'wrap'},
    specChip: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8},
    specText: {fontSize: 11, fontWeight: '600'},
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    footerText: {flex: 1, fontSize: 12, opacity: 0.7},
})
