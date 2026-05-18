import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {VehicleCompatibility} from '@/global/types'

const ARABIC_TEXT = {
    TITLE: 'المركبات المتوافقة',
    SUBTITLE: 'القطعة تناسب المركبات التالية',
    COUNT: (n: number) => `${n} مركبة`,
}

interface PartDetailCompatibilityProps {
    vehicles: VehicleCompatibility[]
}

export const PartDetailCompatibility = ({vehicles}: PartDetailCompatibilityProps) => {
    const theme = useAppTheme()
    if (!vehicles?.length) return null

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <View style={styles.header}>
                <View style={[styles.iconBox, {backgroundColor: theme.colors.successContainer}]}>
                    <Icon source='car-multiple' size={18} color={theme.colors.success} />
                </View>
                <View style={styles.headerText}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
                    <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SUBTITLE}</Text>
                </View>
                <View style={[styles.countBadge, {backgroundColor: theme.colors.successContainer}]}>
                    <Text style={[styles.countText, {color: theme.colors.onSuccessContainer}]}>
                        {ARABIC_TEXT.COUNT(vehicles.length)}
                    </Text>
                </View>
            </View>

            <View style={styles.list}>
                {vehicles.map(v => {
                    const yearLabel = v.yearFrom === v.yearTo ? String(v.yearFrom) : `${v.yearFrom}-${v.yearTo}`
                    const key = `${v.make}-${v.model}-${v.yearFrom ?? ''}-${v.yearTo ?? ''}-${v.engine ?? ''}-${v.trim ?? ''}`
                    return (
                        <View
                            key={key}
                            style={[
                                styles.row,
                                {backgroundColor: theme.colors.surfaceContainerLow, borderColor: theme.colors.outlineVariant},
                            ]}>
                            <Icon source='check-decagram' size={16} color={theme.colors.success} />
                            <View style={styles.rowText}>
                                <Text style={[styles.vehicleName, {color: theme.colors.onSurface}]}>
                                    {v.make} {v.model}
                                </Text>
                                <Text style={[styles.vehicleYear, {color: theme.colors.onSurfaceVariant}]}>{yearLabel}</Text>
                            </View>
                            {(v.engine || v.trim) && (
                                <Text style={[styles.trim, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                    {[v.engine, v.trim].filter(Boolean).join(' · ')}
                                </Text>
                            )}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 22, padding: 18, borderWidth: 1, gap: 14},
    header: {flexDirection: 'row', alignItems: 'center', gap: 12},
    iconBox: {width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
    headerText: {flex: 1, gap: 2},
    title: {fontSize: 14.5, fontWeight: '800', letterSpacing: -0.2},
    subtitle: {fontSize: 11.5, fontWeight: '500', letterSpacing: 0.1, opacity: 0.85},
    countBadge: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999},
    countText: {fontSize: 11, fontWeight: '700'},
    list: {gap: 8},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    rowText: {flexDirection: 'row', alignItems: 'baseline', gap: 8},
    vehicleName: {fontSize: 13.5, fontWeight: '700', letterSpacing: -0.1},
    vehicleYear: {fontSize: 12, fontWeight: '600', letterSpacing: 0.2},
    trim: {fontSize: 11, fontWeight: '500', marginStart: 'auto', flexShrink: 1},
})
