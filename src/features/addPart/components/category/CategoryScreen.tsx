import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
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
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    hideHeader?: boolean
    contentTopInset?: number
}

export const CategoryScreen = ({
    categories,
    loading,
    valueId,
    onSelect,
    onNext,
    onScroll,
    hideHeader,
    contentTopInset = 0,
}: CategoryScreenProps) => {
    const theme = useAppTheme()

    const handleSelect = (category: PartCategoryApi) => {
        onSelect(category.id, category.name)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            {!hideHeader && (
                <View style={styles.headerContainer}>
                    <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.SELECT_CATEGORY}
                    </Text>
                </View>
            )}
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={[styles.scrollContent, {paddingTop: contentTopInset}]}
                onScroll={onScroll}
                scrollEventThrottle={16}>
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
