import {useRef, type ComponentRef} from 'react'
import {StyleSheet, type TextInput as NativeTextInput} from 'react-native'
import {HelperText, TextInput} from 'react-native-paper'

import {NumericTextInput, PartNameInput} from '@/global/components'
import type {PartConditionValue} from '@/global/types'
import {AddPartFieldCard} from './AddPartFieldCard'
import {AddPartOptionalFields} from './AddPartOptionalFields'
import {PartConditionSelector} from './PartConditionSelector'

type InputRef = NativeTextInput & ComponentRef<typeof TextInput>

const ARABIC = {
    REQ_HEADER: 'المعلومات الأساسية',
    NAME: 'اسم القطعة',
    NAME_PH: 'مثال: فرامل أمامية',
    DESC: 'الوصف',
    DESC_PH: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر',
    PRICE_ERR: 'يرجى إدخال سعر صحيح',
    STOCK: 'الكمية المتوفرة',
    STOCK_PH: '1',
}

interface AddPartFieldsProps {
    name: string
    description: string
    price: string
    imageUrl: string
    sku: string
    condition: PartConditionValue
    stockQuantity: string
    categoryId: number | null
    onNameChange: (v: string) => void
    onDescriptionChange: (v: string) => void
    onPriceChange: (v: string) => void
    onImageUrlChange: (v: string) => void
    onSkuChange: (v: string) => void
    onConditionChange: (v: PartConditionValue) => void
    onStockQuantityChange: (v: string) => void
}

export const AddPartFields = (p: AddPartFieldsProps) => {
    const descriptionRef = useRef<InputRef>(null)
    const skuRef = useRef<InputRef>(null)
    const priceNum = parseFloat(p.price)
    const priceValid = !p.price.trim() || (!isNaN(priceNum) && priceNum >= 0)

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
                <PartConditionSelector value={p.condition} onChange={p.onConditionChange} />
                <NumericTextInput
                    label={ARABIC.STOCK}
                    value={p.stockQuantity}
                    onChangeText={p.onStockQuantityChange}
                    placeholder={ARABIC.STOCK_PH}
                    mode='outlined'
                    keyboardType='number-pad'
                    style={styles.input}
                    left={<TextInput.Icon icon='package-variant-closed' />}
                />
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

            <AddPartOptionalFields
                ref={skuRef}
                imageUrl={p.imageUrl}
                sku={p.sku}
                onImageUrlChange={p.onImageUrlChange}
                onSkuChange={p.onSkuChange}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 10},
    inputLast: {marginBottom: 0},
})
