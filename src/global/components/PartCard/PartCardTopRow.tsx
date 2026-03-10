import {StyleSheet, View, Image} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {Part, PartCategoryApi} from '@/global/types'

const ARABIC_TEXT = {
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
}

interface PartCardTopRowProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
    showStockStatus?: boolean
}

export const PartCardTopRow = ({part, categoryInfo, showStockStatus = false}: PartCardTopRowProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.topRow}>
            {part.imageUrl ? (
                <Image source={{uri: part.imageUrl}} style={styles.image} resizeMode='cover' />
            ) : (
                <View style={[styles.iconFallback, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={categoryInfo?.icon || 'package-variant'} size={24} color={theme.colors.primary} />
                </View>
            )}

            <View style={styles.infoColumn}>
                <Text style={[styles.partName, {color: theme.colors.onSurface}]} numberOfLines={2}>
                    {part.name}
                </Text>
                {part.brand && (
                    <Text style={[styles.partBrand, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {part.brand}
                    </Text>
                )}
                {showStockStatus && (
                    <View style={styles.stockRow}>
                        <View style={[styles.stockDot, {backgroundColor: part.inStock ? theme.colors.successBright : theme.colors.error}]} />
                        <Text style={[styles.stockText, {color: part.inStock ? theme.colors.success : theme.colors.errorDark}]}>
                            {part.inStock ? ARABIC_TEXT.IN_STOCK : ARABIC_TEXT.OUT_OF_STOCK}
                        </Text>
                    </View>
                )}
            </View>

            <View style={[styles.priceBox, {backgroundColor: theme.colors.accentContainer}]}>
                <Text style={[styles.priceCurrency, {color: theme.colors.tertiary}]}>$</Text>
                <Text style={[styles.priceValue, {color: theme.colors.tertiary}]}>{part.price.toFixed(2)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 14,
        backgroundColor: themeColors.surfaceVariant,
        marginEnd: 14,
    },
    iconFallback: {
        width: 64,
        height: 64,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    infoColumn: {
        flex: 1,
        marginEnd: 12,
    },
    partName: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.2,
        lineHeight: 20,
        marginBottom: 3,
    },
    partBrand: {
        fontSize: 12,
        letterSpacing: 0.2,
        opacity: 0.7,
        marginBottom: 6,
    },
    stockRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    stockDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    stockText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    priceBox: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 72,
    },
    priceCurrency: {
        fontSize: 11,
        fontWeight: '500',
        opacity: 0.7,
        marginBottom: 1,
    },
    priceValue: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
})
