import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

import {CategoryArt} from './categoryArt'

interface CategoryGridItemProps {
    category: PartCategoryApi
    onPress: () => void
}

/**
 * Premium tile — a dimensional, gradient-shaded category illustration,
 * Arabic label below, lifted off the page with a subtle shadow.
 */
export const CategoryGridItem = ({category, onPress}: CategoryGridItemProps) => {
    return (
        <View style={styles.wrapper}>
            <Pressable
                onPress={onPress}
                style={({pressed}) => [styles.tile, pressed && styles.tilePressed]}
                accessibilityRole='button'
                accessibilityLabel={category.name}>
                <View style={styles.art}>
                    <CategoryArt slug={category.slug} size={64} />
                </View>

                <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
                    {category.name}
                </Text>
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
        borderRadius: 18,
        paddingTop: 14,
        paddingBottom: 13,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        minHeight: 128,
        ...shadows.sm,
    },
    tilePressed: {
        opacity: 0.85,
        transform: [{scale: 0.97}],
    },
    art: {
        marginBottom: 4,
    },
    name: {
        fontSize: 11.5,
        fontWeight: '600',
        lineHeight: 16,
        textAlign: 'center',
        color: themeColors.onSurface,
        paddingHorizontal: 2,
    },
})
