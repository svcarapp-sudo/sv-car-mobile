import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import type {Part, PartCategoryApi} from '@/global/types'

interface PartCardDetailsProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
}

export const PartCardDetails = ({part, categoryInfo}: PartCardDetailsProps) => {
    const theme = useAppTheme()
    const vehicles = part.compatibleVehicles ?? []
    const firstVehicle = vehicles[0]

    const vehicleLabel = firstVehicle
        ? `${firstVehicle.make} ${firstVehicle.model} ${firstVehicle.yearFrom === firstVehicle.yearTo ? firstVehicle.yearFrom : `${firstVehicle.yearFrom}-${firstVehicle.yearTo}`}`
        : null

    return (
        <View style={styles.container}>
            {/* Category badge */}
            {categoryInfo && (
                <View style={[styles.categoryBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Text style={[styles.categoryText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                </View>
            )}

            {/* Part name */}
            <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2}>
                {part.name}
            </Text>

            {/* Vehicle compatibility */}
            {vehicleLabel && (
                <View style={styles.vehicleRow}>
                    <Icon source="check-circle" size={14} color={theme.colors.success} />
                    <Text style={[styles.vehicleText, {color: theme.colors.success}]} numberOfLines={1}>
                        {vehicleLabel}
                    </Text>
                    {vehicles.length > 1 && (
                        <Text style={[styles.moreText, {color: theme.colors.onSurfaceVariant}]}>+{vehicles.length - 1}</Text>
                    )}
                </View>
            )}

            {/* Price */}
            <View style={styles.priceRow}>
                <Text style={[styles.price, {color: theme.colors.tertiary}]}>${part.price.toFixed(2)}</Text>
                {part.sku && (
                    <Text style={[styles.sku, {color: theme.colors.onSurfaceVariant}]}>{part.sku}</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 14,
        justifyContent: 'center',
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 6,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
        marginBottom: 5,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 6,
    },
    vehicleText: {
        fontSize: 12,
        fontWeight: '500',
        flex: 1,
    },
    moreText: {
        fontSize: 11,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    sku: {
        fontSize: 10,
        opacity: 0.5,
        letterSpacing: 0.3,
    },
})
