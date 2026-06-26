import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {MyPartsStatusFilter as StatusFilter} from '../../hooks/useMyPartsFilters'

interface MyPartsStatusFilterProps {
    value: StatusFilter
    onChange: (v: StatusFilter) => void
}

const OPTIONS: {key: StatusFilter; label: string; icon: string}[] = [
    {key: 'all', label: 'الكل', icon: 'view-grid-outline'},
    {key: 'active', label: 'نشط', icon: 'check-circle-outline'},
    {key: 'sold', label: 'مُباع', icon: 'tag-check-outline'},
    {key: 'hidden', label: 'مخفي', icon: 'eye-off-outline'},
    {key: 'lowStock', label: 'مخزون منخفض', icon: 'alert-outline'},
]

export const MyPartsStatusFilter = ({value, onChange}: MyPartsStatusFilterProps) => {
    const theme = useAppTheme()
    return (
        <View style={styles.wrap}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
                {OPTIONS.map(opt => {
                    const selected = value === opt.key
                    const bg = selected ? theme.colors.secondaryContainer : theme.colors.surface
                    const fg = selected ? theme.colors.onSecondaryContainer : theme.colors.onSurfaceVariant
                    const border = selected ? theme.colors.secondaryContainer : theme.colors.outlineVariant
                    return (
                        <TouchableOpacity
                            key={opt.key}
                            activeOpacity={0.85}
                            onPress={() => onChange(opt.key)}
                            style={[styles.chip, {backgroundColor: bg, borderColor: border}]}>
                            <Icon source={opt.icon} size={12} color={fg} />
                            <Text style={[styles.label, {color: fg}]}>{opt.label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {marginBottom: 10},
    content: {gap: 8, paddingEnd: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
    },
    label: {fontSize: 11.5, fontWeight: '700'},
})
