import {useCallback, useState} from 'react'
import type {NavigationProp} from '@react-navigation/native'

import {showToast} from '@/global/components'
import {useCatalog} from '@/global/hooks'
import {Step} from '../components/addPart/addPartConstants'
import type {RootStackParamList} from '@/global/navigation/types'
import {useAddPart} from './useAddPart'

const ARABIC_TEXT = {
    ERROR: 'فشل إضافة القطعة',
    SUCCESS_MSG: 'تمت إضافة القطعة بنجاح',
    REQUIRED_FIELD: 'يرجى تعبئة اسم القطعة والسعر',
    INVALID_PRICE: 'يرجى إدخال سعر صحيح',
}

export const useAddPartForm = (navigation?: NavigationProp<RootStackParamList>) => {
    const {createPart, loading} = useAddPart()
    const {getMakes, getModels, years, categories, categoriesLoading} = useCatalog()

    const [currentStep, setCurrentStep] = useState<Step>(Step.Make)
    const [originId] = useState<number | null>(null)
    const [makeId, setMakeId] = useState<number | null>(null)
    const [makeName, setMakeName] = useState('')
    const [makeLogoUrl, setMakeLogoUrl] = useState<string | null>(null)
    const [modelId, setModelId] = useState<number | null>(null)
    const [modelName, setModelName] = useState('')
    const [year, setYear] = useState<number | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [categoryName, setCategoryName] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [sku, setSku] = useState('')

    const resetFrom = (step: Step) => {
        if (step <= Step.Details) {
            setName('')
            setDescription('')
            setPrice('')
            setImageUrl('')
            setSku('')
        }
        if (step <= Step.Category) {
            setCategoryId(null)
            setCategoryName('')
        }
        if (step <= Step.Year) setYear(null)
        if (step <= Step.Model) {
            setModelId(null)
            setModelName('')
        }
        if (step <= Step.Make) {
            setMakeId(null)
            setMakeName('')
            setMakeLogoUrl(null)
        }
    }

    const handleStepChange = (step: Step) => {
        if (step < currentStep) {
            resetFrom(step)
            setCurrentStep(step)
        }
    }

    const advanceStep = () => {
        if (currentStep < Step.Details) setCurrentStep(prev => prev + 1)
    }

    const handleMakeSelect = useCallback((n: string, id: string, logoUrl?: string | null) => {
        setMakeId(Number(id))
        setMakeName(n)
        setMakeLogoUrl(logoUrl ?? null)
        setModelId(null)
        setModelName('')
        advanceStep()
    }, [])

    const handleModelSelect = useCallback((n: string, id: string) => {
        setModelId(Number(id))
        setModelName(n)
        advanceStep()
    }, [])

    const handleYearSelect = useCallback((yearStr: string) => {
        setYear(Number(yearStr))
        advanceStep()
    }, [])

    const handleCategorySelect = useCallback((id: number, n: string) => {
        setCategoryId(id)
        setCategoryName(n)
        advanceStep()
    }, [])

    const handleSubmit = useCallback(async () => {
        if (!makeId || !modelId || !year || !categoryId || !name.trim() || !price.trim()) {
            showToast(ARABIC_TEXT.REQUIRED_FIELD, 'error')
            return
        }
        const priceNum = parseFloat(price)
        if (isNaN(priceNum) || priceNum < 0) {
            showToast(ARABIC_TEXT.INVALID_PRICE, 'error')
            return
        }
        try {
            await createPart({
                compatibilities: [{makeId, modelId, yearFrom: year, yearTo: year}],
                categoryId,
                name: name.trim(),
                description: description.trim() || undefined,
                price: priceNum,
                imageUrl: imageUrl.trim() || undefined,
                sku: sku.trim() || undefined,
            })
            showToast(ARABIC_TEXT.SUCCESS_MSG, 'success')
            navigation?.navigate('MyParts')
        } catch (err) {
            showToast(err instanceof Error ? err.message : ARABIC_TEXT.ERROR, 'error')
        }
    }, [makeId, modelId, year, categoryId, name, description, price, imageUrl, sku, createPart, navigation])

    const canSubmit = !!(makeId && modelId && year && categoryId && name.trim() && price.trim())

    return {
        currentStep,
        originId,
        makeId,
        makeName,
        makeLogoUrl,
        modelId,
        modelName,
        year,
        categoryId,
        categoryName,
        name,
        description,
        price,
        imageUrl,
        sku,
        loading,
        categories,
        categoriesLoading,
        getMakes,
        getModels,
        years,
        canSubmit,
        setName,
        setDescription,
        setPrice,
        setImageUrl,
        setSku,
        handleStepChange,
        handleMakeSelect,
        handleModelSelect,
        handleYearSelect,
        handleCategorySelect,
        handleSubmit,
    }
}
