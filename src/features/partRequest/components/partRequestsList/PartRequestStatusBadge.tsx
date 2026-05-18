import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequestStatus} from '../../types'

interface PartRequestStatusBadgeProps {
    status: PartRequestStatus
    size?: 'sm' | 'md'
}

const LABELS: Record<PartRequestStatus, string> = {
    OPEN: 'مفتوح',
    FULFILLED: 'تم التوفير',
    CLOSED: 'مغلق',
}

const ICONS: Record<PartRequestStatus, string> = {
    OPEN: 'broadcast',
    FULFILLED: 'check-decagram',
    CLOSED: 'lock-outline',
}

export const PartRequestStatusBadge = ({status, size = 'sm'}: PartRequestStatusBadgeProps) => {
    const theme = useAppTheme()

    const palette = {
        OPEN: {bg: theme.colors.successContainer, fg: theme.colors.onSuccessContainer, icon: theme.colors.success},
        FULFILLED: {bg: theme.colors.infoContainer, fg: theme.colors.onInfoContainer, icon: theme.colors.info},
        CLOSED: {bg: theme.colors.surfaceContainerHigh, fg: theme.colors.onSurfaceVariant, icon: theme.colors.onSurfaceVariant},
    }[status]

    const iconSize = size === 'md' ? 12 : 10
    const textStyle = size === 'md' ? styles.labelMd : styles.labelSm

    return (
        <View style={[styles.pill, size === 'md' ? styles.pillMd : styles.pillSm, {backgroundColor: palette.bg}]}>
            <Icon source={ICONS[status]} size={iconSize} color={palette.icon} />
            <Text style={[textStyle, {color: palette.fg}]} numberOfLines={1}>
                {LABELS[status]}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    pillSm: {paddingHorizontal: 8, paddingVertical: 3},
    pillMd: {paddingHorizontal: 10, paddingVertical: 5},
    labelSm: {fontSize: 10, fontWeight: '800', letterSpacing: 0.2},
    labelMd: {fontSize: 12, fontWeight: '800', letterSpacing: 0.2},
})
