import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {PartCategoryApi} from '@/global/types'

import {CategoryGridCard} from './CategoryGridCard'

interface CategoryGridProps {
    categories: PartCategoryApi[]
    loading: boolean
    selectedId?: number | null
    onSelect: (category: PartCategoryApi) => void
    showHeader?: boolean
    title?: string
}

const ARABIC_TEXT = {
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

    const displayList = categories.slice().sort((a, b) => a.sortOrder - b.sortOrder)

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
                <View style={styles.grid}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(tile => (
                        <View key={tile} style={styles.skeletonWrap}>
                            <View style={[styles.skeletonTile, {backgroundColor: theme.colors.surface}]}>
                                <Skeleton width={36} height={36} radius={11} />
                                <Skeleton width='48%' height={12} radius={6} />
                            </View>
                        </View>
                    ))}
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
                {displayList.map(category => (
                    <CategoryGridCard
                        key={category.id}
                        category={category}
                        isSelected={selectedId === category.id}
                        onPress={onSelect}
                    />
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
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    title: {
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 28,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    skeletonWrap: {
        width: '50%',
        padding: 4,
    },
    skeletonTile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 14,
    },
})
