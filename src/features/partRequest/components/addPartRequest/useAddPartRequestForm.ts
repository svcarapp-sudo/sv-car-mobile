import {useMemo, useState} from 'react'

import {showToast} from '@/global/components'
import {ApiError} from '@/global/services'
import {useAuthStore, useVehicleStore} from '@/global/store'

import {useAddPartRequest} from '../../hooks'
import type {PartRequestCondition} from '../../types'
import {Step} from './addPartRequestSteps'

export interface AddPartRequestFieldState {
    title: string
    description: string
    budgetMin: string
    budgetMax: string
    contactPhone: string
    city: string
}

const T = {
    SUCCESS: 'تم نشر طلبك بنجاح',
    ERR_BUDGET_RANGE: 'الحد الأعلى يجب أن يكون أكبر من الأدنى',
    ERR_SUBMIT: 'تعذر نشر الطلب',
}

interface UseAddPartRequestFormProps {
    onSuccess: () => void
}

export const useAddPartRequestForm = ({onSuccess}: UseAddPartRequestFormProps) => {
    const vehicle = useVehicleStore(s => s.vehicle)
    const user = useAuthStore(s => s.user)
    const {submitting, create} = useAddPartRequest()

    const [currentStep, setCurrentStep] = useState<Step>(Step.Vehicle)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [condition, setCondition] = useState<PartRequestCondition>('ANY')
    const [budgetError, setBudgetError] = useState<string | null>(null)
    const [fields, setFields] = useState<AddPartRequestFieldState>({
        title: '',
        description: '',
        budgetMin: '',
        budgetMax: '',
        contactPhone: user?.phone ?? '',
        city: user?.city ?? '',
    })

    const setField = <K extends keyof AddPartRequestFieldState>(key: K, value: AddPartRequestFieldState[K]) => {
        setFields(prev => ({...prev, [key]: value}))
        if (key === 'budgetMin' || key === 'budgetMax') setBudgetError(null)
    }

    const canProceed = useMemo(() => {
        switch (currentStep) {
            case Step.Vehicle:
                return vehicle != null
            case Step.Category:
                return categoryId != null
            case Step.Details:
                return fields.title.trim().length > 0
            case Step.Contact:
                return fields.contactPhone.trim().length >= 5
            default:
                return false
        }
    }, [currentStep, vehicle, categoryId, fields.title, fields.contactPhone])

    const submit = async () => {
        if (!vehicle || categoryId == null) return
        const minNum = fields.budgetMin ? Number(fields.budgetMin) : undefined
        const maxNum = fields.budgetMax ? Number(fields.budgetMax) : undefined
        if (minNum != null && maxNum != null && minNum > maxNum) {
            setBudgetError(T.ERR_BUDGET_RANGE)
            showToast(T.ERR_BUDGET_RANGE, 'error')
            return
        }
        try {
            await create({
                categoryId,
                makeId: vehicle.makeId ?? 0,
                modelId: vehicle.modelId ?? 0,
                year: vehicle.year,
                title: fields.title.trim(),
                description: fields.description.trim() || undefined,
                budgetMin: minNum,
                budgetMax: maxNum,
                conditionPreference: condition,
                contactPhone: fields.contactPhone.trim(),
                city: fields.city.trim() || undefined,
            })
            showToast(T.SUCCESS, 'success')
            onSuccess()
        } catch (err) {
            showToast(err instanceof ApiError ? err.message : T.ERR_SUBMIT, 'error')
        }
    }

    const handleNext = () => {
        if (!canProceed) return
        if (currentStep < Step.Contact) setCurrentStep((currentStep + 1) as Step)
        else void submit()
    }

    const handleStepChange = (step: Step) => {
        if (step < currentStep) setCurrentStep(step)
    }

    return {
        vehicle,
        currentStep,
        categoryId,
        condition,
        fields,
        budgetError,
        submitting,
        canProceed,
        setCategoryId,
        setCondition,
        setField,
        handleNext,
        handleStepChange,
    }
}
