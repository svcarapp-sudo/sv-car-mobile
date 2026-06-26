import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Part} from '@/global/types'

import {CONDITION_LABEL, STATUS_LABEL, stockLevel} from '../../constants/partLifecycle'

const T = {QTY: (n: number) => `الكمية: ${n}`, OUT: 'نفد المخزون'}

interface MyPartBadgesProps {
    status?: Part['status']
    condition?: Part['condition']
    stockQuantity?: number
}

interface PillProps {
    label: string
    icon?: string
    bg: string
    fg: string
}

const Pill = ({label, icon, bg, fg}: PillProps) => (
    <View style={[styles.pill, {backgroundColor: bg}]}>
        {icon && <Icon source={icon} size={10} color={fg} />}
        <Text style={[styles.pillText, {color: fg}]} numberOfLines={1}>
            {label}
        </Text>
    </View>
)

export const MyPartBadges = ({status, condition, stockQuantity}: MyPartBadgesProps) => {
    const theme = useAppTheme()

    const statusStyle = {
        ACTIVE: {bg: theme.colors.successContainer, fg: theme.colors.success, icon: 'check-circle-outline'},
        SOLD: {bg: theme.colors.surfaceContainerHigh, fg: theme.colors.onSurfaceVariant, icon: 'tag-check-outline'},
        HIDDEN: {bg: theme.colors.warningContainer, fg: theme.colors.warning, icon: 'eye-off-outline'},
    }[status ?? 'ACTIVE']

    const level = stockLevel(stockQuantity)
    const stock = {
        out: {bg: theme.colors.errorContainer, fg: theme.colors.error, label: T.OUT, icon: 'alert-circle-outline'},
        ok: {
            bg: theme.colors.surfaceContainerHigh,
            fg: theme.colors.onSurfaceVariant,
            label: T.QTY(stockQuantity ?? 0),
            icon: 'package-variant-closed',
        },
    }[level]

    return (
        <View style={styles.row}>
            <Pill label={STATUS_LABEL[status ?? 'ACTIVE']} icon={statusStyle.icon} bg={statusStyle.bg} fg={statusStyle.fg} />
            {condition && (
                <Pill
                    label={CONDITION_LABEL[condition]}
                    icon='star-four-points-outline'
                    bg={theme.colors.accentContainer}
                    fg={theme.colors.tertiary}
                />
            )}
            {(stockQuantity != null || level !== 'ok') && (
                <Pill label={stock.label} icon={stock.icon} bg={stock.bg} fg={stock.fg} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 5, marginTop: 2},
    pill: {flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8},
    pillText: {fontSize: 9.5, fontWeight: '700', letterSpacing: 0.2},
})
