import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import type {NavigationProp, RouteProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'
import {useAppTheme, useCatalog, useVehicleApi} from '@/global/hooks'
import {AddVehicleStepper, Step} from './AddVehicleStepper'
import {AddVehicleSummaryCard} from './AddVehicleSummaryCard'
import {AddVehicleStepContent} from './AddVehicleStepContent'

interface AddVehicleScreenProps {
    navigation?: NavigationProp<RootStackParamList>
    route?: RouteProp<RootStackParamList, 'AddVehicle'>
}

export const AddVehicleScreen = ({navigation, route}: AddVehicleScreenProps) => {
    const vehicleInfo = useCatalog()
    const {createVehicle, updateVehicle, loading: submitLoading, error: submitError} = useVehicleApi()
    const theme = useAppTheme()
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
            if (editVehicleId) await updateVehicle(editVehicleId, data)
            else await createVehicle(data)
            navigation?.navigate('Home')
        } catch {}
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
                <View style={styles.contentArea}>
                    <AddVehicleStepContent
                        currentStep={currentStep}
                        vehicleInfo={vehicleInfo}
                        originId={originId}
                        make={make}
                        makeId={makeId}
                        model={model}
                        modelId={modelId}
                        year={year}
                        fuelType={fuelType}
                        vin={vin}
                        displayName={displayName}
                        submitLoading={submitLoading}
                        submitError={submitError}
                        onOriginSelect={(id, name) => {
                            setOriginId(id)
                            setOriginName(name)
                        }}
                        onMakeSelect={(name, id, logoUrl) => {
                            setMake(name)
                            setMakeId(id)
                            setMakeLogoUrl(logoUrl ?? null)
                        }}
                        onModelSelect={(name, id) => {
                            setModel(name)
                            setModelId(id)
                        }}
                        onYearSelect={setYear}
                        onFuelSelect={setFuelType}
                        onVinChange={setVin}
                        onDisplayNameChange={setDisplayName}
                        onSubmit={handleSubmit}
                        onNext={handleNext}
                    />
                </View>
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
