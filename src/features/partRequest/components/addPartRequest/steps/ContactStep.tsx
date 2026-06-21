import {useRef, type ComponentRef} from 'react'
import {ScrollView, StyleSheet, View, type TextInput as NativeTextInput} from 'react-native'
import {HelperText, Text, TextInput} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {AddPartRequestFieldState} from '../useAddPartRequestForm'

type InputRef = NativeTextInput & ComponentRef<typeof TextInput>

const T = {
    BUDGET_LABEL: 'الميزانية (اختياري)',
    MIN: 'الأدنى',
    MAX: 'الأعلى',
    CURRENCY: 'ر.س',
    PHONE_LABEL: 'رقم التواصل *',
    PHONE_HINT: 'سيتم عرضه للبائعين المهتمين بطلبك',
    CITY_LABEL: 'المدينة (اختياري)',
}

const digits = (t: string) => t.replace(/[^0-9]/g, '')

interface ContactStepProps {
    fields: AddPartRequestFieldState
    budgetError: string | null
    onChangeField: <K extends keyof AddPartRequestFieldState>(key: K, value: AddPartRequestFieldState[K]) => void
}

export const ContactStep = ({fields, budgetError, onChangeField}: ContactStepProps) => {
    const theme = useAppTheme()
    const maxRef = useRef<InputRef>(null)
    const phoneRef = useRef<InputRef>(null)
    const cityRef = useRef<InputRef>(null)

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}>
            <Text style={[styles.label, {color: theme.colors.onSurface}]}>{T.BUDGET_LABEL}</Text>
            <View style={styles.budgetRow}>
                <TextInput
                    label={T.MIN}
                    value={fields.budgetMin}
                    onChangeText={t => onChangeField('budgetMin', digits(t))}
                    mode='outlined'
                    keyboardType='numeric'
                    returnKeyType='next'
                    submitBehavior='submit'
                    onSubmitEditing={() => maxRef.current?.focus()}
                    right={<TextInput.Affix text={T.CURRENCY} />}
                    style={styles.flexInput}
                    error={!!budgetError}
                />
                <TextInput
                    ref={maxRef}
                    label={T.MAX}
                    value={fields.budgetMax}
                    onChangeText={t => onChangeField('budgetMax', digits(t))}
                    mode='outlined'
                    keyboardType='numeric'
                    returnKeyType='next'
                    submitBehavior='submit'
                    onSubmitEditing={() => phoneRef.current?.focus()}
                    right={<TextInput.Affix text={T.CURRENCY} />}
                    style={styles.flexInput}
                    error={!!budgetError}
                />
            </View>
            {budgetError ? <HelperText type='error'>{budgetError}</HelperText> : null}

            <TextInput
                ref={phoneRef}
                label={T.PHONE_LABEL}
                value={fields.contactPhone}
                onChangeText={t => onChangeField('contactPhone', t)}
                mode='outlined'
                keyboardType='phone-pad'
                returnKeyType='next'
                submitBehavior='submit'
                onSubmitEditing={() => cityRef.current?.focus()}
                left={<TextInput.Icon icon='phone-outline' />}
                style={styles.field}
            />
            <HelperText type='info'>{T.PHONE_HINT}</HelperText>

            <TextInput
                ref={cityRef}
                label={T.CITY_LABEL}
                value={fields.city}
                onChangeText={t => onChangeField('city', t)}
                mode='outlined'
                returnKeyType='done'
                left={<TextInput.Icon icon='map-marker-outline' />}
                maxLength={100}
                style={styles.field}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {paddingTop: 4, paddingBottom: 24},
    label: {fontSize: 13, fontWeight: '700', marginBottom: 6, letterSpacing: -0.1},
    budgetRow: {flexDirection: 'row', gap: 10},
    flexInput: {flex: 1},
    field: {marginTop: 8},
})
