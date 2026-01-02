import {useState} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {useTheme, Card, Text, IconButton} from 'react-native-paper'

import type {RootStackParamList} from '@/shared/navigation/types'

import {useVehicles} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

import {AddVehicleStepper, Step} from './AddVehicleStepper'
import {ManufacturerScreen, getLogoUrl} from './ManufacturerScreen'
import {ModelScreen} from './ModelScreen'
import {YearScreen} from './YearScreen'
import {FuelScreen} from './FuelScreen'
import {AddVinScreen} from './AddVinScreen'

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
    const [vin, setVin] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleNext = () => {
        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleStepChange = (step: Step) => {
        // Only allow going back to previous steps, not forward
        if (step < currentStep) {
            // Clear states of subsequent steps
            if (step < Step.Details) {
                setVin('')
                setDisplayName('')
            }

            if (step < Step.Fuel) {
                setFuelType('')
            }

            if (step < Step.Year) {
                setYear('')
            }

            if (step < Step.Model) {
                setModel('')
            }

            if (step < Step.Manufacturer) {
                setMake('')
            }

            setCurrentStep(step)
        }
    }

    const handleSubmit = () => {
        setVehicle({
            make,
            model,
            year: parseInt(year, 10),
            fuelType,
            vin: vin.trim() || undefined,
            displayName: displayName.trim() || undefined,
        })
        navigation?.goBack()
    }

    const renderSummaryCard = () => {
        if (!make && !model && !year && !fuelType) {
            return null
        }

        return (
            <Card style={styles.summaryCard} mode='outlined'>
                <Card.Content style={styles.summaryContent}>
                    <View style={styles.summaryInfo}>
                        {make && (
                            <View style={styles.summaryItem}>
                                <View style={styles.logoCircle}>
                                    <Image source={{uri: getLogoUrl(make)}} style={styles.summaryLogo} resizeMode='contain' />
                                </View>
                                <View style={styles.textGroup}>
                                    <Text variant='labelSmall' style={styles.label}>
                                        الماركة
                                    </Text>
                                    <Text variant='titleSmall' style={styles.value}>
                                        {make}
                                    </Text>
                                </View>
                            </View>
                        )}

                        {model && (
                            <>
                                <View style={styles.divider} />
                                <View style={styles.summaryItem}>
                                    <View style={styles.textGroup}>
                                        <Text variant='labelSmall' style={styles.label}>
                                            الموديل
                                        </Text>
                                        <Text variant='titleSmall' style={styles.value}>
                                            {model}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}

                        {year && (
                            <>
                                <View style={styles.divider} />
                                <View style={styles.summaryItem}>
                                    <View style={styles.textGroup}>
                                        <Text variant='labelSmall' style={styles.label}>
                                            السنة
                                        </Text>
                                        <Text variant='titleSmall' style={styles.value}>
                                            {year}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}

                        {fuelType && (
                            <>
                                <View style={styles.divider} />
                                <View style={styles.summaryItem}>
                                    <View style={styles.textGroup}>
                                        <Text variant='labelSmall' style={styles.label}>
                                            الوقود
                                        </Text>
                                        <Text variant='titleSmall' style={styles.value}>
                                            {fuelType}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                    <IconButton
                        icon='pencil-outline'
                        size={20}
                        onPress={() => handleStepChange(Step.Manufacturer)}
                        style={styles.editButton}
                    />
                </Card.Content>
            </Card>
        )
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
            case Step.Details:
                return (
                    <AddVinScreen
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
            <View style={styles.mainContent}>
                {renderSummaryCard()}
                <View style={{flex: 1}}>{renderContent()}</View>
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
    summaryCard: {
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderColor: '#E2E8F0',
    },
    summaryContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    summaryInfo: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    summaryItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    logoCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    summaryLogo: {
        width: 20,
        height: 20,
    },
    textGroup: {
        alignItems: 'flex-end',
    },
    label: {
        color: '#64748B',
        fontSize: 10,
    },
    value: {
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 16,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 12,
    },
    editButton: {
        margin: 0,
        marginRight: 'auto',
    },
})
