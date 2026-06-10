import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const T = {
    TITLE: 'انشر طلب قطعة',
    SUBTITLE: 'صف القطعة وسيتواصل معك البائعون مباشرة',
}

export const AddPartRequestHero = () => {
    const theme = useAppTheme()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.primary}]}>
            <View style={[styles.iconBubble, {backgroundColor: theme.colors.accentMuted}]}>
                <Icon source='bullhorn-outline' size={20} color={themeColors.tertiary} />
            </View>
            <View style={styles.text}>
                <Text style={[styles.title, {color: theme.colors.onPrimary}]} numberOfLines={1}>
                    {T.TITLE}
                </Text>
                <Text style={[styles.subtitle, {color: theme.colors.onDarkMedium}]} numberOfLines={1}>
                    {T.SUBTITLE}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {flexDirection: 'row', gap: 12, padding: 12, borderRadius: 16, alignItems: 'center'},
    iconBubble: {width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'},
    text: {flex: 1, gap: 2},
    title: {fontSize: 15, fontWeight: '800', letterSpacing: -0.2},
    subtitle: {fontSize: 11.5, fontWeight: '500'},
})
