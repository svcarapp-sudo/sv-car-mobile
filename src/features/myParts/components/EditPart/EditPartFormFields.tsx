import {StyleSheet, View} from 'react-native'
import {TextInput, Button} from 'react-native-paper'

const ARABIC_TEXT = {
    PART_NAME: 'اسم القطعة',
    PART_NAME_PLACEHOLDER: 'مثال: فرامل أمامية',
    DESCRIPTION: 'الوصف',
    DESCRIPTION_PLACEHOLDER: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر ($)',
    PRICE_PLACEHOLDER: '0.00',
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
    imageUrl: string
    onImageUrlChange: (value: string) => void
    sku: string
    onSkuChange: (value: string) => void
    saving: boolean
    onSave: () => void
    onCancel: () => void
}

export const EditPartFormFields = ({
    name,
    onNameChange,
    description,
    onDescriptionChange,
    price,
    onPriceChange,
    imageUrl,
    onImageUrlChange,
    sku,
    onSkuChange,
    saving,
    onSave,
    onCancel,
}: EditPartFormFieldsProps) => {
    return (
        <>
            <TextInput
                label={ARABIC_TEXT.PART_NAME}
                value={name}
                onChangeText={onNameChange}
                placeholder={ARABIC_TEXT.PART_NAME_PLACEHOLDER}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="tag-outline" />}
            />

            <TextInput
                label={ARABIC_TEXT.DESCRIPTION}
                value={description}
                onChangeText={onDescriptionChange}
                placeholder={ARABIC_TEXT.DESCRIPTION_PLACEHOLDER}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
                left={<TextInput.Icon icon="text" />}
            />

            <TextInput
                label={ARABIC_TEXT.PRICE}
                value={price}
                onChangeText={onPriceChange}
                placeholder={ARABIC_TEXT.PRICE_PLACEHOLDER}
                mode="outlined"
                keyboardType="decimal-pad"
                style={styles.input}
                left={<TextInput.Icon icon="cash" />}
            />

            <TextInput
                label={ARABIC_TEXT.IMAGE_URL}
                value={imageUrl}
                onChangeText={onImageUrlChange}
                placeholder={ARABIC_TEXT.IMAGE_URL_PLACEHOLDER}
                mode="outlined"
                keyboardType="url"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="image-outline" />}
            />

            <TextInput
                label={ARABIC_TEXT.SKU}
                value={sku}
                onChangeText={onSkuChange}
                placeholder={ARABIC_TEXT.SKU_PLACEHOLDER}
                mode="outlined"
                autoCapitalize="characters"
                style={styles.input}
                left={<TextInput.Icon icon="barcode" />}
            />

            <View style={styles.buttons}>
                <Button mode="outlined" onPress={onCancel} style={styles.btn} disabled={saving}>
                    {ARABIC_TEXT.CANCEL}
                </Button>
                <Button
                    mode="contained"
                    onPress={onSave}
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
    input: {
        marginBottom: 14,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    btn: {
        flex: 1,
        borderRadius: 12,
    },
    saveBtnContent: {
        paddingVertical: 4,
    },
})
