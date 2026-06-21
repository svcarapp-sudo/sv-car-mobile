import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {haptics} from '@/global/utils'

export type YearMode = 'single' | 'range'

const OPTIONS: {value: YearMode; label: string; icon: string}[] = [
    {value: 'single', label: 'سنة واحدة', icon: 'calendar-today'},
    {value: 'range', label: 'عدة سنوات', icon: 'calendar-range'},
]

interface YearModeToggleProps {
    mode: YearMode
    onChange: (mode: YearMode) => void
}

/** Segmented switch: a single model year vs a span of compatible years. */
export const YearModeToggle = ({mode, onChange}: YearModeToggleProps) => {
    const theme = useAppTheme()

    const select = (m: YearMode) => {
        if (m === mode) return
        haptics.selection()
        onChange(m)
    }

    return (
        <View
            style={[styles.track, {backgroundColor: theme.colors.surfaceContainerLow, borderColor: theme.colors.outlineVariant}]}>
            {OPTIONS.map(opt => {
                const active = mode === opt.value
                return (
                    <Pressable
                        key={opt.value}
                        onPress={() => select(opt.value)}
                        style={[styles.segment, active && {backgroundColor: theme.colors.primary}]}
                        accessibilityRole='button'
                        accessibilityState={{selected: active}}
                        accessibilityLabel={opt.label}>
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
    )
}

const styles = StyleSheet.create({
    track: {flexDirection: 'row', padding: 3, borderRadius: 12, borderWidth: 1, gap: 3},
    segment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        borderRadius: 9,
    },
    label: {fontSize: 13, fontWeight: '800'},
})
