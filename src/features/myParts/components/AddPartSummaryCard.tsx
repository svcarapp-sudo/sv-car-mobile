import {StyleSheet, View, Image} from 'react-native'
import {Text, Icon, TouchableRipple, useTheme} from 'react-native-paper'

interface AddPartSummaryCardProps {
    makeName?: string
    makeLogoUrl?: string | null
    modelName?: string
    year?: number | null
    categoryName?: string
    onEdit: () => void
}

export const AddPartSummaryCard = ({
    makeName,
    makeLogoUrl,
    modelName,
    year,
    categoryName,
    onEdit,
}: AddPartSummaryCardProps) => {
    const theme = useTheme()

    if (!makeName && !modelName && !year && !categoryName) return null

    const items = [
        makeName && {
            label: 'الماركة',
            value: makeName,
            logo: makeLogoUrl,
        },
        modelName && {label: 'الموديل', value: modelName},
        year && {label: 'السنة', value: String(year)},
        categoryName && {label: 'الفئة', value: categoryName},
    ].filter(Boolean) as {label: string; value: string; logo?: string | null}[]

    return (
        <TouchableRipple onPress={onEdit} borderless style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.inner}>
                <View style={styles.chips}>
                    {items.map(item => (
                        <View key={item.label} style={[styles.chip, {backgroundColor: theme.colors.surfaceVariant}]}>
                            {item.logo ? (
                                <Image source={{uri: item.logo}} style={styles.chipLogo} resizeMode="contain" />
                            ) : null}
                            <Text style={[styles.chipValue, {color: theme.colors.onSurface}]} numberOfLines={1}>
                                {item.value}
                            </Text>
                        </View>
                    ))}
                </View>
                <Icon source="pencil-outline" size={18} color={theme.colors.onSurfaceVariant} />
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        marginBottom: 14,
        shadowColor: '#0F172A',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 5,
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
