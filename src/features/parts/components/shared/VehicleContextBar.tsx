import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {useVehicleStore} from '@/global/store'

const ARABIC_TEXT = {
    NO_VEHICLE: 'لم يتم اختيار مركبة',
    NO_VEHICLE_HINT: 'أضف مركبتك لرؤية القطع المتوافقة',
    SHOPPING_FOR: 'تتسوق لـ',
    CHANGE: 'تغيير',
    ADD: 'إضافة مركبة',
    A11Y_ADD: 'إضافة مركبة لرؤية القطع المتوافقة',
    A11Y_CHANGE: 'تغيير المركبة المحددة',
}

interface VehicleContextBarProps {
    onChangeVehicle: () => void
    onAddVehicle: () => void
}

/**
 * eBay Motors / CarParts.com pattern: persistent "Shopping for: [Vehicle]"
 * bar pinned at the top of every parts browse/list screen. Critical for trust.
 */
export const VehicleContextBar = ({onChangeVehicle, onAddVehicle}: VehicleContextBarProps) => {
    const vehicle = useVehicleStore(s => s.vehicle)
    const theme = useAppTheme()

    if (!vehicle) {
        return (
            <TouchableOpacity
                onPress={onAddVehicle}
                activeOpacity={0.8}
                accessibilityRole='button'
                accessibilityLabel={ARABIC_TEXT.A11Y_ADD}
                style={[styles.row, {backgroundColor: theme.colors.warningContainer, borderColor: theme.colors.warning}]}>
                <View style={[styles.iconBox, {backgroundColor: theme.colors.warning}]}>
                    <Icon source='car-info' size={16} color={theme.colors.onPrimary} />
                </View>
                <View style={styles.textBlock}>
                    <Text style={[styles.label, {color: theme.colors.onWarningContainer}]}>{ARABIC_TEXT.NO_VEHICLE}</Text>
                    <Text style={[styles.hint, {color: theme.colors.onWarningContainer}]} numberOfLines={1}>
                        {ARABIC_TEXT.NO_VEHICLE_HINT}
                    </Text>
                </View>
                <View style={[styles.cta, {backgroundColor: theme.colors.onWarningContainer}]}>
                    <Text style={[styles.ctaText, {color: theme.colors.warningContainer}]}>{ARABIC_TEXT.ADD}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const vehicleLabel = `${vehicle.make} ${vehicle.model} ${vehicle.year}`

    return (
        <TouchableOpacity
            onPress={onChangeVehicle}
            activeOpacity={0.8}
            accessibilityRole='button'
            accessibilityLabel={`${ARABIC_TEXT.SHOPPING_FOR} ${vehicleLabel}، ${ARABIC_TEXT.A11Y_CHANGE}`}
            style={[styles.row, {backgroundColor: theme.colors.primary, borderColor: theme.colors.primary}]}>
            <View style={[styles.iconBox, {backgroundColor: theme.colors.onDarkContainer}]}>
                <Icon source='check-decagram' size={16} color={theme.colors.tertiary} />
            </View>
            <View style={styles.textBlock}>
                <Text style={[styles.label, {color: theme.colors.onDarkLow}]}>{ARABIC_TEXT.SHOPPING_FOR}</Text>
                <Text style={[styles.vehicle, {color: theme.colors.onPrimary}]} numberOfLines={1}>
                    {vehicleLabel}
                </Text>
            </View>
            <View style={[styles.cta, {backgroundColor: theme.colors.onDarkContainer}]}>
                <Icon source='swap-horizontal' size={13} color={theme.colors.onPrimary} />
                <Text style={[styles.ctaText, {color: theme.colors.onPrimary}]}>{ARABIC_TEXT.CHANGE}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 14,
        borderWidth: 1,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBlock: {flex: 1, gap: 1},
    label: {fontSize: 10.5, fontWeight: '600', letterSpacing: 0.2, opacity: 0.85},
    vehicle: {fontSize: 13.5, fontWeight: '700', letterSpacing: -0.1},
    hint: {fontSize: 11, fontWeight: '500', opacity: 0.85},
    cta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    ctaText: {fontSize: 11, fontWeight: '700', letterSpacing: 0.2},
})
