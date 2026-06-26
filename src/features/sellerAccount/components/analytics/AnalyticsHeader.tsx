import {StyleSheet, View} from 'react-native'
import {SegmentedButtons, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {haptics} from '@/global/utils'
import type {AnalyticsRange} from '../../hooks/useSellerAnalytics'

const ARABIC = {TITLE: 'التحليلات والأداء', SUBTITLE: (n: number) => `آخر ${n} يوم`}

const RANGES: {value: string; label: string}[] = [
    {value: '7', label: '٧'},
    {value: '30', label: '٣٠'},
    {value: '90', label: '٩٠'},
]

interface AnalyticsHeaderProps {
    days: AnalyticsRange
    onChange: (days: AnalyticsRange) => void
}

/** Screen title + a 7 / 30 / 90-day range toggle that refetches on change. */
export const AnalyticsHeader = ({days, onChange}: AnalyticsHeaderProps) => {
    const theme = useAppTheme()

    const handleChange = (value: string) => {
        haptics.selection()
        onChange(Number(value) as AnalyticsRange)
    }

    return (
        <View style={styles.header}>
            <Text variant='titleLarge' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC.TITLE}
            </Text>
            <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC.SUBTITLE(days)}</Text>
            <SegmentedButtons value={String(days)} onValueChange={handleChange} buttons={RANGES} style={styles.toggle} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {paddingHorizontal: 20, paddingTop: 18, paddingBottom: 6, gap: 4},
    title: {fontWeight: '800', letterSpacing: -0.3},
    subtitle: {fontSize: 13, fontWeight: '600'},
    toggle: {marginTop: 12},
})
