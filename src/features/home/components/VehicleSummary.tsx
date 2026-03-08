import React from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {Vehicle} from '@/global/types'

interface VehicleSummaryProps {
    vehicle: Partial<Vehicle>
    onChangeVehicle: () => void
}

interface DetailChipProps {
    icon: string
    text: string
}

const DetailChip = ({icon, text}: DetailChipProps) => (
    <View style={chipStyles.chip}>
        <Icon source={icon} size={12} color={themeColors.onDarkMedium} />
        <Text style={chipStyles.text}>{text}</Text>
    </View>
)

const chipStyles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: themeColors.onDarkSurfaceLight,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: themeColors.onDarkDivider,
    },
    text: {
        color: themeColors.onDarkHigh,
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.1,
    },
})

export const VehicleSummary = ({vehicle, onChangeVehicle}: VehicleSummaryProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onChangeVehicle} style={styles.card}>
            <View style={[styles.cardBody, {backgroundColor: theme.colors.primary}]}>
                {/* Top row: logo + name + edit */}
                <View style={styles.topRow}>
                    <View style={[styles.logoRing, {borderColor: theme.colors.tertiary}]}>
                        <View style={styles.logoInner}>
                            {vehicle.makeLogoUrl ? (
                                <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                            ) : (
                                <Icon source='car-side' size={20} color={theme.colors.onDarkMedium} />
                            )}
                        </View>
                    </View>

                    <View style={styles.nameBlock}>
                        <Text style={styles.vehicleName} numberOfLines={1}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                    </View>

                    <View style={styles.editBtn}>
                        <Icon source='swap-horizontal' size={16} color={theme.colors.onDarkMedium} />
                    </View>
                </View>

                {/* Detail chips */}
                <View style={styles.detailRow}>
                    {vehicle.year && <DetailChip icon='calendar-outline' text={vehicle.year.toString()} />}
                    {vehicle.fuelType && <DetailChip icon='gas-station-outline' text={vehicle.fuelType} />}
                    {vehicle.engine && <DetailChip icon='engine-outline' text={vehicle.engine} />}
                </View>
            </View>

            {/* Bottom accent */}
            <View style={[styles.accent, {backgroundColor: theme.colors.tertiary}]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    cardBody: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 12,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoRing: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoInner: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 26,
        height: 26,
    },
    nameBlock: {
        flex: 1,
        marginHorizontal: 12,
    },
    vehicleName: {
        color: themeColors.onPrimary,
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    editBtn: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: themeColors.onDarkSurface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 10,
        paddingStart: 58,
    },
    accent: {
        height: 3,
    },
})
