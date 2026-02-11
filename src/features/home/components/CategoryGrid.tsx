import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text, useTheme} from 'react-native-paper'

import {usePartCategories} from '@/global/hooks'
import {CategoryGrid as GlobalCategoryGrid} from '@/global/components'

import type {PartCategory} from '@/global/types'

interface CategoryGridProps {
    onSelectCategory: (category: PartCategory) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    PARTS_CATEGORIES: 'فئات قطع الغيار',
    VIEW_ALL_PARTS: 'عرض الكل',
    EMPTY_OR_ERROR: 'لم يتم تحميل الفئات',
    RETRY: 'إعادة المحاولة',
}

export const CategoryGrid = ({onSelectCategory, onViewAll}: CategoryGridProps) => {
    const theme = useTheme()
    const {categories: apiCategories, loading, error, refresh} = usePartCategories()
    const categories = apiCategories ?? []

    const handleSelect = (category: {id: number; slug: string; name: string; icon: string}) => {
        onSelectCategory(category.slug as PartCategory)
    }

    if (categories.length === 0 && !loading && error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text variant='titleLarge' style={[styles.title, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.PARTS_CATEGORIES}
                    </Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, textAlign: 'center'}}>
                        {error ?? ARABIC_TEXT.EMPTY_OR_ERROR}
                    </Text>
                    <Button mode='outlined' onPress={refresh} style={styles.retryButton}>
                        {ARABIC_TEXT.RETRY}
                    </Button>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant='titleLarge' style={[styles.title, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.PARTS_CATEGORIES}
                </Text>
                <Button
                    mode='text'
                    onPress={onViewAll}
                    compact
                    textColor={theme.colors.primary}
                    labelStyle={styles.viewAllLabel}
                    contentStyle={styles.viewAllContent}
                    rippleColor={theme.colors.primaryContainer}>
                    {ARABIC_TEXT.VIEW_ALL_PARTS}
                </Button>
            </View>

            <GlobalCategoryGrid
                categories={categories}
                loading={loading}
                onSelect={handleSelect}
                showHeader={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    title: {
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 28,
    },
    viewAllLabel: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.1,
    },
    viewAllContent: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        minWidth: 0,
    },
    emptyContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    retryButton: {
        marginTop: 12,
    },
})
