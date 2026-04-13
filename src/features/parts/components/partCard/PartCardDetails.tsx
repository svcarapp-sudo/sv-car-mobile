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
            {/* Row 1: Name + Price */}
            <View style={styles.topRow}>
                <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2}>
                    {part.name}
                </Text>
                <Text style={[styles.price, {color: theme.colors.tertiary}]}>${part.price.toFixed(0)}</Text>
            </View>

            {/* Row 2: Vehicle compatibility */}
            {vehicleLabel && (
                <View style={styles.metaRow}>
                    <Icon source="check-circle" size={13} color={theme.colors.success} />
                    <Text style={[styles.metaText, {color: theme.colors.success}]} numberOfLines={1}>
                        {vehicleLabel}
                    </Text>
                    {vehicles.length > 1 && (
                        <Text style={[styles.badge, {color: theme.colors.onSurfaceVariant, backgroundColor: theme.colors.surfaceVariant}]}>
                            +{vehicles.length - 1}
                        </Text>
                    )}
                </View>
            )}

            {/* Row 3: Footer — seller/city + category + time */}
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    {part.sellerCity && (
                        <>
                            <Icon source="map-marker-outline" size={12} color={theme.colors.onSurfaceVariant} />
                            <Text style={[styles.footerText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {part.sellerCity}
                            </Text>
                        </>
                    )}
                    {part.sellerCity && categoryInfo && <Text style={[styles.dot, {color: theme.colors.outline}]}>·</Text>}
                    {categoryInfo && (
                        <Text style={[styles.footerText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {categoryInfo.name}
                        </Text>
                    )}
                </View>
                {timeAgo && <Text style={[styles.footerText, {color: theme.colors.outline}]}>{timeAgo}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, marginStart: 12, justifyContent: 'space-between'},
    topRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 4},
    name: {flex: 1, fontSize: 14, fontWeight: '600', lineHeight: 20},
    price: {fontSize: 17, fontWeight: '700', letterSpacing: -0.3},
    metaRow: {flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4},
    metaText: {fontSize: 11, fontWeight: '500', flex: 1},
    badge: {fontSize: 10, fontWeight: '600', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4, overflow: 'hidden'},
    footer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    footerLeft: {flexDirection: 'row', alignItems: 'center', gap: 3, flex: 1},
    footerText: {fontSize: 11},
    dot: {fontSize: 11},
})
