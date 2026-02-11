import {useState, useEffect, useCallback} from 'react'
import {StyleSheet, View, ScrollView, Alert} from 'react-native'
import {Text, TextInput, Button, useTheme, ActivityIndicator, Card} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useMyParts} from '../hooks/useMyParts'
import {useVehicleInfo} from '@/global/hooks'
import {ManufacturerScreen, ModelScreen, YearScreen} from '@/global/components'
import type {RootStackParamList} from '@/global/navigation/types'
import type {Part} from '@/global/types'

const ARABIC_TEXT = {
    TITLE: 'تعديل قطعة غيار',
    SELECT_VEHICLE: 'المركبة',
    MAKE: 'الشركة المصنعة',
    MODEL: 'الموديل',
    YEAR: 'السنة',
    PART_NAME: 'اسم القطعة',
    PART_NAME_PLACEHOLDER: 'مثال: فرامل أمامية',
    DESCRIPTION: 'الوصف',
    DESCRIPTION_PLACEHOLDER: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر',
    PRICE_PLACEHOLDER: '0.00',
    IMAGE_URL: 'رابط الصورة (اختياري)',
    IMAGE_URL_PLACEHOLDER: 'https://example.com/image.jpg',
    SKU: 'رمز القطعة (اختياري)',
    SKU_PLACEHOLDER: 'BP-001',
    SUBMIT: 'حفظ التعديلات',
    CANCEL: 'إلغاء',
    LOADING: 'جاري التحميل...',
    SAVING: 'جاري الحفظ...',
    SUCCESS: 'تم تحديث القطعة بنجاح',
    ERROR: 'فشل تحديث القطعة',
    REQUIRED_FIELD: 'هذا الحقل مطلوب',
    INVALID_PRICE: 'يرجى إدخال سعر صحيح',
    SELECT_MAKE_FIRST: 'يرجى اختيار الشركة المصنعة أولاً',
    SELECT_MODEL_FIRST: 'يرجى اختيار الموديل أولاً',
    SELECT_YEAR_FIRST: 'يرجى اختيار السنة أولاً',
}

type Step = 'make' | 'model' | 'year' | 'details'

interface EditPartScreenProps {
    route?: RouteProp<RootStackParamList, 'EditPart'>
    navigation?: NavigationProp<RootStackParamList>
}

