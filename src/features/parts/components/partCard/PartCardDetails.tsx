import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import type {Part, PartCategoryApi} from '@/global/types'

const formatTimeAgo = (timestamp?: number): string | null => {
    if (!timestamp) return null
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 60) return `منذ ${minutes} د`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `منذ ${hours} س`
    const days = Math.floor(hours / 24)
    if (days < 30) return `منذ ${days} يوم`
    const months = Math.floor(days / 30)
    return `منذ ${months} شهر`
}

interface PartCardDetailsProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
}

export const PartCardDetails = ({part, categoryInfo}: PartCardDetailsProps) => {
    const theme = useAppTheme()
    const vehicles = part.compatibleVehicles ?? []
    const firstVehicle = vehicles[0]
    const timeAgo = formatTimeAgo(part.createdAt)

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
                <View style={styles.metaRow}>
                    <Icon source="check-circle" size={13} color={theme.colors.success} />
                    <Text style={[styles.metaText, {color: theme.colors.success}]} numberOfLines={1}>
                        {vehicleLabel}
                    </Text>
                    {vehicles.length > 1 && (
                        <Text style={[styles.moreText, {color: theme.colors.onSurfaceVariant}]}>+{vehicles.length - 1}</Text>
                    )}
                </View>
            )}

            {/* Seller city */}
            {part.sellerCity && (
                <View style={styles.metaRow}>
                    <Icon source="map-marker-outline" size={13} color={theme.colors.onSurfaceVariant} />
                    <Text style={[styles.metaText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {part.sellerName ? `${part.sellerName} · ${part.sellerCity}` : part.sellerCity}
                    </Text>
                </View>
            )}

            {/* Price + time ago */}
            <View style={styles.priceRow}>
                <Text style={[styles.price, {color: theme.colors.tertiary}]}>${part.price.toFixed(2)}</Text>
                {timeAgo && (
                    <Text style={[styles.timeAgo, {color: theme.colors.onSurfaceVariant}]}>{timeAgo}</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, marginStart: 14, justifyContent: 'center'},
    categoryBadge: {alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginBottom: 4},
    categoryText: {fontSize: 10, fontWeight: '600', letterSpacing: 0.3},
    name: {fontSize: 15, fontWeight: '600', lineHeight: 21, marginBottom: 4},
    metaRow: {flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3},
    metaText: {fontSize: 12, fontWeight: '500', flex: 1},
    moreText: {fontSize: 11, fontWeight: '500'},
    priceRow: {flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2},
    price: {fontSize: 18, fontWeight: '700', letterSpacing: -0.3},
    timeAgo: {fontSize: 10, opacity: 0.6},
})
