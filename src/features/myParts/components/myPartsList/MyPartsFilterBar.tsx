import {useState} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Menu, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {PartCategoryApi} from '@/global/types'

import type {MyPartsSortKey} from '../../hooks/useMyPartsFilters'

interface MyPartsFilterBarProps {
    categories: PartCategoryApi[]
    activeCategoryId: number | null
    onSelectCategory: (id: number | null) => void
    sort: MyPartsSortKey
    onChangeSort: (sort: MyPartsSortKey) => void
}

const ARABIC_TEXT = {
    ALL: 'الكل',
    SORT_NEWEST: 'الأحدث',
    SORT_PRICE_DESC: 'الأعلى سعراً',
    SORT_PRICE_ASC: 'الأقل سعراً',
    SORT_NAME: 'الاسم (أ-ي)',
}

const SORT_OPTIONS: {key: MyPartsSortKey; label: string; icon: string}[] = [
    {key: 'newest', label: ARABIC_TEXT.SORT_NEWEST, icon: 'clock-outline'},
    {key: 'priceDesc', label: ARABIC_TEXT.SORT_PRICE_DESC, icon: 'arrow-down'},
    {key: 'priceAsc', label: ARABIC_TEXT.SORT_PRICE_ASC, icon: 'arrow-up'},
    {key: 'nameAsc', label: ARABIC_TEXT.SORT_NAME, icon: 'sort-alphabetical-ascending'},
]

interface ChipProps {
    label: string
    icon?: string
    selected: boolean
    onPress: () => void
}

const Chip = ({label, icon, selected, onPress}: ChipProps) => {
    const theme = useAppTheme()
    const bg = selected ? theme.colors.primary : theme.colors.surface
    const fg = selected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant
    const border = selected ? theme.colors.primary : theme.colors.outlineVariant
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.chip, {backgroundColor: bg, borderColor: border}]}>
            {icon && <Icon source={icon} size={13} color={fg} />}
            <Text style={[styles.chipLabel, {color: fg}]}>{label}</Text>
        </TouchableOpacity>
    )
}

export const MyPartsFilterBar = ({categories, activeCategoryId, onSelectCategory, sort, onChangeSort}: MyPartsFilterBarProps) => {
    const theme = useAppTheme()
    const [sortOpen, setSortOpen] = useState(false)
    const activeSort = SORT_OPTIONS.find(o => o.key === sort) ?? SORT_OPTIONS[0]

    return (
        <View style={styles.row}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContent}>
                <Chip label={ARABIC_TEXT.ALL} selected={activeCategoryId == null} onPress={() => onSelectCategory(null)} />
                {categories.map(c => (
                    <Chip
                        key={c.id}
                        label={c.name}
                        icon={c.icon}
                        selected={activeCategoryId === c.id}
                        onPress={() => onSelectCategory(c.id)}
                    />
                ))}
            </ScrollView>

            <Menu
                visible={sortOpen}
                onDismiss={() => setSortOpen(false)}
                contentStyle={{backgroundColor: theme.colors.surface}}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => setSortOpen(true)}
                        style={[
                            styles.sortBtn,
                            {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                        ]}>
                        <Icon source='sort' size={14} color={theme.colors.primary} />
                        <Text style={[styles.sortLabel, {color: theme.colors.primary}]} numberOfLines={1}>
                            {activeSort.label}
                        </Text>
                    </TouchableOpacity>
                }>
                {SORT_OPTIONS.map(opt => (
                    <Menu.Item
                        key={opt.key}
                        onPress={() => {
                            onChangeSort(opt.key)
                            setSortOpen(false)
                        }}
                        title={opt.label}
                        leadingIcon={opt.icon}
                        titleStyle={{color: opt.key === sort ? theme.colors.primary : theme.colors.onSurface}}
                    />
                ))}
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14},
    chipsContent: {gap: 8, paddingEnd: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1,
    },
    chipLabel: {fontSize: 12, fontWeight: '600'},
    sortBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 12,
        borderWidth: 1,
        maxWidth: 110,
    },
    sortLabel: {fontSize: 11, fontWeight: '700'},
})
