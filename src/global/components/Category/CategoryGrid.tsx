import {StyleSheet, View} from 'react-native'
import {Text, ActivityIndicator} from 'react-native-paper'
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
})
