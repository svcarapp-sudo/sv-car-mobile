import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

interface CategoryGridCardProps {
    category: PartCategoryApi
    isSelected: boolean
    onPress: (category: PartCategoryApi) => void
}

export const CategoryGridCard = ({category, isSelected, onPress}: CategoryGridCardProps) => {
    const theme = useAppTheme()

    const tileBg = isSelected ? theme.colors.primaryContainer : theme.colors.surface
    const iconBoxBg = isSelected ? theme.colors.primary : theme.colors.primaryContainer
    const iconColor = isSelected ? theme.colors.onPrimary : theme.colors.primary
    const nameColor = isSelected ? theme.colors.primary : theme.colors.onSurface
    const trailingIcon = isSelected ? 'check' : 'chevron-left'
    const trailingColor = isSelected ? theme.colors.primary : theme.colors.onSurfaceVariant

    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => onPress(category)} activeOpacity={0.65}>
            <View
                style={[
                    styles.tile,
                    {
                        backgroundColor: tileBg,
                        borderColor: isSelected ? theme.colors.primary : 'transparent',
                        borderWidth: isSelected ? 1.5 : 0,
                    },
                ]}>
                <View style={[styles.iconBox, {backgroundColor: iconBoxBg}]}>
                    <Icon source={category.icon || 'package-variant'} size={20} color={iconColor} />
                </View>
                <Text
                    style={[styles.name, {color: nameColor, fontWeight: isSelected ? '700' : '600'}]}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {category.name}
                </Text>
                <View style={[styles.arrowWrap, {opacity: isSelected ? 1 : 0.4}]}>
                    <Icon source={trailingIcon} size={14} color={trailingColor} />
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
        letterSpacing: 0.1,
        lineHeight: 16,
    },
    arrowWrap: {
        marginStart: 4,
    },
})
