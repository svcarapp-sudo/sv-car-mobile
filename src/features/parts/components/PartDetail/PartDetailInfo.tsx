import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PriceTag} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {Part} from '@/global/types'

import {StockPill} from '../shared'

interface PartDetailInfoProps {
    part: Part
}

/**
 * The price + identity block — name, brand/SKU, price, stock badge.
 * Lifts above the page in a single card to anchor the eye after the hero.
 */
export const PartDetailInfo = ({part}: PartDetailInfoProps) => {
    const theme = useAppTheme()
    const views = part.viewCount ?? 0
    const hasBrand = Boolean(part.brand)
    const hasSku = Boolean(part.sku)
    const dividerColor = {backgroundColor: theme.colors.outline}

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <View style={styles.pills}>
                <StockPill inStock={part.inStock} />
            </View>

            <Text style={[styles.name, {color: theme.colors.onSurface}]}>{part.name}</Text>

            <View style={styles.metaRow}>
                {hasBrand && (
                    <View style={styles.metaItem}>
                        <Icon source='factory' size={13} color={theme.colors.onSurfaceVariant} />
                        <Text style={[styles.metaText, {color: theme.colors.onSurfaceVariant}]}>{part.brand}</Text>
                    </View>
                )}
                {hasBrand && hasSku && <View style={[styles.divider, dividerColor]} />}
                {hasSku && (
                    <View style={styles.metaItem}>
                        <Icon source='barcode' size={13} color={theme.colors.onSurfaceVariant} />
                        <Text style={[styles.metaText, {color: theme.colors.onSurfaceVariant}]}>{part.sku}</Text>
                    </View>
                )}
                {(hasBrand || hasSku) && <View style={[styles.divider, dividerColor]} />}
                <View style={styles.metaItem}>
                    <Icon source='eye-outline' size={13} color={theme.colors.onSurfaceVariant} />
                    <Text style={[styles.metaText, {color: theme.colors.onSurfaceVariant}]}>{views}</Text>
                </View>
            </View>

            <View style={[styles.priceRow, {borderTopColor: theme.colors.outlineVariant}]}>
                <View style={styles.priceLabelBlock}>
                    <Text style={[styles.priceLabel, {color: theme.colors.onSurfaceVariant}]}>السعر</Text>
                    <Text style={[styles.priceHint, {color: theme.colors.onSurfaceVariant}]}>شامل التوصيل</Text>
                </View>
                <PriceTag price={part.price} size='xl' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        gap: 12,
        marginTop: -28,
    },
    pills: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center'},
    name: {fontSize: 21, fontWeight: '800', lineHeight: 28, letterSpacing: -0.4},
    metaRow: {flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap'},
    metaItem: {flexDirection: 'row', alignItems: 'center', gap: 5},
    metaText: {fontSize: 12, fontWeight: '600', letterSpacing: 0.1},
    divider: {width: 3, height: 3, borderRadius: 2},
    priceRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    priceLabelBlock: {gap: 2},
    priceLabel: {fontSize: 11, fontWeight: '600', letterSpacing: 0.2},
    priceHint: {fontSize: 11, fontWeight: '500', opacity: 0.75},
})
