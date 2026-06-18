import React from 'react'
import {StyleSheet} from 'react-native'
import {TextInput} from 'react-native-paper'

import {NumericTextInput, SellerTypePicker, getSellerTypeFieldConfig} from '@/global/components'
import type {SellerType} from '@/global/types'
import type {SellerProfileFormState} from '../../hooks'
import {SpecializationField} from './SpecializationField'

const ARABIC = {
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    DESCRIPTION: 'الوصف',
    WORKING_HOURS: 'ساعات العمل',
    SELECT_TYPE: 'اختر نوع البائع',
    HOURS_PLACEHOLDER: 'مثال: 9 ص - 9 م',
}

interface SellerProfileFormFieldsProps {
    form: SellerProfileFormState
    sellerTypes: SellerType[]
    onFormChange: (updater: (prev: SellerProfileFormState) => SellerProfileFormState) => void
}

/** Input rows of the seller-profile form: type picker, phone, then type-driven fields. */
export const SellerProfileFormFields = ({form, sellerTypes, onFormChange}: SellerProfileFormFieldsProps) => {
    const selectedSlug = sellerTypes.find(t => t.id === form.sellerTypeId)?.slug
    const fields = form.sellerTypeId ? getSellerTypeFieldConfig(selectedSlug) : null

    return (
        <>
            <SellerTypePicker
                types={sellerTypes}
                selectedId={form.sellerTypeId}
                onSelect={id => onFormChange(f => ({...f, sellerTypeId: id}))}
                label={ARABIC.SELECT_TYPE}
            />

            <NumericTextInput
                label={ARABIC.PHONE}
                value={form.phone}
                onChangeText={phone => onFormChange(f => ({...f, phone}))}
                mode='outlined'
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                style={styles.input}
                left={<TextInput.Icon icon='phone-outline' />}
            />

            {fields?.showStoreName && (
                <TextInput
                    label={fields.storeNameLabel}
                    value={form.storeName}
                    onChangeText={storeName => onFormChange(f => ({...f, storeName}))}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='store-outline' />}
                />
            )}
            {fields?.showCity && (
                <TextInput
                    label={ARABIC.CITY}
                    value={form.city}
                    onChangeText={city => onFormChange(f => ({...f, city}))}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='map-marker-outline' />}
                />
            )}
            {fields?.showWorkingHours && (
                <TextInput
                    label={ARABIC.WORKING_HOURS}
                    value={form.workingHours}
                    onChangeText={workingHours => onFormChange(f => ({...f, workingHours}))}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='clock-outline' />}
                    placeholder={ARABIC.HOURS_PLACEHOLDER}
                />
            )}
            {fields?.showDescription && (
                <TextInput
                    label={ARABIC.DESCRIPTION}
                    value={form.description}
                    onChangeText={description => onFormChange(f => ({...f, description}))}
                    mode='outlined'
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    left={<TextInput.Icon icon='text-box-outline' />}
                />
            )}

            {form.sellerTypeId != null && (
                <SpecializationField
                    value={form.specializations}
                    onChange={specializations => onFormChange(f => ({...f, specializations}))}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 12, marginTop: 12},
})
