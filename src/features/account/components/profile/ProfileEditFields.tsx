import React, {useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {TextInput} from 'react-native-paper'

import {PhoneInput} from '@/global/components'
import type {PhoneInputValue} from '@/global/components'

const ARABIC = {
    NAME: 'الاسم',
    EMAIL: 'البريد الإلكتروني',
    CITY: 'المدينة',
    BIO: 'نبذة عني',
}

export interface ProfileFormState {
    name: string
    email: string
    phone: string
    city: string
    bio: string
}

interface ProfileEditFieldsProps {
    form: ProfileFormState
    onFormChange: (patch: Partial<ProfileFormState>) => void
}

/** Editable inputs of the personal-info card (name, email, phone, city, bio). */
export const ProfileEditFields = ({form, onFormChange}: ProfileEditFieldsProps) => {
    const handlePhoneChange = useCallback((v: PhoneInputValue) => onFormChange({phone: v.fullNumber}), [onFormChange])

    return (
        <>
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
                <PhoneInput initialValue={form.phone.replace(/[^\d]/g, '')} onChange={handlePhoneChange} />
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
        </>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 12},
    phoneContainer: {marginBottom: 12},
})
