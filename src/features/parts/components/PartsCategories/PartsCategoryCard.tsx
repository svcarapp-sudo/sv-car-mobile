import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

interface PartsCategoryCardProps {
    name: string
    description?: string | null
    icon?: string | null
    onPress: () => void
}

export const PartsCategoryCard = ({name, description, icon, onPress}: PartsCategoryCardProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.categoryCard, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.categoryTop}>
                    <View style={[styles.categoryIconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source={icon || 'package-variant'} size={22} color={theme.colors.primary} />
                    </View>
                    <Icon source="chevron-left" size={18} color={theme.colors.outline} />
                </View>
                <Text style={[styles.categoryName, {color: theme.colors.onSurface}]} numberOfLines={2}>
                    {name}
                </Text>
                {description && (
                    <Text style={[styles.categoryDescription, {color: theme.colors.onSurfaceVariant}]} numberOfLines={2}>
                        {description}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryCard: {
        borderRadius: 20,
        padding: 18,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.1,
        marginBottom: 4,
    },
    categoryDescription: {
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0.1,
        opacity: 0.6,
    },
})
