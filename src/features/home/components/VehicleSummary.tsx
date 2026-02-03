import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Card, IconButton, Text, useTheme} from 'react-native-paper'

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
        <Card style={[styles.card, {backgroundColor: theme.colors.surface}]} mode='outlined' contentStyle={styles.cardContent}>
            <View style={styles.cardInner}>
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
                                {vehicle.makeLogoUrl && (
                                    <Image source={{uri: vehicle.makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                                )}
                            </View>
                            <View style={styles.titleGroup}>
                                <Text variant='headlineSmall' style={[styles.mainTitle, {color: theme.colors.onSurface}]}>
                                    {vehicle.make} {vehicle.model}
                                </Text>
                                <Text variant='bodyLarge' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
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
                            iconColor={theme.colors.onSurfaceVariant}
                        />
                    </View>

                    <View style={[styles.detailsGrid, {backgroundColor: theme.colors.surfaceVariant}]}>
                        {vehicle.make && renderInfoItem(ARABIC_TEXT.MAKE, vehicle.make)}
                        {vehicle.model && renderInfoItem(ARABIC_TEXT.MODEL, vehicle.model)}
                        {vehicle.year && renderInfoItem(ARABIC_TEXT.YEAR, vehicle.year.toString())}
                        {vehicle.fuelType && renderInfoItem(ARABIC_TEXT.FUEL, vehicle.fuelType, false)}
                    </View>
                </Card.Content>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        borderRadius: 28,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        // Android shadow
        elevation: 0.5,
    },
    cardContent: {
        overflow: 'hidden',
    },
    cardInner: {
        borderRadius: 28,
        overflow: 'hidden',
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    logoContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
    },
    logo: {
        width: 36,
        height: 36,
    },
    titleGroup: {
        alignItems: 'flex-start',
        flex: 1,
    },
    mainTitle: {
        fontWeight: '400',
        marginBottom: 4,
        fontSize: 24,
        letterSpacing: 0,
        lineHeight: 32,
    },
    subtitle: {
        letterSpacing: 0.5,
        lineHeight: 20,
        fontSize: 14,
        opacity: 0.87,
    },
    editButton: {
        margin: 0,
    },
    detailsGrid: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 12,
        justifyContent: 'space-around',
        gap: 8,
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 11,
        marginBottom: 4,
        letterSpacing: 0.5,
        opacity: 0.6,
    },
    value: {
        fontWeight: '400',
        fontSize: 14,
        letterSpacing: 0.25,
    },
    divider: {
        width: 1,
        height: 24,
        alignSelf: 'center',
        opacity: 0.12,
    },
})
