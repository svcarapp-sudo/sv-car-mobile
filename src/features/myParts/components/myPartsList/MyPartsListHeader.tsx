import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'

import type {Part} from '@/global/types'

import {isLowOrOut} from '../../constants/partLifecycle'
import type {MyPartsFiltersState} from '../../hooks/useMyPartsFilters'
import {MyPartsFilterBar} from './MyPartsFilterBar'
import {MyPartsSearchBar} from './MyPartsSearchBar'
import {MyPartsStatsStrip} from './MyPartsStatsStrip'
import {MyPartsStatusFilter} from './MyPartsStatusFilter'

interface MyPartsListHeaderProps {
    parts: Part[]
    filters: MyPartsFiltersState
}

export const MyPartsListHeader = ({parts, filters}: MyPartsListHeaderProps) => {
    const stats = useMemo(() => {
        const cats = new Set(parts.map(p => p.categoryId).filter(Boolean) as number[])
        return {
            count: parts.length,
            totalValue: parts.reduce((sum, p) => sum + p.price, 0),
            categoriesCount: cats.size,
            activeCount: parts.filter(p => (p.status ?? 'ACTIVE') === 'ACTIVE').length,
            lowStockCount: parts.filter(p => isLowOrOut(p.stockQuantity)).length,
        }
    }, [parts])

    return (
        <View style={styles.header}>
            <MyPartsStatsStrip {...stats} />
            <MyPartsSearchBar value={filters.search} onChange={filters.setSearch} />
            <MyPartsStatusFilter value={filters.statusFilter} onChange={filters.setStatusFilter} />
            <MyPartsFilterBar
                categories={filters.availableCategories}
                activeCategoryId={filters.activeCategoryId}
                onSelectCategory={filters.setActiveCategoryId}
                sort={filters.sort}
                onChangeSort={filters.setSort}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {paddingTop: 4},
})
