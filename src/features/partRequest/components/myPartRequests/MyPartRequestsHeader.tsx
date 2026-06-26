import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {FadeSlideIn, PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

const T = {
    KICKER: 'متابعة الطلبات',
    TITLE: 'طلباتي',
    SUBTITLE: 'تابع حالة طلباتك وتواصل مع البائعين',
    BROWSE: 'تصفّح الكل',
}

interface MyPartRequestsHeaderProps {
    onBrowseAll: () => void
}

/** Identity band for the user's own requests; the stat bar below carries the data. */
export const MyPartRequestsHeader = ({onBrowseAll}: MyPartRequestsHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <FadeSlideIn>
                <View style={[styles.hero, {backgroundColor: theme.colors.primary}]}>
                    <View style={[styles.heroRing, {borderColor: theme.colors.onDarkBorder}]} pointerEvents='none' />
                    <View style={[styles.heroDisc, {backgroundColor: theme.colors.onDarkSurfaceLight}]} pointerEvents='none' />
                    <View style={styles.topRow}>
                        <View style={[styles.kicker, {backgroundColor: theme.colors.accentMuted}]}>
                            <Icon source='clipboard-list-outline' size={11} color={themeColors.tertiary} />
                            <Text style={[styles.kickerText, {color: themeColors.tertiary}]}>{T.KICKER}</Text>
                        </View>
                        <PressableScale
                            onPress={onBrowseAll}
                            withHaptic
                            style={[styles.browseBtn, {backgroundColor: theme.colors.onPrimary}]}
                            accessibilityRole='button'
                            accessibilityLabel={T.BROWSE}>
                            <Icon source='clipboard-search-outline' size={15} color={theme.colors.primary} />
                            <Text style={[styles.browseLabel, {color: theme.colors.primary}]}>{T.BROWSE}</Text>
                            <Icon source='chevron-left' size={16} color={theme.colors.primary} />
                        </PressableScale>
                    </View>
                    <Text style={[styles.heroTitle, {color: theme.colors.onPrimary}]}>{T.TITLE}</Text>
                    <Text style={[styles.heroSubtitle, {color: theme.colors.onDarkMedium}]} numberOfLines={1}>
                        {T.SUBTITLE}
                    </Text>
                </View>
            </FadeSlideIn>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingHorizontal: 12, paddingTop: 6},
    hero: {borderRadius: 20, padding: 16, paddingBottom: 18, position: 'relative', overflow: 'hidden'},
    heroRing: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 999,
        borderWidth: 1.5,
        end: -48,
        top: -58,
        opacity: 0.8,
    },
    heroDisc: {position: 'absolute', width: 130, height: 130, borderRadius: 999, start: -44, bottom: -62, opacity: 0.9},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10},
    kicker: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999},
    kickerText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.4},
    browseBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingStart: 12,
        paddingEnd: 8,
        paddingVertical: 8,
        borderRadius: 999,
        ...shadows.sm,
    },
    browseLabel: {fontSize: 12.5, fontWeight: '800'},
    heroTitle: {fontSize: 21, fontWeight: '800', letterSpacing: -0.4},
    heroSubtitle: {fontSize: 12, fontWeight: '500', marginTop: 2},
})
