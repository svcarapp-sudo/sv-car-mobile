import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import type {Part, PartCategoryApi} from '@/global/types'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
}

interface PartDetailHeroProps {
    part: Part
    categoryInfo: PartCategoryApi | undefined
}

export const PartDetailHero = ({part, categoryInfo}: PartDetailHeroProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.heroCard, {backgroundColor: theme.colors.surface}]}>
            {part.imageUrl ? (
                <Image source={{uri: part.imageUrl}} style={styles.heroImage} resizeMode='cover' />
            ) : (
                <View style={[styles.heroIconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={categoryInfo?.icon || 'package-variant'} size={56} color={theme.colors.primary} />
                </View>
            )}

            <View style={styles.heroInfo}>
                <Text style={[styles.partName, {color: theme.colors.onSurface}]}>{part.name}</Text>
                {part.brand && <Text style={[styles.partBrand, {color: theme.colors.onSurfaceVariant}]}>{part.brand}</Text>}
                <View style={styles.metaRow}>
                    <View
                        style={[
                            styles.stockBadge,
                            {backgroundColor: part.inStock ? theme.colors.successContainer : theme.colors.errorContainer},
                        ]}>
                        <View
                            style={[
                                styles.stockDot,
                                {backgroundColor: part.inStock ? theme.colors.successBright : theme.colors.error},
                            ]}
                        />
                        <Text style={[styles.stockLabel, {color: part.inStock ? theme.colors.success : theme.colors.errorDark}]}>
                            {part.inStock ? ARABIC_TEXT.IN_STOCK : ARABIC_TEXT.OUT_OF_STOCK}
                        </Text>
                    </View>
                    {categoryInfo && (
                        <View style={[styles.categoryPill, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Icon source={categoryInfo.icon || 'tag'} size={13} color={theme.colors.primary} />
                            <Text style={[styles.categoryPillText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heroCard: {
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 12,
    },
    heroImage: {
        width: 96,
        height: 96,
        borderRadius: 18,
        backgroundColor: themeColors.surfaceVariant,
        marginEnd: 16,
    },
    heroIconBox: {
        width: 96,
        height: 96,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 16,
    },
    heroInfo: {
        flex: 1,
    },
    partName: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        lineHeight: 26,
        marginBottom: 4,
    },
    partBrand: {
        fontSize: 13,
        letterSpacing: 0.1,
        opacity: 0.7,
        marginBottom: 10,
    },
    metaRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    stockBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    stockDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    stockLabel: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    categoryPillText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
})
