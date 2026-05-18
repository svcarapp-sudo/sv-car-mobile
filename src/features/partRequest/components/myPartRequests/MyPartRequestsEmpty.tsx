import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const T = {
    LOADING: 'جاري التحميل...',
    TITLE: 'لم تنشر طلباً بعد',
    SUBTITLE: 'انشر أول طلب الآن لتجد القطعة التي تحتاجها',
    ACTION: 'انشر طلباً',
}

interface MyPartRequestsEmptyProps {
    loading: boolean
    onAdd: () => void
}

export const MyPartRequestsEmpty = ({loading, onAdd}: MyPartRequestsEmptyProps) => {
    const theme = useAppTheme()

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
                <Text style={[styles.loading, {color: theme.colors.onSurfaceVariant}]}>{T.LOADING}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.accentMuted}]}>
                    <Icon source='bullhorn-outline' size={42} color={theme.colors.tertiary} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{T.TITLE}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{T.SUBTITLE}</Text>
                <Button
                    mode='contained'
                    onPress={onAdd}
                    buttonColor={theme.colors.primary}
                    icon='plus-circle-outline'
                    style={styles.action}
                    contentStyle={styles.actionContent}>
                    {T.ACTION}
                </Button>
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
    iconWrap: {width: 84, height: 84, borderRadius: 42, justifyContent: 'center', alignItems: 'center', marginBottom: 14},
    title: {fontSize: 16.5, fontWeight: '800', textAlign: 'center', marginBottom: 6, letterSpacing: -0.2},
    subtitle: {fontSize: 13, lineHeight: 20, textAlign: 'center', opacity: 0.75, marginBottom: 16},
    action: {borderRadius: 14, width: '100%'},
    actionContent: {paddingVertical: 6},
    loading: {marginTop: 16, fontSize: 14},
})
