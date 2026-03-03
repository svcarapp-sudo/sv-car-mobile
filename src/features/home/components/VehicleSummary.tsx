import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Icon, IconButton, Text, useTheme} from 'react-native-paper'

import {Vehicle} from '@/global/types'

interface VehicleSummaryProps {
    vehicle: Partial<Vehicle>
    onChangeVehicle: () => void
}

const ARABIC_TEXT = {
    MAKE: 'الماركة',
    MODEL: 'الموديل',
    YEAR: 'السنة',
    FUEL: 'الوقود',
}

interface DetailItemProps {
    icon: string
    label: string
    value: string
    color: string
    labelColor: string
    iconBg: string
    iconColor: string
}

const DetailItem = ({icon, label, value, color, labelColor, iconBg, iconColor}: DetailItemProps) => (
    <View style={detailStyles.item}>
        <View style={[detailStyles.iconWrap, {backgroundColor: iconBg}]}>
            <Icon source={icon} size={14} color={iconColor} />
        </View>
        <Text style={[detailStyles.label, {color: labelColor}]}>{label}</Text>
        <Text style={[detailStyles.value, {color}]}>{value}</Text>
    </View>
)

const detailStyles = StyleSheet.create({
    item: {
        alignItems: 'center',
        flex: 1,
    },
    iconWrap: {
        width: 28,
        height: 28,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    label: {
        fontSize: 10,
        letterSpacing: 0.5,
        marginBottom: 2,
        opacity: 0.65,
    },
    value: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.15,
    },
})

export const VehicleSummary = ({vehicle, onChangeVehicle}: VehicleSummaryProps) => {
    const theme = useTheme()

    return (
        <View style={styles.card}>
            {/* Dark Header */}
            <View style={[styles.darkHeader, {backgroundColor: theme.colors.primary}]}>
                <View style={styles.headerRow}>
                    <View style={styles.logoRing}>
                        <View style={styles.logoContainer}>
                            {vehicle.makeLogoUrl ? (
                                <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                            ) : (
                                <Icon source='car-side' size={28} color='rgba(255,255,255,0.7)' />
                            )}
                        </View>
                    </View>
                    <View style={styles.headerText}>
                        <Text variant='titleLarge' style={styles.vehicleName}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                        <View style={styles.chipRow}>
                            {vehicle.year && (
                                <View style={styles.chip}>
                                    <Text style={styles.chipText}>{vehicle.year}</Text>
                                </View>
                            )}
                            {vehicle.fuelType && (
                                <View style={styles.chip}>
                                    <Text style={styles.chipText}>{vehicle.fuelType}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <IconButton
                        icon='pencil-outline'
                        size={18}
                        iconColor='rgba(255,255,255,0.7)'
                        onPress={onChangeVehicle}
                        style={styles.editButton}
                    />
                </View>
            </View>

            {/* Light Details */}
            <View style={[styles.detailsSection, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.detailsGrid}>
                    {vehicle.make && (
                        <DetailItem
                            icon='car'
                            label={ARABIC_TEXT.MAKE}
                            value={vehicle.make}
                            color={theme.colors.onSurface}
                            labelColor={theme.colors.onSurfaceVariant}
                            iconBg={theme.colors.primaryContainer}
                            iconColor={theme.colors.primary}
                        />
                    )}
                    {vehicle.make && vehicle.model && (
                        <View style={[styles.gridDivider, {backgroundColor: theme.colors.outline}]} />
                    )}
                    {vehicle.model && (
                        <DetailItem
                            icon='tag-outline'
                            label={ARABIC_TEXT.MODEL}
                            value={vehicle.model}
                            color={theme.colors.onSurface}
                            labelColor={theme.colors.onSurfaceVariant}
                            iconBg={theme.colors.primaryContainer}
                            iconColor={theme.colors.primary}
                        />
                    )}
                    {vehicle.model && vehicle.year && (
                        <View style={[styles.gridDivider, {backgroundColor: theme.colors.outline}]} />
                    )}
                    {vehicle.year && (
                        <DetailItem
                            icon='calendar-range'
                            label={ARABIC_TEXT.YEAR}
                            value={vehicle.year.toString()}
                            color={theme.colors.onSurface}
                            labelColor={theme.colors.onSurfaceVariant}
                            iconBg={theme.colors.primaryContainer}
                            iconColor={theme.colors.primary}
                        />
                    )}
                    {vehicle.year && vehicle.fuelType && (
                        <View style={[styles.gridDivider, {backgroundColor: theme.colors.outline}]} />
                    )}
                    {vehicle.fuelType && (
                        <DetailItem
                            icon='gas-station'
                            label={ARABIC_TEXT.FUEL}
                            value={vehicle.fuelType}
                            color={theme.colors.onSurface}
                            labelColor={theme.colors.onSurfaceVariant}
                            iconBg={theme.colors.primaryContainer}
                            iconColor={theme.colors.primary}
                        />
                    )}
                </View>
            </View>

            {/* Racing Accent Stripe */}
            <View style={[styles.accentBar, {backgroundColor: theme.colors.tertiary}]} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        shadowColor: '#0F172A',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.14,
        shadowRadius: 16,
        elevation: 6,
    },
    darkHeader: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoRing: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 34,
        height: 34,
    },
    headerText: {
        flex: 1,
        marginHorizontal: 14,
    },
    vehicleName: {
        color: '#FFFFFF',
        fontWeight: '700',
        letterSpacing: -0.3,
        lineHeight: 28,
        marginBottom: 8,
    },
    chipRow: {
        flexDirection: 'row',
        gap: 8,
    },
    chip: {
        backgroundColor: 'rgba(255,255,255,0.14)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    chipText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    editButton: {
        margin: 0,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
    },
    detailsSection: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    detailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    gridDivider: {
        width: 1,
        height: 32,
        opacity: 0.15,
    },
    accentBar: {
        height: 4,
    },
})
