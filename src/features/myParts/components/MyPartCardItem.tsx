import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {Icon, Text, useTheme} from 'react-native-paper'
import type {Part, PartCategoryApi} from '@/global/types'

interface MakeInfo {
    name: string
    logoUrl?: string | null
}
interface ModelInfo {
    name: string
}

type MakeModelCache = Record<number, MakeInfo> & Record<string, ModelInfo>

interface MyPartCardItemProps {
    part: Part
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
    makeModelCache?: MakeModelCache
    categoryInfo?: PartCategoryApi | null
}

export const MyPartCardItem = ({part, onEdit, onDelete, makeModelCache = {}, categoryInfo}: MyPartCardItemProps) => {
    const theme = useTheme()

    const makeInfo = part.makeId ? (makeModelCache[part.makeId] as MakeInfo | undefined) : null
    const modelInfo = part.modelId ? (makeModelCache[`model_${part.modelId}`] as ModelInfo | undefined) : null
    const vehicleLabel = [makeInfo?.name, modelInfo?.name, part.year].filter(Boolean).join(' ')

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            {/* Main content */}
            <View style={styles.body}>
                {/* Image / icon */}
                {part.imageUrl ? (
                    <Image source={{uri: part.imageUrl}} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={[styles.iconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source={categoryInfo?.icon || 'package-variant'} size={28} color={theme.colors.primary} />
                    </View>
                )}

                {/* Info */}
                <View style={styles.info}>
                    <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                        {part.name}
                    </Text>

                    {vehicleLabel ? (
                        <View style={styles.vehicleRow}>
                            {makeInfo?.logoUrl ? (
                                <Image source={{uri: makeInfo.logoUrl}} style={styles.makeLogo} resizeMode="contain" />
                            ) : (
                                <Icon source="car" size={13} color={theme.colors.onSurfaceVariant} />
                            )}
                            <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {vehicleLabel}
                            </Text>
                        </View>
                    ) : null}

                    {categoryInfo ? (
                        <View style={[styles.categoryChip, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Icon source={categoryInfo.icon || 'tag'} size={11} color={theme.colors.primary} />
                            <Text style={[styles.categoryText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                        </View>
                    ) : null}
                </View>

                {/* Price */}
                <View style={[styles.priceBox, {backgroundColor: '#FFF7ED'}]}>
                    <Text style={[styles.priceCurrency, {color: theme.colors.tertiary}]}>$</Text>
                    <Text style={[styles.priceValue, {color: theme.colors.tertiary}]}>{part.price.toFixed(0)}</Text>
                </View>
            </View>

            {/* Actions row */}
            <View style={[styles.actions, {borderTopColor: theme.colors.surfaceVariant}]}>
                {part.sku ? (
                    <Text style={[styles.skuText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        SKU: {part.sku}
                    </Text>
                ) : (
                    <View />
                )}

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionBtn, {backgroundColor: theme.colors.primaryContainer}]}
                        onPress={() => onEdit(part.id)}
                        activeOpacity={0.7}>
                        <Icon source="pencil-outline" size={16} color={theme.colors.primary} />
                        <Text style={[styles.actionText, {color: theme.colors.primary}]}>تعديل</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, {backgroundColor: '#FEF2F2'}]}
                        onPress={() => onDelete(part.id, part.name)}
                        activeOpacity={0.7}>
                        <Icon source="delete-outline" size={16} color={theme.colors.error} />
                        <Text style={[styles.actionText, {color: theme.colors.error}]}>حذف</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#0F172A',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        marginEnd: 12,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 12,
    },
    info: {
        flex: 1,
        marginEnd: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
        marginBottom: 4,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 6,
    },
    makeLogo: {
        width: 13,
        height: 13,
    },
    vehicleText: {
        fontSize: 12,
        flex: 1,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '600',
    },
    priceBox: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        alignItems: 'center',
        minWidth: 60,
    },
    priceCurrency: {
        fontSize: 10,
        fontWeight: '500',
        opacity: 0.7,
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    skuText: {
        fontSize: 11,
        flex: 1,
        marginEnd: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
    },
})