export const EditPartScreen = ({route, navigation}: EditPartScreenProps) => {
    const theme = useTheme()
    const partId = route?.params?.partId
    const {parts, loading: partsLoading, updatePart, loading: saving} = useMyParts()
    const {getMakes, getModels, years} = useVehicleInfo()

    const [part, setPart] = useState<Part | null>(null)
    const [step, setStep] = useState<Step>('details')
    const [originId, setOriginId] = useState<number | null>(null)
    const [makeId, setMakeId] = useState<number | null>(null)
    const [makeName, setMakeName] = useState<string>('')
    const [modelId, setModelId] = useState<number | null>(null)
    const [modelName, setModelName] = useState<string>('')
    const [year, setYear] = useState<number | null>(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [sku, setSku] = useState('')

    useEffect(() => {
        if (partId && parts.length > 0) {
            const foundPart = parts.find(p => p.id === partId)
            if (foundPart) {
                setPart(foundPart)
                // Extract make/model/year from compatibleVehicles if available
                const compat = foundPart.compatibleVehicles?.[0]
                if (compat) {
                    setMakeName(compat.make || '')
                    setModelName(compat.model || '')
                    setYear(compat.yearFrom || compat.yearTo || null)
                }
                setName(foundPart.name)
                setDescription(foundPart.description || '')
                setPrice(foundPart.price.toString())
                setImageUrl(foundPart.imageUrl || '')
                setSku(foundPart.sku || '')
            }
        }
    }, [partId, parts])

    const handleMakeSelect = useCallback((name: string, id: string) => {
        setMakeId(Number(id))
        setMakeName(name)
        setModelId(null)
        setModelName('')
        setStep('model')
    }, [])

    const handleModelSelect = useCallback((name: string, id: string) => {
        setModelId(Number(id))
        setModelName(name)
        setStep('year')
    }, [])

    const handleYearSelect = useCallback((yearStr: string) => {
        setYear(Number(yearStr))
        setStep('details')
    }, [])

    const handleSubmit = useCallback(async () => {
        if (!partId) return

        if (!name.trim() || !price.trim()) {
            Alert.alert(ARABIC_TEXT.ERROR, ARABIC_TEXT.REQUIRED_FIELD)
            return
        }

        const priceNum = parseFloat(price)
        if (isNaN(priceNum) || priceNum < 0) {
            Alert.alert(ARABIC_TEXT.ERROR, ARABIC_TEXT.INVALID_PRICE)
            return
        }

        try {
            await updatePart(partId, {
                name: name.trim(),
                description: description.trim() || undefined,
                price: priceNum,
                imageUrl: imageUrl.trim() || undefined,
                sku: sku.trim() || undefined,
            })

            Alert.alert(ARABIC_TEXT.SUCCESS, '', [
                {
                    text: 'موافق',
                    onPress: () => navigation?.goBack(),
                },
            ])
        } catch (error) {
            Alert.alert(ARABIC_TEXT.ERROR, error instanceof Error ? error.message : ARABIC_TEXT.ERROR)
        }
    }, [partId, name, description, price, imageUrl, sku, updatePart, navigation])

    if (partsLoading && !part) {
        return (
            <View style={[styles.container, styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    if (!part) {
        return (
            <View style={[styles.container, styles.centered, {backgroundColor: theme.colors.background}]}>
                <Text variant='bodyLarge' style={{color: theme.colors.error}}>
                    {ARABIC_TEXT.ERROR}
                </Text>
            </View>
        )
    }

    const renderStep = () => {
        switch (step) {
            case 'make':
                return (
                    <ManufacturerScreen
                        originId={originId}
                        getMakes={getMakes}
                        value={makeName}
                        valueId={makeId?.toString() || null}
                        onSelect={handleMakeSelect}
                        onNext={() => {}}
                    />
                )
            case 'model':
                if (!makeId) {
                    return (
                        <View style={styles.centered}>
                            <Text>{ARABIC_TEXT.SELECT_MAKE_FIRST}</Text>
                        </View>
                    )
                }
                return (
                    <ModelScreen
                        makeId={makeId}
                        makeName={makeName}
                        getModels={async (id: number) => getModels(id)}
                        value={modelName}
                        valueId={modelId?.toString() || null}
                        onSelect={handleModelSelect}
                        onNext={() => {}}
                    />
                )
            case 'year':
                return (
                    <YearScreen
                        years={years}
                        value={year?.toString() || ''}
                        onSelect={handleYearSelect}
                        onNext={() => {}}
                    />
                )
            case 'details':
                return (
                    <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
                        {(makeName || modelName || year) && (
                            <Card style={[styles.vehicleCard, {backgroundColor: theme.colors.surfaceVariant}]}>
                                <Card.Content>
                                    <Text variant='titleMedium' style={{color: theme.colors.onSurfaceVariant}}>
                                        {ARABIC_TEXT.SELECT_VEHICLE}
                                    </Text>
                                    <Text variant='bodyLarge' style={{color: theme.colors.onSurface, marginTop: 4}}>
                                        {makeName} {modelName} {year}
                                    </Text>
                                </Card.Content>
                            </Card>
                        )}

                        <TextInput
                            label={ARABIC_TEXT.PART_NAME}
                            value={name}
                            onChangeText={setName}
                            placeholder={ARABIC_TEXT.PART_NAME_PLACEHOLDER}
                            mode='outlined'
                            style={styles.input}
                        />

                        <TextInput
                            label={ARABIC_TEXT.DESCRIPTION}
                            value={description}
                            onChangeText={setDescription}
                            placeholder={ARABIC_TEXT.DESCRIPTION_PLACEHOLDER}
                            mode='outlined'
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                        />

                        <TextInput
                            label={ARABIC_TEXT.PRICE}
                            value={price}
                            onChangeText={setPrice}
                            placeholder={ARABIC_TEXT.PRICE_PLACEHOLDER}
                            mode='outlined'
                            keyboardType='decimal-pad'
                            style={styles.input}
                        />

                        <TextInput
                            label={ARABIC_TEXT.IMAGE_URL}
                            value={imageUrl}
                            onChangeText={setImageUrl}
                            placeholder={ARABIC_TEXT.IMAGE_URL_PLACEHOLDER}
                            mode='outlined'
                            keyboardType='url'
                            style={styles.input}
                        />

                        <TextInput
                            label={ARABIC_TEXT.SKU}
                            value={sku}
                            onChangeText={setSku}
                            placeholder={ARABIC_TEXT.SKU_PLACEHOLDER}
                            mode='outlined'
                            style={styles.input}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                mode='outlined'
                                onPress={() => navigation?.goBack()}
                                style={styles.button}
                                disabled={saving}>
                                {ARABIC_TEXT.CANCEL}
                            </Button>
                            <Button
                                mode='contained'
                                onPress={handleSubmit}
                                style={styles.button}
                                loading={saving}
                                disabled={saving || !name.trim() || !price.trim()}>
                                {saving ? ARABIC_TEXT.SAVING : ARABIC_TEXT.SUBMIT}
                            </Button>
                        </View>
                    </ScrollView>
                )
            default:
                return null
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            {step !== 'details' && (
                <View style={styles.stepIndicator}>
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                        {step === 'make' && ARABIC_TEXT.MAKE}
                        {step === 'model' && ARABIC_TEXT.MODEL}
                        {step === 'year' && ARABIC_TEXT.YEAR}
                    </Text>
                </View>
            )}
            {saving && step === 'details' ? (
                <View style={styles.centered}>
                    <ActivityIndicator size='large' />
                    <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                        {ARABIC_TEXT.SAVING}
                    </Text>
                </View>
            ) : (
                renderStep()
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    stepIndicator: {
        padding: 16,
        paddingBottom: 8,
    },
    formContainer: {
        flex: 1,
    },
    formContent: {
        padding: 16,
    },
    vehicleCard: {
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 12,
    },
    button: {
        flex: 1,
    },
})
