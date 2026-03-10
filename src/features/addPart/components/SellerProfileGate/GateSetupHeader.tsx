import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC = {
    TITLE: 'أنشئ ملفك التجاري',
    SUBTITLE: 'يجب إنشاء ملف تجاري قبل إضافة قطع غيار للبيع',
}

export const GateSetupHeader = () => {
    const theme = useAppTheme()

    return (
        <View style={styles.headerSection}>
            <View style={[styles.iconCircle, {backgroundColor: theme.colors.primaryContainer}]}>
                <Icon source='store-plus-outline' size={40} color={theme.colors.primary} />
            </View>
            <Text variant='headlineSmall' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC.TITLE}
            </Text>
            <Text variant='bodyMedium' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC.SUBTITLE}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerSection: {alignItems: 'center', paddingTop: 32, paddingHorizontal: 24, paddingBottom: 24},
    iconCircle: {width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16},
    title: {fontWeight: '700', textAlign: 'center', marginBottom: 8},
    subtitle: {textAlign: 'center', lineHeight: 22},
})
