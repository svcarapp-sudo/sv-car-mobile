import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const T = {
    SETUP_TITLE: 'حدد ماركات تخصصك',
    SETUP_SUBTITLE: 'أخبرنا بالماركات التي توفّر قطعها لنعرض لك طلبات العملاء المطابقة',
    SETUP_ACTION: 'تحديد الماركات',
    NONE_TITLE: 'لا توجد طلبات مطابقة الآن',
    NONE_SUBTITLE: 'سنعرض هنا طلبات العملاء فور توفّرها على ماركات تخصصك',
    ERROR_TITLE: 'تعذر تحميل الطلبات',
    ERROR_SUBTITLE: 'تحقق من اتصالك بالإنترنت ثم أعد المحاولة',
    RETRY: 'إعادة المحاولة',
}

type Mode = 'setup' | 'none' | 'error'

interface MatchedRequestsEmptyProps {
    mode: Mode
    onSetup: () => void
    onRetry: () => void
}

/** Empty states for the matched feed: pick-specializations, no-matches, and load-error. */
export const MatchedRequestsEmpty = ({mode, onSetup, onRetry}: MatchedRequestsEmptyProps) => {
    const theme = useAppTheme()

    const variant = {
        setup: {icon: 'car-multiple', title: T.SETUP_TITLE, subtitle: T.SETUP_SUBTITLE},
        none: {icon: 'radar', title: T.NONE_TITLE, subtitle: T.NONE_SUBTITLE},
        error: {icon: 'cloud-alert', title: T.ERROR_TITLE, subtitle: T.ERROR_SUBTITLE},
    }[mode]

    const renderAction = () => {
        if (mode === 'setup') {
            return (
                <Button
                    mode='contained'
                    onPress={onSetup}
                    buttonColor={theme.colors.primary}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    icon='car-multiple'>
                    {T.SETUP_ACTION}
                </Button>
            )
        }
        if (mode === 'error') {
            return (
                <Button
                    mode='contained'
                    onPress={onRetry}
                    buttonColor={theme.colors.primary}
                    style={styles.button}
                    icon='refresh'>
                    {T.RETRY}
                </Button>
            )
        }
        return null
    }

    return (
        <View style={styles.container}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={variant.icon} size={48} color={theme.colors.primary} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{variant.title}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{variant.subtitle}</Text>
                {renderAction()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: 380},
    card: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 3,
    },
    iconWrap: {width: 92, height: 92, borderRadius: 46, justifyContent: 'center', alignItems: 'center', marginBottom: 16},
    title: {fontSize: 17, fontWeight: '800', textAlign: 'center', marginBottom: 6, letterSpacing: -0.2},
    subtitle: {fontSize: 13, lineHeight: 20, textAlign: 'center', opacity: 0.75, marginBottom: 18},
    button: {borderRadius: 14, width: '100%'},
    buttonContent: {paddingVertical: 6},
})
