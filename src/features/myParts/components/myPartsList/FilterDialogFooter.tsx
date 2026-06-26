import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {formatPrice} from '@/global/utils'

interface FilterDialogFooterProps {
    resultCount: number
    canReset: boolean
    onReset: () => void
    onApply: () => void
}

const T = {
    RESET: 'إعادة الضبط',
    SHOW: (n: number) => `عرض ${formatPrice(n)} نتيجة`,
    NONE: 'لا نتائج مطابقة',
}

/**
 * Sticky dialog footer: a live "show N results" Apply button (the result count
 * updates as the draft changes, so the user never applies blindly) plus a Reset
 * that only appears when there is something to clear.
 */
export const FilterDialogFooter = ({resultCount, canReset, onReset, onApply}: FilterDialogFooterProps) => {
    const theme = useAppTheme()
    return (
        <View style={styles.footer}>
            {canReset && (
                <Button mode='text' compact onPress={onReset} textColor={theme.colors.onSurfaceVariant}>
                    {T.RESET}
                </Button>
            )}
            <Button
                mode='contained'
                onPress={onApply}
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}
                style={styles.apply}
                contentStyle={styles.applyContent}
                labelStyle={styles.applyLabel}>
                {resultCount > 0 ? T.SHOW(resultCount) : T.NONE}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16},
    apply: {flex: 1, borderRadius: 14},
    applyContent: {paddingVertical: 6},
    applyLabel: {fontSize: 14, fontWeight: '800'},
})
