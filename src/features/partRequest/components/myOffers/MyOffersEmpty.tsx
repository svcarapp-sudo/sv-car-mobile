import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const T = {
    TITLE: 'لم ترسل أي عروض بعد',
    SUBTITLE: 'تصفّح الطلبات المطابقة وقدّم عرضك لتظهر هنا',
}

/** Shown when the seller has no sent offers. */
export const MyOffersEmpty = () => {
    const theme = useAppTheme()

    return (
        <View style={styles.wrapper}>
            <View style={[styles.iconWrap, {backgroundColor: theme.colors.accentSoft}]}>
                <Icon source='tag-text-outline' size={44} color={theme.colors.tertiary} />
            </View>
            <Text style={[styles.title, {color: theme.colors.onSurface}]}>{T.TITLE}</Text>
            <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{T.SUBTITLE}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, gap: 10},
    iconWrap: {width: 92, height: 92, borderRadius: 46, justifyContent: 'center', alignItems: 'center', marginBottom: 4},
    title: {fontSize: 16.5, fontWeight: '800', textAlign: 'center', letterSpacing: -0.2},
    subtitle: {fontSize: 13, fontWeight: '500', textAlign: 'center', lineHeight: 19},
})
