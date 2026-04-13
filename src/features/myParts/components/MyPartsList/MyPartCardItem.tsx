import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {Part, PartCategoryApi} from '@/global/types'

interface MyPartCardItemProps {
    part: Part
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
    categoryInfo?: PartCategoryApi | null
}

export const MyPartCardItem = ({part, onEdit, onDelete, categoryInfo}: MyPartCardItemProps) => {
    const theme = useAppTheme()
    const vehicles = part.compatibleVehicles ?? []
    const firstVehicle = vehicles[0]

    const vehicleLabel = firstVehicle
        ? `${firstVehicle.make} ${firstVehicle.model} ${firstVehicle.yearFrom === firstVehicle.yearTo ? firstVehicle.yearFrom : `${firstVehicle.yearFrom}-${firstVehicle.yearTo}`}`
        : null

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.body}>
                {part.imageUrl ? (
                    <Image source={{uri: part.imageUrl}} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={[styles.imagePlaceholder, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source={categoryInfo?.icon || 'package-variant'} size={28} color={theme.colors.primary} />
                    </View>
                )}

                <View style={styles.info}>
                    {categoryInfo && (
                        <View style={[styles.categoryBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Text style={[styles.categoryText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                        </View>
                    )}
                    <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2}>{part.name}</Text>
                    {vehicleLabel && (
                        <View style={styles.vehicleRow}>
                            <Icon source="check-circle" size={13} color={theme.colors.success} />
                            <Text style={[styles.vehicleText, {color: theme.colors.success}]} numberOfLines={1}>
                                {vehicleLabel}
                            </Text>
                            {vehicles.length > 1 && (
                                <Text style={[styles.moreText, {color: theme.colors.onSurfaceVariant}]}>+{vehicles.length - 1}</Text>
                            )}
                        </View>
                    )}
                    <Text style={[styles.price, {color: theme.colors.tertiary}]}>${part.price.toFixed(2)}</Text>
                </View>
            </View>

            <View style={[styles.actions, {borderTopColor: theme.colors.outline}]}>
                {part.sku ? (
                    <Text style={[styles.sku, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>SKU: {part.sku}</Text>
                ) : <View />}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionBtn, {backgroundColor: theme.colors.primaryContainer}]}
                        onPress={() => onEdit(part.id)}
                        activeOpacity={0.7}>
                        <Icon source="pencil-outline" size={15} color={theme.colors.primary} />
                        <Text style={[styles.actionLabel, {color: theme.colors.primary}]}>تعديل</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, {backgroundColor: theme.colors.errorContainer}]}
                        onPress={() => onDelete(part.id, part.name)}
                        activeOpacity={0.7}>
                        <Icon source="delete-outline" size={15} color={theme.colors.error} />
                        <Text style={[styles.actionLabel, {color: theme.colors.error}]}>حذف</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 14, marginBottom: 10, shadowColor: themeColors.shadow, shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
    body: {flexDirection: 'row', alignItems: 'center', padding: 12},
    image: {width: 88, height: 88, borderRadius: 12, backgroundColor: themeColors.surfaceVariant},
    imagePlaceholder: {width: 88, height: 88, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
    info: {flex: 1, marginStart: 14},
    categoryBadge: {alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginBottom: 4},
    categoryText: {fontSize: 10, fontWeight: '600', letterSpacing: 0.3},
    name: {fontSize: 15, fontWeight: '600', lineHeight: 21, marginBottom: 4},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4},
    vehicleText: {fontSize: 12, fontWeight: '500', flex: 1},
    moreText: {fontSize: 11, fontWeight: '500'},
    price: {fontSize: 18, fontWeight: '700', letterSpacing: -0.3},
    actions: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: StyleSheet.hairlineWidth},
    sku: {fontSize: 10, flex: 1, marginEnd: 8, opacity: 0.6},
    actionButtons: {flexDirection: 'row', gap: 6},
    actionBtn: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8},
    actionLabel: {fontSize: 12, fontWeight: '600'},
})
