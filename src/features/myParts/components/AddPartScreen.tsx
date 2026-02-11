import {useState, useCallback} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import {Text, useTheme} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import {useMyParts} from '../hooks/useMyParts'
import {useVehicleInfo, usePartCategories} from '@/global/hooks'
import {ManufacturerScreen, ModelScreen, YearScreen, CategoryScreen} from '@/global/components'
import {AddPartStepper, Step} from './AddPartStepper'
import {AddPartSummaryCard} from './AddPartSummaryCard'
import {AddPartDetailsForm} from './AddPartDetailsForm'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    ERROR: 'فشل إضافة القطعة',
    SUCCESS: 'تم إضافة القطعة بنجاح',
    REQUIRED_FIELD: 'هذا الحقل مطلوب',
    INVALID_PRICE: 'يرجى إدخال سعر صحيح',
    SELECT_MAKE_FIRST: 'يرجى اختيار الشركة المصنعة أولاً',
}

interface AddPartScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const AddPartScreen = ({navigation}: AddPartScreenProps) => {
    const theme = useTheme()
    const {createPart, loading} = useMyParts()
    const {getMakes, getModels, years} = useVehicleInfo()
    const {categories, loading: categoriesLoading} = usePartCategories()

    const [currentStep, setCurrentStep] = useState<Step>(Step.Make)
    const [originId, setOriginId] = useState<number | null>(null)
    const [makeId, setMakeId] = useState<number | null>(null)
    const [makeName, setMakeName] = useState<string>('')
    const [makeLogoUrl, setMakeLogoUrl] = useState<string | null>(null)
    const [modelId, setModelId] = useState<number | null>(null)
    const [modelName, setModelName] = useState<string>('')
    const [year, setYear] = useState<number | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [categoryName, setCategoryName] = useState<string>('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [sku, setSku] = useState('')

    const handleStepChange = (step: Step) => {
        if (step < currentStep) {
            if (step < Step.Details) {
                setName('')
                setDescription('')
                setPrice('')
                setImageUrl('')
                setSku('')
            }

            if (step < Step.Category) {
                setCategoryId(null)
                setCategoryName('')
            }

            if (step < Step.Year) {
                setYear(null)
            }

            if (step < Step.Model) {
                setModelName('')
                setModelId(null)
            }

            if (step < Step.Make) {
                setMakeName('')
                setMakeId(null)
                setMakeLogoUrl(null)
            }

            setCurrentStep(step)
        }
    }

    const handleMakeSelect = useCallback((name: string, id: string, logoUrl?: string | null) => {
        setMakeId(Number(id))
        setMakeName(name)
        setMakeLogoUrl(logoUrl ?? null)
        setModelId(null)
        setModelName('')
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }, [currentStep])

    const handleModelSelect = useCallback((name: string, id: string) => {
        setModelId(Number(id))
        setModelName(name)
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }, [currentStep])

    const handleYearSelect = useCallback((yearStr: string) => {
        setYear(Number(yearStr))
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }, [currentStep])

    const handleCategorySelect = useCallback((id: number, name: string) => {
        setCategoryId(id)
        setCategoryName(name)
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }, [currentStep])

    const handleSubmit = useCallback(async () => {
        if (!makeId || !modelId || !year || !categoryId || !name.trim() || !price.trim()) {
            Alert.alert(ARABIC_TEXT.ERROR, ARABIC_TEXT.REQUIRED_FIELD)
            return
        }

        const priceNum = parseFloat(price)
        if (isNaN(priceNum) || priceNum < 0) {
            Alert.alert(ARABIC_TEXT.ERROR, ARABIC_TEXT.INVALID_PRICE)
            return
        }

        try {
            await createPart({
                makeId,
                modelId,
                year,
                categoryId,
                name: name.trim(),
                description: description.trim() || undefined,
                price: priceNum,
                imageUrl: imageUrl.trim() || undefined,
                sku: sku.trim() || undefined,
            })

            Alert.alert(ARABIC_TEXT.SUCCESS, '', [
                {
                    text: 'موافق',
                    onPress: () => navigation?.navigate('MyParts'),
                },
            ])
        } catch (error) {
            Alert.alert(ARABIC_TEXT.ERROR, error instanceof Error ? error.message : ARABIC_TEXT.ERROR)
        }
    }, [makeId, modelId, year, categoryId, name, description, price, imageUrl, sku, createPart, navigation])

    const renderStep = () => {
        switch (currentStep) {
            case Step.Make:
                return (
                    <ManufacturerScreen
                        originId={originId}
                        getMakes={getMakes}
                        value={makeName}
                        valueId={makeId?.toString() || null}
                        onSelect={handleMakeSelect}
                        onNext={() => {}}
                    />
                )
            case Step.Model:
                if (!makeId) {
                    return (
                        <View style={styles.centered}>
                            <Text>{ARABIC_TEXT.SELECT_MAKE_FIRST}</Text>
                        </View>
                    )
                }
                return (
                    <ModelScreen
                        makeId={makeId}
                        makeName={makeName}
                        getModels={async (id: number) => getModels(id)}
                        value={modelName}
                        valueId={modelId?.toString() || null}
                        onSelect={handleModelSelect}
                        onNext={() => {}}
                    />
                )
            case Step.Year:
                return (
                    <YearScreen
                        years={years}
                        value={year?.toString() || ''}
                        onSelect={handleYearSelect}
                        onNext={() => {}}
                    />
                )
            case Step.Category:
                return (
                    <CategoryScreen
                        categories={categories}
                        loading={categoriesLoading}
                        valueId={categoryId}
                        onSelect={handleCategorySelect}
                        onNext={() => {}}
                    />
                )
            case Step.Details:
                return (
                    <AddPartDetailsForm
                        name={name}
                        description={description}
                        price={price}
                        imageUrl={imageUrl}
                        sku={sku}
                        loading={loading}
                        onNameChange={setName}
                        onDescriptionChange={setDescription}
                        onPriceChange={setPrice}
                        onImageUrlChange={setImageUrl}
                        onSkuChange={setSku}
                        onSubmit={handleSubmit}
                        navigation={navigation}
                        canSubmit={!!(makeId && modelId && year && categoryId && name.trim() && price.trim())}
                    />
                )
            default:
                return null
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <AddPartStepper currentStep={currentStep} onStepPress={handleStepChange} />
            <View style={styles.mainContent}>
                <AddPartSummaryCard
                    makeName={makeName}
                    makeLogoUrl={makeLogoUrl}
                    modelName={modelName}
                    year={year}
                    categoryName={categoryName}
                    onEdit={() => handleStepChange(Step.Make)}
                />
                <View style={{flex: 1}}>{renderStep()}</View>
            </View>
        </View>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
})
