import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text, TextInput} from 'react-native-paper'

import {SellerTypePicker, getSellerTypeFieldConfig} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {SellerType} from '@/global/types'

const ARABIC = {
    CREATE_PROFILE: 'إنشاء ملف تجاري',
    SELLER_PROFILE: 'الملف التجاري',
    CANCEL: 'إلغاء',
    SAVE: 'حفظ',
    SAVING: 'جاري الحفظ...',
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    DESCRIPTION: 'الوصف',
    WORKING_HOURS: 'ساعات العمل',
    SELECT_TYPE: 'اختر نوع البائع',
}

export interface FormState {
    sellerTypeId: number | null
    phone: string
    storeName: string
    city: string
    description: string
    workingHours: string
}

interface SellerProfileFormProps {
    creating: boolean
    saving: boolean
    form: FormState
    sellerTypes: SellerType[]
    error: string | null
    onFormChange: (updater: (prev: FormState) => FormState) => void
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

    const selectedSlug = sellerTypes.find(t => t.id === form.sellerTypeId)?.slug
    const fields = form.sellerTypeId ? getSellerTypeFieldConfig(selectedSlug) : null

    return (
        <View style={styles.section}>
            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                {creating ? ARABIC.CREATE_PROFILE : ARABIC.SELLER_PROFILE}
            </Text>

            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <SellerTypePicker
                    types={sellerTypes}
                    selectedId={form.sellerTypeId}
                    onSelect={id => onFormChange(f => ({...f, sellerTypeId: id}))}
                    label={ARABIC.SELECT_TYPE}
                />

                <TextInput label={ARABIC.PHONE} value={form.phone} onChangeText={phone => onFormChange(f => ({...f, phone}))} mode='outlined' keyboardType='phone-pad' textContentType='telephoneNumber' style={styles.input} left={<TextInput.Icon icon='phone-outline' />} />

                {fields?.showStoreName && (
                    <TextInput label={fields.storeNameLabel} value={form.storeName} onChangeText={storeName => onFormChange(f => ({...f, storeName}))} mode='outlined' style={styles.input} left={<TextInput.Icon icon='store-outline' />} />
                )}
                {fields?.showCity && (
                    <TextInput label={ARABIC.CITY} value={form.city} onChangeText={city => onFormChange(f => ({...f, city}))} mode='outlined' style={styles.input} left={<TextInput.Icon icon='map-marker-outline' />} />
                )}
                {fields?.showWorkingHours && (
                    <TextInput label={ARABIC.WORKING_HOURS} value={form.workingHours} onChangeText={workingHours => onFormChange(f => ({...f, workingHours}))} mode='outlined' style={styles.input} left={<TextInput.Icon icon='clock-outline' />} placeholder='مثال: 9 ص - 9 م' />
                )}
                {fields?.showDescription && (
                    <TextInput label={ARABIC.DESCRIPTION} value={form.description} onChangeText={description => onFormChange(f => ({...f, description}))} mode='outlined' multiline numberOfLines={3} style={styles.input} left={<TextInput.Icon icon='text-box-outline' />} />
                )}

                {error && (
                    <Text variant='bodySmall' style={[styles.errorText, {color: theme.colors.error}]}>
                        {error}
                    </Text>
                )}

                <View style={styles.formActions}>
                    <Button mode='outlined' onPress={onCancel} disabled={saving} style={styles.actionButton}>
                        {ARABIC.CANCEL}
                    </Button>
                    <Button mode='contained' onPress={onSave} loading={saving} disabled={saving || !form.sellerTypeId || !form.phone.trim()} style={styles.actionButton} icon='content-save-outline'>
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
    input: {marginBottom: 12, marginTop: 12},
    errorText: {marginBottom: 8, fontWeight: '500'},
    formActions: {flexDirection: 'row', gap: 12, marginTop: 8},
    actionButton: {flex: 1, borderRadius: 12},
})
