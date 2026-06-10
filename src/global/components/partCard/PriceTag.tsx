import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {formatPrice} from '@/global/utils'

type PriceSize = 'sm' | 'md' | 'lg' | 'xl'

interface PriceTagProps {
    price: number
    size?: PriceSize
    currency?: string
    align?: 'start' | 'end'
}

export const PriceTag = ({price, size = 'md', currency = 'ر.س', align = 'start'}: PriceTagProps) => {
    const theme = useAppTheme()
    const sizing = SIZES[size]

    return (
        <View style={[styles.row, align === 'end' && styles.rowEnd]}>
            <Text style={[styles.amount, {fontSize: sizing.amount, color: theme.colors.tertiary}]}>
                {Number.isFinite(price) ? formatPrice(price) : '—'}
            </Text>
            <Text style={[styles.currency, {fontSize: sizing.currency, color: theme.colors.onSurfaceVariant}]}>{currency}</Text>
        </View>
    )
}

const SIZES: Record<PriceSize, {amount: number; currency: number}> = {
    sm: {amount: 14, currency: 10},
    md: {amount: 17, currency: 11},
    lg: {amount: 24, currency: 13},
    xl: {amount: 32, currency: 15},
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
        writingDirection: 'ltr',
    },
    rowEnd: {alignSelf: 'flex-end'},
    amount: {
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    currency: {
        fontWeight: '600',
        letterSpacing: 0.2,
    },
})
