import {useState, useCallback, useEffect} from 'react'
import {KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView} from 'react-native'
import {ActivityIndicator, Button, Chip, Divider, TextInput} from 'react-native-paper'

import {SellerTypePicker} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {apiClient} from '@/global/services/ApiClient'
import type {SellerProfile, SellerType, CreateSellerProfileRequest} from '@/global/types'

import {GateSetupHeader} from './GateSetupHeader'
import {GateTypeFields} from './GateTypeFields'
import {GateWhyCard} from './GateWhyCard'

const ARABIC = {
    SELECT_TYPE: 'اختر نوع البائع',
    PHONE: 'رقم الهاتف',
    PHONE_REQUIRED: 'رقم الهاتف مطلوب',
    CREATE: 'إنشاء والمتابعة',
    CREATING: 'جاري الإنشاء...',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    TYPE_REQUIRED: 'يرجى اختيار نوع البائع',
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
    sellerTypeId: null, phone: '', storeName: '', city: '', description: '', workingHours: '',
}

export const SellerProfileGate = ({children}: {children: React.ReactNode}) => {
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
                if (profileResult.status === 'fulfilled') setHasProfile(true)
                if (typesResult.status === 'fulfilled') setSellerTypes(typesResult.value)
            } catch {
                // profile doesn't exist — show setup
            } finally {
                setChecking(false)
            }
        }
        void check()
    }, [])

    const handleCreate = useCallback(async () => {
        if (!form.sellerTypeId) { setError(ARABIC.TYPE_REQUIRED); return }
        if (!form.phone.trim()) { setError(ARABIC.PHONE_REQUIRED); return }
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

    if (checking) return (
        <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
            <ActivityIndicator size='large' color={theme.colors.primary} />
        </View>
    )

    if (hasProfile) return <>{children}</>

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}>
        <ScrollView
            style={[styles.flex, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps='handled'>
            <GateSetupHeader />
            <GateWhyCard />

            <Divider style={styles.divider} />

            <View style={styles.formSection}>
                <SellerTypePicker
                    types={sellerTypes}
                    selectedId={form.sellerTypeId}
                    onSelect={id => setForm(f => ({...f, sellerTypeId: id}))}
                    label={ARABIC.SELECT_TYPE}
                />

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

                {form.sellerTypeId && (
                    <GateTypeFields
                        sellerTypes={sellerTypes}
                        sellerTypeId={form.sellerTypeId}
                        storeName={form.storeName}
                        city={form.city}
                        workingHours={form.workingHours}
                        description={form.description}
                        onChangeStoreName={storeName => setForm(f => ({...f, storeName}))}
                        onChangeCity={city => setForm(f => ({...f, city}))}
                        onChangeWorkingHours={workingHours => setForm(f => ({...f, workingHours}))}
                        onChangeDescription={description => setForm(f => ({...f, description}))}
                    />
                )}

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

const styles = StyleSheet.create({
    flex: {flex: 1},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    scrollContent: {paddingBottom: 120},
    divider: {marginVertical: 20, marginHorizontal: 20},
    formSection: {paddingHorizontal: 20},
    input: {marginBottom: 12},
    errorChip: {marginBottom: 12},
    createButton: {borderRadius: 12, marginTop: 8},
    createButtonContent: {paddingVertical: 6},
})
