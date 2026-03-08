import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {Part, PartCategoryApi} from '@/global/types'

const ARABIC_TEXT = {
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
    SKU_LABEL: 'الرمز:',
}

interface PartCardProps {
    part: Part
    makeInfo?: {name: string; logoUrl?: string | null} | null
    modelInfo?: {name: string} | null
    categoryInfo?: PartCategoryApi | null
    onPress?: () => void
    showActions?: boolean
    onEdit?: () => void
    onDelete?: () => void
    showStockStatus?: boolean
}

export const PartCard = ({part, makeInfo, modelInfo, categoryInfo, onPress, showStockStatus = false}: PartCardProps) => {
    const theme = useAppTheme()
    const hasVehicleInfo = makeInfo || modelInfo || part.year

    const content = (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            {/* Top row: visual + info + price */}
            <View style={styles.topRow}>
                {/* Image or icon fallback */}
                {part.imageUrl ? (
                    <Image source={{uri: part.imageUrl}} style={styles.image} resizeMode='cover' />
                ) : (
                    <View style={[styles.iconFallback, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source={categoryInfo?.icon || 'package-variant'} size={24} color={theme.colors.primary} />
                    </View>
                )}

                {/* Center info */}
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

                {/* Price accent */}
                <View style={[styles.priceBox, {backgroundColor: theme.colors.accentContainer}]}>
                    <Text style={[styles.priceCurrency, {color: theme.colors.tertiary}]}>$</Text>
                    <Text style={[styles.priceValue, {color: theme.colors.tertiary}]}>{part.price.toFixed(2)}</Text>
                </View>
            </View>

            {/* Bottom row: vehicle info + category */}
            {(hasVehicleInfo || categoryInfo) && (
                <View style={[styles.bottomRow, {borderTopColor: theme.colors.outline}]}>
                    {hasVehicleInfo && (
                        <View style={styles.vehicleRow}>
                            {makeInfo && (
                                <View style={styles.vehicleChip}>
                                    {makeInfo.logoUrl ? (
                                        <Image source={{uri: makeInfo.logoUrl}} style={styles.makeLogo} resizeMode='contain' />
                                    ) : (
                                        <Icon source='car' size={12} color={theme.colors.onSurfaceVariant} />
                                    )}
                                    <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                                        {makeInfo.name}
                                    </Text>
                                </View>
                            )}
                            {modelInfo && (
                                <View style={styles.vehicleChip}>
                                    <Text style={[styles.vehicleSep, {color: theme.colors.outline}]}>•</Text>
                                    <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                                        {modelInfo.name}
                                    </Text>
                                </View>
                            )}
                            {part.year && (
                                <View style={styles.vehicleChip}>
                                    <Text style={[styles.vehicleSep, {color: theme.colors.outline}]}>•</Text>
                                    <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>{part.year}</Text>
                                </View>
                            )}
                        </View>
                    )}
                    {categoryInfo && (
                        <View style={[styles.categoryTag, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Icon source={categoryInfo.icon || 'tag'} size={12} color={theme.colors.primary} />
                            <Text style={[styles.categoryText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    )

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        )
    }

    return content
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginBottom: 12,
        padding: 16,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
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
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        gap: 4,
    },
    vehicleChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    makeLogo: {
        width: 14,
        height: 14,
    },
    vehicleText: {
        fontSize: 11,
        letterSpacing: 0.2,
    },
    vehicleSep: {
        fontSize: 11,
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginStart: 8,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
})
