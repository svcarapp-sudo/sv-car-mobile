import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, useTheme} from 'react-native-paper'
import type {PartCategoryApi} from '@/global/types'
import {CategoryGrid} from './CategoryGrid'

const ARABIC_TEXT = {
    SELECT_CATEGORY: 'اختر فئة القطعة',
}

interface CategoryScreenProps {
    categories: PartCategoryApi[]
    loading: boolean
    valueId: number | null
    onSelect: (id: number, name: string) => void
    onNext: () => void
}

export const CategoryScreen = ({categories, loading, valueId, onSelect, onNext}: CategoryScreenProps) => {
    const theme = useTheme()

    const handleSelect = (category: PartCategoryApi) => {
        onSelect(category.id, category.name)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.SELECT_CATEGORY}
                </Text>
            </View>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <CategoryGrid
                    categories={categories}
                    loading={loading}
                    selectedId={valueId}
                    onSelect={handleSelect}
                    showHeader={false}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 16,
    },
    stepTitle: {
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
    },
})
