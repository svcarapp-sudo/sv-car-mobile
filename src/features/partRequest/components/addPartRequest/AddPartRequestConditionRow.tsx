import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequestCondition} from '../../types'

interface ConditionOption {
    value: PartRequestCondition
    label: string
    icon: string
    description: string
}

const OPTIONS: ConditionOption[] = [
    {value: 'NEW', label: 'جديد', icon: 'star-shooting-outline', description: 'قطعة بحالة المصنع فقط'},
    {value: 'USED', label: 'مستعمل', icon: 'recycle', description: 'قطعة مستعملة بحالة جيدة'},
    {value: 'ANY', label: 'أي حالة', icon: 'check-all', description: 'مفتوح لأي حالة'},
]

const T = {HEADING: 'الحالة المفضلة'}

interface AddPartRequestConditionRowProps {
    value: PartRequestCondition
    onChange: (next: PartRequestCondition) => void
}

export const AddPartRequestConditionRow = ({value, onChange}: AddPartRequestConditionRowProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
            <View style={styles.row}>
                {OPTIONS.map(opt => {
                    const active = value === opt.value
                    return (
                        <Pressable
                            key={opt.value}
                            onPress={() => onChange(opt.value)}
                            style={({pressed}) => [
                                styles.card,
                                {
                                    backgroundColor: active ? theme.colors.primaryContainer : theme.colors.surface,
                                    borderColor: active ? theme.colors.primary : theme.colors.outlineVariant,
                                },
                                pressed && styles.pressed,
                            ]}>
                            <Icon
                                source={opt.icon}
                                size={20}
                                color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
                            />
                            <Text style={[styles.label, {color: active ? theme.colors.primary : theme.colors.onSurface}]}>
                                {opt.label}
                            </Text>
                            <Text style={[styles.desc, {color: theme.colors.onSurfaceVariant}]} numberOfLines={2}>
                                {opt.description}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {gap: 10},
    heading: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2},
    row: {flexDirection: 'row', gap: 8},
    card: {flex: 1, padding: 12, borderRadius: 14, borderWidth: 1.4, alignItems: 'center', gap: 4, minHeight: 92},
    pressed: {opacity: 0.85},
    label: {fontSize: 13, fontWeight: '800'},
    desc: {fontSize: 10.5, textAlign: 'center', lineHeight: 14, fontWeight: '500'},
})
