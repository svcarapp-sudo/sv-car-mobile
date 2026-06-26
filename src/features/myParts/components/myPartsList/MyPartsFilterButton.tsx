import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

interface MyPartsFilterButtonProps {
    activeCount: number
    onPress: () => void
}

const T = {FILTERS: 'الفلاتر'}

/** Opens the filter dialog; shows a badge with the number of active filters. */
export const MyPartsFilterButton = ({activeCount, onPress}: MyPartsFilterButtonProps) => {
    const theme = useAppTheme()
    const active = activeCount > 0
    const bg = active ? theme.colors.primary : theme.colors.surface
    const fg = active ? theme.colors.onPrimary : theme.colors.onSurface
    const border = active ? theme.colors.primary : theme.colors.outlineVariant

    return (
        <PressableScale
            withHaptic
            onPress={onPress}
            accessibilityRole='button'
            accessibilityLabel={T.FILTERS}
            style={[styles.btn, {backgroundColor: bg, borderColor: border}]}>
            <Icon source='tune-variant' size={18} color={fg} />
            <Text style={[styles.label, {color: fg}]}>{T.FILTERS}</Text>
            {active && (
                <View style={[styles.badge, {backgroundColor: theme.colors.onPrimary}]}>
                    <Text style={[styles.badgeText, {color: theme.colors.primary}]}>{activeCount}</Text>
                </View>
            )}
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        height: 44,
        borderRadius: 14,
        borderWidth: 1,
    },
    label: {fontSize: 13, fontWeight: '800'},
    badge: {minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center'},
    badgeText: {fontSize: 11, fontWeight: '800'},
})
