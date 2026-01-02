import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Button, Card, IconButton, Text, useTheme} from 'react-native-paper'

import {PART_CATEGORIES_LIST} from '@/shared/constants'
import type {PartCategory} from '@/shared/types'

interface CategoryGridProps {
    onSelectCategory: (category: PartCategory) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    PARTS_CATEGORIES: 'فئات قطع الغيار',
    VIEW_ALL_PARTS: 'عرض الكل',
}

export const CategoryGrid = ({onSelectCategory, onViewAll}: CategoryGridProps) => {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant='titleLarge' style={styles.title}>
                    {ARABIC_TEXT.PARTS_CATEGORIES}
                </Text>
                <Button mode='text' onPress={onViewAll} compact textColor={theme.colors.primary}>
                    {ARABIC_TEXT.VIEW_ALL_PARTS}
                </Button>
            </View>

            <View style={styles.grid}>
                {PART_CATEGORIES_LIST.map(category => (
                    <TouchableOpacity
                        key={category.id}
                        onPress={() => onSelectCategory(category.id)}
                        activeOpacity={0.7}
                        style={styles.cardWrapper}>
                        <Card style={[styles.card, {backgroundColor: theme.colors.surface}]} mode='elevated'>
                            <Card.Content style={styles.cardContent}>
                                <View style={[styles.iconContainer, {backgroundColor: theme.colors.primaryContainer}]}>
                                    <IconButton
                                        icon={category.icon}
                                        size={28}
                                        iconColor={theme.colors.primary}
                                        style={styles.icon}
                                    />
                                </View>
                                <Text variant='titleSmall' style={styles.categoryName} numberOfLines={1}>
                                    {category.name}
                                </Text>
                                {category.description && (
                                    <Text
                                        variant='bodySmall'
                                        style={[styles.categoryDescription, {color: theme.colors.onSurfaceVariant}]}
                                        numberOfLines={2}>
                                        {category.description}
                                    </Text>
                                )}
                            </Card.Content>
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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    cardWrapper: {
        width: '50%',
        padding: 6,
    },
    card: {
        borderRadius: 16,
        elevation: 2,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
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
        fontWeight: 'bold',
        marginBottom: 4,
    },
    categoryDescription: {
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 14,
    },
})
