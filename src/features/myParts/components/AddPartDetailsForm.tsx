import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, TextInput, Button, useTheme} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    PART_NAME: 'اسم القطعة',
    PART_NAME_PLACEHOLDER: 'مثال: فرامل أمامية',
    DESCRIPTION: 'الوصف',
    DESCRIPTION_PLACEHOLDER: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر',
    PRICE_PLACEHOLDER: '0.00',
    IMAGE_URL: 'رابط الصورة (اختياري)',
    IMAGE_URL_PLACEHOLDER: 'https://example.com/image.jpg',
    SKU: 'رمز القطعة (اختياري)',
    SKU_PLACEHOLDER: 'BP-001',
    SUBMIT: 'إضافة القطعة',
    CANCEL: 'إلغاء',
    LOADING: 'جاري الإضافة...',
}

interface AddPartDetailsFormProps {
    name: string
    description: string
    price: string
    imageUrl: string
    sku: string
    loading: boolean
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onPriceChange: (value: string) => void
    onImageUrlChange: (value: string) => void
    onSkuChange: (value: string) => void
    onSubmit: () => void
    navigation?: NavigationProp<RootStackParamList>
    canSubmit: boolean
}

export const AddPartDetailsForm = ({
    name,
    description,
    price,
    imageUrl,
    sku,
    loading,
    onNameChange,
    onDescriptionChange,
    onPriceChange,
    onImageUrlChange,
    onSkuChange,
    onSubmit,
    navigation,
    canSubmit,
}: AddPartDetailsFormProps) => {
    const theme = useTheme()

    return (
        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
            <TextInput
                label={ARABIC_TEXT.PART_NAME}
                value={name}
                onChangeText={onNameChange}
                placeholder={ARABIC_TEXT.PART_NAME_PLACEHOLDER}
                mode='outlined'
                style={styles.input}
            />

            <TextInput
                label={ARABIC_TEXT.DESCRIPTION}
                value={description}
                onChangeText={onDescriptionChange}
                placeholder={ARABIC_TEXT.DESCRIPTION_PLACEHOLDER}
                mode='outlined'
                multiline
                numberOfLines={4}
                style={styles.input}
            />

            <TextInput
                label={ARABIC_TEXT.PRICE}
                value={price}
                onChangeText={onPriceChange}
                placeholder={ARABIC_TEXT.PRICE_PLACEHOLDER}
                mode='outlined'
                keyboardType='decimal-pad'
                style={styles.input}
            />

            <TextInput
                label={ARABIC_TEXT.IMAGE_URL}
                value={imageUrl}
                onChangeText={onImageUrlChange}
                placeholder={ARABIC_TEXT.IMAGE_URL_PLACEHOLDER}
                mode='outlined'
                keyboardType='url'
                style={styles.input}
            />

            <TextInput
                label={ARABIC_TEXT.SKU}
                value={sku}
                onChangeText={onSkuChange}
                placeholder={ARABIC_TEXT.SKU_PLACEHOLDER}
                mode='outlined'
                style={styles.input}
            />

            <View style={styles.buttonContainer}>
                <Button mode='outlined' onPress={() => navigation?.goBack()} style={styles.button} disabled={loading}>
                    {ARABIC_TEXT.CANCEL}
                </Button>
                <Button
                    mode='contained'
                    onPress={onSubmit}
                    style={styles.button}
                    loading={loading}
                    disabled={loading || !canSubmit}>
                    {loading ? ARABIC_TEXT.LOADING : ARABIC_TEXT.SUBMIT}
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
    },
    formContent: {
        paddingBottom: 16,
    },
    input: {
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 12,
    },
    button: {
        flex: 1,
    },
})
