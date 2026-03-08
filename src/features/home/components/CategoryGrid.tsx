import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {ActivityIndicator, Button, Icon, Text} from 'react-native-paper'

import {useAppTheme, usePartCategories} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {PartCategory, PartCategoryApi} from '@/global/types'

interface CategoryGridProps {
    onSelectCategory: (category: PartCategory) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    PARTS_CATEGORIES: 'فئات قطع الغيار',
    VIEW_ALL_PARTS: 'عرض الكل',
    EMPTY_OR_ERROR: 'لم يتم تحميل الفئات',
    RETRY: 'إعادة المحاولة',
    LOADING: 'جاري تحميل الفئات...',
}

interface CategoryTileProps {
    category: PartCategoryApi
    onPress: () => void
}

const CategoryTile = ({category, onPress}: CategoryTileProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity style={tileStyles.wrapper} onPress={onPress} activeOpacity={0.65}>
            <View style={[tileStyles.tile, {backgroundColor: theme.colors.surface}]}>
                <View style={[tileStyles.iconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={category.icon || 'package-variant'} size={20} color={theme.colors.primary} />
                </View>
                <Text style={[tileStyles.name, {color: theme.colors.onSurface}]} numberOfLines={1} ellipsizeMode='tail'>
                    {category.name}
                </Text>
                <View style={tileStyles.arrowWrap}>
                    <Icon source='chevron-left' size={14} color={theme.colors.onSurfaceVariant} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const tileStyles = StyleSheet.create({
    wrapper: {
        width: '50%',
        padding: 4,
    },
    tile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 14,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1.5,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 8,
    },
    name: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.1,
        lineHeight: 16,
    },
    arrowWrap: {
        opacity: 0.4,
        marginStart: 4,
    },
})

export const CategoryGrid = ({onSelectCategory, onViewAll}: CategoryGridProps) => {
    const theme = useAppTheme()
    const {categories: apiCategories, loading, error, refresh} = usePartCategories()
    const categories = (apiCategories ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder)

    const handleSelect = (category: PartCategoryApi) => {
        onSelectCategory(category.slug as PartCategory)
    }

    if (categories.length === 0 && !loading && error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.PARTS_CATEGORIES}
                        </Text>
                        <View style={[styles.titleAccent, {backgroundColor: theme.colors.tertiary}]} />
                    </View>
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

    if (loading && categories.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.PARTS_CATEGORIES}
                        </Text>
                        <View style={[styles.titleAccent, {backgroundColor: theme.colors.tertiary}]} />
                    </View>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='small' />
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant, marginTop: 8}}>
                        {ARABIC_TEXT.LOADING}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.PARTS_CATEGORIES}
                    </Text>
                    <View style={[styles.titleAccent, {backgroundColor: theme.colors.tertiary}]} />
                </View>
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

            <View style={styles.grid}>
                {categories.map(category => (
                    <CategoryTile key={category.id} category={category} onPress={() => handleSelect(category)} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontWeight: '700',
        letterSpacing: 0,
        lineHeight: 24,
    },
    titleAccent: {
        width: 20,
        height: 3,
        borderRadius: 2,
    },
    viewAllLabel: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.1,
    },
    viewAllContent: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        minWidth: 0,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    emptyContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    retryButton: {
        marginTop: 12,
    },
    loadingContainer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
})
