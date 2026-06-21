import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {YearMode} from './YearModeToggle'

const T = {
    SINGLE: 'السنة المتوافقة',
    FROM: 'من',
    TO: 'إلى',
}

interface YearSelectionSummaryProps {
    mode: YearMode
    from: number
    to: number
}

/** Prominent read-out of the current pick: the year, or "من X إلى Y" for a span. */
export const YearSelectionSummary = ({mode, from, to}: YearSelectionSummaryProps) => {
    const theme = useAppTheme()
    const value = (y: number) => <Text style={[styles.value, {color: theme.colors.tertiary}]}>{y}</Text>

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.accentSoft}]} accessibilityLiveRegion='polite'>
            <Icon source='calendar-check' size={18} color={theme.colors.tertiary} />
            <Text style={[styles.text, {color: theme.colors.onSurface}]}>
                {mode === 'single' ? (
                    <>
                        {T.SINGLE} {value(from)}
                    </>
                ) : (
                    <>
                        {T.FROM} {value(from)} {T.TO} {value(to)}
                    </>
                )}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 14,
    },
    text: {fontSize: 15, fontWeight: '700'},
    value: {fontSize: 17, fontWeight: '900'},
})
