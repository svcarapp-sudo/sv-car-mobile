import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'

const T = {
    TITLE: 'المركبة المستهدفة',
    SUBTITLE_HAS: 'سيتم نشر الطلب لهذه المركبة',
    SUBTITLE_NONE: 'أضف مركبتك أولاً لتتمكن من نشر طلب',
    ADD_VEHICLE: 'إضافة مركبة',
    CHANGE: 'تغيير',
}

interface AddPartRequestVehicleCardProps {
    vehicle: Vehicle | null
    onAddVehicle: () => void
    onChangeVehicle: () => void
}

export const AddPartRequestVehicleCard = ({vehicle, onAddVehicle, onChangeVehicle}: AddPartRequestVehicleCardProps) => {
    const theme = useAppTheme()

    if (!vehicle) {
        return (
            <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.warningContainer}]}>
                    <Icon source='car-off' size={26} color={theme.colors.warning} />
                </View>
                <View style={styles.textBlock}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{T.TITLE}</Text>
                    <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{T.SUBTITLE_NONE}</Text>
                </View>
                <Button
                    mode='contained'
                    onPress={onAddVehicle}
                    buttonColor={theme.colors.primary}
                    icon='plus'
                    style={styles.action}
                    compact>
                    {T.ADD_VEHICLE}
                </Button>
            </View>
        )
    }

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <View style={[styles.iconWrap, {backgroundColor: theme.colors.successContainer}]}>
                <Icon source='shield-car' size={26} color={theme.colors.success} />
            </View>
            <View style={styles.textBlock}>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {vehicle.make} {vehicle.model}
                </Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {vehicle.year} • {T.SUBTITLE_HAS}
                </Text>
            </View>
            <Button mode='outlined' onPress={onChangeVehicle} icon='pencil-outline' compact style={styles.action}>
                {T.CHANGE}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 18,
        borderWidth: 1,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    iconWrap: {width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center'},
    textBlock: {flex: 1, gap: 2},
    title: {fontSize: 14.5, fontWeight: '800', letterSpacing: -0.2},
    subtitle: {fontSize: 11.5, fontWeight: '500'},
    action: {borderRadius: 12},
})
