import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Text} from 'react-native-paper'

import {useAppTheme, useCatalog} from '@/global/hooks'
import type {PartCategory} from '@/global/types'
import {CategoryGridItem} from './CategoryGridItem'

interface CategoryGridProps {
    onSelectCategory: (category: PartCategory) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    PARTS_CATEGORIES: '\u0641\u0626\u0627\u062a \u0642\u0637\u0639 \u0627\u0644\u063a\u064a\u0627\u0631',
    VIEW_ALL_PARTS: '\u0639\u0631\u0636 \u0627\u0644\u0643\u0644',
    EMPTY_OR_ERROR: '\u0644\u0645 \u064a\u062a\u0645 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0641\u0626\u0627\u062a',
    RETRY: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
    LOADING: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0641\u0626\u0627\u062a...',
}

const SectionHeader = ({theme, showViewAll, onViewAll}: {theme: ReturnType<typeof useAppTheme>; showViewAll?: boolean; onViewAll?: () => void}) => (
    <View style={styles.header}>
        <View style={styles.titleRow}>
            <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.PARTS_CATEGORIES}
            </Text>
            <View style={[styles.titleAccent, {backgroundColor: theme.colors.tertiary}]} />
        </View>
        {showViewAll && onViewAll && (
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
        )}
    </View>
)

export const CategoryGrid = ({onSelectCategory, onViewAll}: CategoryGridProps) => {
    const theme = useAppTheme()
    const {categories: apiCategories, categoriesLoading: loading, categoriesError: error, refreshCategories: refresh} = useCatalog()
    const categories = (apiCategories ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder)

    if (categories.length === 0 && !loading && error) {
        return (
            <View style={styles.container}>
                <SectionHeader theme={theme} />
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
                <SectionHeader theme={theme} />
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
            <SectionHeader theme={theme} showViewAll onViewAll={onViewAll} />
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
