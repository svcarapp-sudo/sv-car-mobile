import {StyleSheet, View} from 'react-native'
import {Button, Chip, TextInput} from 'react-native-paper'

import {NumericTextInput, SellerTypePicker} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {SellerType} from '@/global/types'

import {GateTypeFields} from './GateTypeFields'

const ARABIC = {
    SELECT_TYPE: 'اختر نوع البائع',
    PHONE: 'رقم الهاتف',
    CREATE: 'إنشاء والمتابعة',
    CREATING: 'جاري الإنشاء...',
}

export interface GateFormState {
    sellerTypeId: number | null
    phone: string
    storeName: string
    city: string
    description: string
    workingHours: string
}

interface GateFormProps {
    sellerTypes: SellerType[]
    form: GateFormState
    onFormChange: (updater: (prev: GateFormState) => GateFormState) => void
    saving: boolean
    error: string | null
    onSubmit: () => void
}

export const GateForm = ({sellerTypes, form, onFormChange, saving, error, onSubmit}: GateFormProps) => {
    const theme = useAppTheme()
    return (
        <View style={styles.formSection}>
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
            {form.sellerTypeId && (
                <GateTypeFields
                    sellerTypes={sellerTypes}
                    sellerTypeId={form.sellerTypeId}
                    storeName={form.storeName}
                    city={form.city}
                    workingHours={form.workingHours}
                    description={form.description}
                    onChangeStoreName={storeName => onFormChange(f => ({...f, storeName}))}
                    onChangeCity={city => onFormChange(f => ({...f, city}))}
                    onChangeWorkingHours={workingHours => onFormChange(f => ({...f, workingHours}))}
                    onChangeDescription={description => onFormChange(f => ({...f, description}))}
                />
            )}
            {error && (
                <Chip
                    icon='alert-circle-outline'
                    style={[styles.errorChip, {backgroundColor: theme.colors.errorContainer}]}
                    textStyle={{color: theme.colors.error}}>
                    {error}
                </Chip>
            )}
            <Button
                mode='contained'
                onPress={onSubmit}
                loading={saving}
                disabled={saving || !form.sellerTypeId || !form.phone.trim()}
                style={styles.createButton}
                contentStyle={styles.createButtonContent}
                icon='check-circle-outline'>
                {saving ? ARABIC.CREATING : ARABIC.CREATE}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    formSection: {paddingHorizontal: 20},
    input: {marginBottom: 12},
    errorChip: {marginBottom: 12},
    createButton: {borderRadius: 12, marginTop: 8},
    createButtonContent: {paddingVertical: 6},
})
