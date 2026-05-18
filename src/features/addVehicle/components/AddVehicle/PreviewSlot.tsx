import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {Step} from './addVehicleConstants'

interface PreviewSlotProps {
    step: Step
    value: string
    icon: string
    logoUrl?: string | null
    showDivider: boolean
    onPress: (step: Step) => void
}

export const PreviewSlot = ({step, value, icon, logoUrl, showDivider, onPress}: PreviewSlotProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.row}>
            {showDivider && <View style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />}
            <TouchableOpacity
                onPress={() => onPress(step)}
                activeOpacity={0.6}
                style={styles.slot}
                hitSlop={{top: 6, bottom: 6, left: 4, right: 4}}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.accentSubtle}]}>
                    {logoUrl ? (
                        <Image source={{uri: logoUrl}} style={styles.logo} resizeMode='contain' />
                    ) : (
                        <Icon source={icon} size={14} color={theme.colors.tertiary} />
                    )}
                </View>
                <Text style={[styles.value, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {value}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        width: StyleSheet.hairlineWidth,
        height: 22,
        marginHorizontal: 6,
    },
    slot: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    iconWrap: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 16,
        height: 16,
    },
    value: {
        fontSize: 12.5,
        fontWeight: '700',
        maxWidth: 110,
    },
})
