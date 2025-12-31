import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useTheme} from 'react-native-paper'

import type {RootStackParamList} from '@/shared/navigation/types'

import {useVehicles} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

import {AddVehicleStepper, Step} from './AddVehicleStepper'
import {ManufacturerScreen} from './ManufacturerScreen'
import {ModelScreen} from './ModelScreen'
import {YearScreen} from './YearScreen'
import {FuelScreen} from './FuelScreen'
import {EngineScreen} from './EngineScreen'
import {DetailsScreen} from './DetailsScreen'

interface AddVehicleScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const AddVehicleScreen = ({navigation}: AddVehicleScreenProps) => {
    const {setVehicle} = useVehicles()
    const theme = useTheme()
    const [currentStep, setCurrentStep] = useState<Step>(Step.Manufacturer)
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [fuelType, setFuelType] = useState('')
    const [engine, setEngine] = useState('')
    const [vin, setVin] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleNext = () => {
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleStepChange = (step: Step) => {
        // Only allow going back to previous steps, not forward
        if (step <= currentStep) {
            setCurrentStep(step)
        }
    }

    const handleSubmit = () => {
        setVehicle({
            make,
            model,
            year: parseInt(year, 10),
            fuelType,
            engine,
            vin: vin.trim() || undefined,
            displayName: displayName.trim() || undefined,
        })
        navigation?.goBack()
    }

    const renderContent = () => {
        switch (currentStep) {
            case Step.Manufacturer:
                return <ManufacturerScreen value={make} onSelect={setMake} onNext={handleNext} />
            case Step.Model:
                return <ModelScreen make={make} value={model} onSelect={setModel} onNext={handleNext} />
            case Step.Year:
                return <YearScreen value={year} onSelect={setYear} onNext={handleNext} />
            case Step.Fuel:
                return <FuelScreen value={fuelType} onSelect={setFuelType} onNext={handleNext} />
            case Step.Engine:
                return <EngineScreen value={engine} onSelect={setEngine} onNext={handleNext} />
            case Step.Details:
                return (
                    <DetailsScreen
                        make={make}
                        model={model}
                        year={year}
                        fuelType={fuelType}
                        engine={engine}
                        vin={vin}
                        displayName={displayName}
                        onVinChange={setVin}
                        onDisplayNameChange={setDisplayName}
                        onSubmit={handleSubmit}
                    />
                )
            default:
                return null
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <AddVehicleStepper currentStep={currentStep} onStepPress={handleStepChange} />
            <View style={styles.mainContent}>{renderContent()}</View>
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
})
