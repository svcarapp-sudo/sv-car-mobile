import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {TrendPoint} from '../../types'
import {allZero, percentOf, seriesMax, trendAxis} from './chartMath'

const CHART_HEIGHT = 72

interface MiniColumnsProps {
    points: TrendPoint[]
    empty: string
    accent?: 'tertiary' | 'primary'
}

/**
 * Compact bar chart: a TrendPoint[] drawn as evenly-spaced vertical columns
 * (height ∝ count / max), with the first and last dates shown lightly as axis
 * captions. An all-zero (or empty) series shows a quiet placeholder line.
 */
export const MiniColumns = ({points, empty, accent = 'primary'}: MiniColumnsProps) => {
    const theme = useAppTheme()
    const fill = accent === 'tertiary' ? theme.colors.tertiary : theme.colors.primary

    if (points.length === 0 || allZero(points)) {
        return (
            <View style={[styles.emptyBox, {backgroundColor: theme.colors.surfaceVariant}]}>
                <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{empty}</Text>
            </View>
        )
    }

    const max = seriesMax(points)
    const axis = trendAxis(points)

    return (
        <View>
            <View style={[styles.chart, {height: CHART_HEIGHT}]}>
                {points.map(p => {
                    const h = Math.max((percentOf(p.count, max) / 100) * CHART_HEIGHT, p.count > 0 ? 3 : 1)
                    const bg = p.count > 0 ? fill : theme.colors.surfaceVariant
                    return <View key={p.date} style={[styles.col, {height: h, backgroundColor: bg}]} />
                })}
            </View>
            <View style={styles.axis}>
                <Text style={[styles.axisLabel, {color: theme.colors.onSurfaceVariant}]}>{axis.start}</Text>
                <Text style={[styles.axisLabel, {color: theme.colors.onSurfaceVariant}]}>{axis.end}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chart: {flexDirection: 'row', alignItems: 'flex-end', gap: 2},
    col: {flex: 1, borderRadius: 3, minWidth: 2},
    axis: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 6},
    axisLabel: {fontSize: 10.5, fontWeight: '600', opacity: 0.8},
    emptyBox: {height: CHART_HEIGHT + 20, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
    empty: {fontSize: 12.5, fontWeight: '600'},
})
