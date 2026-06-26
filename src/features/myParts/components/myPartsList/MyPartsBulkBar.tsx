import {StyleSheet, View} from 'react-native'
import {Icon, Text, TouchableRipple} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

const T = {
    SELECTED: (n: number) => `${n} محدّدة`,
    MARK_SOLD: 'تمييز كمباع',
    HIDE: 'إخفاء',
    DELETE: 'حذف',
}

export type BulkAction = 'sold' | 'hide' | 'delete'

interface MyPartsBulkBarProps {
    count: number
    busy: boolean
    onAction: (action: BulkAction) => void
    onClose: () => void
}

interface BulkBtnProps {
    icon: string
    label: string
    color: string
    disabled: boolean
    onPress: () => void
}

const BulkBtn = ({icon, label, color, disabled, onPress}: BulkBtnProps) => (
    <TouchableRipple onPress={onPress} disabled={disabled} borderless style={styles.btn} rippleColor={themeColors.scrim}>
        <View style={styles.btnInner}>
            <Icon source={icon} size={20} color={color} />
            <Text style={[styles.btnLabel, {color}]} numberOfLines={1}>
                {label}
            </Text>
        </View>
    </TouchableRipple>
)

export const MyPartsBulkBar = ({count, busy, onAction, onClose}: MyPartsBulkBarProps) => {
    const theme = useAppTheme()
    return (
        <View style={[styles.bar, {backgroundColor: theme.colors.surfaceDark}]}>
            <TouchableRipple
                onPress={onClose}
                disabled={busy}
                borderless
                style={styles.close}
                rippleColor={themeColors.onDarkSurface}>
                <Icon source='close' size={20} color={theme.colors.onDarkHigh} />
            </TouchableRipple>
            <Text style={[styles.count, {color: theme.colors.onDarkHigh}]}>{T.SELECTED(count)}</Text>
            <View style={styles.actions}>
                <BulkBtn
                    icon='tag-check-outline'
                    label={T.MARK_SOLD}
                    color={theme.colors.onDarkHigh}
                    disabled={busy}
                    onPress={() => onAction('sold')}
                />
                <BulkBtn
                    icon='eye-off-outline'
                    label={T.HIDE}
                    color={theme.colors.onDarkHigh}
                    disabled={busy}
                    onPress={() => onAction('hide')}
                />
                <BulkBtn
                    icon='delete-outline'
                    label={T.DELETE}
                    color={theme.colors.errorBright}
                    disabled={busy}
                    onPress={() => onAction('delete')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        start: 12,
        end: 12,
        bottom: 16,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        gap: 6,
        ...shadows.lg,
        shadowColor: themeColors.shadow,
    },
    close: {width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center'},
    count: {fontSize: 13, fontWeight: '800', minWidth: 64},
    actions: {flexDirection: 'row', flex: 1, justifyContent: 'flex-end', gap: 2},
    btn: {borderRadius: 12},
    btnInner: {alignItems: 'center', justifyContent: 'center', paddingVertical: 4, paddingHorizontal: 8, gap: 2, minWidth: 56},
    btnLabel: {fontSize: 10, fontWeight: '700'},
})
