import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {CategoryArt, PressableScale} from '@/global/components'
import {shadows, themeColors} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

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
        <PressableScale
            onPress={onPress}
            withHaptic
            containerStyle={styles.wrapper}
            style={styles.tile}
            accessibilityRole='button'
            accessibilityLabel={category.name}>
            <View style={styles.art}>
                <CategoryArt slug={category.slug} size={64} />
            </View>

            <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
                {category.name}
            </Text>
        </PressableScale>
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
