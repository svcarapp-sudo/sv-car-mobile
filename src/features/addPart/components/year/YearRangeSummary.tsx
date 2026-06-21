import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

import type {YearMode} from './YearModeToggle'

const T = {
    START: 'سنة البداية',
    END: 'سنة النهاية',
    SINGLE: 'السنة المتوافقة',
    CLEAR: 'مسح',
    EMPTY: '—',
    CLEAR_A11Y: 'مسح التحديد',
}

export type ActiveBound = 'start' | 'end' | 'none'

interface YearRangeSummaryProps {
    mode: YearMode
    yearFrom: number | null
    yearTo: number | null
    active: ActiveBound
    onClear: () => void
}

/** Selection echo: a single focused slot in single mode, or a live Start → End
 * pair (with the next-tap bound glowing amber) in range mode. */
export const YearRangeSummary = ({mode, yearFrom, yearTo, active, onClear}: YearRangeSummaryProps) => {
    const theme = useAppTheme()

    const slot = (label: string, value: number | null, isActive: boolean, solo = false) => (
        <View
            style={[
                styles.slot,
                solo && styles.solo,
                {
                    backgroundColor: theme.colors.surface,
                    borderColor: isActive ? theme.colors.tertiary : theme.colors.outlineVariant,
                },
            ]}>
            <Text
                style={[styles.slotLabel, {color: isActive ? theme.colors.tertiary : theme.colors.onSurfaceVariant}]}
                numberOfLines={1}>
                {label}
            </Text>
            <Text style={[styles.slotValue, {color: theme.colors.onSurface}]} numberOfLines={1}>
                {value != null ? String(value) : T.EMPTY}
            </Text>
        </View>
    )

    if (mode === 'single') {
        return (
            <View style={[styles.card, {backgroundColor: theme.colors.accentSoft}]} accessibilityLiveRegion='polite'>
                {slot(T.SINGLE, yearFrom, true, true)}
            </View>
        )
    }

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.accentSoft}]} accessibilityLiveRegion='polite'>
            {slot(T.START, yearFrom, active === 'start')}
            <Icon source='arrow-left' size={16} color={theme.colors.onSurfaceVariant} />
            {slot(T.END, yearTo, active === 'end')}
            {yearFrom != null ? (
                <PressableScale
                    onPress={onClear}
                    withHaptic
                    style={styles.clear}
                    accessibilityRole='button'
                    accessibilityLabel={T.CLEAR_A11Y}>
                    <Icon source='close-circle' size={14} color={theme.colors.onSurfaceVariant} />
                    <Text style={[styles.clearText, {color: theme.colors.onSurfaceVariant}]}>{T.CLEAR}</Text>
                </PressableScale>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 14},
    slot: {flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5, gap: 2},
    solo: {alignItems: 'center'},
    slotLabel: {fontSize: 10.5, fontWeight: '700'},
    slotValue: {fontSize: 17, fontWeight: '800', writingDirection: 'ltr'},
    clear: {flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 2},
    clearText: {fontSize: 12, fontWeight: '700'},
})
