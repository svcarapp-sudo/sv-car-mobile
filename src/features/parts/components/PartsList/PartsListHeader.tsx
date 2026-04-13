import {StyleSheet, TextInput, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    SEARCH_PLACEHOLDER: 'ابحث عن قطعة...',
    PARTS_COUNT: (count: number) => `${count} قطعة`,
    ALL_PARTS: 'جميع القطع',
}

interface PartsListHeaderProps {
    categoryName: string | null
    partsCount: number
    search: string
    onSearchChange: (text: string) => void
}

export const PartsListHeader = ({categoryName, partsCount, search, onSearchChange}: PartsListHeaderProps) => {
    const theme = useAppTheme()
    const title = categoryName || ARABIC_TEXT.ALL_PARTS

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
            {/* Title row */}
            <View style={styles.titleRow}>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {title}
                </Text>
                <View style={[styles.countBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Text style={[styles.countText, {color: theme.colors.primary}]}>
                        {ARABIC_TEXT.PARTS_COUNT(partsCount)}
                    </Text>
                </View>
            </View>

            {/* Search bar */}
            <View style={[styles.searchBar, {backgroundColor: theme.colors.background, borderColor: theme.colors.outlineVariant}]}>
                <Icon source="magnify" size={18} color={theme.colors.onSurfaceVariant} />
                <TextInput
                    style={[styles.searchInput, {color: theme.colors.onSurface}]}
                    placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER}
                    placeholderTextColor={theme.colors.outline}
                    value={search}
                    onChangeText={onSearchChange}
                    autoCorrect={false}
                />
                {search.length > 0 && (
                    <Icon source="close-circle" size={16} color={theme.colors.outline} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        flex: 1,
    },
    countBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginStart: 10,
    },
    countText: {
        fontSize: 12,
        fontWeight: '600',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        padding: 0,
        textAlign: 'right',
    },
})
