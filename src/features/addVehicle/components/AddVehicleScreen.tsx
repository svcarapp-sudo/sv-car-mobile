import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useTheme} from 'react-native-paper'

import type {RootStackParamList} from '@/global/navigation/types'

import {useVehicleInfo, useVehicleApi} from '@/global/hooks'
import {ManufacturerScreen, ModelScreen, YearScreen} from '@/global/components'

import type {NavigationProp} from '@react-navigation/native'
import type {RouteProp} from '@react-navigation/native'

import {AddVehicleStepper, Step} from './AddVehicleStepper'
import {OriginScreen} from './OriginScreen'
import {FuelScreen} from './FuelScreen'
import {AddVinScreen} from './AddVinScreen'
import {AddVehicleSummaryCard} from './AddVehicleSummaryCard'

interface AddVehicleScreenProps {
    navigation?: NavigationProp<RootStackParamList>
    route?: RouteProp<RootStackParamList, 'AddVehicle'>
}

export const AddVehicleScreen = ({navigation, route}: AddVehicleScreenProps) => {
    const vehicleInfo = useVehicleInfo()
    const {createVehicle, updateVehicle, loading: submitLoading, error: submitError} = useVehicleApi()
    const theme = useTheme()
    const editVehicleId = route?.params?.vehicleId
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
    const [vin, setVin] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleNext = () => {
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleStepChange = (step: Step) => {
        if (step < currentStep) {
            if (step < Step.Details) {
                setVin('')
                setDisplayName('')
            }
            if (step < Step.Fuel) setFuelType('')
            if (step < Step.Year) setYear('')
            if (step < Step.Model) {
                setModel('')
                setModelId(null)
            }
            if (step < Step.Manufacturer) {
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
    }

    const handleSubmit = async () => {
        if (!makeId || !modelId || !year) return

        try {
            const data = {
                makeId: Number(makeId),
                modelId: Number(modelId),
                year: Number(year),
                fuelType: fuelType || null,
                vin: vin || null,
                displayName: displayName || null,
            }

            if (editVehicleId) {
                await updateVehicle(editVehicleId, data)
            } else {
                await createVehicle(data)
            }

            navigation?.navigate('Home')
        } catch {
            // Error state is set in useVehicleApi
        }
    }

    const renderContent = () => {
        switch (currentStep) {
            case Step.Origin:
                return (
                    <OriginScreen
                        origins={vehicleInfo.origins}
                        loading={vehicleInfo.loading}
                        value={originId}
                        onSelect={(id, name) => {
                            setOriginId(id)
                            setOriginName(name)
                        }}
                        onNext={handleNext}
                    />
                )
            case Step.Manufacturer:
                return (
                    <ManufacturerScreen
                        originId={originId}
                        getMakes={vehicleInfo.getMakes}
                        value={make}
                        valueId={makeId}
                        onSelect={(name, id, logoUrl) => {
                            setMake(name)
                            setMakeId(id)
                            setMakeLogoUrl(logoUrl ?? null)
                        }}
                        onNext={handleNext}
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
                        onSelect={(name, id) => {
                            setModel(name)
                            setModelId(id)
                        }}
                        onNext={handleNext}
                    />
                )
            case Step.Year:
                return <YearScreen years={vehicleInfo.years} value={year} onSelect={setYear} onNext={handleNext} />
            case Step.Fuel:
                return (
                    <FuelScreen fuelTypes={vehicleInfo.fuelTypes} value={fuelType} onSelect={setFuelType} onNext={handleNext} />
                )
            case Step.Details:
                return (
                    <AddVinScreen
                        vin={vin}
                        displayName={displayName}
                        onVinChange={setVin}
                        onDisplayNameChange={setDisplayName}
                        onSubmit={handleSubmit}
                        loading={submitLoading}
                        error={submitError}
                    />
                )
            default:
                return null
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <AddVehicleStepper currentStep={currentStep} onStepPress={handleStepChange} />
            <View style={styles.mainContent}>
                <AddVehicleSummaryCard
                    currentStep={currentStep}
                    originName={originName}
                    make={make}
                    makeLogoUrl={makeLogoUrl}
                    model={model}
                    year={year}
                    fuelType={fuelType}
                    onStepPress={handleStepChange}
                />
                <View style={styles.contentArea}>{renderContent()}</View>
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    contentArea: {
        flex: 1,
    },
})
