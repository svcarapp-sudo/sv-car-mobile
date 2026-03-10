import {useState, useCallback, useEffect} from 'react'
import {KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView} from 'react-native'
import {ActivityIndicator, Button, Chip, Divider, Icon, Text, TextInput} from 'react-native-paper'

import {SellerTypePicker, getSellerTypeFieldConfig} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {apiClient} from '@/global/services/ApiClient'
import type {SellerProfile, SellerType, CreateSellerProfileRequest} from '@/global/types'

const ARABIC = {
    TITLE: 'أنشئ ملفك التجاري',
    SUBTITLE: 'يجب إنشاء ملف تجاري قبل إضافة قطع غيار للبيع',
    WHY_TITLE: 'لماذا الملف التجاري؟',
    WHY_1: 'يساعد المشترين في معرفة هوية البائع',
    WHY_2: 'يزيد ثقة المشترين بقطع الغيار المعروضة',
    WHY_3: 'يسهّل التواصل معك',
    SELLER_TYPE: 'نوع البائع',
    SELECT_TYPE: 'اختر نوع البائع',
    PHONE: 'رقم الهاتف',
    PHONE_REQUIRED: 'رقم الهاتف مطلوب',
    CITY: 'المدينة (اختياري)',
    WORKING_HOURS: 'ساعات العمل (اختياري)',
    DESCRIPTION: 'وصف (اختياري)',
    CREATE: 'إنشاء والمتابعة',
    CREATING: 'جاري الإنشاء...',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    TYPE_REQUIRED: 'يرجى اختيار نوع البائع',
}

interface SellerProfileGateProps {
    children: React.ReactNode
}

interface FormState {
    sellerTypeId: number | null
    phone: string
    storeName: string
    city: string
    description: string
    workingHours: string
}

const EMPTY_FORM: FormState = {
    sellerTypeId: null,
    phone: '',
    storeName: '',
    city: '',
    description: '',
    workingHours: '',
}

