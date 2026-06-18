import {StyleSheet, View} from 'react-native'
import {Icon, Searchbar, Text} from 'react-native-paper'

import {FadeSlideIn} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import type {SellerSpecialization} from '@/global/types'

const T = {
    KICKER: 'مطابقة لك',
    TITLE: 'طلبات تطابق تخصصك',
    SUBTITLE: 'طلبات عملاء على الماركات التي توفّر قطعها',
    COUNT: (n: number) => `${n} طلب مطابق`,
    SEARCH: 'ابحث في الطلبات المطابقة...',
}

interface MatchedRequestsHeaderProps {
    total: number
    specializations: SellerSpecialization[]
    search: string
    onSearchChange: (text: string) => void
}

/** Matched-feed hero: states the match basis and lists the seller's specialization makes as chips. */
export const MatchedRequestsHeader = ({total, specializations, search, onSearchChange}: MatchedRequestsHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <FadeSlideIn>
                <View style={[styles.hero, {backgroundColor: theme.colors.primary}]}>
                    <View style={[styles.ring, {borderColor: theme.colors.onDarkBorder}]} pointerEvents='none' />
                    <View style={styles.topRow}>
                        <View style={[styles.kicker, {backgroundColor: theme.colors.accentMuted}]}>
                            <Icon source='target' size={11} color={themeColors.tertiary} />
                            <Text style={[styles.kickerText, {color: themeColors.tertiary}]}>{T.KICKER}</Text>
                        </View>
                        {total > 0 ? (
                            <View style={[styles.countPill, {backgroundColor: theme.colors.onDarkSurfaceLight}]}>
                                <Text style={[styles.countText, {color: theme.colors.onPrimary}]}>{T.COUNT(total)}</Text>
                            </View>
                        ) : null}
                    </View>
                    <Text style={[styles.title, {color: theme.colors.onPrimary}]}>{T.TITLE}</Text>
                    <Text style={[styles.subtitle, {color: theme.colors.onDarkMedium}]} numberOfLines={2}>
                        {T.SUBTITLE}
                    </Text>
                    {specializations.length > 0 ? (
                        <View style={styles.specChips}>
                            {specializations.map(s => (
                                <View key={s.id} style={[styles.specChip, {backgroundColor: theme.colors.onDarkSurfaceLight}]}>
                                    <Icon source='check-circle' size={11} color={theme.colors.successBright} />
                                    <Text style={[styles.specText, {color: theme.colors.onPrimary}]}>{s.name}</Text>
                                </View>
                            ))}
                        </View>
                    ) : null}
                </View>
            </FadeSlideIn>

            <FadeSlideIn delay={70}>
                <Searchbar
                    value={search}
                    onChangeText={onSearchChange}
                    placeholder={T.SEARCH}
                    style={[styles.searchbar, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}
                    inputStyle={styles.searchInput}
                    iconColor={theme.colors.onSurfaceVariant}
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    elevation={0}
                />
            </FadeSlideIn>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingHorizontal: 12, paddingTop: 6, gap: 10},
    hero: {borderRadius: 20, padding: 14, position: 'relative', overflow: 'hidden'},
    ring: {position: 'absolute', width: 150, height: 150, borderRadius: 999, borderWidth: 1.5, end: -48, top: -58, opacity: 0.8},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8},
    kicker: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999},
    kickerText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.4},
    countPill: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999},
    countText: {fontSize: 11, fontWeight: '700'},
    title: {fontSize: 20, fontWeight: '800', letterSpacing: -0.4},
    subtitle: {fontSize: 12, fontWeight: '500', marginTop: 2},
    specChips: {flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12},
    specChip: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999},
    specText: {fontSize: 11, fontWeight: '700'},
    searchbar: {borderRadius: 14, height: 46, borderWidth: 1, ...shadows.sm},
    searchInput: {fontSize: 13.5, minHeight: 0, paddingVertical: 0},
})
