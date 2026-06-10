import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {IllustrationSellerProfile} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {navigationRef} from '@/global/navigation/navigationRef'

const ARABIC = {
    TITLE: 'لم تبدأ البيع بعد',
    DESC: 'أنشئ ملفك التجاري لعرض ملخص نشاطك ومتابعة أداء قطعك كبائع.',
    CTA: 'إنشاء ملف تجاري',
}

const goToAccount = () => {
    if (navigationRef.isReady()) navigationRef.navigate('Main', {screen: 'MyAccount'})
}

/** Shown when the authenticated user has no seller profile yet. */
export const SellerAccountEmpty = () => {
    const theme = useAppTheme()

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <IllustrationSellerProfile size={170} />
                <View style={styles.text}>
                    <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                        {ARABIC.TITLE}
                    </Text>
                    <Text variant='bodySmall' style={[styles.desc, {color: theme.colors.onSurfaceVariant}]}>
                        {ARABIC.DESC}
                    </Text>
                </View>
                <Button mode='contained' icon='plus' onPress={goToAccount} style={styles.cta} contentStyle={styles.ctaContent}>
                    {ARABIC.CTA}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    card: {
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.1,
        shadowRadius: 22,
        elevation: 6,
    },
    text: {alignItems: 'center', gap: 6, marginTop: 16, marginBottom: 22},
    title: {fontWeight: '700'},
    desc: {textAlign: 'center', lineHeight: 20},
    cta: {borderRadius: 14, alignSelf: 'stretch'},
    ctaContent: {paddingVertical: 6},
})
