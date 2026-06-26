import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {LabelCount} from '../../types'
import {AnalyticsSection} from './AnalyticsSection'
import {seriesMax} from './chartMath'
import {MiniBarRow} from './MiniBarRow'

const ARABIC = {STATUS: 'توزيع الحالة', CATEGORY: 'حسب الفئة', EMPTY: 'لا توجد بيانات بعد'}

const BarList = ({items, accent}: {items: LabelCount[]; accent: 'tertiary' | 'primary'}) => {
    const theme = useAppTheme()
    if (items.length === 0) {
        return <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{ARABIC.EMPTY}</Text>
    }
    const max = seriesMax(items)
    return (
        <View style={styles.last}>
            {items.map(it => (
                <MiniBarRow key={it.label} label={it.label} count={it.count} max={max} accent={accent} />
            ))}
        </View>
    )
}

interface DistributionsSectionProps {
    partsByStatus: LabelCount[]
    partsByCategory: LabelCount[]
}

/** Two distribution cards (status + category) rendered as horizontal bar lists. */
export const DistributionsSection = ({partsByStatus, partsByCategory}: DistributionsSectionProps) => (
    <View style={styles.wrap}>
        <AnalyticsSection title={ARABIC.STATUS}>
            <BarList items={partsByStatus} accent='primary' />
        </AnalyticsSection>
        <AnalyticsSection title={ARABIC.CATEGORY}>
            <BarList items={partsByCategory} accent='tertiary' />
        </AnalyticsSection>
    </View>
)

const styles = StyleSheet.create({
    wrap: {gap: 24},
    // cancels the trailing marginBottom of the final MiniBarRow inside the card
    last: {marginBottom: -12},
    empty: {fontSize: 12.5, fontWeight: '600', paddingVertical: 6},
})
