import {useState, useCallback, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Divider, Icon, Text} from 'react-native-paper'

import {Screen, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {apiClient} from '@/global/services/ApiClient'
import type {SellerProfile, SellerType, CreateSellerProfileRequest} from '@/global/types'

import {GateForm, type GateFormState} from './GateForm'
import {GateSetupHeader} from './GateSetupHeader'
import {GateWhyCard} from './GateWhyCard'

const ARABIC = {
    PHONE_REQUIRED: 'رقم الهاتف مطلوب',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    TYPE_REQUIRED: 'يرجى اختيار نوع البائع',
    CHECK_ERROR: 'تعذر التحقق من ملف البائع',
    RETRY: 'إعادة المحاولة',
    PROFILE_CREATED: 'تم إنشاء ملف البائع بنجاح',
}

const EMPTY_FORM: GateFormState = {
    sellerTypeId: null,
    phone: '',
    storeName: '',
    city: '',
    description: '',
    workingHours: '',
}

export const SellerProfileGate = ({children}: {children: React.ReactNode}) => {
    const theme = useAppTheme()
    const [checking, setChecking] = useState(true)
    const [hasProfile, setHasProfile] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const [sellerTypes, setSellerTypes] = useState<SellerType[]>([])
    const [form, setForm] = useState<GateFormState>(EMPTY_FORM)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const check = useCallback(async () => {
        setChecking(true)
        setCheckError(false)
        const [profileResult, typesResult] = await Promise.allSettled([
            apiClient.get<SellerProfile>('/api/seller-profile'),
            apiClient.get<SellerType[]>('/api/seller-types'),
        ])
        if (profileResult.status === 'fulfilled') setHasProfile(true)
        if (typesResult.status === 'fulfilled') setSellerTypes(typesResult.value)
        // Profile 404 means "no profile yet" (normal); both failing means we can't even show the setup form.
        if (profileResult.status === 'rejected' && typesResult.status === 'rejected') setCheckError(true)
        setChecking(false)
    }, [])

    useEffect(() => {
        void check()
    }, [check])

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
            showToast(ARABIC.PROFILE_CREATED, 'success')
            setHasProfile(true)
        } catch {
            setError(ARABIC.ERROR)
        } finally {
            setSaving(false)
        }
    }, [form])

    if (checking)
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
            </View>
        )

    if (checkError)
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <Icon source='cloud-alert' size={44} color={theme.colors.error} />
                <Text style={[styles.checkErrorText, {color: theme.colors.onSurfaceVariant}]}>{ARABIC.CHECK_ERROR}</Text>
                <Button mode='outlined' icon='refresh' onPress={() => void check()}>
                    {ARABIC.RETRY}
                </Button>
            </View>
        )

    if (hasProfile) return <>{children}</>

    return (
        <View style={[styles.flex, {backgroundColor: theme.colors.background}]}>
            <Screen contentContainerStyle={styles.scrollContent}>
                <GateSetupHeader />
                <GateWhyCard />
                <Divider style={styles.divider} />
                <GateForm
                    sellerTypes={sellerTypes}
                    form={form}
                    onFormChange={setForm}
                    saving={saving}
                    error={error}
                    onSubmit={() => void handleCreate()}
                />
            </Screen>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24},
    checkErrorText: {fontSize: 14, fontWeight: '600', textAlign: 'center'},
    scrollContent: {paddingBottom: 120},
    divider: {marginVertical: 20, marginHorizontal: 20},
})
