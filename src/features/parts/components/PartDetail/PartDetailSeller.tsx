import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Part} from '@/global/types'

const ARABIC_TEXT = {
    SECTION_TITLE: 'البائع',
    VERIFIED: 'موثّق',
    DEFAULT_SELLER: 'بائع خاص',
}

interface PartDetailSellerProps {
    part: Part
}

/**
 * Marketplace trust card — seller avatar (initial), name, city, verified pill.
 * Mercari/Haraj-inspired. The old "view store" CTA had no handler (a dead
 * tap), so it was removed until seller storefronts exist.
 */
export const PartDetailSeller = ({part}: PartDetailSellerProps) => {
    const theme = useAppTheme()
    const sellerName = part.sellerName || ARABIC_TEXT.DEFAULT_SELLER
    const initial = sellerName.charAt(0).toUpperCase()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <Text style={[styles.sectionTitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SECTION_TITLE}</Text>

            <View style={styles.row}>
                <View style={[styles.avatar, {backgroundColor: theme.colors.accentSubtle}]}>
                    <Text style={[styles.avatarText, {color: theme.colors.tertiary}]}>{initial}</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.nameRow}>
                        <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {sellerName}
                        </Text>
                        <View style={[styles.verifiedPill, {backgroundColor: theme.colors.infoContainer}]}>
                            <Icon source='shield-check' size={11} color={theme.colors.info} />
                            <Text style={[styles.verifiedText, {color: theme.colors.onInfoContainer}]}>
                                {ARABIC_TEXT.VERIFIED}
                            </Text>
                        </View>
                    </View>

                    {part.sellerCity && (
                        <View style={styles.metaItem}>
                            <Icon source='map-marker' size={13} color={theme.colors.onSurfaceVariant} />
                            <Text style={[styles.metaText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {part.sellerCity}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 22, padding: 18, borderWidth: 1, gap: 12},
    sectionTitle: {fontSize: 11, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase'},
    row: {flexDirection: 'row', alignItems: 'center', gap: 12},
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {fontSize: 18, fontWeight: '800', letterSpacing: -0.3},
    body: {flex: 1, gap: 4, minWidth: 0},
    nameRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
    name: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2, flexShrink: 1},
    verifiedPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 999,
    },
    verifiedText: {fontSize: 10, fontWeight: '700', letterSpacing: 0.2},
    metaItem: {flexDirection: 'row', alignItems: 'center', gap: 4},
    metaText: {fontSize: 12, fontWeight: '500', flexShrink: 1},
})
