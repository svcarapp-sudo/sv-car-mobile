import {StyleSheet, View, Image} from 'react-native'
import {Text, Icon, TouchableRipple} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

interface AddPartSummaryCardProps {
    makeName?: string
    makeLogoUrl?: string | null
    modelName?: string
    year?: number | null
    categoryName?: string
    onEdit: () => void
}

export const AddPartSummaryCard = ({makeName, makeLogoUrl, modelName, year, categoryName, onEdit}: AddPartSummaryCardProps) => {
    const theme = useAppTheme()

    if (!makeName && !modelName && !year && !categoryName) return null

    const items = [
        makeName && {icon: 'car', value: makeName, logo: makeLogoUrl},
        modelName && {icon: 'tag-outline', value: modelName},
        year && {icon: 'calendar-outline', value: String(year)},
        categoryName && {icon: 'shape-outline', value: categoryName},
    ].filter(Boolean) as {icon: string; value: string; logo?: string | null}[]

    return (
        <TouchableRipple onPress={onEdit} borderless style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.inner}>
                <View style={styles.chips}>
                    {items.map(item => (
                        <View key={item.value} style={[styles.chip, {backgroundColor: theme.colors.surfaceVariant}]}>
                            {item.logo ? (
                                <Image source={{uri: item.logo}} style={styles.chipLogo} resizeMode='contain' />
                            ) : (
                                <Icon source={item.icon} size={14} color={theme.colors.onSurfaceVariant} />
                            )}
                            <Text style={[styles.chipValue, {color: theme.colors.onSurface}]} numberOfLines={1}>
                                {item.value}
                            </Text>
                        </View>
                    ))}
                </View>
                <Icon source='pencil-outline' size={16} color={theme.colors.onSurfaceVariant} />
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    chips: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    chipLogo: {
        width: 16,
        height: 16,
    },
    chipValue: {
        fontSize: 12,
        fontWeight: '600',
    },
})
