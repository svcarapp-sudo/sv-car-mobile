import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {shadows} from '@/global/theme'
import type {SellerSpecialization} from '@/global/types'

const ARABIC = {
    TITLE: 'طلبات تطابق تخصصك',
    SETUP_TITLE: 'فعّل مطابقة الطلبات',
    WITH_COUNT: (n: number) => `${n} طلب عميل مفتوح على ماركاتك`,
    NONE: 'لا توجد طلبات مطابقة الآن',
    SETUP: 'حدد ماركات تخصصك لتصلك الطلبات المطابقة',
    CTA: 'عرض الطلبات',
    SETUP_CTA: 'ابدأ الآن',
}

interface MatchedRequestsCardProps {
    count: number
    specializations: SellerSpecialization[]
}

/** Seller-hub entry to the matched requests feed; shows an amber demand badge. */
export const MatchedRequestsCard = ({count, specializations}: MatchedRequestsCardProps) => {
    const theme = useAppTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const isSetup = specializations.length === 0

    const getSubtitle = () => {
        if (isSetup) return ARABIC.SETUP
        return count > 0 ? ARABIC.WITH_COUNT(count) : ARABIC.NONE
    }
    const subtitle = getSubtitle()

    return (
        <PressableScale
            withHaptic
            onPress={() => navigation.navigate('MatchedPartRequests')}
            style={[styles.card, {backgroundColor: theme.colors.primary}]}
            accessibilityRole='button'
            accessibilityLabel={isSetup ? ARABIC.SETUP_TITLE : ARABIC.TITLE}>
            <View style={[styles.ring, {borderColor: theme.colors.onDarkBorder}]} pointerEvents='none' />
            <View style={[styles.iconWrap, {backgroundColor: theme.colors.onDarkSurfaceLight}]}>
                <Icon source={isSetup ? 'car-multiple' : 'target'} size={24} color={theme.colors.tertiary} />
                {!isSetup && count > 0 ? (
                    <View style={[styles.badge, {backgroundColor: theme.colors.tertiary}]}>
                        <Text style={[styles.badgeText, {color: theme.colors.onTertiary}]}>{count > 99 ? '99+' : count}</Text>
                    </View>
                ) : null}
            </View>
            <View style={styles.body}>
                <Text style={[styles.title, {color: theme.colors.onPrimary}]} numberOfLines={1}>
                    {isSetup ? ARABIC.SETUP_TITLE : ARABIC.TITLE}
                </Text>
                <Text style={[styles.subtitle, {color: theme.colors.onDarkMedium}]} numberOfLines={2}>
                    {subtitle}
                </Text>
                <View style={styles.ctaRow}>
                    <Text style={[styles.cta, {color: theme.colors.tertiary}]}>{isSetup ? ARABIC.SETUP_CTA : ARABIC.CTA}</Text>
                    <Icon source='chevron-back' size={16} color={theme.colors.tertiary} />
                </View>
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    card: {flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 18, overflow: 'hidden', ...shadows.md},
    ring: {position: 'absolute', width: 120, height: 120, borderRadius: 999, borderWidth: 1.5, end: -40, top: -50, opacity: 0.6},
    iconWrap: {width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', position: 'relative'},
    badge: {
        position: 'absolute',
        top: -5,
        end: -5,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {fontSize: 10.5, fontWeight: '800'},
    body: {flex: 1, gap: 2},
    title: {fontSize: 15, fontWeight: '800', letterSpacing: -0.2},
    subtitle: {fontSize: 12, fontWeight: '500', lineHeight: 17},
    ctaRow: {flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 4},
    cta: {fontSize: 12.5, fontWeight: '800'},
})
