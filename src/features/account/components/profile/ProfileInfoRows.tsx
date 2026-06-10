import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {ProfileFormState} from './ProfileEditFields'

const ARABIC = {
    NAME: 'الاسم',
    EMAIL: 'البريد الإلكتروني',
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    BIO: 'نبذة عني',
    EMPTY: '—',
}

const ROWS: {icon: string; label: string; key: keyof ProfileFormState}[] = [
    {icon: 'account-outline', label: ARABIC.NAME, key: 'name'},
    {icon: 'email-outline', label: ARABIC.EMAIL, key: 'email'},
    {icon: 'phone-outline', label: ARABIC.PHONE, key: 'phone'},
    {icon: 'map-marker-outline', label: ARABIC.CITY, key: 'city'},
    {icon: 'text-box-outline', label: ARABIC.BIO, key: 'bio'},
]

interface ProfileInfoRowsProps {
    form: ProfileFormState
}

/** Read-only rows of the personal-info card. */
export const ProfileInfoRows = ({form}: ProfileInfoRowsProps) => {
    const theme = useAppTheme()

    return (
        <>
            {ROWS.map(row => (
                <View key={row.key} style={styles.infoRow}>
                    <Icon source={row.icon} size={18} color={theme.colors.onSurfaceVariant} />
                    <View style={styles.infoContent}>
                        <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
                            {row.label}
                        </Text>
                        <Text variant='bodyMedium' style={{color: theme.colors.onSurface}}>
                            {form[row.key] || ARABIC.EMPTY}
                        </Text>
                    </View>
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    infoRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 8},
    infoContent: {flex: 1, gap: 2},
})
