import {StyleSheet, View} from 'react-native'
import {Icon, Searchbar, Text} from 'react-native-paper'

import {FadeSlideIn, PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

interface PartRequestsListHeaderProps {
    total: number
    search: string
    onSearchChange: (text: string) => void
    onOpenMyRequests: () => void
}

const T = {
    HERO_KICKER: 'سوق الطلبات',
    HERO_TITLE: 'القطع المطلوبة',
    HERO_SUBTITLE: 'تصفّح الطلبات وتواصل مع أصحابها',
    SEARCH_PLACEHOLDER: 'ابحث في الطلبات المتاحة...',
    COUNT: (n: number) => `${n} طلب نشط`,
    MY_REQUESTS: 'طلباتي',
}

/**
 * Command-deck hero: navy panel with kicker + live count, and a floating
 * search console that bridges the hero into the list content.
 */
export const PartRequestsListHeader = ({total, search, onSearchChange, onOpenMyRequests}: PartRequestsListHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <FadeSlideIn>
                <View style={[styles.hero, {backgroundColor: theme.colors.primary}]}>
                    <View style={[styles.heroRing, {borderColor: theme.colors.onDarkBorder}]} pointerEvents='none' />
                    <View style={[styles.heroDisc, {backgroundColor: theme.colors.onDarkSurfaceLight}]} pointerEvents='none' />
                    <View style={styles.topRow}>
                        <View style={[styles.kicker, {backgroundColor: theme.colors.accentMuted}]}>
                            <Icon source='broadcast' size={11} color={themeColors.tertiary} />
                            <Text style={[styles.kickerText, {color: themeColors.tertiary}]}>{T.HERO_KICKER}</Text>
                        </View>
                        {total > 0 ? (
                            <View style={[styles.countPill, {backgroundColor: theme.colors.onDarkSurfaceLight}]}>
                                <View style={[styles.countDot, {backgroundColor: theme.colors.successBright}]} />
                                <Text style={[styles.countText, {color: theme.colors.onPrimary}]}>{T.COUNT(total)}</Text>
                            </View>
                        ) : null}
                    </View>
                    <Text style={[styles.heroTitle, {color: theme.colors.onPrimary}]}>{T.HERO_TITLE}</Text>
                    <Text style={[styles.heroSubtitle, {color: theme.colors.onDarkMedium}]} numberOfLines={1}>
                        {T.HERO_SUBTITLE}
                    </Text>
                </View>
            </FadeSlideIn>

            <FadeSlideIn delay={70}>
                <View style={[styles.console, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
                    <Searchbar
                        value={search}
                        onChangeText={onSearchChange}
                        placeholder={T.SEARCH_PLACEHOLDER}
                        style={[styles.searchbar, {backgroundColor: theme.colors.surface}]}
                        inputStyle={styles.searchInput}
                        iconColor={theme.colors.onSurfaceVariant}
                        placeholderTextColor={theme.colors.onSurfaceVariant}
                        elevation={0}
                    />
                    <View style={[styles.consoleDivider, {backgroundColor: theme.colors.outlineVariant}]} />
                    <PressableScale
                        onPress={onOpenMyRequests}
                        withHaptic
                        style={[styles.myBtn, {backgroundColor: theme.colors.primaryContainer}]}
                        accessibilityRole='button'
                        accessibilityLabel={T.MY_REQUESTS}>
                        <Icon source='bookmark-multiple-outline' size={18} color={theme.colors.primary} />
                        <Text style={[styles.myBtnLabel, {color: theme.colors.primary}]}>{T.MY_REQUESTS}</Text>
                    </PressableScale>
                </View>
            </FadeSlideIn>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingHorizontal: 12, paddingTop: 6},
    hero: {borderRadius: 20, padding: 14, position: 'relative', overflow: 'hidden'},
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
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8},
    kicker: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999},
    kickerText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.4},
    countPill: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999},
    countDot: {width: 6, height: 6, borderRadius: 3},
    countText: {fontSize: 11, fontWeight: '700'},
    heroTitle: {fontSize: 20, fontWeight: '800', letterSpacing: -0.4},
    heroSubtitle: {fontSize: 12, fontWeight: '500', marginTop: 2},
    console: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
        padding: 5,
        borderRadius: 16,
        borderWidth: 1,
        ...shadows.md,
    },
    consoleDivider: {width: 1, height: 26, borderRadius: 1},
    searchbar: {flex: 1, borderRadius: 12, height: 44},
    searchInput: {fontSize: 13.5, minHeight: 0, paddingVertical: 0},
    myBtn: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 13, height: 40, borderRadius: 12},
    myBtnLabel: {fontSize: 12.5, fontWeight: '800'},
})
