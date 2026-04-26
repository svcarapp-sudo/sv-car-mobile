import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

interface CategoryGridItemProps {
    category: PartCategoryApi
    onPress: () => void
}

export const CategoryGridItem = ({category, onPress}: CategoryGridItemProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.65}>
            <View style={[styles.tile, {backgroundColor: theme.colors.surface}]}>
                <View style={[styles.iconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={category.icon || 'package-variant'} size={20} color={theme.colors.primary} />
                </View>
                <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1} ellipsizeMode='tail'>
                    {category.name}
                </Text>
                <View style={styles.arrowWrap}>
                    <Icon source='chevron-left' size={14} color={theme.colors.onSurfaceVariant} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '50%',
        padding: 4,
    },
    tile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 14,
        ...shadows.sm,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 8,
    },
    name: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.1,
        lineHeight: 16,
    },
    arrowWrap: {
        opacity: 0.4,
        marginStart: 4,
    },
})
