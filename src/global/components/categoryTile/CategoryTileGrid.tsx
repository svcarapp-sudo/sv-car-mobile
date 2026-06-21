import {ScrollView, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'

import type {PartCategoryApi} from '@/global/types'

import {Skeleton} from '../skeleton'
import {CategoryTile} from './CategoryTile'

interface CategoryTileGridProps {
    categories: PartCategoryApi[]
    selectedId: number | null
    onSelect: (category: PartCategoryApi) => void
    loading?: boolean
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    contentTopInset?: number
}

/**
 * Scrollable 3-column grid of selectable CategoryTiles — the shared category
 * picker used on Home and across the part/request steppers. Supports a loading
 * skeleton and the steppers' collapsing-header scroll inset.
 */
export const CategoryTileGrid = ({
    categories,
    selectedId,
    onSelect,
    loading = false,
    onScroll,
    contentTopInset = 0,
}: CategoryTileGridProps) => {
    if (loading && categories.length === 0) {
        return (
            <View style={[styles.grid, styles.content, {paddingTop: contentTopInset}]}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <View key={i} style={styles.slot}>
                        <Skeleton width='100%' height={128} radius={18} />
                    </View>
                ))}
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={[styles.content, {paddingTop: contentTopInset}]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            onScroll={onScroll}
            scrollEventThrottle={16}>
            <View style={styles.grid}>
                {categories.map(category => (
                    <CategoryTile
                        key={category.id}
                        category={category}
                        selected={selectedId === category.id}
                        onPress={() => onSelect(category)}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {paddingBottom: 24},
    grid: {flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5},
    slot: {width: '33.3333%', padding: 5},
})
