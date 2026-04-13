import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {IllustrationSellerProfile} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC = {
    SELLER_PROFILE: 'الملف التجاري',
    CREATE_PROFILE: 'إنشاء ملف تجاري',
    NO_PROFILE: 'لا يوجد ملف تجاري',
    NO_PROFILE_DESC: 'أنشئ ملفك التجاري للبدء في بيع قطع الغيار',
}

interface SellerProfileEmptyProps {
    onCreatePress: () => void
}

export const SellerProfileEmpty = ({onCreatePress}: SellerProfileEmptyProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                {ARABIC.SELLER_PROFILE}
            </Text>
            <View style={[styles.emptyCard, {backgroundColor: theme.colors.surface}]}>
                <IllustrationSellerProfile size={170} />
                <View style={styles.emptyContent}>
                    <Text variant='titleMedium' style={[styles.emptyTitle, {color: theme.colors.onSurface}]}>
                        {ARABIC.NO_PROFILE}
                    </Text>
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant, textAlign: 'center'}}>
                        {ARABIC.NO_PROFILE_DESC}
                    </Text>
                </View>
                <Button
                    mode='contained'
                    onPress={onCreatePress}
                    icon='plus'
                    style={styles.createButton}
                    contentStyle={styles.createButtonContent}>
                    {ARABIC.CREATE_PROFILE}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    emptyCard: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
    },
    emptyContent: {alignItems: 'center', gap: 6, marginTop: 12, marginBottom: 20},
    emptyTitle: {fontWeight: '700'},
    createButton: {borderRadius: 12, alignSelf: 'stretch'},
    createButtonContent: {paddingVertical: 4},
})
