import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const CURRENCY = 'ر.س'
const SKU_LABEL = 'SKU'

const formatPrice = (price: number) =>
    Number.isFinite(price) ? new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(price) : '—'

interface MyPartCardFooterProps {
    price: number
    viewCount: number
    sku?: string
}

export const MyPartCardFooter = ({price, viewCount, sku}: MyPartCardFooterProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.row}>
            <Text style={[styles.price, {color: themeColors.textPrice}]}>
                {formatPrice(price)} <Text style={styles.currency}>{CURRENCY}</Text>
            </Text>
            <View style={styles.endMeta}>
                <Icon source='eye-outline' size={11} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.sku, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                    {viewCount}
                    {sku ? ` · ${SKU_LABEL} ${sku}` : ''}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 2},
    price: {fontSize: 16, fontWeight: '800', letterSpacing: -0.3},
    currency: {fontSize: 10, fontWeight: '600'},
    endMeta: {flexDirection: 'row', alignItems: 'center', gap: 3, flexShrink: 1},
    sku: {fontSize: 10, opacity: 0.7, flexShrink: 1},
})
