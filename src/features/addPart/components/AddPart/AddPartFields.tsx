import {StyleSheet, View} from 'react-native'
import {TextInput} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

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
}

interface AddPartFieldsProps {
    name: string
    description: string
    price: string
    imageUrl: string
    sku: string
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onPriceChange: (value: string) => void
    onImageUrlChange: (value: string) => void
    onSkuChange: (value: string) => void
}

export const AddPartFields = ({
    name,
    description,
    price,
    imageUrl,
    sku,
    onNameChange,
    onDescriptionChange,
    onPriceChange,
    onImageUrlChange,
    onSkuChange,
}: AddPartFieldsProps) => {
    const theme = useAppTheme()

    return (
        <>
            {/* Required fields card */}
            <View style={[styles.fieldGroup, {backgroundColor: theme.colors.surface}]}>
                <TextInput
                    label={ARABIC_TEXT.PART_NAME}
                    value={name}
                    onChangeText={onNameChange}
                    placeholder={ARABIC_TEXT.PART_NAME_PLACEHOLDER}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='tag-outline' />}
                />
                <TextInput
                    label={ARABIC_TEXT.PRICE}
                    value={price}
                    onChangeText={onPriceChange}
                    placeholder={ARABIC_TEXT.PRICE_PLACEHOLDER}
                    mode='outlined'
                    keyboardType='decimal-pad'
                    style={styles.input}
                    left={<TextInput.Icon icon='cash' />}
                />
                <TextInput
                    label={ARABIC_TEXT.DESCRIPTION}
                    value={description}
                    onChangeText={onDescriptionChange}
                    placeholder={ARABIC_TEXT.DESCRIPTION_PLACEHOLDER}
                    mode='outlined'
                    multiline
                    numberOfLines={3}
                    style={styles.inputLast}
                    left={<TextInput.Icon icon='text' />}
                />
            </View>

            {/* Optional fields card */}
            <View style={[styles.fieldGroup, {backgroundColor: theme.colors.surface}]}>
                <TextInput
                    label={ARABIC_TEXT.IMAGE_URL}
                    value={imageUrl}
                    onChangeText={onImageUrlChange}
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
                    onChangeText={onSkuChange}
                    placeholder={ARABIC_TEXT.SKU_PLACEHOLDER}
                    mode='outlined'
                    autoCapitalize='characters'
                    style={styles.inputLast}
                    left={<TextInput.Icon icon='barcode' />}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fieldGroup: {
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    input: {
        marginBottom: 12,
    },
    inputLast: {
        marginBottom: 0,
    },
})
