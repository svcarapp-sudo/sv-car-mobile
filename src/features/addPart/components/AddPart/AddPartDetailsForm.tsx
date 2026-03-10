import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, Icon} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {AddPartFields} from './AddPartFields'
import {AddPartFormActions} from './AddPartFormActions'

const ARABIC_TEXT = {
    SECTION_TITLE: 'تفاصيل القطعة',
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
    name, description, price, imageUrl, sku, loading,
    onNameChange, onDescriptionChange, onPriceChange, onImageUrlChange, onSkuChange,
    onSubmit, onCancel, canSubmit, submitLabel, submitLoadingLabel,
}: AddPartDetailsFormProps) => {
    const theme = useAppTheme()

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'>
            <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='text-box-outline' size={16} color={theme.colors.primary} />
                </View>
                <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.SECTION_TITLE}
                </Text>
            </View>

            <AddPartFields
                name={name}
                description={description}
                price={price}
                imageUrl={imageUrl}
                sku={sku}
                onNameChange={onNameChange}
                onDescriptionChange={onDescriptionChange}
                onPriceChange={onPriceChange}
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
        marginBottom: 14,
    },
    sectionIcon: {
        width: 28,
        height: 28,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
})
