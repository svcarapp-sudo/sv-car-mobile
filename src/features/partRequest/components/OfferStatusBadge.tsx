import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {OfferStatus} from '@/global/types'

interface OfferStatusBadgeProps {
    status: OfferStatus
}

const LABELS: Record<OfferStatus, string> = {
    PENDING: 'قيد الانتظار',
    ACCEPTED: 'مقبول',
    DECLINED: 'مرفوض',
    WITHDRAWN: 'مسحوب',
}

const ICONS: Record<OfferStatus, string> = {
    PENDING: 'clock-outline',
    ACCEPTED: 'check-decagram',
    DECLINED: 'close-circle-outline',
    WITHDRAWN: 'undo-variant',
}

/** Semantic status pill for an offer (pending/accepted/declined/withdrawn). */
export const OfferStatusBadge = ({status}: OfferStatusBadgeProps) => {
    const theme = useAppTheme()

    const palette: Record<OfferStatus, {bg: string; fg: string}> = {
        PENDING: {bg: theme.colors.accentSoft, fg: theme.colors.tertiary},
        ACCEPTED: {bg: theme.colors.successContainer, fg: theme.colors.onSuccessContainer},
        DECLINED: {bg: theme.colors.errorContainer, fg: theme.colors.onErrorContainer},
        WITHDRAWN: {bg: theme.colors.surfaceContainerHigh, fg: theme.colors.onSurfaceVariant},
    }
    const tone = palette[status]

    return (
        <View style={[styles.pill, {backgroundColor: tone.bg}]}>
            <Icon source={ICONS[status]} size={11} color={tone.fg} />
            <Text style={[styles.label, {color: tone.fg}]} numberOfLines={1}>
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
        paddingHorizontal: 9,
        paddingVertical: 4,
    },
    label: {fontSize: 10.5, fontWeight: '800', letterSpacing: 0.2},
})
