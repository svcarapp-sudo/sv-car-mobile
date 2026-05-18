import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

const ARABIC_TEXT = {
    BROWSE_ALL: 'عرض جميع القطع',
    BROWSE_ALL_DESC: 'تصفّح المخزون الكامل المتاح لمركبتك',
    CTA: 'تصفّح',
}

interface BrowseAllCardProps {
    onPress: () => void
    totalCount?: number
}

/**
 * Premium gradient-feeling banner for "browse all". Replaces the old
 * navy banner with a deeper visual hierarchy and explicit CTA chip.
 */
export const BrowseAllCard = ({onPress, totalCount}: BrowseAllCardProps) => {
    const theme = useAppTheme()

    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [
                styles.card,
                shadows.md,
                {backgroundColor: theme.colors.primary},
                pressed && styles.cardPressed,
            ]}
            accessibilityRole='button'>
            <View style={[styles.glow, {backgroundColor: theme.colors.tertiary}]} />
            <View style={[styles.glow2, {backgroundColor: theme.colors.accentMuted}]} />

            <View style={[styles.iconBox, {backgroundColor: theme.colors.onDarkContainer}]}>
                <Icon source='view-grid-outline' size={26} color={theme.colors.tertiary} />
            </View>

            <View style={styles.body}>
                <Text style={[styles.title, {color: theme.colors.onPrimary}]}>{ARABIC_TEXT.BROWSE_ALL}</Text>
                <Text style={[styles.desc, {color: theme.colors.onDarkMedium}]} numberOfLines={2}>
                    {ARABIC_TEXT.BROWSE_ALL_DESC}
                </Text>
            </View>

            <View style={[styles.cta, {backgroundColor: theme.colors.tertiary}]}>
                <Text style={[styles.ctaText, {color: theme.colors.onTertiary}]}>
                    {totalCount ? `${totalCount}+` : ARABIC_TEXT.CTA}
                </Text>
                <Icon source='chevron-left' size={14} color={theme.colors.onTertiary} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        overflow: 'hidden',
        position: 'relative',
    },
    cardPressed: {opacity: 0.92, transform: [{scale: 0.99}]},
    glow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        top: -60,
        end: -40,
        opacity: 0.18,
    },
    glow2: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        bottom: -30,
        end: 60,
        opacity: 0.25,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {flex: 1, gap: 3},
    title: {fontSize: 16, fontWeight: '800', letterSpacing: -0.2},
    desc: {fontSize: 12, fontWeight: '500', letterSpacing: 0.1, opacity: 0.9},
    cta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    ctaText: {fontSize: 12, fontWeight: '800', letterSpacing: 0.2},
})
