import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'

export interface QuickActionTileProps {
    icon: string
    label: string
    onPress: () => void
    badge?: string | number
    tone?: 'amber' | 'navy'
}

export const QuickActionTile = ({icon, label, onPress, badge, tone = 'navy'}: QuickActionTileProps) => {
    const isAmber = tone === 'amber'

    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.tile, pressed && styles.tilePressed]}
            accessibilityRole='button'
            accessibilityLabel={label}>
            <View
                style={[
                    styles.iconBox,
                    isAmber ? {backgroundColor: themeColors.tertiary} : {backgroundColor: themeColors.primaryContainer},
                ]}>
                <Icon source={icon} size={20} color={isAmber ? themeColors.onTertiary : themeColors.primary} />

                {badge != null && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.label} numberOfLines={1}>
                {label}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 4,
    },
    tilePressed: {
        opacity: 0.7,
        transform: [{scale: 0.96}],
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        end: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        paddingHorizontal: 5,
        backgroundColor: themeColors.error,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: themeColors.surface,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: themeColors.onError,
        lineHeight: 11,
    },
    label: {
        fontSize: 11.5,
        fontWeight: '600',
        color: themeColors.onSurface,
        textAlign: 'center',
    },
})
