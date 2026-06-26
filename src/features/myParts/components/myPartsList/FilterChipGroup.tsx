import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

export interface FilterChipOption<K> {
    key: K
    label: string
    icon?: string
    count?: number
}

interface FilterChipGroupProps<K> {
    title: string
    options: FilterChipOption<K>[]
    value: K
    onSelect: (key: K) => void
}

/**
 * A labelled section of single-select chips that wrap (no horizontal scroll —
 * everything stays visible inside the filter dialog). Reused for status,
 * category and sort. Selected chips swap their leading icon for a checkmark so
 * selection never relies on colour alone (WCAG 1.4.1 / Material 3 filter chips).
 */
export function FilterChipGroup<K extends string | number | null>({title, options, value, onSelect}: FilterChipGroupProps<K>) {
    const theme = useAppTheme()
    return (
        <View>
            <Text style={[styles.title, {color: theme.colors.onSurfaceVariant}]}>{title}</Text>
            <View style={styles.chips}>
                {options.map(opt => {
                    const selected = opt.key === value
                    const bg = selected ? theme.colors.primary : theme.colors.surfaceContainerLow
                    const fg = selected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant
                    const leadingIcon = selected ? 'check' : opt.icon
                    return (
                        <PressableScale
                            key={String(opt.key)}
                            withHaptic
                            onPress={() => onSelect(opt.key)}
                            accessibilityRole='button'
                            accessibilityState={{selected}}
                            style={[styles.chip, {backgroundColor: bg}]}>
                            {leadingIcon && <Icon source={leadingIcon} size={14} color={fg} />}
                            <Text style={[styles.label, {color: fg}]}>{opt.label}</Text>
                            {opt.count != null && <Text style={[styles.count, {color: fg}]}>{opt.count}</Text>}
                        </PressableScale>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {fontSize: 12, fontWeight: '800', marginBottom: 10, opacity: 0.9},
    chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 999,
        minHeight: 40,
    },
    label: {fontSize: 13, fontWeight: '700'},
    count: {fontSize: 12, fontWeight: '800', opacity: 0.8},
})
