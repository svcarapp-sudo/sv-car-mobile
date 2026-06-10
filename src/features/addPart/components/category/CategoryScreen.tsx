import {useMemo, useState} from 'react'
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {ListSearchBar} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {PartCategoryApi} from '@/global/types'
import {matchesSearch} from '@/global/utils'
import {CategoryGrid} from './CategoryGrid'

const ARABIC_TEXT = {
    SELECT_CATEGORY: 'اختر فئة القطعة',
    SEARCH_PLACEHOLDER: 'ابحث عن الفئة...',
}

const SEARCH_THRESHOLD = 9

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
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => categories.filter(category => matchesSearch(query, category.name)), [categories, query])
    const showSearch = categories.length > SEARCH_THRESHOLD

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
                keyboardShouldPersistTaps='handled'
                onScroll={onScroll}
                scrollEventThrottle={16}>
                {showSearch && (
                    <View style={styles.searchWrap}>
                        <ListSearchBar value={query} onChangeText={setQuery} placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER} />
                    </View>
                )}
                <CategoryGrid
                    categories={filtered}
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
    searchWrap: {
        marginBottom: 12,
    },
})
