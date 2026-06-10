import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC = {
    TITLE: 'تعذّر تحميل البيانات',
    DESC: 'حدث خطأ أثناء جلب ملخص حسابك. تحقق من اتصالك وحاول مرة أخرى.',
    RETRY: 'إعادة المحاولة',
}

interface SellerAccountErrorProps {
    onRetry: () => void
}

export const SellerAccountError = ({onRetry}: SellerAccountErrorProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Icon source='cloud-off-outline' size={56} color={theme.colors.onSurfaceVariant} />
            <View style={styles.text}>
                <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                    {ARABIC.TITLE}
                </Text>
                <Text variant='bodySmall' style={[styles.desc, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC.DESC}
                </Text>
            </View>
            <Button mode='contained' icon='refresh' onPress={onRetry} style={styles.retry} contentStyle={styles.retryContent}>
                {ARABIC.RETRY}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28},
    text: {alignItems: 'center', gap: 6, marginTop: 16, marginBottom: 24},
    title: {fontWeight: '700'},
    desc: {textAlign: 'center', lineHeight: 20},
    retry: {borderRadius: 14},
    retryContent: {paddingVertical: 4, paddingHorizontal: 8},
})
