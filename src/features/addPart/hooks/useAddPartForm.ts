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
    const [yearFrom, setYearFrom] = useState<number | null>(null)
    const [yearTo, setYearTo] = useState<number | null>(null)
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
        if (step <= Step.Year) {
            setYearFrom(null)
            setYearTo(null)
        }
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

    const handleYearChange = useCallback((from: number | null, to: number | null) => {
        setYearFrom(from)
        setYearTo(to)
    }, [])

    const handleYearNext = () => advanceStep()

    const handleCategorySelect = useCallback((id: number, n: string) => {
        setCategoryId(id)
        setCategoryName(n)
        advanceStep()
    }, [])

    const handleSubmit = useCallback(async () => {
        if (!makeId || !modelId || !yearFrom || !categoryId || !name.trim() || !price.trim()) {
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
                compatibilities: [{makeId, modelId, yearFrom, yearTo: yearTo ?? yearFrom}],
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
    }, [makeId, modelId, yearFrom, yearTo, categoryId, name, description, price, imageUrl, sku, createPart, navigation])

    const canSubmit = !!(makeId && modelId && yearFrom && categoryId && name.trim() && price.trim())

    return {
        currentStep,
        originId,
        makeId,
        makeName,
        makeLogoUrl,
        modelId,
        modelName,
        yearFrom,
        yearTo,
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
        handleYearChange,
        handleYearNext,
        handleCategorySelect,
        handleSubmit,
    }
}
