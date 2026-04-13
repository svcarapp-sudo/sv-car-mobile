import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    VIEW_ALL: 'عرض جميع القطع',
    VIEW_ALL_DESC: 'تصفح جميع القطع المتاحة لمركبتك',
}

interface ViewAllBannerProps {
    onPress: () => void
}

export const ViewAllBanner = ({onPress}: ViewAllBannerProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.viewAllBanner, {backgroundColor: theme.colors.primary}]}>
                <View style={styles.viewAllContent}>
                    <View style={[styles.viewAllIcon, {backgroundColor: theme.colors.onDarkContainer}]}>
                        <Icon source='view-grid-outline' size={22} color={theme.colors.onPrimary} />
                    </View>
                    <View style={styles.viewAllText}>
                        <Text style={styles.viewAllTitle}>{ARABIC_TEXT.VIEW_ALL}</Text>
                        <Text style={styles.viewAllDesc}>{ARABIC_TEXT.VIEW_ALL_DESC}</Text>
                    </View>
                </View>
                <Icon source='chevron-left' size={22} color={theme.colors.onDarkLow} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewAllBanner: {
        borderRadius: 20,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    viewAllContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    viewAllIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    viewAllText: {
        flex: 1,
    },
    viewAllTitle: {
        color: themeColors.onPrimary,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.1,
        marginBottom: 2,
    },
    viewAllDesc: {
        color: themeColors.onDarkLow,
        fontSize: 12,
        letterSpacing: 0.1,
    },
})
