import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Button, Card, IconButton, Text, useTheme, ActivityIndicator} from 'react-native-paper'

import {usePartCategories} from '@/global/hooks'

import type {PartCategory} from '@/global/types'

interface CategoryGridProps {
    onSelectCategory: (category: PartCategory) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    PARTS_CATEGORIES: 'فئات قطع الغيار',
    VIEW_ALL_PARTS: 'عرض الكل',
    LOADING: 'جاري تحميل الفئات...',
    EMPTY_OR_ERROR: 'لم يتم تحميل الفئات',
    RETRY: 'إعادة المحاولة',
}

export const CategoryGrid = ({onSelectCategory, onViewAll}: CategoryGridProps) => {
    const theme = useTheme()
    const {categories: apiCategories, loading, error, refresh} = usePartCategories()
    const categories = apiCategories ?? []

    const displayList = categories
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(c => ({slug: c.slug, name: c.name, icon: c.icon}))

    if (loading && categories.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text variant='titleLarge' style={[styles.title, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.PARTS_CATEGORIES}
                    </Text>
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

    if (categories.length === 0) {
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

            <View style={styles.grid}>
                {displayList.map(cat => (
                    <TouchableOpacity
                        key={cat.slug}
                        onPress={() => onSelectCategory(cat.slug as PartCategory)}
                        activeOpacity={0.7}
                        style={styles.cardWrapper}>
                        <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                            <View style={styles.cardInner}>
                                <Card.Content style={styles.cardContent}>
                                    <View style={[styles.iconContainer, {backgroundColor: theme.colors.primaryContainer}]}>
                                        <IconButton
                                            icon={cat.icon}
                                            size={28}
                                            iconColor={theme.colors.onPrimaryContainer}
                                            style={styles.icon}
                                        />
                                    </View>
                                    <Text
                                        variant='labelLarge'
                                        style={[styles.categoryName, {color: theme.colors.onSurface}]}
                                        numberOfLines={2}>
                                        {cat.name}
                                    </Text>
                                </Card.Content>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>
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
    loadingContainer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    emptyContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    retryButton: {
        marginTop: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    cardWrapper: {
        width: '33.333%',
        padding: 4,
    },
    card: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 0.5,
    },
    cardInner: {
        overflow: 'hidden',
        borderRadius: 16,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        minHeight: 120,
        justifyContent: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        margin: 0,
    },
    categoryName: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
})
