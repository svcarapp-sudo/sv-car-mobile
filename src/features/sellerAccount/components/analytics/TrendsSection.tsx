import {StyleSheet, View} from 'react-native'

import type {TrendPoint} from '../../types'
import {AnalyticsSection} from './AnalyticsSection'
import {MiniColumns} from './MiniColumns'

const ARABIC = {
    NEW: 'إعلانات جديدة',
    DEMAND: 'طلبات مطابقة لتخصّصك',
    EMPTY: 'لا يوجد نشاط في هذه الفترة',
}

interface TrendsSectionProps {
    newListingsTrend: TrendPoint[]
    matchedDemandTrend: TrendPoint[]
}

/** Two daily trend cards: new listings and matched demand, as column charts. */
export const TrendsSection = ({newListingsTrend, matchedDemandTrend}: TrendsSectionProps) => (
    <View style={styles.wrap}>
        <AnalyticsSection title={ARABIC.NEW}>
            <MiniColumns points={newListingsTrend} empty={ARABIC.EMPTY} accent='primary' />
        </AnalyticsSection>
        <AnalyticsSection title={ARABIC.DEMAND}>
            <MiniColumns points={matchedDemandTrend} empty={ARABIC.EMPTY} accent='tertiary' />
        </AnalyticsSection>
    </View>
)

const styles = StyleSheet.create({
    wrap: {gap: 24},
})
