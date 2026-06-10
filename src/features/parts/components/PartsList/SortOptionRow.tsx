import {StyleSheet} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

interface SortOptionRowProps {
    icon: string
    label: string
    active: boolean
    onPress: () => void
}

/** Single selectable row inside the sort bottom sheet. */
export const SortOptionRow = ({icon, label, active, onPress}: SortOptionRowProps) => {
    const theme = useAppTheme()

    return (
        <PressableScale
            onPress={onPress}
            scaleTo={0.98}
            style={[
                styles.row,
                {
                    backgroundColor: active ? theme.colors.accentSubtle : theme.colors.surfaceContainerLow,
                    borderColor: active ? theme.colors.tertiary : theme.colors.outlineVariant,
                },
            ]}
            accessibilityRole='button'
            accessibilityLabel={label}
            accessibilityState={{selected: active}}>
            <Icon source={icon} size={18} color={active ? theme.colors.tertiary : theme.colors.onSurfaceVariant} />
            <Text style={[styles.label, {color: active ? theme.colors.onSurface : theme.colors.onSurfaceVariant}]}>{label}</Text>
            {active && <Icon source='check-circle' size={18} color={theme.colors.tertiary} />}
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
    },
    label: {flex: 1, fontSize: 14, fontWeight: '600', letterSpacing: -0.1},
})
