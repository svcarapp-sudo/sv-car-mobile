import React, {useCallback, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text, TextInput} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {PhoneInput} from '@/global/components'
import type {PhoneInputValue} from '@/global/components'

const ARABIC = {
    PERSONAL_INFO: 'المعلومات الشخصية',
    EDIT: 'تعديل',
    CANCEL: 'إلغاء',
    SAVE: 'حفظ',
    SAVING: 'جاري الحفظ...',
    NAME: 'الاسم',
    EMAIL: 'البريد الإلكتروني',
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    BIO: 'نبذة عني',
    EMPTY: '—',
}

export interface ProfileFormState {
    name: string
    email: string
    phone: string
    city: string
    bio: string
}

interface ProfileFormProps {
    form: ProfileFormState
    onFormChange: (patch: Partial<ProfileFormState>) => void
    onSave: () => Promise<boolean>
    onCancel: () => void
    saving: boolean
    hasChanges: boolean
}

export const ProfileForm = ({form, onFormChange, onSave, onCancel, saving, hasChanges}: ProfileFormProps) => {
    const theme = useAppTheme()
    const [editing, setEditing] = useState(false)

    const handlePhoneChange = useCallback(
        (v: PhoneInputValue) => onFormChange({phone: v.fullNumber}),
        [onFormChange],
    )
    const handleCancel = useCallback(() => { onCancel(); setEditing(false) }, [onCancel])
    const handleSave = useCallback(async () => { if (await onSave()) setEditing(false) }, [onSave])

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.PERSONAL_INFO}
                </Text>
                {!editing && (
                    <Button mode='text' onPress={() => setEditing(true)} compact icon='pencil-outline'>
                        {ARABIC.EDIT}
                    </Button>
                )}
            </View>

            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                {editing ? (
                    <>
                        <TextInput label={ARABIC.NAME} value={form.name} onChangeText={name => onFormChange({name})} mode='outlined' style={styles.input} left={<TextInput.Icon icon='account-outline' />} />
                        <TextInput label={ARABIC.EMAIL} value={form.email} onChangeText={email => onFormChange({email})} mode='outlined' keyboardType='email-address' autoCapitalize='none' style={styles.input} left={<TextInput.Icon icon='email-outline' />} />
                        <View style={styles.phoneContainer}>
                            <PhoneInput initialValue={form.phone.replace(/[^\d]/g, '')} onChange={handlePhoneChange} />
                        </View>
                        <TextInput label={ARABIC.CITY} value={form.city} onChangeText={city => onFormChange({city})} mode='outlined' style={styles.input} left={<TextInput.Icon icon='map-marker-outline' />} />
                        <TextInput label={ARABIC.BIO} value={form.bio} onChangeText={bio => onFormChange({bio})} mode='outlined' multiline numberOfLines={3} style={styles.input} left={<TextInput.Icon icon='text-box-outline' />} />
                        <View style={styles.actions}>
                            <Button mode='outlined' onPress={handleCancel} disabled={saving} style={styles.actionButton}>{ARABIC.CANCEL}</Button>
                            <Button mode='contained' onPress={handleSave} loading={saving} disabled={saving || !hasChanges || !form.name.trim()} style={styles.actionButton} icon='content-save-outline'>{saving ? ARABIC.SAVING : ARABIC.SAVE}</Button>
                        </View>
                    </>
                ) : (
                    <>
                        <InfoRow icon='account-outline' label={ARABIC.NAME} value={form.name} theme={theme} />
                        <InfoRow icon='email-outline' label={ARABIC.EMAIL} value={form.email} theme={theme} />
                        <InfoRow icon='phone-outline' label={ARABIC.PHONE} value={form.phone} theme={theme} />
                        <InfoRow icon='map-marker-outline' label={ARABIC.CITY} value={form.city} theme={theme} />
                        <InfoRow icon='text-box-outline' label={ARABIC.BIO} value={form.bio} theme={theme} />
                    </>
                )}
            </View>
        </View>
    )
}

type InfoRowProps = {icon: string; label: string; value: string; theme: ReturnType<typeof useAppTheme>}

const InfoRow = ({icon, label, value, theme}: InfoRowProps) => (
    <View style={styles.infoRow}>
        <Icon source={icon} size={18} color={theme.colors.onSurfaceVariant} />
        <View style={styles.infoContent}>
            <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>{label}</Text>
            <Text variant='bodyMedium' style={{color: theme.colors.onSurface}}>{value || ARABIC.EMPTY}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600'},
    sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
    card: {borderRadius: 16, padding: 16, shadowColor: themeColors.shadow, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.12, shadowRadius: 16, elevation: 6},
    input: {marginBottom: 12},
    phoneContainer: {marginBottom: 12},
    actions: {flexDirection: 'row', gap: 12, marginTop: 8},
    actionButton: {flex: 1, borderRadius: 12},
    infoRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 8},
    infoContent: {flex: 1, gap: 2},
})
