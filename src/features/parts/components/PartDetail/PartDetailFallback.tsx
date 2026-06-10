import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    NOT_FOUND: 'لم يتم العثور على القطعة',
    LOAD_ERROR: 'تعذر تحميل القطعة',
    RETRY: 'إعادة المحاولة',
    BACK: 'العودة',
    BROWSE: 'تصفح القطع',
}

interface PartDetailFallbackProps {
    kind: 'notFound' | 'error'
    onBack: () => void
    onBrowse: () => void
    onRetry: () => void
}

/**
 * Friendly dead-end recovery: not-found offers a way back or onward to
 * browsing; load errors offer a retry. No state leaves the user stranded.
 */
export const PartDetailFallback = ({kind, onBack, onBrowse, onRetry}: PartDetailFallbackProps) => {
    const theme = useAppTheme()
    const isError = kind === 'error'

    return (
        <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
            <View style={[styles.iconBox, {backgroundColor: theme.colors.accentSubtle}]}>
                <Icon source={isError ? 'wifi-off' : 'package-variant-closed-remove'} size={40} color={theme.colors.tertiary} />
            </View>
            <Text style={[styles.message, {color: theme.colors.onSurface}]}>
                {isError ? ARABIC_TEXT.LOAD_ERROR : ARABIC_TEXT.NOT_FOUND}
            </Text>

            <Button
                mode='contained'
                onPress={isError ? onRetry : onBack}
                buttonColor={theme.colors.primary}
                style={styles.primaryButton}>
                {isError ? ARABIC_TEXT.RETRY : ARABIC_TEXT.BACK}
            </Button>
            <Button mode='text' onPress={isError ? onBack : onBrowse} textColor={theme.colors.tertiary}>
                {isError ? ARABIC_TEXT.BACK : ARABIC_TEXT.BROWSE}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32},
    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    message: {fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 20},
    primaryButton: {borderRadius: 14, minWidth: 180, marginBottom: 6},
})
