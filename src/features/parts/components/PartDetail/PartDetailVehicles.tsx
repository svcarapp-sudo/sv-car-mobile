import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {VehicleCompatibility} from '@/global/types'

const ARABIC_TEXT = {
    TITLE: 'المركبات المتوافقة',
}

interface PartDetailVehiclesProps {
    vehicles: VehicleCompatibility[]
}

export const PartDetailVehicles = ({vehicles}: PartDetailVehiclesProps) => {
    const theme = useAppTheme()

    if (vehicles.length === 0) return null

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surfaceVariant}]}>
            <View style={styles.header}>
                <Icon source='car-multiple' size={18} color={theme.colors.primary} />
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
            </View>
            {vehicles.map((v, i) => {
                const yearLabel = v.yearFrom === v.yearTo ? String(v.yearFrom) : `${v.yearFrom}-${v.yearTo}`
                return (
                    <View key={i} style={styles.row}>
                        <Icon source='check-circle-outline' size={16} color={theme.colors.primary} />
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
    container: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 4,
    },
    vehicleText: {
        fontSize: 14,
    },
})
