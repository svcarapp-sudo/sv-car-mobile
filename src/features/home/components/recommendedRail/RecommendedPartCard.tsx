import React from 'react'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'
import type {Part} from '@/global/types'

const FRESH_WINDOW_MS = 48 * 60 * 60 * 1000

const formatPrice = (price: number) => {
    if (!Number.isFinite(price)) return '—'
    return new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(price)
}

interface RecommendedPartCardProps {
    part: Part
    onPress: () => void
    icon?: string
}

export const RecommendedPartCard = ({part, onPress, icon}: RecommendedPartCardProps) => {
    const isFresh = part.createdAt != null && Date.now() - part.createdAt < FRESH_WINDOW_MS

    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.card, pressed && styles.cardPressed]}
            accessibilityRole='button'>
            <View style={styles.mediaBox}>
                {part.imageUrl ? (
                    <Image source={{uri: part.imageUrl}} style={styles.media} resizeMode='cover' />
                ) : (
                    <View style={styles.mediaPlaceholder}>
                        <Icon source={icon || 'package-variant'} size={36} color={themeColors.tertiary} />
                    </View>
                )}

                {isFresh && (
                    <View style={styles.freshPill}>
                        <Text style={styles.freshText}>جديد</Text>
                    </View>
                )}
            </View>

            <View style={styles.body}>
                <Text style={styles.name} numberOfLines={2}>
                    {part.name}
                </Text>

                {part.sellerName && (
                    <View style={styles.sellerRow}>
                        <Icon source='store-outline' size={11} color={themeColors.onSurfaceVariant} />
                        <Text style={styles.sellerText} numberOfLines={1}>
                            {part.sellerName}
                        </Text>
                    </View>
                )}

                <View style={styles.priceRow}>
                    <Text style={styles.price}>{formatPrice(part.price)}</Text>
                    <Text style={styles.currency}>ر.س</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 168,
        marginEnd: 12,
        borderRadius: 18,
        backgroundColor: themeColors.surface,
        overflow: 'hidden',
        ...shadows.sm,
    },
    cardPressed: {opacity: 0.85, transform: [{scale: 0.985}]},
    mediaBox: {
        height: 110,
        backgroundColor: themeColors.surfaceContainerLow,
        position: 'relative',
    },
    media: {width: '100%', height: '100%'},
    mediaPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.accentSubtle,
    },
    freshPill: {
        position: 'absolute',
        top: 8,
        end: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: themeColors.tertiary,
    },
    freshText: {fontSize: 10, fontWeight: '700', color: themeColors.onTertiary, letterSpacing: 0.3},
    body: {padding: 11, gap: 6},
    name: {
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 18,
        color: themeColors.onSurface,
        minHeight: 36,
    },
    sellerRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
    sellerText: {fontSize: 11, color: themeColors.onSurfaceVariant, flex: 1},
    priceRow: {flexDirection: 'row', alignItems: 'baseline', gap: 3, marginTop: 2},
    price: {fontSize: 15, fontWeight: '800', color: themeColors.textPrice, letterSpacing: -0.2},
    currency: {fontSize: 10, fontWeight: '600', color: themeColors.onSurfaceVariant},
})
