import {ScrollView, StyleSheet, View} from 'react-native'

import {useAppTheme} from '@/global/hooks'

import {FilterChip} from './FilterChip'

const ARABIC_TEXT = {
    SORT: 'الترتيب',
    IN_STOCK_ONLY: 'متوفر فقط',
}

interface PartsListFiltersProps {
    inStockOnly: boolean
    onToggleInStock: () => void
    onOpenSort: () => void
    sortLabel: string
}

export const PartsListFilters = ({inStockOnly, onToggleInStock, onOpenSort, sortLabel}: PartsListFiltersProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.bar, {backgroundColor: theme.colors.background, borderBottomColor: theme.colors.outlineVariant}]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                <FilterChip
                    label={`${ARABIC_TEXT.SORT}: ${sortLabel}`}
                    icon='swap-vertical'
                    onPress={onOpenSort}
                    active={false}
                />
                <FilterChip
                    label={ARABIC_TEXT.IN_STOCK_ONLY}
                    icon='package-variant-closed-check'
                    active={inStockOnly}
                    onPress={onToggleInStock}
                    onClear={inStockOnly ? onToggleInStock : undefined}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    chips: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingEnd: 8,
    },
})
