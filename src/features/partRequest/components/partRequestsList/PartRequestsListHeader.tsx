import {StyleSheet, View} from 'react-native'
import {Icon, Searchbar, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

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

export const PartRequestsListHeader = ({total, search, onSearchChange, onOpenMyRequests}: PartRequestsListHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <View style={[styles.hero, {backgroundColor: theme.colors.primary}]}>
                <View style={styles.heroTextBlock}>
                    <View style={styles.topRow}>
                        <View style={[styles.kicker, {backgroundColor: theme.colors.accentMuted}]}>
                            <Icon source='broadcast' size={11} color={themeColors.tertiary} />
                            <Text style={[styles.kickerText, {color: themeColors.tertiary}]}>{T.HERO_KICKER}</Text>
                        </View>
                        <View style={[styles.countPill, {backgroundColor: theme.colors.onDarkSurfaceLight}]}>
                            <View style={[styles.countDot, {backgroundColor: theme.colors.successBright}]} />
                            <Text style={[styles.countText, {color: theme.colors.onPrimary}]}>{T.COUNT(total)}</Text>
                        </View>
                    </View>
                    <Text style={[styles.heroTitle, {color: theme.colors.onPrimary}]}>{T.HERO_TITLE}</Text>
                    <Text style={[styles.heroSubtitle, {color: theme.colors.onDarkMedium}]} numberOfLines={1}>
                        {T.HERO_SUBTITLE}
                    </Text>
                </View>
                <View style={[styles.heroDecor, {backgroundColor: theme.colors.onDarkSurfaceLight}]} pointerEvents='none' />
            </View>

            <View style={styles.searchRow}>
                <Searchbar
                    value={search}
                    onChangeText={onSearchChange}
                    placeholder={T.SEARCH_PLACEHOLDER}
                    style={[styles.searchbar, {backgroundColor: theme.colors.surface}]}
                    inputStyle={styles.searchInput}
                    iconColor={theme.colors.onSurfaceVariant}
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    elevation={1}
                />
                <View style={[styles.myBtn, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='bookmark-multiple-outline' size={20} color={theme.colors.primary} />
                    <Text style={[styles.myBtnLabel, {color: theme.colors.primary}]} onPress={onOpenMyRequests}>
                        {T.MY_REQUESTS}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingHorizontal: 12, paddingTop: 6, paddingBottom: 4, gap: 8},
    hero: {borderRadius: 18, padding: 12, position: 'relative', overflow: 'hidden'},
    heroDecor: {position: 'absolute', width: 120, height: 120, borderRadius: 999, end: -45, top: -38, opacity: 0.5},
    heroTextBlock: {gap: 6},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8},
    kicker: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    kickerText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.4},
    heroTitle: {fontSize: 18, fontWeight: '800', letterSpacing: -0.4},
    heroSubtitle: {fontSize: 12, fontWeight: '500'},
    countPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },
    countDot: {width: 6, height: 6, borderRadius: 3},
    countText: {fontSize: 11, fontWeight: '700'},
    searchRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    searchbar: {flex: 1, borderRadius: 14, height: 46},
    searchInput: {fontSize: 13, minHeight: 0, paddingVertical: 0},
    myBtn: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: 46, borderRadius: 14},
    myBtnLabel: {fontSize: 12.5, fontWeight: '800'},
})
