import {useState, useEffect} from 'react'
import {StyleSheet, View, Image, ScrollView} from 'react-native'
import {useTheme, Card, Text, IconButton} from 'react-native-paper'

import type {RootStackParamList} from '@/global/navigation/types'

import {useVehicleInfo, useVehicleApi} from '../hooks'
import {useVehicleStore} from '@/global/store'

import type {NavigationProp} from '@react-navigation/native'
import type {RouteProp} from '@react-navigation/native'

import {AddVehicleStepper, Step} from './AddVehicleStepper'
import {OriginScreen} from './OriginScreen'
import {ManufacturerScreen} from './ManufacturerScreen'
import {ModelScreen} from './ModelScreen'
import {YearScreen} from './YearScreen'
import {FuelScreen} from './FuelScreen'
import {AddVinScreen} from './AddVinScreen'

interface AddVehicleScreenProps {
    navigation?: NavigationProp<RootStackParamList>
    route?: RouteProp<RootStackParamList, 'AddVehicle'>
}

export const AddVehicleScreen = ({navigation, route}: AddVehicleScreenProps) => {
    const vehicleInfo = useVehicleInfo()
    const {createVehicle, updateVehicle, loading: submitLoading, error: submitError} = useVehicleApi()
    const getVehicle = useVehicleStore(s => s.getVehicle)
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

    useEffect(() => {
        if (!editVehicleId) return
        const v = getVehicle()
        if (v?.id === editVehicleId && v.makeId != null && v.modelId != null) {
            setMake(v.make)
            setMakeId(String(v.makeId))
            setMakeLogoUrl(v.makeLogoUrl ?? null)
            setModel(v.model)
            setModelId(String(v.modelId))
            setYear(String(v.year))
            setFuelType(v.fuelType ?? '')
            setVin(v.vin ?? '')
            setDisplayName(v.displayName ?? '')
        }
    }, [editVehicleId, getVehicle])

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

    const handleSubmit = async () => {
        const makeIdNum = makeId ? Number(makeId) : null
        const modelIdNum = modelId ? Number(modelId) : null
        if (makeIdNum == null || modelIdNum == null || !year.trim()) {
            return
        }
        const payload = {
            makeId: makeIdNum,
            modelId: modelIdNum,
            year: parseInt(year, 10),
            fuelType: fuelType || undefined,
            vin: vin.trim() || undefined,
            displayName: displayName.trim() || undefined,
        }
        try {
            if (editVehicleId) {
                await updateVehicle(editVehicleId, payload)
            } else {
                await createVehicle(payload)
            }
            navigation?.goBack()
        } catch {
            // Error state is set in useVehicleApi
        }
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
                return (
                    <YearScreen
                        years={vehicleInfo.years}
                        value={year}
                        onSelect={setYear}
                        onNext={handleNext}
                    />
                )
            case Step.Fuel:
                return (
                    <FuelScreen
                        fuelTypes={vehicleInfo.fuelTypes}
                        value={fuelType}
                        onSelect={setFuelType}
                        onNext={handleNext}
                    />
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
