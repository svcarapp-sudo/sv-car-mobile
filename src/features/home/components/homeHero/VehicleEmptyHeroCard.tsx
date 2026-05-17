import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    EYEBROW: 'ابدأ رحلتك',
    HEADLINE: 'أضف سيارتك للبداية',
    SUBTITLE: 'احصل على قطع غيار متوافقة وعروض مخصصة لمركبتك',
    CTA: 'إضافة مركبتي',
}

interface VehicleEmptyHeroCardProps {
    onAddVehicle: () => void
}

export const VehicleEmptyHeroCard = ({onAddVehicle}: VehicleEmptyHeroCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.accentEdge} />

            <View style={styles.row}>
                <View style={styles.illustration}>
                    <View style={styles.illustrationRing}>
                        <Icon source='car-2-plus' size={36} color={themeColors.tertiary} />
                    </View>
                    <View style={styles.sparkle1} />
                    <View style={styles.sparkle2} />
                </View>

                <View style={styles.info}>
                    <View style={styles.labelRow}>
                        <View style={styles.dot} />
                        <Text style={styles.label}>{ARABIC_TEXT.EYEBROW}</Text>
                    </View>
                    <Text style={styles.headline} numberOfLines={1}>
                        {ARABIC_TEXT.HEADLINE}
                    </Text>
                    <Text style={styles.subtitle} numberOfLines={2}>
                        {ARABIC_TEXT.SUBTITLE}
                    </Text>
                </View>
            </View>

            <Pressable
                onPress={onAddVehicle}
                style={({pressed}) => [styles.cta, pressed && styles.ctaPressed]}
                accessibilityRole='button'
                accessibilityLabel={ARABIC_TEXT.CTA}>
                <Icon source='plus' size={18} color={themeColors.onTertiary} />
                <Text style={styles.ctaText}>{ARABIC_TEXT.CTA}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
        backgroundColor: themeColors.surface,
        padding: 16,
        overflow: 'hidden',
        ...shadows.lg,
    },
    accentEdge: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        end: 0,
        width: 4,
        backgroundColor: themeColors.tertiary,
    },
    row: {flexDirection: 'row', alignItems: 'center'},
    illustration: {
        width: 64,
        height: 64,
        marginEnd: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustrationRing: {
        width: 62,
        height: 62,
        borderRadius: 18,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: themeColors.accentBorder,
        backgroundColor: themeColors.accentSubtle,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sparkle1: {
        position: 'absolute',
        top: -2,
        end: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: themeColors.tertiary,
    },
    sparkle2: {
        position: 'absolute',
        bottom: 2,
        start: -2,
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: themeColors.tertiary,
        opacity: 0.55,
    },
    info: {flex: 1, marginEnd: 6},
    labelRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2},
    dot: {width: 5, height: 5, borderRadius: 3, backgroundColor: themeColors.tertiary},
    label: {fontSize: 11, fontWeight: '600', letterSpacing: 0.4, color: themeColors.tertiary},
    headline: {fontSize: 17, fontWeight: '700', letterSpacing: -0.2, color: themeColors.onSurface, marginBottom: 4},
    subtitle: {fontSize: 12.5, lineHeight: 18, color: themeColors.onSurfaceVariant},
    cta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 14,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: themeColors.tertiary,
    },
    ctaPressed: {opacity: 0.88, transform: [{scale: 0.985}]},
    ctaText: {fontSize: 14, fontWeight: '700', color: themeColors.onTertiary, letterSpacing: 0.2},
})
