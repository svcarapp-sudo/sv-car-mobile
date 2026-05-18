import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const T = {
    KICKER: 'انشر طلب قطعة',
    TITLE: 'دع البائعين يأتون إليك',
    SUBTITLE: 'صف القطعة التي تبحث عنها، وسيتواصل معك البائعون الذين يملكونها مباشرة',
}

export const AddPartRequestHero = () => {
    const theme = useAppTheme()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.primary}]}>
            <View style={[styles.decor, {backgroundColor: theme.colors.onDarkSurfaceLight}]} pointerEvents='none' />
            <View style={[styles.iconBubble, {backgroundColor: theme.colors.accentMuted}]}>
                <Icon source='bullhorn-outline' size={26} color={themeColors.tertiary} />
            </View>
            <View style={styles.text}>
                <View style={[styles.kicker, {backgroundColor: theme.colors.onDarkSurfaceLight}]}>
                    <Text style={[styles.kickerText, {color: theme.colors.onPrimary}]}>{T.KICKER}</Text>
                </View>
                <Text style={[styles.title, {color: theme.colors.onPrimary}]}>{T.TITLE}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onDarkMedium}]}>{T.SUBTITLE}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 12,
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    decor: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        end: -30,
        top: -30,
        opacity: 0.5,
    },
    iconBubble: {width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center'},
    text: {flex: 1, gap: 6},
    kicker: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, alignSelf: 'flex-start'},
    kickerText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.4},
    title: {fontSize: 17, fontWeight: '800', letterSpacing: -0.3, lineHeight: 22},
    subtitle: {fontSize: 11.5, fontWeight: '500', lineHeight: 17},
})
