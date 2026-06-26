import {forwardRef, type ComponentRef, type RefObject} from 'react'
import {StyleSheet, View, type TextInput as NativeTextInput} from 'react-native'
import {TextInput} from 'react-native-paper'

import {FadeInImage} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

import {AddPartFieldCard} from './AddPartFieldCard'

type InputRef = NativeTextInput & ComponentRef<typeof TextInput>

const ARABIC = {
    HEADER: 'معلومات إضافية',
    IMG: 'رابط الصورة',
    IMG_PH: 'https://example.com/image.jpg',
    SKU: 'رمز القطعة',
    SKU_PH: 'مثال: BP-001',
}

interface AddPartOptionalFieldsProps {
    imageUrl: string
    sku: string
    onImageUrlChange: (v: string) => void
    onSkuChange: (v: string) => void
}

export const AddPartOptionalFields = forwardRef<InputRef, AddPartOptionalFieldsProps>(
    ({imageUrl, sku, onImageUrlChange, onSkuChange}, skuRef) => {
        const theme = useAppTheme()
        const hasPreview = /^https?:\/\//i.test(imageUrl.trim())
        return (
            <AddPartFieldCard title={ARABIC.HEADER}>
                <TextInput
                    label={ARABIC.IMG}
                    value={imageUrl}
                    onChangeText={onImageUrlChange}
                    placeholder={ARABIC.IMG_PH}
                    mode='outlined'
                    keyboardType='url'
                    autoCapitalize='none'
                    returnKeyType='next'
                    submitBehavior='submit'
                    onSubmitEditing={() => (skuRef as RefObject<InputRef | null>)?.current?.focus()}
                    style={styles.input}
                    left={<TextInput.Icon icon='image-outline' />}
                />
                {hasPreview && (
                    <View
                        style={[
                            styles.preview,
                            {borderColor: theme.colors.outlineVariant, backgroundColor: theme.colors.surfaceVariant},
                        ]}>
                        <FadeInImage source={{uri: imageUrl.trim()}} style={styles.previewImg} resizeMode='cover' />
                    </View>
                )}
                <TextInput
                    ref={skuRef}
                    label={ARABIC.SKU}
                    value={sku}
                    onChangeText={onSkuChange}
                    placeholder={ARABIC.SKU_PH}
                    mode='outlined'
                    autoCapitalize='characters'
                    returnKeyType='done'
                    style={styles.inputLast}
                    left={<TextInput.Icon icon='barcode' />}
                />
            </AddPartFieldCard>
        )
    }
)

AddPartOptionalFields.displayName = 'AddPartOptionalFields'

const styles = StyleSheet.create({
    input: {marginBottom: 10},
    inputLast: {marginBottom: 0},
    preview: {borderRadius: 12, borderWidth: 1, padding: 6, marginBottom: 10, alignItems: 'center'},
    previewImg: {width: '100%', height: 140, borderRadius: 8},
})
