import {useState} from 'react'
import {StyleSheet, View, Image, ScrollView} from 'react-native'
import {useTheme, Card, Text, IconButton} from 'react-native-paper'

import type {RootStackParamList} from '@/global/navigation/types'

import {useVehicles} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

import {AddVehicleStepper, Step} from './AddVehicleStepper'
import {OriginScreen} from './OriginScreen'
import {ManufacturerScreen} from './ManufacturerScreen'
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

            if (step < Step.Fuel) {
                setFuelType('')
            }

            if (step < Step.Year) {
                setYear('')
            }

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

    const handleSubmit = () => {
        setVehicle({
            make,
            model,
            year: parseInt(year, 10),
            makeLogoUrl: makeLogoUrl ?? undefined,
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
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.summaryScrollContent}
                        style={styles.summaryScroll}>
                        {make && (
                            <View style={styles.summaryItem}>
                                {makeLogoUrl ? (
                                    <View style={styles.logoCircle}>
                                        <Image source={{uri: makeLogoUrl}} style={styles.summaryLogo} resizeMode='contain' />
                                    </View>
                                ) : null}
                                <View style={styles.textGroup}>
                                    <Text variant='labelSmall' style={styles.label}>
                                        الماركة
                                    </Text>
                                    <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
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
                                        <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
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
                                        <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
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
                                        <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
                                            {fuelType}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </ScrollView>
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
            case Step.Origin:
                return (
                    <OriginScreen
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
    summaryScroll: {
        flex: 1,
        minWidth: 0,
    },
    summaryScrollContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    summaryItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        maxWidth: 160,
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
        minWidth: 0,
        maxWidth: 140,
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
