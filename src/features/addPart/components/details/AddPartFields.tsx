import {useRef, type ComponentRef} from 'react'
import {StyleSheet, View, type TextInput as NativeTextInput} from 'react-native'
import {HelperText, TextInput} from 'react-native-paper'

import {FadeInImage, NumericTextInput, PartNameInput} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {AddPartFieldCard} from './AddPartFieldCard'

type InputRef = NativeTextInput & ComponentRef<typeof TextInput>

const ARABIC = {
    REQ_HEADER: 'المعلومات الأساسية',
    OPT_HEADER: 'معلومات إضافية',
    NAME: 'اسم القطعة',
    NAME_PH: 'مثال: فرامل أمامية',
    DESC: 'الوصف',
    DESC_PH: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر',
    PRICE_ERR: 'يرجى إدخال سعر صحيح',
    IMG: 'رابط الصورة',
    IMG_PH: 'https://example.com/image.jpg',
    SKU: 'رمز القطعة',
    SKU_PH: 'مثال: BP-001',
}

interface AddPartFieldsProps {
    name: string
    description: string
    price: string
    imageUrl: string
    sku: string
    categoryId: number | null
    onNameChange: (v: string) => void
    onDescriptionChange: (v: string) => void
    onPriceChange: (v: string) => void
    onImageUrlChange: (v: string) => void
    onSkuChange: (v: string) => void
}

export const AddPartFields = (p: AddPartFieldsProps) => {
    const theme = useAppTheme()
    const descriptionRef = useRef<InputRef>(null)
    const skuRef = useRef<InputRef>(null)
    const priceNum = parseFloat(p.price)
    const priceValid = !p.price.trim() || (!isNaN(priceNum) && priceNum >= 0)
    const hasPreview = /^https?:\/\//i.test(p.imageUrl.trim())

    return (
        <>
            <AddPartFieldCard title={ARABIC.REQ_HEADER} required>
                <PartNameInput
                    label={ARABIC.NAME}
                    value={p.name}
                    onChangeText={p.onNameChange}
                    placeholder={ARABIC.NAME_PH}
                    categoryId={p.categoryId}
                    style={styles.input}
                />
                <NumericTextInput
                    label={ARABIC.PRICE}
                    value={p.price}
                    onChangeText={p.onPriceChange}
                    placeholder='0.00'
                    mode='outlined'
                    keyboardType='decimal-pad'
                    error={!priceValid}
                    returnKeyType='next'
                    submitBehavior='submit'
                    onSubmitEditing={() => descriptionRef.current?.focus()}
                    style={styles.input}
                    left={<TextInput.Icon icon='cash' />}
                    right={<TextInput.Affix text='$' />}
                />
                {!priceValid && (
                    <HelperText type='error' visible>
                        {ARABIC.PRICE_ERR}
                    </HelperText>
                )}
                <TextInput
                    ref={descriptionRef}
                    label={ARABIC.DESC}
                    value={p.description}
                    onChangeText={p.onDescriptionChange}
                    placeholder={ARABIC.DESC_PH}
                    mode='outlined'
                    multiline
                    numberOfLines={3}
                    style={styles.inputLast}
                    left={<TextInput.Icon icon='text' />}
                />
            </AddPartFieldCard>

            <AddPartFieldCard title={ARABIC.OPT_HEADER}>
                <TextInput
                    label={ARABIC.IMG}
                    value={p.imageUrl}
                    onChangeText={p.onImageUrlChange}
                    placeholder={ARABIC.IMG_PH}
                    mode='outlined'
                    keyboardType='url'
                    autoCapitalize='none'
                    returnKeyType='next'
                    submitBehavior='submit'
                    onSubmitEditing={() => skuRef.current?.focus()}
                    style={styles.input}
                    left={<TextInput.Icon icon='image-outline' />}
                />
                {hasPreview && (
                    <View
                        style={[
                            styles.preview,
                            {borderColor: theme.colors.outlineVariant, backgroundColor: theme.colors.surfaceVariant},
                        ]}>
                        <FadeInImage source={{uri: p.imageUrl.trim()}} style={styles.previewImg} resizeMode='cover' />
                    </View>
                )}
                <TextInput
                    ref={skuRef}
                    label={ARABIC.SKU}
                    value={p.sku}
                    onChangeText={p.onSkuChange}
                    placeholder={ARABIC.SKU_PH}
                    mode='outlined'
                    autoCapitalize='characters'
                    returnKeyType='done'
                    style={styles.inputLast}
                    left={<TextInput.Icon icon='barcode' />}
                />
            </AddPartFieldCard>
        </>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 10},
    inputLast: {marginBottom: 0},
    preview: {borderRadius: 12, borderWidth: 1, padding: 6, marginBottom: 10, alignItems: 'center'},
    previewImg: {width: '100%', height: 140, borderRadius: 8},
})
