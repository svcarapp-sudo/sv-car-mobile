import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

interface FilterChipProps {
    label: string
    icon?: string
    active?: boolean
    onPress?: () => void
    onClear?: () => void
}

/**
 * Material 3 / ASOS-style filter chip with optional clear-X when active.
 */
export const FilterChip = ({label, icon, active, onPress, onClear}: FilterChipProps) => {
    const theme = useAppTheme()
    const bg = active ? theme.colors.primary : theme.colors.surface
    const border = active ? theme.colors.primary : theme.colors.outlineVariant
    const text = active ? theme.colors.onPrimary : theme.colors.onSurface
    const iconColor = active ? theme.colors.tertiary : theme.colors.onSurfaceVariant

    return (
        <PressableScale
            onPress={onPress}
            scaleTo={0.95}
            withHaptic
            style={[styles.chip, {backgroundColor: bg, borderColor: border}]}
            accessibilityRole='button'
            accessibilityLabel={label}
            accessibilityState={{selected: Boolean(active)}}>
            {icon && <Icon source={icon} size={14} color={iconColor} />}
            <Text style={[styles.label, {color: text}]} numberOfLines={1}>
                {label}
            </Text>
            {active && onClear && (
                <Pressable onPress={onClear} hitSlop={8} accessibilityRole='button'>
                    <View style={[styles.clearDot, {backgroundColor: theme.colors.onDarkContainer}]}>
                        <Icon source='close' size={10} color={theme.colors.onPrimary} />
                    </View>
                </Pressable>
            )}
        </PressableScale>
    )
}

const styles = StyleSheet.create({
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
    label: {fontSize: 12.5, fontWeight: '700', letterSpacing: 0.1},
    clearDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 2,
    },
})
