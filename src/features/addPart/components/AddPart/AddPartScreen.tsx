import {StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {useAddPartForm} from '../../hooks/useAddPartForm'
import {useAppTheme} from '@/global/hooks'
import {AddPartStepper, Step} from './AddPartStepper'
import {AddPartSummaryCard} from './AddPartSummaryCard'
import {AddPartStepRenderer} from './AddPartStepRenderer'
import {SellerProfileGate} from '../sellerProfileGate'
import type {RootStackParamList} from '@/global/navigation/types'

interface AddPartScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const AddPartScreen = ({navigation}: AddPartScreenProps) => {
    const theme = useAppTheme()
    const form = useAddPartForm(navigation)

    return (
        <SellerProfileGate>
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <AddPartStepper currentStep={form.currentStep} onStepPress={form.handleStepChange} />
                <View style={styles.mainContent}>
                    <AddPartSummaryCard
                        makeName={form.makeName}
                        makeLogoUrl={form.makeLogoUrl}
                        modelName={form.modelName}
                        year={form.year}
                        categoryName={form.categoryName}
                        onEdit={() => form.handleStepChange(Step.Make)}
                    />
                    <View style={styles.stepContent}>
                        <AddPartStepRenderer
                            currentStep={form.currentStep}
                            originId={form.originId}
                            makeId={form.makeId}
                            makeName={form.makeName}
                            modelId={form.modelId}
                            modelName={form.modelName}
                            year={form.year}
                            categoryId={form.categoryId}
                            categories={form.categories}
                            categoriesLoading={form.categoriesLoading}
                            name={form.name}
                            description={form.description}
                            price={form.price}
                            imageUrl={form.imageUrl}
                            sku={form.sku}
                            loading={form.loading}
                            getMakes={form.getMakes}
                            getModels={form.getModels}
                            years={form.years}
                            onMakeSelect={form.handleMakeSelect}
                            onModelSelect={form.handleModelSelect}
                            onYearSelect={form.handleYearSelect}
                            onCategorySelect={form.handleCategorySelect}
                            onNameChange={form.setName}
                            onDescriptionChange={form.setDescription}
                            onPriceChange={form.setPrice}
                            onImageUrlChange={form.setImageUrl}
                            onSkuChange={form.setSku}
                            onSubmit={form.handleSubmit}
                            onCancel={() => navigation?.goBack()}
                            canSubmit={form.canSubmit}
                        />
                    </View>
                </View>
            </View>
        </SellerProfileGate>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
        padding: 16,
    },
    stepContent: {
        flex: 1,
    },
})
