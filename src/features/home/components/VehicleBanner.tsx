import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    ADD_VEHICLE: 'أضف مركبتك',
    ADD_VEHICLE_DESC: 'أضف مركبتك للعثور على قطع الغيار المتوافقة',
}

interface VehicleBannerProps {
    onAddVehicle: () => void
}

export const VehicleBanner = ({onAddVehicle}: VehicleBannerProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onAddVehicle} style={[styles.card, {backgroundColor: theme.colors.primary}]}>
            <View style={styles.iconBox}>
                <Icon source="car-outline" size={28} color={theme.colors.tertiary} />
            </View>
            <View style={styles.textColumn}>
                <Text style={styles.title}>{ARABIC_TEXT.ADD_VEHICLE}</Text>
                <Text style={styles.subtitle}>{ARABIC_TEXT.ADD_VEHICLE_DESC}</Text>
            </View>
            <View style={[styles.arrow, {backgroundColor: theme.colors.tertiary}]}>
                <Icon source="plus" size={18} color={theme.colors.onTertiary} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: themeColors.onDarkSurface,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    textColumn: {flex: 1, marginEnd: 12},
    title: {color: themeColors.onDarkHigh, fontSize: 16, fontWeight: '700', marginBottom: 2},
    subtitle: {color: themeColors.onDarkMedium, fontSize: 12, lineHeight: 18},
    arrow: {width: 34, height: 34, borderRadius: 11, justifyContent: 'center', alignItems: 'center'},
})
