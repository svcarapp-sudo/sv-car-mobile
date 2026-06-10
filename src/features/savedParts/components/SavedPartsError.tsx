import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    LOAD_ERROR: 'تعذر تحميل المفضلة',
    RETRY: 'إعادة المحاولة',
}

interface SavedPartsErrorProps {
    onRetry: () => void
}

/** Fetch-failure state with a retry affordance — never a dead end. */
export const SavedPartsError = ({onRetry}: SavedPartsErrorProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <View style={[styles.iconBox, {backgroundColor: theme.colors.accentSubtle}]}>
                <Icon source='wifi-off' size={36} color={theme.colors.tertiary} />
            </View>
            <Text style={[styles.message, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.LOAD_ERROR}</Text>
            <Button mode='outlined' onPress={onRetry} style={styles.retryButton}>
                {ARABIC_TEXT.RETRY}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, minHeight: 280},
    iconBox: {
        width: 72,
        height: 72,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    message: {fontSize: 15, fontWeight: '700', textAlign: 'center', marginBottom: 16},
    retryButton: {borderRadius: 12},
})