export const SellerProfileGate = ({children}: SellerProfileGateProps) => {
    const theme = useAppTheme()
    const [checking, setChecking] = useState(true)
    const [hasProfile, setHasProfile] = useState(false)
    const [sellerTypes, setSellerTypes] = useState<SellerType[]>([])
    const [form, setForm] = useState<FormState>(EMPTY_FORM)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const check = async () => {
            try {
                const [profileResult, typesResult] = await Promise.allSettled([
                    apiClient.get<SellerProfile>('/api/seller-profile'),
                    apiClient.get<SellerType[]>('/api/seller-types'),
                ])
                if (profileResult.status === 'fulfilled') {
                    setHasProfile(true)
                }
                if (typesResult.status === 'fulfilled') {
                    setSellerTypes(typesResult.value)
                }
            } catch {
                // profile doesn't exist — show setup
            } finally {
                setChecking(false)
            }
        }
        void check()
    }, [])

    const handleCreate = useCallback(async () => {
        if (!form.sellerTypeId) {
            setError(ARABIC.TYPE_REQUIRED)
            return
        }
        if (!form.phone.trim()) {
            setError(ARABIC.PHONE_REQUIRED)
            return
        }
        setSaving(true)
        setError(null)
        try {
            const payload: CreateSellerProfileRequest = {
                sellerTypeId: form.sellerTypeId,
                phone: form.phone.trim(),
                storeName: form.storeName.trim() || undefined,
                city: form.city.trim() || undefined,
                description: form.description.trim() || undefined,
                workingHours: form.workingHours.trim() || undefined,
            }
            await apiClient.post<SellerProfile>('/api/seller-profile', payload)
            setHasProfile(true)
        } catch {
            setError(ARABIC.ERROR)
        } finally {
            setSaving(false)
        }
    }, [form])

    if (checking) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
            </View>
        )
    }

    if (hasProfile) {
        return <>{children}</>
    }

    // Setup screen
    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}>
        <ScrollView
            style={[styles.flex, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps='handled'>
            {/* Header */}
            <View style={styles.headerSection}>
                <View style={[styles.iconCircle, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='store-plus-outline' size={40} color={theme.colors.primary} />
                </View>
                <Text variant='headlineSmall' style={[styles.title, {color: theme.colors.onSurface}]}>
                    {ARABIC.TITLE}
                </Text>
                <Text variant='bodyMedium' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC.SUBTITLE}
                </Text>
            </View>

            {/* Why card */}
            <View style={[styles.whyCard, {backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.outlineVariant}]}>
                <Text variant='labelLarge' style={[styles.whyTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.WHY_TITLE}
                </Text>
                <WhyRow icon='shield-check-outline' text={ARABIC.WHY_1} theme={theme} />
                <WhyRow icon='trending-up' text={ARABIC.WHY_2} theme={theme} />
                <WhyRow icon='message-text-outline' text={ARABIC.WHY_3} theme={theme} />
            </View>

            <Divider style={styles.divider} />

            {/* Form */}
            <View style={styles.formSection}>
                <SellerTypePicker
                    types={sellerTypes}
                    selectedId={form.sellerTypeId}
                    onSelect={id => setForm(f => ({...f, sellerTypeId: id}))}
                    label={ARABIC.SELECT_TYPE}
                />

                {/* Phone — always required */}
                <TextInput
                    label={ARABIC.PHONE}
                    value={form.phone}
                    onChangeText={phone => setForm(f => ({...f, phone}))}
                    mode='outlined'
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    style={styles.input}
                    left={<TextInput.Icon icon='phone-outline' />}
                />

                {form.sellerTypeId && (() => {
                    const selectedSlug = sellerTypes.find(t => t.id === form.sellerTypeId)?.slug
                    const fields = getSellerTypeFieldConfig(selectedSlug)
                    return (
                        <>
                            {fields.showStoreName && (
                                <TextInput
                                    label={fields.storeNameLabel}
                                    value={form.storeName}
                                    onChangeText={storeName => setForm(f => ({...f, storeName}))}
                                    mode='outlined'
                                    style={styles.input}
                                    left={<TextInput.Icon icon='store-outline' />}
                                />
                            )}
                            {fields.showCity && (
                                <TextInput
                                    label={ARABIC.CITY}
                                    value={form.city}
                                    onChangeText={city => setForm(f => ({...f, city}))}
                                    mode='outlined'
                                    style={styles.input}
                                    left={<TextInput.Icon icon='map-marker-outline' />}
                                />
                            )}
                            {fields.showWorkingHours && (
                                <TextInput
                                    label={ARABIC.WORKING_HOURS}
                                    value={form.workingHours}
                                    onChangeText={workingHours => setForm(f => ({...f, workingHours}))}
                                    mode='outlined'
                                    style={styles.input}
                                    left={<TextInput.Icon icon='clock-outline' />}
                                    placeholder='مثال: 9 ص - 9 م'
                                />
                            )}
                            {fields.showDescription && (
                                <TextInput
                                    label={ARABIC.DESCRIPTION}
                                    value={form.description}
                                    onChangeText={description => setForm(f => ({...f, description}))}
                                    mode='outlined'
                                    multiline
                                    numberOfLines={2}
                                    style={styles.input}
                                    left={<TextInput.Icon icon='text-box-outline' />}
                                />
                            )}
                        </>
                    )
                })()}

                {error && (
                    <Chip icon='alert-circle-outline' style={[styles.errorChip, {backgroundColor: theme.colors.errorContainer}]} textStyle={{color: theme.colors.error}}>
                        {error}
                    </Chip>
                )}

                <Button
                    mode='contained'
                    onPress={() => void handleCreate()}
                    loading={saving}
                    disabled={saving || !form.sellerTypeId || !form.phone.trim()}
                    style={styles.createButton}
                    contentStyle={styles.createButtonContent}
                    icon='check-circle-outline'>
                    {saving ? ARABIC.CREATING : ARABIC.CREATE}
                </Button>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const WhyRow = ({icon, text, theme}: {icon: string; text: string; theme: ReturnType<typeof useAppTheme>}) => (
    <View style={styles.whyRow}>
        <Icon source={icon} size={20} color={theme.colors.primary} />
        <Text variant='bodyMedium' style={{color: theme.colors.onSurface, flex: 1}}>
            {text}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    flex: {flex: 1},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    scrollContent: {paddingBottom: 120},
    headerSection: {alignItems: 'center', paddingTop: 32, paddingHorizontal: 24, paddingBottom: 24},
    iconCircle: {width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16},
    title: {fontWeight: '700', textAlign: 'center', marginBottom: 8},
    subtitle: {textAlign: 'center', lineHeight: 22},
    whyCard: {marginHorizontal: 20, borderRadius: 14, borderWidth: 1, padding: 16, gap: 10},
    whyTitle: {fontWeight: '600', marginBottom: 4},
    whyRow: {flexDirection: 'row', alignItems: 'center', gap: 12},
    divider: {marginVertical: 20, marginHorizontal: 20},
    formSection: {paddingHorizontal: 20},
    input: {marginBottom: 12},
    errorChip: {marginBottom: 12},
    createButton: {borderRadius: 12, marginTop: 8},
    createButtonContent: {paddingVertical: 6},
})
