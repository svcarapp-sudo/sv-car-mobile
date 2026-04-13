import {StyleSheet, View} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {VehicleCompatibility} from '@/global/types'

const ARABIC_TEXT = {
    VEHICLES: 'المركبات المتوافقة',
}

interface EditPartVehicleBannerProps {
    vehicles: VehicleCompatibility[]
    categoryName?: string | null
}

export const EditPartVehicleBanner = ({vehicles, categoryName}: EditPartVehicleBannerProps) => {
    const theme = useAppTheme()

    if (vehicles.length === 0) return null

    return (
        <View style={[styles.banner, {backgroundColor: theme.colors.surfaceVariant}]}>
            <View style={styles.header}>
                <Icon source="car-multiple" size={18} color={theme.colors.primary} />
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.VEHICLES}</Text>
                {categoryName && (
                    <View style={[styles.catBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Text style={[styles.catText, {color: theme.colors.primary}]}>{categoryName}</Text>
                    </View>
                )}
            </View>
            {vehicles.map((v, i) => {
                const yearLabel = v.yearFrom === v.yearTo ? String(v.yearFrom) : `${v.yearFrom}-${v.yearTo}`
                return (
                    <View key={i} style={styles.vehicleRow}>
                        <Icon source="check-circle" size={14} color={theme.colors.success} />
                        <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                            {v.make} {v.model} {yearLabel}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {borderRadius: 14, padding: 14, marginBottom: 20},
    header: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10},
    title: {fontSize: 14, fontWeight: '600', flex: 1},
    catBadge: {paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8},
    catText: {fontSize: 11, fontWeight: '600'},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 3},
    vehicleText: {fontSize: 13},
})
