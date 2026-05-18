import {Alert, Linking, StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequest} from '../../types'

const T = {
    HEADING: 'تواصل مع صاحب الطلب',
    SUBTITLE: 'هل لديك هذه القطعة؟ تواصل الآن لإغلاق الصفقة',
    WHATSAPP: 'محادثة واتساب',
    CALL: 'مكالمة هاتفية',
    OWNER_NOTICE: 'هذا طلبك. الأزرار أعلاه ستظهر للمشترين الآخرين.',
    FAILED: 'تعذّر فتح التطبيق',
}

const normalisePhone = (raw: string): string => raw.replace(/[^\d+]/g, '')

interface PartRequestDetailContactProps {
    request: PartRequest
    isOwner: boolean
}

export const PartRequestDetailContact = ({request, isOwner}: PartRequestDetailContactProps) => {
    const theme = useAppTheme()
    const phone = normalisePhone(request.contactPhone)

    const openLink = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                await Linking.openURL(url)
            } else {
                Alert.alert(T.FAILED)
            }
        } catch {
            Alert.alert(T.FAILED)
        }
    }

    const handleWhatsApp = () => openLink(`https://wa.me/${phone.replace(/^\+/, '')}`)
    const handleCall = () => openLink(`tel:${phone}`)

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

            {isOwner ? (
                <View style={[styles.ownerNotice, {backgroundColor: theme.colors.warningContainer}]}>
                    <Icon source='information-outline' size={14} color={theme.colors.warning} />
                    <Text style={[styles.ownerText, {color: theme.colors.onWarningContainer}]}>{T.OWNER_NOTICE}</Text>
                </View>
            ) : (
                <View style={styles.actions}>
                    <Button
                        mode='contained'
                        onPress={handleWhatsApp}
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
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.onPrimary}
                        icon='phone-outline'
                        style={styles.btn}
                        contentStyle={styles.btnContent}>
                        {T.CALL}
                    </Button>
                </View>
            )}
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
    ownerNotice: {flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 10},
    ownerText: {fontSize: 11.5, fontWeight: '600', flex: 1},
})
