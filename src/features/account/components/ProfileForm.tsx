import React, {useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text, TextInput} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {PhoneInput} from '@/global/components'
import type {PhoneInputValue} from '@/global/components'

const ARABIC = {
    PERSONAL_INFO: 'المعلومات الشخصية',
    NAME: 'الاسم',
    EMAIL: 'البريد الإلكتروني',
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    BIO: 'نبذة عني',
    SAVE: 'حفظ التعديلات',
    SAVING: 'جاري الحفظ...',
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
    onSave: () => void
    saving: boolean
    hasChanges: boolean
}

export const ProfileForm = ({form, onFormChange, onSave, saving, hasChanges}: ProfileFormProps) => {
    const theme = useAppTheme()

    const handlePhoneChange = useCallback(
        (phoneValue: PhoneInputValue) => {
            onFormChange({phone: phoneValue.fullNumber})
        },
        [onFormChange],
    )

    return (
        <>
            <View style={styles.section}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.PERSONAL_INFO}
                </Text>

                <TextInput
                    label={ARABIC.NAME}
                    value={form.name}
                    onChangeText={name => onFormChange({name})}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='account-outline' />}
                />
                <TextInput
                    label={ARABIC.EMAIL}
                    value={form.email}
                    onChangeText={email => onFormChange({email})}
                    mode='outlined'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    style={styles.input}
                    left={<TextInput.Icon icon='email-outline' />}
                />
                <View style={styles.phoneContainer}>
                    <PhoneInput
                        initialValue={form.phone.replace(/[^\d]/g, '')}
                        onChange={handlePhoneChange}
                    />
                </View>
                <TextInput
                    label={ARABIC.CITY}
                    value={form.city}
                    onChangeText={city => onFormChange({city})}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='map-marker-outline' />}
                />
                <TextInput
                    label={ARABIC.BIO}
                    value={form.bio}
                    onChangeText={bio => onFormChange({bio})}
                    mode='outlined'
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    left={<TextInput.Icon icon='text-box-outline' />}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode='contained'
                    onPress={onSave}
                    loading={saving}
                    disabled={saving || !hasChanges || !form.name.trim()}
                    style={styles.saveButton}
                    contentStyle={styles.saveButtonContent}
                    icon='content-save-outline'>
                    {saving ? ARABIC.SAVING : ARABIC.SAVE}
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    input: {marginBottom: 12},
    phoneContainer: {marginBottom: 12},
    buttonContainer: {paddingHorizontal: 20, paddingTop: 8},
    saveButton: {borderRadius: 12},
    saveButtonContent: {paddingVertical: 6},
})
