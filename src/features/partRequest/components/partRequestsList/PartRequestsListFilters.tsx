import {ScrollView, StyleSheet, View, Pressable} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequestCondition} from '../../types'

const CONDITIONS: {value: PartRequestCondition | null; label: string}[] = [
    {value: null, label: 'أي حالة'},
    {value: 'NEW', label: 'جديد'},
    {value: 'USED', label: 'مستعمل'},
]

interface PartRequestsListFiltersProps {
    condition: PartRequestCondition | null
    onConditionChange: (c: PartRequestCondition | null) => void
}

export const PartRequestsListFilters = ({condition, onConditionChange}: PartRequestsListFiltersProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.bar, {borderBottomColor: theme.colors.outlineVariant}]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {CONDITIONS.map(opt => {
                    const active = condition === opt.value
                    return (
                        <Pressable
                            key={opt.label}
                            onPress={() => onConditionChange(opt.value)}
                            style={({pressed}) => [
                                styles.chip,
                                {
                                    backgroundColor: active ? theme.colors.primary : theme.colors.surface,
                                    borderColor: active ? theme.colors.primary : theme.colors.outlineVariant,
                                },
                                pressed && styles.chipPressed,
                            ]}>
                            <Text
                                style={[styles.chipLabel, {color: active ? theme.colors.onPrimary : theme.colors.onSurface}]}
                                numberOfLines={1}>
                                {opt.label}
                            </Text>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth},
    chips: {flexDirection: 'row', alignItems: 'center', gap: 8, paddingEnd: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1.2,
        minHeight: 32,
    },
    chipPressed: {opacity: 0.75},
    chipLabel: {fontSize: 12.5, fontWeight: '700', letterSpacing: 0.1},
})
