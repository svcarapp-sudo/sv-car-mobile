import {ScrollView, StyleSheet, View, Pressable} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequestCondition, PartRequestStatus} from '../../types'

const STATUSES: {value: PartRequestStatus | null; label: string; icon: string}[] = [
    {value: 'OPEN', label: 'مفتوح', icon: 'broadcast'},
    {value: null, label: 'الكل', icon: 'view-list-outline'},
    {value: 'FULFILLED', label: 'تم التوفير', icon: 'check-decagram'},
    {value: 'CLOSED', label: 'مغلق', icon: 'lock-outline'},
]

const CONDITIONS: {value: PartRequestCondition | null; label: string}[] = [
    {value: null, label: 'أي حالة'},
    {value: 'NEW', label: 'جديد'},
    {value: 'USED', label: 'مستعمل'},
]

interface PartRequestsListFiltersProps {
    status: PartRequestStatus | null
    condition: PartRequestCondition | null
    onStatusChange: (s: PartRequestStatus | null) => void
    onConditionChange: (c: PartRequestCondition | null) => void
}

export const PartRequestsListFilters = ({status, condition, onStatusChange, onConditionChange}: PartRequestsListFiltersProps) => {
    const theme = useAppTheme()

    const renderChip = (active: boolean, label: string, icon: string | null, onPress: () => void, key: string) => (
        <Pressable
            key={key}
            onPress={onPress}
            style={({pressed}) => [
                styles.chip,
                {
                    backgroundColor: active ? theme.colors.primary : theme.colors.surface,
                    borderColor: active ? theme.colors.primary : theme.colors.outlineVariant,
                },
                pressed && styles.chipPressed,
            ]}>
            {icon && <Icon source={icon} size={13} color={active ? theme.colors.tertiary : theme.colors.onSurfaceVariant} />}
            <Text style={[styles.chipLabel, {color: active ? theme.colors.onPrimary : theme.colors.onSurface}]} numberOfLines={1}>
                {label}
            </Text>
        </Pressable>
    )

    return (
        <View style={[styles.bar, {borderBottomColor: theme.colors.outlineVariant}]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {STATUSES.map(opt =>
                    renderChip(status === opt.value, opt.label, opt.icon, () => onStatusChange(opt.value), `s-${opt.label}`)
                )}
                <View style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />
                {CONDITIONS.map(opt =>
                    renderChip(condition === opt.value, opt.label, null, () => onConditionChange(opt.value), `c-${opt.label}`)
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth},
    chips: {flexDirection: 'row', alignItems: 'center', gap: 8, paddingEnd: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1.2,
        minHeight: 34,
    },
    chipPressed: {opacity: 0.75},
    chipLabel: {fontSize: 12.5, fontWeight: '700', letterSpacing: 0.1},
    divider: {width: 1, height: 22, marginHorizontal: 2},
})
