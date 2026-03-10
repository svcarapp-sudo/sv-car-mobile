import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC = {
    WHY_TITLE: 'لماذا الملف التجاري؟',
    WHY_1: 'يساعد المشترين في معرفة هوية البائع',
    WHY_2: 'يزيد ثقة المشترين بقطع الغيار المعروضة',
    WHY_3: 'يسهّل التواصل معك',
}

const WhyRow = ({icon, text, color}: {icon: string; text: string; color: string}) => {
    const theme = useAppTheme()

    return (
        <View style={styles.whyRow}>
            <Icon source={icon} size={20} color={color} />
            <Text variant='bodyMedium' style={{color: theme.colors.onSurface, flex: 1}}>
                {text}
            </Text>
        </View>
    )
}

export const GateWhyCard = () => {
    const theme = useAppTheme()

    return (
        <View style={[styles.whyCard, {backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.outlineVariant}]}>
            <Text variant='labelLarge' style={[styles.whyTitle, {color: theme.colors.onSurface}]}>
                {ARABIC.WHY_TITLE}
            </Text>
            <WhyRow icon='shield-check-outline' text={ARABIC.WHY_1} color={theme.colors.primary} />
            <WhyRow icon='trending-up' text={ARABIC.WHY_2} color={theme.colors.primary} />
            <WhyRow icon='message-text-outline' text={ARABIC.WHY_3} color={theme.colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    whyCard: {marginHorizontal: 20, borderRadius: 14, borderWidth: 1, padding: 16, gap: 10},
    whyTitle: {fontWeight: '600', marginBottom: 4},
    whyRow: {flexDirection: 'row', alignItems: 'center', gap: 12},
})
