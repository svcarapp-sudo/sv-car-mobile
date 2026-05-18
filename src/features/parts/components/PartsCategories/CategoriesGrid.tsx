import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'

import {useAppTheme, useCatalog} from '@/global/hooks'
import type {PartCategory} from '@/global/types'

import {CategoryTile} from './CategoryTile'

const ARABIC_TEXT = {
    SECTION_TITLE: 'تسوّق حسب الفئة',
    SECTION_HINT: 'اختر فئة لاكتشاف القطع المتاحة',
}

interface CategoriesGridProps {
    onSelectCategory: (slug: PartCategory) => void
}

export const CategoriesGrid = ({onSelectCategory}: CategoriesGridProps) => {
    const {categories, categoriesLoading} = useCatalog()
    const theme = useAppTheme()
    const sorted = (categories ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder)
    const showLoader = categoriesLoading && sorted.length === 0

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <View style={[styles.dot, {backgroundColor: theme.colors.tertiary}]} />
                <View style={styles.headerText}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.SECTION_TITLE}</Text>
                    <Text style={[styles.hint, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SECTION_HINT}</Text>
                </View>
            </View>

            {showLoader ? (
                <View style={styles.loading}>
                    <ActivityIndicator size='small' color={theme.colors.tertiary} />
                </View>
            ) : (
                <View style={styles.grid}>
                    {sorted.map(category => (
                        <CategoryTile
                            key={category.id}
                            name={category.name}
                            icon={category.icon}
                            onPress={() => onSelectCategory(category.slug as PartCategory)}
                        />
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
    loading: {paddingVertical: 32, alignItems: 'center'},
})
