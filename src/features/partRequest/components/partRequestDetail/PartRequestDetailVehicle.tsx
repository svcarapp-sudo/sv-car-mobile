import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequest} from '../../types'

const T = {
    HEADING: 'المركبة المستهدفة',
    CATEGORY: 'الفئة',
    MAKE: 'الصانع',
    MODEL: 'الموديل',
    YEAR: 'السنة',
}

interface PartRequestDetailVehicleProps {
    request: PartRequest
}

export const PartRequestDetailVehicle = ({request}: PartRequestDetailVehicleProps) => {
    const theme = useAppTheme()

    const items: {label: string; value: string; icon: string}[] = [
        {label: T.MAKE, value: request.makeName || '—', icon: 'factory'},
        {label: T.MODEL, value: request.modelName || '—', icon: 'car-side'},
        {label: T.YEAR, value: String(request.year), icon: 'calendar-blank-outline'},
        {label: T.CATEGORY, value: request.categoryName || '—', icon: 'shape-outline'},
    ]

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.headingRow}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.successContainer}]}>
                    <Icon source='shield-car' size={18} color={theme.colors.success} />
                </View>
                <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
            </View>
            <View style={styles.grid}>
                {items.map(item => (
                    <View key={item.label} style={[styles.cell, {borderColor: theme.colors.outlineVariant}]}>
                        <View style={styles.cellTop}>
                            <Icon source={item.icon} size={14} color={theme.colors.onSurfaceVariant} />
                            <Text style={[styles.cellLabel, {color: theme.colors.onSurfaceVariant}]}>{item.label}</Text>
                        </View>
                        <Text style={[styles.cellValue, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 18,
        padding: 16,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    headingRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14},
    iconWrap: {width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center'},
    heading: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2},
    grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
    cell: {flexGrow: 1, flexBasis: '46%', borderRadius: 12, borderWidth: 1, padding: 10, gap: 4},
    cellTop: {flexDirection: 'row', alignItems: 'center', gap: 4},
    cellLabel: {fontSize: 11, fontWeight: '600', letterSpacing: 0.1},
    cellValue: {fontSize: 14, fontWeight: '700'},
})
