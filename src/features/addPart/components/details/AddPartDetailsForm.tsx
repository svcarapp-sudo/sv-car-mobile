import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {Screen} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {PartConditionValue} from '@/global/types'
import {AddPartFields} from './AddPartFields'
import {AddPartFormActions} from './AddPartFormActions'

const ARABIC_TEXT = {
    SECTION_TITLE: 'تفاصيل القطعة',
    SECTION_SUBTITLE: 'أخبرنا عن القطعة التي ترغب بإضافتها إلى متجرك',
}

interface AddPartDetailsFormProps {
    name: string
    description: string
    price: string
    condition: PartConditionValue
    stockQuantity: string
    imageUrl: string
    sku: string
    categoryId: number | null
    loading: boolean
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onPriceChange: (value: string) => void
    onConditionChange: (value: PartConditionValue) => void
    onStockQuantityChange: (value: string) => void
    onImageUrlChange: (value: string) => void
    onSkuChange: (value: string) => void
    onSubmit: () => void
    onCancel?: () => void
    canSubmit: boolean
    submitLabel?: string
    submitLoadingLabel?: string
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    hideHeader?: boolean
    contentTopInset?: number
}

export const AddPartDetailsForm = ({
    name,
    description,
    price,
    condition,
    stockQuantity,
    imageUrl,
    sku,
    categoryId,
    loading,
    onNameChange,
    onDescriptionChange,
    onPriceChange,
    onConditionChange,
    onStockQuantityChange,
    onImageUrlChange,
    onSkuChange,
    onSubmit,
    onCancel,
    canSubmit,
    submitLabel,
    submitLoadingLabel,
    onScroll,
    hideHeader,
    contentTopInset = 0,
}: AddPartDetailsFormProps) => {
    const theme = useAppTheme()

    return (
        <Screen
            style={styles.container}
            contentContainerStyle={[styles.content, {paddingTop: contentTopInset}]}
            onScroll={onScroll}>
            {!hideHeader && (
                <View style={styles.sectionHeader}>
                    <View style={[styles.sectionIcon, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source='package-variant-plus' size={20} color={theme.colors.primary} />
                    </View>
                    <View style={styles.headerText}>
                        <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.SECTION_TITLE}
                        </Text>
                        <Text variant='bodySmall' style={[styles.sectionSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                            {ARABIC_TEXT.SECTION_SUBTITLE}
                        </Text>
                    </View>
                </View>
            )}

            <AddPartFields
                name={name}
                description={description}
                price={price}
                condition={condition}
                stockQuantity={stockQuantity}
                imageUrl={imageUrl}
                sku={sku}
                categoryId={categoryId}
                onNameChange={onNameChange}
                onDescriptionChange={onDescriptionChange}
                onPriceChange={onPriceChange}
                onConditionChange={onConditionChange}
                onStockQuantityChange={onStockQuantityChange}
                onImageUrlChange={onImageUrlChange}
                onSkuChange={onSkuChange}
            />

            <AddPartFormActions
                loading={loading}
                canSubmit={canSubmit}
                onSubmit={onSubmit}
                onCancel={onCancel}
                submitLabel={submitLabel}
                submitLoadingLabel={submitLoadingLabel}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    content: {paddingBottom: 24},
    sectionHeader: {flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18},
    sectionIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {flex: 1, gap: 2},
    sectionTitle: {fontWeight: '700'},
    sectionSubtitle: {lineHeight: 18},
})
