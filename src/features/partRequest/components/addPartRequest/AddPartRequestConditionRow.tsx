import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequestCondition} from '../../types'

interface ConditionOption {
    value: PartRequestCondition
    label: string
    icon: string
}

const OPTIONS: ConditionOption[] = [
    {value: 'NEW', label: 'جديد', icon: 'star-shooting-outline'},
    {value: 'USED', label: 'مستعمل', icon: 'recycle'},
    {value: 'ANY', label: 'أي حالة', icon: 'check-all'},
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
            <View
                style={[
                    styles.track,
                    {backgroundColor: theme.colors.surfaceContainerLow, borderColor: theme.colors.outlineVariant},
                ]}>
                {OPTIONS.map(opt => {
                    const active = value === opt.value
                    return (
                        <Pressable
                            key={opt.value}
                            onPress={() => onChange(opt.value)}
                            style={({pressed}) => [
                                styles.segment,
                                active && {backgroundColor: theme.colors.primary},
                                pressed && !active && styles.pressed,
                            ]}>
                            <Icon
                                source={opt.icon}
                                size={15}
                                color={active ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
                            />
                            <Text style={[styles.label, {color: active ? theme.colors.onPrimary : theme.colors.onSurface}]}>
                                {opt.label}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {gap: 8},
    heading: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2},
    track: {flexDirection: 'row', padding: 3, borderRadius: 12, borderWidth: 1, gap: 3},
    segment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingVertical: 9,
        borderRadius: 9,
    },
    pressed: {opacity: 0.6},
    label: {fontSize: 12.5, fontWeight: '800'},
})
