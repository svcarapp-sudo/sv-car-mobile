import {StyleSheet, View} from 'react-native'

import type {SellerAnalytics} from '../../types'
import {AnalyticsTile} from './AnalyticsTile'

const ARABIC = {ACTIVE: 'نشطة', LOW: 'مخزون منخفض', OUT: 'نفد المخزون'}

interface StockHealthRowProps {
    analytics: SellerAnalytics
}

/** Three-up stock-health snapshot: active / low-stock / out-of-stock listings. */
export const StockHealthRow = ({analytics}: StockHealthRowProps) => (
    <View style={styles.row}>
        <AnalyticsTile icon='check-decagram-outline' value={analytics.activeListings} caption={ARABIC.ACTIVE} accent='success' />
        <AnalyticsTile icon='alert-outline' value={analytics.lowStockCount} caption={ARABIC.LOW} accent='warning' />
        <AnalyticsTile icon='close-circle-outline' value={analytics.outOfStockCount} caption={ARABIC.OUT} accent='error' />
    </View>
)

const styles = StyleSheet.create({
    row: {flexDirection: 'row', gap: 10},
})
