import {useState} from 'react'

import {showToast} from '@/global/components'
import {useVehicleApi} from '@/global/hooks'
import {ApiError} from '@/global/services'

import {Step} from './addVehicleConstants'

const ARABIC_TEXT = {
    VEHICLE_ADDED: 'تمت إضافة المركبة بنجاح',
    VEHICLE_UPDATED: 'تم تحديث المركبة',
    SAVE_ERROR: 'تعذر حفظ المركبة',
}

interface UseAddVehicleFormProps {
    editVehicleId?: string
    onSuccess: () => void
}

export const useAddVehicleForm = ({editVehicleId, onSuccess}: UseAddVehicleFormProps) => {
    const {createVehicle, updateVehicle, loading: submitLoading, error: submitError} = useVehicleApi()

    const [currentStep, setCurrentStep] = useState<Step>(Step.Origin)
    const [originId, setOriginId] = useState<number | null>(null)
    const [originName, setOriginName] = useState('')
    const [make, setMake] = useState('')
    const [makeId, setMakeId] = useState<string | null>(null)
    const [makeLogoUrl, setMakeLogoUrl] = useState<string | null>(null)
    const [model, setModel] = useState('')
    const [modelId, setModelId] = useState<string | null>(null)
    const [year, setYear] = useState('')
    const [fuelType, setFuelType] = useState('')

    const handleNext = () => {
        if (currentStep < Step.Fuel) setCurrentStep(currentStep + 1)
    }

    const handleStepChange = (step: Step) => {
        if (step >= currentStep) return
        if (step < Step.Fuel) setFuelType('')
        if (step < Step.Year) setYear('')
        if (step < Step.Model) {
            setModel('')
            setModelId(null)
        }
        if (step < Step.Make) {
            setMake('')
            setMakeId(null)
            setMakeLogoUrl(null)
        }
        if (step < Step.Origin) {
            setOriginId(null)
            setOriginName('')
        }
        setCurrentStep(step)
    }

    const handleSubmit = async (selectedFuel: string) => {
        if (!makeId || !modelId || !year) return
        try {
            const data = {
                makeId: Number(makeId),
                modelId: Number(modelId),
                year: Number(year),
                fuelType: selectedFuel || null,
            }
            if (editVehicleId) await updateVehicle(editVehicleId, data)
            else await createVehicle(data)
            showToast(editVehicleId ? ARABIC_TEXT.VEHICLE_UPDATED : ARABIC_TEXT.VEHICLE_ADDED, 'success')
            onSuccess()
        } catch (err) {
            showToast(err instanceof ApiError ? err.message : ARABIC_TEXT.SAVE_ERROR, 'error')
        }
    }

    const selectOrigin = (id: number, name: string) => {
        setOriginId(id)
        setOriginName(name)
    }

    const selectMake = (name: string, id: string, logoUrl?: string | null) => {
        setMake(name)
        setMakeId(id)
        setMakeLogoUrl(logoUrl ?? null)
    }

    const selectModel = (name: string, id: string) => {
        setModel(name)
        setModelId(id)
    }

    const selectFuelAndSubmit = (fuel: string) => {
        setFuelType(fuel)
        return handleSubmit(fuel)
    }

    return {
        currentStep,
        originId,
        originName,
        make,
        makeId,
        makeLogoUrl,
        model,
        modelId,
        year,
        fuelType,
        submitLoading,
        submitError,
        handleNext,
        handleStepChange,
        selectOrigin,
        selectMake,
        selectModel,
        setYear,
        selectFuelAndSubmit,
    }
}
