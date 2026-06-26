import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {formatPrice} from '@/global/utils'

interface MyPartsResultBarProps {
    count: number
    isFiltered: boolean
    onReset: () => void
}

const T = {
    RESULT: (n: number) => `${formatPrice(n)} نتيجة`,
    RESET: 'إعادة الضبط',
}

/**
 * Live result count + clear-all, shown only while a filter is active. Keeping the
 * count visible the instant filters change lets the user catch an over-narrow
 * filter without pogo-sticking, and the reset gives a one-tap escape.
 */
export const MyPartsResultBar = ({count, isFiltered, onReset}: MyPartsResultBarProps) => {
    const theme = useAppTheme()
    if (!isFiltered) return null

    return (
        <View style={styles.row}>
            <View style={styles.left}>
                <Icon source='filter-variant' size={14} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.count, {color: theme.colors.onSurfaceVariant}]}>{T.RESULT(count)}</Text>
            </View>
            <PressableScale
                withHaptic
                hitSlop={8}
                onPress={onReset}
                accessibilityRole='button'
                style={[styles.reset, {backgroundColor: theme.colors.accentContainer}]}>
                <Icon source='filter-remove-outline' size={14} color={theme.colors.tertiary} />
                <Text style={[styles.resetText, {color: theme.colors.tertiary}]}>{T.RESET}</Text>
            </PressableScale>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 2},
    left: {flexDirection: 'row', alignItems: 'center', gap: 6},
    count: {fontSize: 12.5, fontWeight: '700'},
    reset: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingStart: 10,
        paddingEnd: 12,
        paddingVertical: 7,
        borderRadius: 999,
    },
    resetText: {fontSize: 12, fontWeight: '800'},
})
