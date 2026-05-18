import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Text} from 'react-native-paper'

import {useCatalog} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {PartCategory} from '@/global/types'
import {CategoryGridItem} from './CategoryGridItem'

interface CategoryGridProps {
    onSelectCategory: (category: PartCategory) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    TITLE: 'تصفّح حسب الفئة',
    SUBTITLE: 'اعثر على القطعة التي تحتاجها',
    VIEW_ALL: 'عرض الكل',
    EMPTY_OR_ERROR: 'لم يتم تحميل الفئات',
    RETRY: 'إعادة المحاولة',
    LOADING: 'جاري تحميل الفئات...',
}

const SectionHeader = ({onViewAll, showViewAll}: {onViewAll?: () => void; showViewAll?: boolean}) => (
    <View style={styles.header}>
        <View style={styles.titleBlock}>
            <Text style={styles.title}>{ARABIC_TEXT.TITLE}</Text>
            <Text style={styles.subtitle}>{ARABIC_TEXT.SUBTITLE}</Text>
        </View>
        {showViewAll && onViewAll && (
            <Button
                mode='text'
                onPress={onViewAll}
                compact
                textColor={themeColors.primary}
                labelStyle={styles.viewAllLabel}
                contentStyle={styles.viewAllContent}>
                {ARABIC_TEXT.VIEW_ALL}
            </Button>
        )}
    </View>
)

export const CategoryGrid = ({onSelectCategory, onViewAll}: CategoryGridProps) => {
    const {
        categories: apiCategories,
        categoriesLoading: loading,
        categoriesError: error,
        refreshCategories: refresh,
    } = useCatalog()
    const categories = (apiCategories ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder)

    if (categories.length === 0 && !loading && error) {
        return (
            <View style={styles.container}>
                <SectionHeader />
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{error ?? ARABIC_TEXT.EMPTY_OR_ERROR}</Text>
                    <Button mode='outlined' onPress={refresh} style={styles.retryButton}>
                        {ARABIC_TEXT.RETRY}
                    </Button>
                </View>
            </View>
        )
    }

    if (loading && categories.length === 0) {
        return (
            <View style={styles.container}>
                <SectionHeader />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='small' color={themeColors.tertiary} />
                    <Text style={styles.loadingText}>{ARABIC_TEXT.LOADING}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SectionHeader showViewAll onViewAll={onViewAll} />
            <View style={styles.grid}>
                {categories.map(category => (
                    <CategoryGridItem
                        key={category.id}
                        category={category}
                        onPress={() => onSelectCategory(category.slug as PartCategory)}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingHorizontal: 18, marginTop: 20, marginBottom: 24},
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    titleBlock: {flex: 1},
    title: {fontSize: 17, fontWeight: '700', color: themeColors.onSurface, letterSpacing: -0.2},
    subtitle: {fontSize: 12, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 2},
    viewAllLabel: {fontSize: 12.5, fontWeight: '700', letterSpacing: 0.1},
    viewAllContent: {paddingVertical: 2, paddingHorizontal: 6, minWidth: 0},
    grid: {flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5},
    emptyContainer: {paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center'},
    emptyText: {color: themeColors.onSurfaceVariant, textAlign: 'center'},
    retryButton: {marginTop: 12},
    loadingContainer: {paddingVertical: 24, alignItems: 'center'},
    loadingText: {color: themeColors.onSurfaceVariant, marginTop: 8, fontSize: 12},
})
