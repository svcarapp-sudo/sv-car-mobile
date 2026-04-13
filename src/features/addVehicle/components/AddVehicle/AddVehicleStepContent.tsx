import {MakeScreen, ModelScreen, YearScreen} from '@/global/components'
import type {useCatalog} from '@/global/hooks'

import {Step} from './AddVehicleStepper'
import {OriginScreen} from '../origin'
import {FuelScreen} from '../FuelScreen'
import {AddVinScreen} from '../addVin'

interface AddVehicleStepContentProps {
    currentStep: Step
    vehicleInfo: ReturnType<typeof useCatalog>
    originId: number | null
    make: string
    makeId: string | null
    model: string
    modelId: string | null
    year: string
    fuelType: string
    vin: string
    displayName: string
    submitLoading: boolean
    submitError: string | null
    onOriginSelect: (id: number, name: string) => void
    onMakeSelect: (name: string, id: string, logoUrl?: string | null) => void
    onModelSelect: (name: string, id: string) => void
    onYearSelect: (year: string) => void
    onFuelSelect: (fuel: string) => void
    onVinChange: (vin: string) => void
    onDisplayNameChange: (name: string) => void
    onSubmit: () => void
    onNext: () => void
}

export const AddVehicleStepContent = ({
    currentStep,
    vehicleInfo,
    originId,
    make,
    makeId,
    model,
    modelId,
    year,
    fuelType,
    vin,
    displayName,
    submitLoading,
    submitError,
    onOriginSelect,
    onMakeSelect,
    onModelSelect,
    onYearSelect,
    onFuelSelect,
    onVinChange,
    onDisplayNameChange,
    onSubmit,
    onNext,
}: AddVehicleStepContentProps) => {
    switch (currentStep) {
        case Step.Origin:
            return (
                <OriginScreen
                    origins={vehicleInfo.origins}
                    loading={vehicleInfo.originsLoading}
                    value={originId}
                    onSelect={onOriginSelect}
                    onNext={onNext}
                />
            )
        case Step.Make:
            return (
                <MakeScreen
                    originId={originId}
                    getMakes={vehicleInfo.getMakes}
                    value={make}
                    valueId={makeId}
                    onSelect={onMakeSelect}
                    onNext={onNext}
                />
            )
        case Step.Model:
            return (
                <ModelScreen
                    makeId={makeId ? Number(makeId) : null}
                    makeName={make}
                    getModels={vehicleInfo.getModels}
                    value={model}
                    valueId={modelId}
                    onSelect={onModelSelect}
                    onNext={onNext}
                />
            )
        case Step.Year:
            return <YearScreen years={vehicleInfo.years} value={year} onSelect={onYearSelect} onNext={onNext} />
        case Step.Fuel:
            return <FuelScreen fuelTypes={vehicleInfo.fuelTypes} value={fuelType} onSelect={onFuelSelect} onNext={onNext} />
        case Step.Details:
            return (
                <AddVinScreen
                    vin={vin}
                    displayName={displayName}
                    onVinChange={onVinChange}
                    onDisplayNameChange={onDisplayNameChange}
                    onSubmit={onSubmit}
                    loading={submitLoading}
                    error={submitError}
                />
            )
        default:
            return null
    }
}
