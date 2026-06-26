import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, HelperText, Text, TextInput} from 'react-native-paper'

import {NumericTextInput} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {CreateOfferRequest} from '@/global/types'
import {haptics} from '@/global/utils'

import {SendOfferPartPicker} from './SendOfferPartPicker'

const T = {
    PRICE: 'السعر المقترح',
    PRICE_PLACEHOLDER: 'مثال: 250',
    PRICE_ERROR: 'الرجاء إدخال سعر صحيح أكبر من صفر',
    MESSAGE: 'رسالة للمشتري (اختياري)',
    MESSAGE_PLACEHOLDER: 'أضف تفاصيل عن القطعة أو حالتها…',
    PHONE: 'رقم التواصل',
    PHONE_ERROR: 'الرجاء إدخال رقم تواصل',
    SUBMIT: 'إرسال العرض',
    CURRENCY: 'ر.س',
}

interface SendOfferFormProps {
    initialPhone: string
    submitting: boolean
    onSubmit: (body: CreateOfferRequest) => void
}

/** Price/message/phone fields + optional listing link for a new offer. */
export const SendOfferForm = ({initialPhone, submitting, onSubmit}: SendOfferFormProps) => {
    const theme = useAppTheme()
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState(initialPhone)
    const [partId, setPartId] = useState<number | undefined>(undefined)
    const [touched, setTouched] = useState(false)

    const priceNum = parseFloat(price)
    const priceValid = Number.isFinite(priceNum) && priceNum > 0
    const phoneValid = phone.trim().length > 0

    const handleSubmit = () => {
        setTouched(true)
        if (!priceValid || !phoneValid) {
            haptics.warning()
            return
        }
        onSubmit({
            price: priceNum,
            message: message.trim() || undefined,
            partId,
            contactPhone: phone.trim(),
        })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.field}>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>{T.PRICE}</Text>
                <NumericTextInput
                    mode='outlined'
                    value={price}
                    onChangeText={setPrice}
                    placeholder={T.PRICE_PLACEHOLDER}
                    keyboardType='number-pad'
                    right={<TextInput.Affix text={T.CURRENCY} />}
                    error={touched && !priceValid}
                />
                {touched && !priceValid && <HelperText type='error'>{T.PRICE_ERROR}</HelperText>}
            </View>

            <View style={styles.field}>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>{T.MESSAGE}</Text>
                <TextInput
                    mode='outlined'
                    value={message}
                    onChangeText={setMessage}
                    placeholder={T.MESSAGE_PLACEHOLDER}
                    multiline
                    numberOfLines={4}
                    style={styles.multiline}
                />
            </View>

            <View style={styles.field}>
                <Text style={[styles.label, {color: theme.colors.onSurface}]}>{T.PHONE}</Text>
                <NumericTextInput
                    mode='outlined'
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType='phone-pad'
                    left={<TextInput.Icon icon='phone-outline' />}
                    error={touched && !phoneValid}
                />
                {touched && !phoneValid && <HelperText type='error'>{T.PHONE_ERROR}</HelperText>}
            </View>

            <View style={styles.pickerBleed}>
                <SendOfferPartPicker selectedPartId={partId} onSelect={setPartId} />
            </View>

            <Button
                mode='contained'
                onPress={handleSubmit}
                loading={submitting}
                disabled={submitting}
                icon='send'
                style={styles.submit}
                contentStyle={styles.submitContent}>
                {T.SUBMIT}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {paddingHorizontal: 16, paddingTop: 16, gap: 14},
    field: {gap: 6},
    label: {fontSize: 13.5, fontWeight: '800', letterSpacing: -0.2},
    multiline: {minHeight: 96},
    pickerBleed: {marginHorizontal: -16},
    submit: {borderRadius: 14, marginTop: 6},
    submitContent: {paddingVertical: 8},
})
