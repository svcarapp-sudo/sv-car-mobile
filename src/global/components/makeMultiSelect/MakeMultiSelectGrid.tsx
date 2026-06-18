import {useMemo} from 'react'
import {SectionList, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {matchesSearch} from '@/global/utils'

import type {MakeApi} from '../../services/catalogService'
import {ListSearchBar} from '../listSearchBar'
import {MakeCard} from '../make/MakeCard'

const ARABIC = {SEARCH: 'ابحث عن الماركة...', OTHER: 'أخرى', EMPTY: 'لا توجد ماركات مطابقة'}

interface MakeMultiSelectGridProps {
    makes: MakeApi[]
    selectedIds: Set<string>
    query: string
    onQueryChange: (text: string) => void
    onToggle: (make: MakeApi) => void
}

/** Origin-grouped, searchable grid where each make tile toggles on tap (multi-select). */
export const MakeMultiSelectGrid = ({makes, selectedIds, query, onQueryChange, onToggle}: MakeMultiSelectGridProps) => {
    const theme = useAppTheme()

    const sections = useMemo(() => {
        const grouped = makes.reduce<Record<string, MakeApi[]>>((acc, curr) => {
            if (!matchesSearch(query, curr.name)) return acc
            const country = curr.originCountry ?? ARABIC.OTHER
            if (!acc[country]) acc[country] = []
            acc[country].push(curr)
            return acc
        }, {})
        return Object.keys(grouped).map(title => ({title, data: [grouped[title]]}))
    }, [makes, query])

    return (
        <SectionList
            sections={sections}
            keyExtractor={row => String(row[0]?.id ?? '0')}
            extraData={selectedIds}
            keyboardShouldPersistTaps='handled'
            stickySectionHeadersEnabled={false}
            ListHeaderComponent={
                <View style={styles.searchWrap}>
                    <ListSearchBar value={query} onChangeText={onQueryChange} placeholder={ARABIC.SEARCH} />
                </View>
            }
            renderSectionHeader={({section}) => (
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionDot} />
                    <Text variant='titleSmall' style={[styles.sectionTitle, {color: theme.colors.onSurfaceVariant}]}>
                        {section.title}
                    </Text>
                </View>
            )}
            renderItem={({item: row}) => (
                <View style={styles.gridRow}>
                    {row.map(make => (
                        <View key={String(make.id)} style={styles.cell}>
                            <MakeCard item={make} isSelected={selectedIds.has(String(make.id))} onPress={onToggle} />
                        </View>
                    ))}
                </View>
            )}
            ListEmptyComponent={<Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{ARABIC.EMPTY}</Text>}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    content: {paddingHorizontal: 14, paddingBottom: 20},
    searchWrap: {paddingVertical: 12},
    sectionHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 6, paddingHorizontal: 4},
    sectionDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: themeColors.tertiary, marginEnd: 8},
    sectionTitle: {fontWeight: '600', fontSize: 13},
    gridRow: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14},
    cell: {width: '33.33%'},
    empty: {textAlign: 'center', marginTop: 40, fontSize: 14},
})
