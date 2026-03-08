import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

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
        <View style={[styles.header, {backgroundColor: theme.colors.primary}]}>
            <View style={styles.headerContent}>
                <View style={styles.titleRow}>
                    <View style={[styles.iconBox, {backgroundColor: theme.colors.onDarkContainer}]}>
                        <Icon source='filter-variant' size={18} color={theme.colors.onDarkIcon} />
                    </View>
                    <Text style={styles.headerTitle}>{categoryName}</Text>
                </View>
                <View style={[styles.countBadge, {backgroundColor: theme.colors.tertiary}]}>
                    <Text style={styles.countText}>{ARABIC_TEXT.PARTS_COUNT(partsCount)}</Text>
                </View>
            </View>
            {/* Accent bar */}
            <View style={[styles.accentBar, {backgroundColor: theme.colors.tertiary}]} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        overflow: 'hidden',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: themeColors.onPrimary,
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.2,
        flex: 1,
    },
    countBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        marginStart: 12,
    },
    countText: {
        color: themeColors.onTertiary,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    accentBar: {
        height: 3,
    },
})
