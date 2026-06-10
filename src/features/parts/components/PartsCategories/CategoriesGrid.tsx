import {StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {FadeSlideIn, Skeleton, staggerDelay} from '@/global/components'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {PartCategory} from '@/global/types'

import {CategoryTile} from './CategoryTile'

const ARABIC_TEXT = {
    SECTION_TITLE: 'تسوّق حسب الفئة',
    SECTION_HINT: 'اختر فئة لاكتشاف القطع المتاحة',
    LOAD_ERROR: 'لم يتم تحميل الفئات',
    RETRY: 'إعادة المحاولة',
}

const SKELETON_TILES = [0, 1, 2, 3, 4, 5]

interface CategoriesGridProps {
    onSelectCategory: (slug: PartCategory) => void
}

export const CategoriesGrid = ({onSelectCategory}: CategoriesGridProps) => {
    const {categories, categoriesLoading, categoriesError, refreshCategories} = useCatalog()
    const theme = useAppTheme()
    const sorted = (categories ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder)
    const showLoader = categoriesLoading && sorted.length === 0
    const showError = !categoriesLoading && sorted.length === 0 && Boolean(categoriesError)

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <View style={[styles.dot, {backgroundColor: theme.colors.tertiary}]} />
                <View style={styles.headerText}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.SECTION_TITLE}</Text>
                    <Text style={[styles.hint, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SECTION_HINT}</Text>
                </View>
            </View>

            {showLoader && (
                <View style={styles.grid}>
                    {SKELETON_TILES.map(tile => (
                        <View key={tile} style={styles.slot}>
                            <Skeleton width='100%' height={112} radius={16} />
                        </View>
                    ))}
                </View>
            )}

            {showError && (
                <View style={styles.errorBox}>
                    <Text style={[styles.errorText, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.LOAD_ERROR}</Text>
                    <Button mode='outlined' onPress={refreshCategories} style={styles.retryButton}>
                        {ARABIC_TEXT.RETRY}
                    </Button>
                </View>
            )}

            {!showLoader && !showError && (
                <View style={styles.grid}>
                    {sorted.map((category, index) => (
                        <FadeSlideIn key={category.id} delay={staggerDelay(index)} style={styles.tileSlot}>
                            <CategoryTile
                                name={category.name}
                                icon={category.icon}
                                onPress={() => onSelectCategory(category.slug as PartCategory)}
                            />
                        </FadeSlideIn>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {marginTop: 18},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
        paddingHorizontal: 5,
    },
    dot: {width: 4, height: 22, borderRadius: 2},
    headerText: {flex: 1, gap: 2},
    title: {fontSize: 16, fontWeight: '800', letterSpacing: -0.2},
    hint: {fontSize: 11.5, fontWeight: '500', letterSpacing: 0.1, opacity: 0.85},
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -5,
    },
    tileSlot: {width: '33.3333%'},
    slot: {width: '33.3333%', padding: 5},
    errorBox: {paddingVertical: 24, alignItems: 'center', gap: 12},
    errorText: {fontSize: 13, textAlign: 'center'},
    retryButton: {borderRadius: 12},
})
