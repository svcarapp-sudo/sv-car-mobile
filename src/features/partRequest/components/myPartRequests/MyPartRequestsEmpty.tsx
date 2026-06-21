import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {FadeSlideIn} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const T = {
    TITLE: 'لم تنشر طلباً بعد',
    SUBTITLE: 'انشر أول طلب الآن لتجد القطعة التي تحتاجها بسرعة',
    ACTION: 'انشر طلباً',
    FILTERED_TITLE: 'لا توجد طلبات بهذه الحالة',
    FILTERED_SUBTITLE: 'جرّب تبويباً آخر أو اعرض كل طلباتك',
    FILTERED_ACTION: 'عرض الكل',
}

interface MyPartRequestsEmptyProps {
    isFiltered: boolean
    onAdd: () => void
    onReset: () => void
}

/** Empty state — distinguishes "no requests at all" from "none in this filter". */
export const MyPartRequestsEmpty = ({isFiltered, onAdd, onReset}: MyPartRequestsEmptyProps) => {
    const theme = useAppTheme()

    const view = isFiltered
        ? {
              icon: 'filter-variant-remove',
              title: T.FILTERED_TITLE,
              subtitle: T.FILTERED_SUBTITLE,
              action: T.FILTERED_ACTION,
              buttonIcon: 'view-grid-outline',
              onPress: onReset,
          }
        : {
              icon: 'bullhorn-outline',
              title: T.TITLE,
              subtitle: T.SUBTITLE,
              action: T.ACTION,
              buttonIcon: 'plus-circle-outline',
              onPress: onAdd,
          }

    return (
        <FadeSlideIn style={styles.container}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.accentMuted}]}>
                    <Icon source={view.icon} size={42} color={theme.colors.tertiary} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{view.title}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{view.subtitle}</Text>
                <Button
                    mode={isFiltered ? 'outlined' : 'contained'}
                    onPress={view.onPress}
                    buttonColor={isFiltered ? undefined : theme.colors.primary}
                    icon={view.buttonIcon}
                    style={styles.action}
                    contentStyle={styles.actionContent}>
                    {view.action}
                </Button>
            </View>
        </FadeSlideIn>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: 320},
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
})
