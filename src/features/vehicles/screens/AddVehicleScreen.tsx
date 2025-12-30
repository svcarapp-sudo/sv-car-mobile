import {useState} from 'react'

import {ScrollView, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native'

import {TextInput, Button, Text, Card, ProgressBar, List, IconButton, useTheme} from 'react-native-paper'

import type {RootStackParamList} from '@/shared/navigation/types'

import {useVehicles, useVehicleInfo} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

const ARABIC_TEXT = {
    STEPS: {
        BRAND: 'الماركة',
        MODEL: 'الموديل',
        YEAR: 'السنة',
        FUEL: 'الوقود',
        ENGINE: 'المحرك',
        VIN: 'رقم الهيكل',
    },
    SELECT_MANUFACTURER: 'اختر الشركة المصنعة',
    SEARCH_BRANDS: 'ابحث عن العلامات التجارية...',
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (make: string) => `لسيارة ${make}`,
    PRODUCTION_YEAR: 'سنة الصنع',
    FUEL_TYPE: 'نوع الوقود',
    ENGINE_INFO: 'معلومات المحرك',
    SELECT_ENGINE_DESC: 'اختر سعة المحرك أو النوع',
    ALMOST_DONE: 'أوشكنا على الانتهاء!',
    FINAL_DETAILS_DESC: (year: string, make: string, model: string) => `أضف التفاصيل النهائية لسيارتك ${year} ${make} ${model}`,
    VIN_LABEL: 'رقم الهيكل (اختياري)',
    VIN_PLACEHOLDER: 'رقم تعريف المركبة',
    NICKNAME_LABEL: 'اسم مستعار (اختياري)',
    NICKNAME_PLACEHOLDER: 'مثلاً، سيارتي اليومية',
    SUMMARY: 'الملخص',
    VEHICLE_LABEL: 'المركبة:',
    ENGINE_LABEL: 'المحرك:',
    SUBMIT_BUTTON: 'تأكيد وإضافة المركبة',
    BACK_BUTTON: 'رجوع',
}

interface AddVehicleScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

enum Step {
    Manufacturer = 0,
    Model = 1,
    Year = 2,
    Fuel = 3,
    Engine = 4,
    Details = 5,
}

const STEPS_INFO = [
    {label: ARABIC_TEXT.STEPS.BRAND, icon: 'car-outline'},
    {label: ARABIC_TEXT.STEPS.MODEL, icon: 'car-info'},
    {label: ARABIC_TEXT.STEPS.YEAR, icon: 'calendar'},
    {label: ARABIC_TEXT.STEPS.FUEL, icon: 'gas-station'},
    {label: ARABIC_TEXT.STEPS.ENGINE, icon: 'engine-outline'},
    {label: ARABIC_TEXT.STEPS.VIN, icon: 'numeric'},
]

export const AddVehicleScreen = ({navigation}: AddVehicleScreenProps) => {
    const {setVehicle} = useVehicles()
    const {manufacturers, fuelTypes, years, commonEngines, getModels} = useVehicleInfo()
    const theme = useTheme()
    const [currentStep, setCurrentStep] = useState<Step>(Step.Manufacturer)
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [fuelType, setFuelType] = useState('')
    const [engine, setEngine] = useState('')
    const [vin, setVin] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [models, setModels] = useState<string[]>([])

    const progress = (currentStep + 1) / STEPS_INFO.length

    const handleNext = async () => {
        if (currentStep === Step.Manufacturer && make) {
            const fetchedModels = await getModels(make)
            setModels(fetchedModels)
        }

        if (currentStep < Step.Details) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > Step.Manufacturer) {
            setCurrentStep(currentStep - 1)
        } else {
            navigation?.goBack()
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

    const renderStepper = () => (
        <View style={[styles.stepperContainer, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.outline}]}>
            <View style={styles.stepperHeader}>
                {STEPS_INFO.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    let color = theme.colors.outline

                    if (isActive) {
                        color = theme.colors.primary
                    } else if (isCompleted) {
                        color = theme.colors.secondary
                    }

                    return (
                        <View key={step.label} style={styles.stepItem}>
                            <IconButton
                                icon={step.icon}
                                size={20}
                                iconColor={color}
                                style={[styles.stepIcon, isActive && {backgroundColor: theme.colors.primaryContainer}]}
                            />
                            <Text variant='labelSmall' style={{color, fontWeight: isActive ? 'bold' : 'normal'}}>
                                {step.label}
                            </Text>
                        </View>
                    )
                })}
            </View>
            <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
        </View>
    )

    const renderManufacturer = () => {
        const filteredMakes = manufacturers.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))

        return (
            <View style={styles.stepContent}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.SELECT_MANUFACTURER}
                </Text>
                <TextInput
                    placeholder={ARABIC_TEXT.SEARCH_BRANDS}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    mode='outlined'
                    left={<TextInput.Icon icon='magnify' />}
                    style={styles.searchInput}
                />
                <ScrollView style={styles.listContainer}>
                    {filteredMakes.map(m => (
                        <List.Item
                            key={m.name}
                            title={m.name}
                            left={props => <List.Icon {...props} icon='chevron-left' />}
                            onPress={async () => {
                                setMake(m.name)
                                const fetchedModels = await getModels(m.name)
                                setModels(fetchedModels)
                                setCurrentStep(Step.Model)
                            }}
                            style={[styles.listItem, make === m.name && {backgroundColor: theme.colors.primaryContainer}]}
                        />
                    ))}
                </ScrollView>
            </View>
        )
    }

    const renderModel = () => {
        return (
            <View style={styles.stepContent}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.SELECT_MODEL}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.FOR_MAKE(make)}
                </Text>
                <ScrollView style={styles.listContainer}>
                    {models.map(m => (
                        <List.Item
                            key={m}
                            title={m}
                            onPress={() => {
                                setModel(m)
                                handleNext()
                            }}
                            style={[styles.listItem, model === m && {backgroundColor: theme.colors.primaryContainer}]}
                        />
                    ))}
                </ScrollView>
            </View>
        )
    }

    const renderYear = () => (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.PRODUCTION_YEAR}
            </Text>
            <FlatList
                data={years.map(String)}
                numColumns={3}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[
                            styles.yearItem,
                            {backgroundColor: theme.colors.surfaceVariant},
                            year === item && {borderColor: theme.colors.primary, borderWidth: 2},
                        ]}
                        onPress={() => {
                            setYear(item)
                            handleNext()
                        }}>
                        <Text variant='titleMedium' style={{color: theme.colors.onSurfaceVariant}}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.yearGrid}
            />
        </View>
    )

    const renderFuel = () => (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.FUEL_TYPE}
            </Text>
            <View style={styles.fuelContainer}>
                {fuelTypes.map(f => (
                    <Card
                        key={f.id}
                        style={[
                            styles.fuelCard,
                            {backgroundColor: theme.colors.surface},
                            fuelType === f.name && {backgroundColor: theme.colors.primaryContainer},
                        ]}
                        onPress={() => {
                            setFuelType(f.name)
                            handleNext()
                        }}>
                        <Card.Content style={styles.fuelCardContent}>
                            <IconButton icon={f.icon} size={32} iconColor={theme.colors.primary} />
                            <Text variant='titleMedium' style={{color: theme.colors.onSurface}}>
                                {f.name}
                            </Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    )

    const renderEngine = () => (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.ENGINE_INFO}
            </Text>
            <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.SELECT_ENGINE_DESC}
            </Text>
            <View style={styles.commonEngines}>
                {commonEngines.map(e => (
                    <Button
                        key={e}
                        mode={engine === e ? 'contained' : 'outlined'}
                        style={styles.chipButton}
                        onPress={() => {
                            setEngine(e)
                            handleNext()
                        }}>
                        {e}
                    </Button>
                ))}
            </View>
        </View>
    )

    const renderDetails = () => (
        <ScrollView style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.ALMOST_DONE}
            </Text>
            <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.FINAL_DETAILS_DESC(year, make, model)}
            </Text>

            <TextInput
                label={ARABIC_TEXT.VIN_LABEL}
                value={vin}
                onChangeText={setVin}
                mode='outlined'
                style={styles.input}
                placeholder={ARABIC_TEXT.VIN_PLACEHOLDER}
            />

            <TextInput
                label={ARABIC_TEXT.NICKNAME_LABEL}
                value={displayName}
                onChangeText={setDisplayName}
                mode='outlined'
                style={styles.input}
                placeholder={ARABIC_TEXT.NICKNAME_PLACEHOLDER}
            />

            <Card style={[styles.summaryCard, {backgroundColor: theme.colors.surfaceVariant}]}>
                <Card.Title
                    title={ARABIC_TEXT.SUMMARY}
                    titleStyle={{color: theme.colors.onSurfaceVariant}}
                    left={props => <List.Icon {...props} icon='information' color={theme.colors.primary} />}
                />
                <Card.Content>
                    <Text style={{color: theme.colors.onSurfaceVariant}}>
                        <Text style={{fontWeight: 'bold'}}>{ARABIC_TEXT.VEHICLE_LABEL}</Text> {year} {make} {model}
                    </Text>
                    <Text style={{color: theme.colors.onSurfaceVariant}}>
                        <Text style={{fontWeight: 'bold'}}>{ARABIC_TEXT.ENGINE_LABEL}</Text> {engine} ({fuelType})
                    </Text>
                </Card.Content>
            </Card>

            <Button mode='contained' onPress={handleSubmit} style={styles.submitButton}>
                {ARABIC_TEXT.SUBMIT_BUTTON}
            </Button>
        </ScrollView>
    )

    const renderContent = () => {
        switch (currentStep) {
            case Step.Manufacturer:
                return renderManufacturer()
            case Step.Model:
                return renderModel()
            case Step.Year:
                return renderYear()
            case Step.Fuel:
                return renderFuel()
            case Step.Engine:
                return renderEngine()
            case Step.Details:
                return renderDetails()
            default:
                return null
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            {renderStepper()}
            <View style={styles.mainContent}>
                {renderContent()}
                {currentStep > Step.Manufacturer && (
                    <Button mode='text' onPress={handleBack} style={styles.backButton}>
                        {ARABIC_TEXT.BACK_BUTTON}
                    </Button>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stepperContainer: {
        paddingTop: 16,
    },
    stepperHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
    },
    stepIcon: {
        margin: 0,
    },
    progressBar: {
        height: 4,
    },
    mainContent: {
        flex: 1,
        padding: 16,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
    stepSubtitle: {
        marginBottom: 16,
    },
    searchInput: {
        marginBottom: 16,
    },
    listContainer: {
        flex: 1,
    },
    listItem: {
        borderRadius: 8,
        marginVertical: 2,
    },
    customInput: {
        backgroundColor: 'transparent',
        marginTop: 8,
    },
    yearGrid: {
        paddingBottom: 24,
    },
    yearItem: {
        flex: 1,
        aspectRatio: 1.5,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    fuelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    fuelCard: {
        width: '47%',
        marginBottom: 8,
    },
    fuelCardContent: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    input: {
        marginBottom: 16,
    },
    commonEngines: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
    },
    chipButton: {
        borderRadius: 20,
    },
    nextButton: {
        marginTop: 'auto',
        paddingVertical: 6,
    },
    submitButton: {
        marginTop: 24,
        paddingVertical: 8,
    },
    backButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
    summaryCard: {
        marginTop: 16,
    },
})
