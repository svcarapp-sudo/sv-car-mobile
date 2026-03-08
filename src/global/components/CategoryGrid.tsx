import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Card, IconButton, Text, ActivityIndicator} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

interface CategoryGridProps {
    categories: PartCategoryApi[]
    loading: boolean
    selectedId?: number | null
    onSelect: (category: PartCategoryApi) => void
    showHeader?: boolean
    title?: string
}

const ARABIC_TEXT = {
    LOADING: 'جاري تحميل الفئات...',
    DEFAULT_TITLE: 'فئات قطع الغيار',
}

export const CategoryGrid = ({
    categories,
    loading,
    selectedId,
    onSelect,
    showHeader = false,
    title = ARABIC_TEXT.DEFAULT_TITLE,
}: CategoryGridProps) => {
    const theme = useAppTheme()

    const displayList = categories
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)

    if (loading && categories.length === 0) {
        return (
            <View style={styles.container}>
                {showHeader && (
                    <View style={styles.header}>
                        <Text variant='titleLarge' style={[styles.title, {color: theme.colors.onSurface}]}>
                            {title}
                        </Text>
                    </View>
                )}
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
        return null
    }

    return (
        <View style={styles.container}>
            {showHeader && (
                <View style={styles.header}>
                    <Text variant='titleLarge' style={[styles.title, {color: theme.colors.onSurface}]}>
                        {title}
                    </Text>
                </View>
            )}

            <View style={styles.grid}>
                {displayList.map(category => {
                    const isSelected = selectedId === category.id

                    return (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => onSelect(category)}
                            activeOpacity={0.7}
                            style={styles.cardWrapper}>
                            <Card
                                style={[
                                    styles.card,
                                    {
                                        backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
                                        borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                                        borderWidth: isSelected ? 2 : 1,
                                    },
                                ]}>
                                <View style={styles.cardInner}>
                                    <Card.Content style={styles.cardContent}>
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                {
                                                    backgroundColor: isSelected
                                                        ? theme.colors.primary
                                                        : theme.colors.primaryContainer,
                                                },
                                            ]}>
                                            <IconButton
                                                icon={category.icon || 'package-variant'}
                                                size={28}
                                                iconColor={isSelected ? theme.colors.onPrimary : theme.colors.onPrimaryContainer}
                                                style={styles.icon}
                                            />
                                        </View>
                                        <Text
                                            variant='labelLarge'
                                            style={[
                                                styles.categoryName,
                                                {
                                                    color: isSelected ? theme.colors.primary : theme.colors.onSurface,
                                                    fontWeight: isSelected ? 'bold' : '500',
                                                },
                                            ]}
                                            numberOfLines={2}>
                                            {category.name}
                                        </Text>
                                    </Card.Content>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    header: {
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    title: {
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 28,
    },
    loadingContainer: {
        paddingVertical: 24,
        alignItems: 'center',
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
        shadowColor: themeColors.shadowLight,
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
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
})
