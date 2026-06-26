import {StyleSheet, View} from 'react-native'
import {TextInput, Button} from 'react-native-paper'

import {NumericTextInput, PartNameInput} from '@/global/components'
import type {PartConditionValue} from '@/global/types'

import {PartConditionSelector} from './PartConditionSelector'

const ARABIC_TEXT = {
    PART_NAME: 'اسم القطعة',
    PART_NAME_PLACEHOLDER: 'مثال: فرامل أمامية',
    DESCRIPTION: 'الوصف',
    DESCRIPTION_PLACEHOLDER: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر ($)',
    PRICE_PLACEHOLDER: '0.00',
    STOCK: 'الكمية المتوفرة',
    STOCK_PLACEHOLDER: '1',
    IMAGE_URL: 'رابط الصورة (اختياري)',
    IMAGE_URL_PLACEHOLDER: 'https://example.com/image.jpg',
    SKU: 'رمز القطعة (اختياري)',
    SKU_PLACEHOLDER: 'مثال: BP-001',
    SAVE: 'حفظ التعديلات',
    CANCEL: 'إلغاء',
    SAVING: 'جاري الحفظ...',
}

interface EditPartFormFieldsProps {
    name: string
    onNameChange: (value: string) => void
    description: string
    onDescriptionChange: (value: string) => void
    price: string
    onPriceChange: (value: string) => void
    condition: PartConditionValue
    onConditionChange: (value: PartConditionValue) => void
    stockQuantity: string
    onStockQuantityChange: (value: string) => void
    imageUrl: string
    onImageUrlChange: (value: string) => void
    sku: string
    onSkuChange: (value: string) => void
    categoryId: number | null
    saving: boolean
    onSave: () => void
    onCancel: () => void
}

export const EditPartFormFields = (p: EditPartFormFieldsProps) => {
    const {name, description, price, imageUrl, sku, categoryId, saving} = p
    return (
        <>
            <PartNameInput
                label={ARABIC_TEXT.PART_NAME}
                value={name}
                onChangeText={p.onNameChange}
                placeholder={ARABIC_TEXT.PART_NAME_PLACEHOLDER}
                categoryId={categoryId}
                style={styles.input}
            />

            <TextInput
                label={ARABIC_TEXT.DESCRIPTION}
                value={description}
                onChangeText={p.onDescriptionChange}
                placeholder={ARABIC_TEXT.DESCRIPTION_PLACEHOLDER}
                mode='outlined'
                multiline
                numberOfLines={3}
                style={styles.input}
                left={<TextInput.Icon icon='text' />}
            />

            <NumericTextInput
                label={ARABIC_TEXT.PRICE}
                value={price}
                onChangeText={p.onPriceChange}
                placeholder={ARABIC_TEXT.PRICE_PLACEHOLDER}
                mode='outlined'
                keyboardType='decimal-pad'
                style={styles.input}
                left={<TextInput.Icon icon='cash' />}
            />

            <PartConditionSelector value={p.condition} onChange={p.onConditionChange} />

            <NumericTextInput
                label={ARABIC_TEXT.STOCK}
                value={p.stockQuantity}
                onChangeText={p.onStockQuantityChange}
                placeholder={ARABIC_TEXT.STOCK_PLACEHOLDER}
                mode='outlined'
                keyboardType='number-pad'
                style={styles.input}
                left={<TextInput.Icon icon='package-variant-closed' />}
            />

            <TextInput
                label={ARABIC_TEXT.IMAGE_URL}
                value={imageUrl}
                onChangeText={p.onImageUrlChange}
                placeholder={ARABIC_TEXT.IMAGE_URL_PLACEHOLDER}
                mode='outlined'
                keyboardType='url'
                autoCapitalize='none'
                style={styles.input}
                left={<TextInput.Icon icon='image-outline' />}
            />

            <TextInput
                label={ARABIC_TEXT.SKU}
                value={sku}
                onChangeText={p.onSkuChange}
                placeholder={ARABIC_TEXT.SKU_PLACEHOLDER}
                mode='outlined'
                autoCapitalize='characters'
                style={styles.input}
                left={<TextInput.Icon icon='barcode' />}
            />

            <View style={styles.buttons}>
                <Button mode='outlined' onPress={p.onCancel} style={styles.btn} disabled={saving}>
                    {ARABIC_TEXT.CANCEL}
                </Button>
                <Button
                    mode='contained'
                    onPress={p.onSave}
                    style={styles.btn}
                    contentStyle={styles.saveBtnContent}
                    loading={saving}
                    disabled={saving || !name.trim() || !price.trim()}>
                    {saving ? ARABIC_TEXT.SAVING : ARABIC_TEXT.SAVE}
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 14},
    buttons: {flexDirection: 'row', gap: 12, marginTop: 10},
    btn: {flex: 1, borderRadius: 12},
    saveBtnContent: {paddingVertical: 4},
})
