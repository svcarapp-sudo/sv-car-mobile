import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Icon, ActivityIndicator} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

import {getFuelMeta} from './fuelMeta'

interface FuelCardProps {
    id: string
    name: string
    icon: string
    isSelected: boolean
    isPending: boolean
    disabled: boolean
    onPress: () => void
}

export const FuelCard = ({id, name, icon, isSelected, isPending, disabled, onPress}: FuelCardProps) => {
    const theme = useAppTheme()
    const meta = getFuelMeta(id)
    const tint = meta.tint(theme)
    const active = isSelected || isPending

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.82} disabled={disabled} style={styles.touch}>
            <View
                style={[
                    styles.card,
                    {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                    active && {borderColor: theme.colors.tertiary, backgroundColor: theme.colors.accentSubtle},
                    shadows.sm,
                ]}>
                <View style={[styles.iconWrap, {backgroundColor: tint.bg}]}>
                    <Icon source={icon} size={30} color={tint.fg} />
                </View>

                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {name}
                        </Text>
                        {meta.badge ? (
                            <View style={[styles.badge, {backgroundColor: tint.bg}]}>
                                <Text style={[styles.badgeText, {color: tint.fg}]}>{meta.badge}</Text>
                            </View>
                        ) : null}
                    </View>
                    {meta.descriptor ? (
                        <Text
                            variant='bodySmall'
                            style={[styles.descriptor, {color: theme.colors.onSurfaceVariant}]}
                            numberOfLines={2}>
                            {meta.descriptor}
                        </Text>
                    ) : null}
                </View>

                <View
                    style={[
                        styles.action,
                        {backgroundColor: theme.colors.surfaceVariant},
                        active && {backgroundColor: theme.colors.tertiary},
                    ]}>
                    {isPending ? (
                        <ActivityIndicator size={14} color={theme.colors.onPrimary} />
                    ) : (
                        <Icon
                            source={isSelected ? 'check' : 'chevron-left'}
                            size={18}
                            color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touch: {
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1.5,
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 14,
    },
    iconWrap: {
        width: 60,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    title: {
        fontWeight: '800',
        fontSize: 16,
        flexShrink: 1,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    descriptor: {
        fontSize: 12.5,
        lineHeight: 18,
        opacity: 0.85,
    },
    action: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
