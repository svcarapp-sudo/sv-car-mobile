import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'

interface MyPartCardActionsProps {
    partId: string
    partName: string
    sku?: string | null
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
}

export const MyPartCardActions = ({partId, partName, sku, onEdit, onDelete}: MyPartCardActionsProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.actions, {borderTopColor: theme.colors.surfaceVariant}]}>
            {sku ? (
                <Text style={[styles.skuText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                    SKU: {sku}
                </Text>
            ) : (
                <View />
            )}

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.actionBtn, {backgroundColor: theme.colors.primaryContainer}]}
                    onPress={() => onEdit(partId)}
                    activeOpacity={0.7}>
                    <Icon source="pencil-outline" size={16} color={theme.colors.primary} />
                    <Text style={[styles.actionText, {color: theme.colors.primary}]}>تعديل</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, {backgroundColor: theme.colors.errorContainer}]}
                    onPress={() => onDelete(partId, partName)}
                    activeOpacity={0.7}>
                    <Icon source="delete-outline" size={16} color={theme.colors.error} />
                    <Text style={[styles.actionText, {color: theme.colors.error}]}>حذف</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
