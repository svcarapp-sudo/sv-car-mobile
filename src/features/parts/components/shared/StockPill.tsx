import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
}

interface StockPillProps {
    inStock: boolean
    compact?: boolean
}

export const StockPill = ({inStock, compact}: StockPillProps) => {
    const theme = useAppTheme()
    const bg = inStock ? theme.colors.successContainer : theme.colors.errorContainer
    const fg = inStock ? theme.colors.onSuccessContainer : theme.colors.errorDark
    const dot = inStock ? theme.colors.successBright : theme.colors.error

    return (
        <View style={[styles.pill, compact && styles.pillCompact, {backgroundColor: bg}]}>
            <View style={[styles.dot, {backgroundColor: dot}]} />
            <Text style={[styles.text, compact && styles.textCompact, {color: fg}]}>
                {inStock ? ARABIC_TEXT.IN_STOCK : ARABIC_TEXT.OUT_OF_STOCK}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    pillCompact: {paddingHorizontal: 7, paddingVertical: 3, gap: 4},
    dot: {width: 6, height: 6, borderRadius: 3},
    text: {fontSize: 11, fontWeight: '700', letterSpacing: 0.2},
    textCompact: {fontSize: 10},
})
