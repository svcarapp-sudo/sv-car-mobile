import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {percentOf} from './chartMath'

const formatNumber = (n: number) => new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(n)

interface MiniBarRowProps {
    label: string
    count: number
    /** Largest count across the sibling rows — sets this bar's relative width. */
    max: number
    /** Highlight tone for the filled track; defaults to the amber accent. */
    accent?: 'tertiary' | 'primary'
}

/**
 * One horizontal distribution bar: label at the start, value at the end, and a
 * proportionally filled track underneath (width % = count / max). Empty bars
 * still render a faint full-width track so the row stays legible.
 */
export const MiniBarRow = ({label, count, max, accent = 'tertiary'}: MiniBarRowProps) => {
    const theme = useAppTheme()
    const pct = percentOf(count, max)
    const fill = accent === 'primary' ? theme.colors.primary : theme.colors.tertiary

    return (
        <View style={styles.row}>
            <View style={styles.head}>
                <Text style={[styles.label, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {label}
                </Text>
                <Text style={[styles.value, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                    {formatNumber(count)}
                </Text>
            </View>
            <View style={[styles.track, {backgroundColor: theme.colors.surfaceVariant}]}>
                <View style={[styles.fill, {width: `${Math.max(pct, count > 0 ? 6 : 0)}%`, backgroundColor: fill}]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {gap: 6, marginBottom: 12},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8},
    label: {flex: 1, fontSize: 13, fontWeight: '600'},
    value: {fontSize: 12.5, fontWeight: '700'},
    track: {height: 8, borderRadius: 6, overflow: 'hidden'},
    fill: {height: '100%', borderRadius: 6},
})
