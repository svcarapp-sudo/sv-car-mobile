import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {SellerType} from '@/global/types'
import type {SellerProfileFormState} from '../../hooks'
import {SellerProfileFormFields} from './SellerProfileFormFields'

const ARABIC = {
    CREATE_PROFILE: 'إنشاء ملف تجاري',
    SELLER_PROFILE: 'الملف التجاري',
    CANCEL: 'إلغاء',
    SAVE: 'حفظ',
    SAVING: 'جاري الحفظ...',
}

interface SellerProfileFormProps {
    creating: boolean
    saving: boolean
    form: SellerProfileFormState
    sellerTypes: SellerType[]
    error: string | null
    onFormChange: (updater: (prev: SellerProfileFormState) => SellerProfileFormState) => void
    onCancel: () => void
    onSave: () => void
}

export const SellerProfileForm = ({
    creating,
    saving,
    form,
    sellerTypes,
    error,
    onFormChange,
    onCancel,
    onSave,
}: SellerProfileFormProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                {creating ? ARABIC.CREATE_PROFILE : ARABIC.SELLER_PROFILE}
            </Text>

            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <SellerProfileFormFields form={form} sellerTypes={sellerTypes} onFormChange={onFormChange} />

                {error && (
                    <Text variant='bodySmall' style={[styles.errorText, {color: theme.colors.error}]}>
                        {error}
                    </Text>
                )}

                <View style={styles.formActions}>
                    <Button mode='outlined' onPress={onCancel} disabled={saving} style={styles.actionButton}>
                        {ARABIC.CANCEL}
                    </Button>
                    <Button
                        mode='contained'
                        onPress={onSave}
                        loading={saving}
                        disabled={saving || !form.sellerTypeId || !form.phone.trim()}
                        style={styles.actionButton}
                        icon='content-save-outline'>
                        {saving ? ARABIC.SAVING : ARABIC.SAVE}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    card: {
        borderRadius: 16,
        padding: 16,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
    },
    errorText: {marginBottom: 8, fontWeight: '500'},
    formActions: {flexDirection: 'row', gap: 12, marginTop: 8},
    actionButton: {flex: 1, borderRadius: 12},
})
