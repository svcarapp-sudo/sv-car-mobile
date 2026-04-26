import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text, TouchableRipple} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC = {
    SELECTED: 'المركبة والفئة',
    EDIT: 'تعديل',
}

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
                <View style={styles.body}>
                    <Text variant='labelSmall' style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
                        {ARABIC.SELECTED}
                    </Text>
                    <View style={styles.chips}>
                        {items.map(item => (
                            <View
                                key={item.value}
                                style={[
                                    styles.chip,
                                    {
                                        backgroundColor: theme.colors.tertiaryContainer,
                                        borderColor: themeColors.accentBorder,
                                    },
                                ]}>
                                {item.logo ? (
                                    <Image source={{uri: item.logo}} style={styles.chipLogo} resizeMode='contain' />
                                ) : (
                                    <Icon source={item.icon} size={13} color={themeColors.onTertiaryContainer} />
                                )}
                                <Text style={[styles.chipValue, {color: themeColors.onTertiaryContainer}]} numberOfLines={1}>
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={[styles.editPill, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='pencil-outline' size={14} color={theme.colors.primary} />
                    <Text variant='labelSmall' style={[styles.editLabel, {color: theme.colors.primary}]}>
                        {ARABIC.EDIT}
                    </Text>
                </View>
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        marginBottom: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    inner: {flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10},
    body: {flex: 1, gap: 6},
    label: {fontWeight: '600', letterSpacing: 0.3},
    chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 6},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        gap: 5,
    },
    chipLogo: {width: 14, height: 14},
    chipValue: {fontSize: 12, fontWeight: '700'},
    editPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    editLabel: {fontWeight: '700'},
})
