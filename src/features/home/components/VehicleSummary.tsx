import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Card, IconButton, Text, useTheme} from 'react-native-paper'

import {getLogoUrl} from '@/features/addVehicle/components/ManufacturerScreen'

import {Vehicle} from '@/shared/types'

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

export const VehicleSummary = ({vehicle, onChangeVehicle}: VehicleSummaryProps) => {
    const theme = useTheme()

    const renderInfoItem = (label: string, value: string, showDivider = true) => (
        <>
            <View style={styles.summaryItem}>
                <Text variant='labelSmall' style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
                    {label}
                </Text>
                <Text variant='titleSmall' style={[styles.value, {color: theme.colors.onSurface}]}>
                    {value}
                </Text>
            </View>
            {showDivider && <View style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />}
        </>
    )

    return (
        <Card style={[styles.card, {backgroundColor: theme.colors.surface}]} mode='elevated'>
            <Card.Content style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.vehicleInfo}>
                        <View
                            style={[
                                styles.logoContainer,
                                {
                                    backgroundColor: theme.colors.surfaceVariant,
                                    borderColor: theme.colors.outlineVariant,
                                },
                            ]}>
                            {vehicle.make && (
                                <Image source={{uri: getLogoUrl(vehicle.make)}} style={styles.logo} resizeMode='contain' />
                            )}
                        </View>
                        <View style={styles.titleGroup}>
                            <Text variant='titleLarge' style={styles.mainTitle}>
                                {vehicle.make} {vehicle.model}
                            </Text>
                            <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                                {vehicle.year} • {vehicle.fuelType}
                            </Text>
                        </View>
                    </View>
                    <IconButton
                        icon='pencil-outline'
                        size={20}
                        mode='contained-tonal'
                        onPress={onChangeVehicle}
                        style={styles.editButton}
                    />
                </View>

                <View style={styles.detailsGrid}>
                    {vehicle.make && renderInfoItem(ARABIC_TEXT.MAKE, vehicle.make)}
                    {vehicle.model && renderInfoItem(ARABIC_TEXT.MODEL, vehicle.model)}
                    {vehicle.year && renderInfoItem(ARABIC_TEXT.YEAR, vehicle.year.toString())}
                    {vehicle.fuelType && renderInfoItem(ARABIC_TEXT.FUEL, vehicle.fuelType, false)}
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 24,
        borderRadius: 20,
        elevation: 4,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    vehicleInfo: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        flex: 1,
    },
    logoContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        borderWidth: 1,
    },
    logo: {
        width: 36,
        height: 36,
    },
    titleGroup: {
        alignItems: 'flex-end',
        flex: 1,
    },
    mainTitle: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    editButton: {
        margin: 0,
    },
    detailsGrid: {
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 12,
        padding: 12,
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 10,
        marginBottom: 4,
    },
    value: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    divider: {
        width: 1,
        height: 24,
        alignSelf: 'center',
    },
})
