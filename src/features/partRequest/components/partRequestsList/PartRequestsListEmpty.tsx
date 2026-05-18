import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const T = {
    LOADING: 'جاري تحميل الطلبات...',
    TITLE: 'لا توجد طلبات الآن',
    SUBTITLE: 'كن أول من يبدأ بنشر طلب لقطعة غيار تحتاجها',
    FILTER_TITLE: 'لا نتائج للبحث',
    FILTER_SUBTITLE: 'حاول تغيير المرشحات أو كلمات البحث',
    ADD_ACTION: 'انشر طلباً الآن',
    RESET: 'إعادة الضبط',
}

interface PartRequestsListEmptyProps {
    loading: boolean
    isFiltered?: boolean
    onAdd: () => void
    onReset?: () => void
}

export const PartRequestsListEmpty = ({loading, isFiltered, onAdd, onReset}: PartRequestsListEmptyProps) => {
    const theme = useAppTheme()

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
                <Text style={[styles.loading, {color: theme.colors.onSurfaceVariant}]}>{T.LOADING}</Text>
            </View>
        )
    }

    const title = isFiltered ? T.FILTER_TITLE : T.TITLE
    const subtitle = isFiltered ? T.FILTER_SUBTITLE : T.SUBTITLE

    return (
        <View style={styles.container}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='clipboard-list-outline' size={48} color={theme.colors.primary} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{title}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{subtitle}</Text>
                {isFiltered && onReset ? (
                    <Button mode='outlined' onPress={onReset} style={styles.button} icon='filter-off-outline'>
                        {T.RESET}
                    </Button>
                ) : (
                    <Button
                        mode='contained'
                        onPress={onAdd}
                        buttonColor={theme.colors.primary}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        icon='plus-circle-outline'>
                        {T.ADD_ACTION}
                    </Button>
                )}
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
    loading: {marginTop: 16, fontSize: 14},
})
