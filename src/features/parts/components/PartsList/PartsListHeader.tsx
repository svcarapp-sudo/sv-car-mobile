import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    PARTS_COUNT: (count: number) => `${count} قطعة`,
}

interface PartsListHeaderProps {
    categoryName: string
    partsCount: number
}

export const PartsListHeader = ({categoryName, partsCount}: PartsListHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.titleRow}>
                <View style={[styles.iconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source="filter-variant" size={16} color={theme.colors.primary} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {categoryName}
                </Text>
            </View>
            <View style={[styles.countBadge, {backgroundColor: theme.colors.surfaceVariant}]}>
                <Text style={[styles.countText, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.PARTS_COUNT(partsCount)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    iconBox: {
        width: 30,
        height: 30,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: -0.2,
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
})
