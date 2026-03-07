import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, TextInput, Button, useTheme, Icon} from 'react-native-paper'

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
    SUBMIT: 'إضافة القطعة',
    CANCEL: 'إلغاء',
    LOADING: 'جاري الإضافة...',
    REQUIRED: 'مطلوب',
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
    onCancel?: () => void
    canSubmit: boolean
    submitLabel?: string
    submitLoadingLabel?: string
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
    onCancel,
    canSubmit,
    submitLabel = ARABIC_TEXT.SUBMIT,
    submitLoadingLabel = ARABIC_TEXT.LOADING,
}: AddPartDetailsFormProps) => {
    const theme = useTheme()

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Section header */}
            <View style={styles.sectionHeader}>
                <Icon source="text-box-outline" size={20} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>تفاصيل القطعة</Text>
            </View>

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

            {/* Buttons */}
            <View style={styles.buttons}>
                {onCancel ? (
                    <Button mode="outlined" onPress={onCancel} style={styles.cancelBtn} disabled={loading}>
                        {ARABIC_TEXT.CANCEL}
                    </Button>
                ) : null}
                <Button
                    mode="contained"
                    onPress={onSubmit}
                    style={[styles.submitBtn, !onCancel && styles.fullWidth]}
                    contentStyle={styles.submitContent}
                    loading={loading}
                    disabled={loading || !canSubmit}>
                    {loading ? submitLoadingLabel : submitLabel}
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    input: {
        marginBottom: 14,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    cancelBtn: {
        flex: 1,
        borderRadius: 12,
    },
    submitBtn: {
        flex: 1,
        borderRadius: 12,
    },
    fullWidth: {
        flex: 1,
    },
    submitContent: {
        paddingVertical: 4,
    },
})
