import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {MakeApi} from '../../services/catalogService'
import {ListSearchBar} from '../listSearchBar'
import {MakeCard} from './MakeCard'

const ARABIC_TEXT = {
    SELECT_MAKE: 'اختر الشركة المصنعة',
    SEARCH_PLACEHOLDER: 'ابحث عن الماركة...',
}

export interface MakeSection {
    title: string
    data: MakeApi[]
}

interface MakeListProps {
    sections: MakeSection[]
    valueId: string | null
    query: string
    onQueryChange: (text: string) => void
    onSelect: (make: MakeApi) => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    hideHeader?: boolean
    hideSearch?: boolean
    contentTopInset: number
}

export const MakeList = ({
    sections,
    valueId,
    query,
    onQueryChange,
    onSelect,
    onScroll,
    hideHeader,
    hideSearch,
    contentTopInset,
}: MakeListProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.stepContent}>
            <FlatList
                data={sections}
                keyExtractor={item => item.title}
                keyboardShouldPersistTaps='handled'
                ListHeaderComponent={
                    hideHeader && hideSearch ? null : (
                        <View style={styles.listHeader}>
                            {!hideHeader && (
                                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                                    {ARABIC_TEXT.SELECT_MAKE}
                                </Text>
                            )}
                            {!hideSearch && (
                                <ListSearchBar
                                    value={query}
                                    onChangeText={onQueryChange}
                                    placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER}
                                />
                            )}
                        </View>
                    )
                }
                renderItem={({item: section}) => (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text variant='titleSmall' style={[styles.sectionTitle, {color: theme.colors.onSurfaceVariant}]}>
                                {section.title}
                            </Text>
                        </View>
                        <View style={styles.gridRow}>
                            {section.data.map(item => (
                                <View key={item.id} style={styles.gridItemContainer}>
                                    <MakeCard item={item} isSelected={valueId === item.id} onPress={onSelect} />
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                contentContainerStyle={[styles.gridContainer, {paddingTop: contentTopInset}]}
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    listHeader: {
        width: '100%',
        gap: 14,
        marginBottom: 16,
    },
    stepTitle: {
        fontWeight: '700',
        width: '100%',
    },
    gridContainer: {
        paddingBottom: 24,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        paddingHorizontal: 4,
    },
    sectionDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: themeColors.tertiary,
        marginEnd: 8,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 13,
    },
    gridRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItemContainer: {
        width: '33.33%',
    },
})
