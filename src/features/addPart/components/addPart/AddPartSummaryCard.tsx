import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text, TouchableRipple} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

const ARABIC = {
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

    const title = [makeName, modelName].filter(Boolean).join(' ')
    const hasMeta = !!(year || categoryName)

    return (
        <TouchableRipple
            onPress={onEdit}
            borderless
            rippleColor={theme.colors.scrim}
            style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.row}>
                <View style={[styles.logoBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    {makeLogoUrl ? (
                        <Image source={{uri: makeLogoUrl}} style={styles.logo} resizeMode='contain' />
                    ) : (
                        <Icon source='car-side' size={20} color={theme.colors.primary} />
                    )}
                </View>
                <View style={styles.body}>
                    {!!title && (
                        <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {title}
                        </Text>
                    )}
                    {hasMeta && (
                        <View style={styles.metaRow}>
                            {!!year && (
                                <View style={[styles.yearTag, {backgroundColor: theme.colors.surfaceVariant}]}>
                                    <Text style={[styles.yearText, {color: theme.colors.onSurfaceVariant}]}>{year}</Text>
                                </View>
                            )}
                            {!!categoryName && (
                                <View style={styles.categoryBadge}>
                                    <Icon source='shape' size={11} color={themeColors.onTertiaryContainer} />
                                    <Text
                                        style={[styles.categoryText, {color: themeColors.onTertiaryContainer}]}
                                        numberOfLines={1}>
                                        {categoryName}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
                <View style={[styles.editPill, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='pencil-outline' size={13} color={theme.colors.primary} />
                    <Text style={[styles.editLabel, {color: theme.colors.primary}]}>{ARABIC.EDIT}</Text>
                </View>
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        marginBottom: 12,
        ...shadows.sm,
    },
    row: {flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10},
    logoBox: {width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
    logo: {width: 24, height: 24},
    body: {flex: 1, gap: 4, minWidth: 0},
    title: {fontSize: 14, fontWeight: '700', letterSpacing: -0.1, lineHeight: 18},
    metaRow: {flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap'},
    yearTag: {paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6},
    yearText: {fontSize: 11, fontWeight: '700', letterSpacing: 0.2},
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: themeColors.accentContainer,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: themeColors.accentBorder,
    },
    categoryText: {fontSize: 11, fontWeight: '700', maxWidth: 140},
    editPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    editLabel: {fontSize: 11, fontWeight: '700'},
})
