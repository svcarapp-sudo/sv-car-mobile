import {useMemo, useState} from 'react'
import {StyleSheet, View} from 'react-native'

import type {Part} from '@/global/types'

import type {MyPartsFiltersState} from '../../hooks/useMyPartsFilters'
import {MyPartsFilterButton} from './MyPartsFilterButton'
import {MyPartsFilterDialog, type FilterSelection} from './MyPartsFilterDialog'
import {MyPartsResultBar} from './MyPartsResultBar'
import {MyPartsSearchBar} from './MyPartsSearchBar'
import {MyPartsStatsStrip} from './MyPartsStatsStrip'

interface MyPartsListHeaderProps {
    parts: Part[]
    filters: MyPartsFiltersState
}

export const MyPartsListHeader = ({parts, filters}: MyPartsListHeaderProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const stats = useMemo(() => {
        const cats = new Set(parts.map(p => p.categoryId).filter(Boolean) as number[])
        return {
            count: parts.length,
            totalValue: parts.reduce((sum, p) => sum + p.price, 0),
            categoriesCount: cats.size,
        }
    }, [parts])

    const activeCount = (filters.statusFilter !== 'all' ? 1 : 0) + (filters.activeCategoryId != null ? 1 : 0)

    const applyFilters = (next: FilterSelection) => {
        filters.setStatusFilter(next.status)
        filters.setActiveCategoryId(next.categoryId)
        filters.setSort(next.sort)
        setDialogOpen(false)
    }

    return (
        <View style={styles.header}>
            <MyPartsStatsStrip {...stats} />
            <View style={styles.searchRow}>
                <View style={styles.searchFlex}>
                    <MyPartsSearchBar value={filters.search} onChange={filters.setSearch} />
                </View>
                <MyPartsFilterButton activeCount={activeCount} onPress={() => setDialogOpen(true)} />
            </View>
            <MyPartsResultBar count={filters.filtered.length} isFiltered={filters.isFiltered} onReset={filters.resetFilters} />
            <MyPartsFilterDialog
                visible={dialogOpen}
                onDismiss={() => setDialogOpen(false)}
                status={filters.statusFilter}
                categoryId={filters.activeCategoryId}
                sort={filters.sort}
                parts={parts}
                search={filters.search}
                categories={filters.availableCategories}
                onApply={applyFilters}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {paddingTop: 4},
    searchRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 8},
    searchFlex: {flex: 1},
})
