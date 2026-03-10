import {StyleSheet, View, Image} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    VEHICLE_INFO: 'معلومات المركبة',
}

interface EditPartVehicleBannerProps {
    vehicleLabel: string
    makeLogoUrl?: string | null
    categoryName?: string | null
}

export const EditPartVehicleBanner = ({vehicleLabel, makeLogoUrl, categoryName}: EditPartVehicleBannerProps) => {
    const theme = useAppTheme()

    if (!vehicleLabel) return null

    return (
        <View style={[styles.vehicleBanner, {backgroundColor: theme.colors.surfaceVariant}]}>
            {makeLogoUrl ? (
                <Image source={{uri: makeLogoUrl}} style={styles.vehicleLogo} resizeMode="contain" />
            ) : (
                <Icon source="car" size={20} color={theme.colors.onSurfaceVariant} />
            )}
            <View style={styles.vehicleTextGroup}>
                <Text style={[styles.vehicleLabel, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.VEHICLE_INFO}
                </Text>
                <Text style={[styles.vehicleValue, {color: theme.colors.onSurface}]}>{vehicleLabel}</Text>
            </View>
            {categoryName ? (
                <View style={[styles.catBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Text style={[styles.catBadgeText, {color: theme.colors.primary}]}>{categoryName}</Text>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    vehicleBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        marginBottom: 20,
        gap: 10,
    },
    vehicleLogo: {
        width: 28,
        height: 28,
    },
    vehicleTextGroup: {
        flex: 1,
    },
    vehicleLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
    vehicleValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    catBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    catBadgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
})
