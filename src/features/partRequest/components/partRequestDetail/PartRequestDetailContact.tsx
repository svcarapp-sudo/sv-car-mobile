import {Linking, StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import {haptics} from '@/global/utils'

import type {PartRequest} from '../../types'

const T = {
    HEADING: 'تواصل مع صاحب الطلب',
    SUBTITLE: 'هل لديك هذه القطعة؟ تواصل الآن لإغلاق الصفقة',
    WHATSAPP: 'محادثة واتساب',
    CALL: 'مكالمة هاتفية',
    CALL_A11Y: 'الاتصال بصاحب الطلب',
    FAILED: 'تعذّر فتح التطبيق',
}

const normalisePhone = (raw: string): string => raw.replace(/[^\d+]/g, '')

interface PartRequestDetailContactProps {
    request: PartRequest
}

export const PartRequestDetailContact = ({request}: PartRequestDetailContactProps) => {
    const theme = useAppTheme()
    const phone = normalisePhone(request.contactPhone)
    const hasPhone = phone.length > 0

    const openLink = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                await Linking.openURL(url)
            } else {
                showToast(T.FAILED, 'error')
            }
        } catch {
            showToast(T.FAILED, 'error')
        }
    }

    const handleWhatsApp = () => {
        if (!hasPhone) return
        haptics.light()
        void openLink(`https://wa.me/${phone.replace(/^\+/, '')}`)
    }

    const handleCall = () => {
        if (!hasPhone) return
        haptics.light()
        void openLink(`tel:${phone}`)
    }

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.headingRow}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='headset' size={18} color={theme.colors.primary} />
                </View>
                <View style={styles.headingText}>
                    <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
                    <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]} numberOfLines={2}>
                        {T.SUBTITLE}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Button
                    mode='contained'
                    onPress={handleWhatsApp}
                    disabled={!hasPhone}
                    buttonColor={theme.colors.success}
                    textColor={theme.colors.onPrimary}
                    icon='whatsapp'
                    style={styles.btn}
                    contentStyle={styles.btnContent}>
                    {T.WHATSAPP}
                </Button>
                <Button
                    mode='contained'
                    onPress={handleCall}
                    disabled={!hasPhone}
                    accessibilityLabel={T.CALL_A11Y}
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                    icon='phone-outline'
                    style={styles.btn}
                    contentStyle={styles.btnContent}>
                    {T.CALL}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {marginHorizontal: 16, marginTop: 14, borderRadius: 18, padding: 16, ...shadows.md, shadowColor: themeColors.shadow},
    headingRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12},
    iconWrap: {width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center'},
    headingText: {flex: 1, gap: 2},
    heading: {fontSize: 15, fontWeight: '800', letterSpacing: -0.2},
    subtitle: {fontSize: 11.5, fontWeight: '500', lineHeight: 16},
    actions: {gap: 8},
    btn: {borderRadius: 12},
    btnContent: {paddingVertical: 6},
})
