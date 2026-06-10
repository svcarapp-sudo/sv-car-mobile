import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'

const ARABIC = {VERIFIED: 'بائع موثّق'}

/**
 * Trust marker shown next to the seller name when the seller has an active paid plan.
 * Amber verified tick, modeled on the marketplace "verified seller" pattern.
 */
export const VerifiedBadge = () => (
    <View style={styles.badge}>
        <Icon source='check-decagram' size={13} color={themeColors.onTertiary} />
        <Text style={styles.label}>{ARABIC.VERIFIED}</Text>
    </View>
)

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 4,
        paddingStart: 8,
        paddingEnd: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: themeColors.tertiary,
    },
    label: {fontSize: 11, fontWeight: '700', color: themeColors.onTertiary},
})
