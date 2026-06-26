import {useEffect, useRef} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Icon, Text, TouchableRipple} from 'react-native-paper'

import {IllustrationEmptyParts} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    LOADING: 'جاري تحميل قطعك...',
    TITLE: 'ابدأ ببيع قطعتك الأولى',
    SUBTITLE: 'أضف قطعة غيار من سيارتك واعرضها على آلاف المشترين في منطقتك خلال دقائق.',
    CTA: 'أضف قطعتك الأولى',
    SECONDARY: 'كيف يعمل البيع؟',
    BENEFIT_1: 'وصول لمشترين موثوقين',
    BENEFIT_2: 'بدون رسوم خفية',
    BENEFIT_3: 'تواصل مباشر',
}

interface MyPartsListEmptyProps {
    loading: boolean
    isFiltered?: boolean
    onResetFilters?: () => void
    navigation?: NavigationProp<RootStackParamList>
}

export const MyPartsListEmpty = ({loading, isFiltered, onResetFilters, navigation}: MyPartsListEmptyProps) => {
    const theme = useAppTheme()
    const fade = useRef(new Animated.Value(0)).current
    const lift = useRef(new Animated.Value(12)).current

    useEffect(() => {
        if (!loading) {
            Animated.parallel([
                Animated.timing(fade, {toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true}),
                Animated.timing(lift, {toValue: 0, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true}),
            ]).start()
        }
    }, [loading, fade, lift])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
                <Text style={[styles.loading, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.LOADING}</Text>
            </View>
        )
    }

    if (isFiltered) {
        return (
            <View style={styles.container}>
                <View style={[styles.softCircle, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                    <Icon source='filter-off-outline' size={40} color={theme.colors.onSurfaceVariant} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>لا نتائج مطابقة</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>جرّب تعديل البحث أو الفئة المختارة.</Text>
                <Button mode='outlined' icon='refresh' onPress={onResetFilters} style={styles.resetBtn}>
                    إعادة ضبط المرشحات
                </Button>
            </View>
        )
    }

    return (
        <Animated.View style={[styles.container, {opacity: fade, transform: [{translateY: lift}]}]}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <IllustrationEmptyParts size={180} />
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SUBTITLE}</Text>

                <View style={styles.benefits}>
                    {[
                        {icon: 'shield-check-outline', label: ARABIC_TEXT.BENEFIT_1},
                        {icon: 'percent-outline', label: ARABIC_TEXT.BENEFIT_2},
                        {icon: 'chat-outline', label: ARABIC_TEXT.BENEFIT_3},
                    ].map(b => (
                        <View key={b.label} style={styles.benefitRow}>
                            <Icon source={b.icon} size={16} color={theme.colors.tertiary} />
                            <Text style={[styles.benefitText, {color: theme.colors.onSurfaceVariant}]}>{b.label}</Text>
                        </View>
                    ))}
                </View>

                <Button
                    mode='contained'
                    icon='plus'
                    onPress={() => navigation?.navigate('AddPart')}
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                    style={styles.cta}
                    contentStyle={styles.ctaContent}
                    labelStyle={styles.ctaLabel}>
                    {ARABIC_TEXT.CTA}
                </Button>

                <TouchableRipple onPress={() => navigation?.navigate('AddPart')} borderless style={styles.secondary}>
                    <Text style={[styles.secondaryText, {color: theme.colors.tertiary}]}>{ARABIC_TEXT.SECONDARY}</Text>
                </TouchableRipple>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 32,
        minHeight: 480,
    },
    loading: {marginTop: 16, fontSize: 14},
    softCircle: {width: 92, height: 92, borderRadius: 46, justifyContent: 'center', alignItems: 'center', marginBottom: 16},
    card: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 22,
        alignItems: 'center',
        ...shadows.md,
        shadowColor: themeColors.shadow,
    },
    title: {fontSize: 19, fontWeight: '800', letterSpacing: -0.2, textAlign: 'center', marginTop: 8, marginBottom: 6},
    subtitle: {fontSize: 13, lineHeight: 21, textAlign: 'center', opacity: 0.85, marginBottom: 18, paddingHorizontal: 4},
    benefits: {alignSelf: 'stretch', gap: 8, marginBottom: 22, paddingHorizontal: 4},
    benefitRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    benefitText: {fontSize: 12.5, fontWeight: '600'},
    cta: {borderRadius: 14, alignSelf: 'stretch'},
    ctaContent: {paddingVertical: 8, flexDirection: 'row-reverse'},
    ctaLabel: {fontSize: 14, fontWeight: '700'},
    secondary: {marginTop: 12, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8},
    secondaryText: {fontSize: 13, fontWeight: '700'},
    resetBtn: {marginTop: 8, borderRadius: 12},
})
