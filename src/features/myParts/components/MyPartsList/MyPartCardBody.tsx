import {StyleSheet, View, Image} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

interface MakeInfo {
    name: string
    logoUrl?: string | null
}

interface MyPartCardBodyProps {
    imageUrl?: string | null
    name: string
    price: number
    vehicleLabel: string
    makeLogoUrl?: string | null
    categoryInfo?: PartCategoryApi | null
}

export const MyPartCardBody = ({imageUrl, name, price, vehicleLabel, makeLogoUrl, categoryInfo}: MyPartCardBodyProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.body}>
            {imageUrl ? (
                <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
            ) : (
                <View style={[styles.iconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={categoryInfo?.icon || 'package-variant'} size={28} color={theme.colors.primary} />
                </View>
            )}

            <View style={styles.info}>
                <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {name}
                </Text>

                {vehicleLabel ? (
                    <View style={styles.vehicleRow}>
                        {makeLogoUrl ? (
                            <Image source={{uri: makeLogoUrl}} style={styles.makeLogo} resizeMode="contain" />
                        ) : (
                            <Icon source="car" size={13} color={theme.colors.onSurfaceVariant} />
                        )}
                        <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {vehicleLabel}
                        </Text>
                    </View>
                ) : null}

                {categoryInfo ? (
                    <View style={[styles.categoryChip, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source={categoryInfo.icon || 'tag'} size={11} color={theme.colors.primary} />
                        <Text style={[styles.categoryText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                    </View>
                ) : null}
            </View>

            <View style={[styles.priceBox, {backgroundColor: theme.colors.accentContainer}]}>
                <Text style={[styles.priceCurrency, {color: theme.colors.tertiary}]}>$</Text>
                <Text style={[styles.priceValue, {color: theme.colors.tertiary}]}>{price.toFixed(0)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: themeColors.surfaceVariant,
        marginEnd: 12,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 12,
    },
    info: {
        flex: 1,
        marginEnd: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
        marginBottom: 4,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 6,
    },
    makeLogo: {
        width: 13,
        height: 13,
    },
    vehicleText: {
        fontSize: 12,
        flex: 1,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '600',
    },
    priceBox: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        alignItems: 'center',
        minWidth: 60,
    },
    priceCurrency: {
        fontSize: 10,
        fontWeight: '500',
        opacity: 0.7,
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '700',
    },
})
