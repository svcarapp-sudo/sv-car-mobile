import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

interface CategoryGridItemProps {
    category: PartCategoryApi
    onPress: () => void
}

/**
 * Premium tile — square, mono-icon over a faint amber wash,
 * Arabic label below. No childish colored circles, no chevron noise.
 */
export const CategoryGridItem = ({category, onPress}: CategoryGridItemProps) => {
    return (
        <View style={styles.wrapper}>
            <Pressable
                onPress={onPress}
                style={({pressed}) => [styles.tile, pressed && styles.tilePressed]}
                accessibilityRole='button'
                accessibilityLabel={category.name}>
                <View style={styles.iconBox}>
                    <Icon source={category.icon || 'package-variant'} size={26} color={themeColors.primary} />
                </View>

                <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
                    {category.name}
                </Text>

                <View style={styles.accentBar} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '33.3333%',
        padding: 5,
    },
    tile: {
        backgroundColor: themeColors.surface,
        borderRadius: 16,
        paddingTop: 16,
        paddingBottom: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        minHeight: 108,
        overflow: 'hidden',
    },
    tilePressed: {
        opacity: 0.75,
        transform: [{scale: 0.97}],
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: themeColors.accentSubtle,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 11.5,
        fontWeight: '600',
        lineHeight: 16,
        textAlign: 'center',
        color: themeColors.onSurface,
        paddingHorizontal: 2,
    },
    accentBar: {
        position: 'absolute',
        bottom: 0,
        start: '50%',
        marginStart: -10,
        width: 20,
        height: 2,
        borderRadius: 1,
        backgroundColor: themeColors.tertiary,
        opacity: 0.4,
    },
})
