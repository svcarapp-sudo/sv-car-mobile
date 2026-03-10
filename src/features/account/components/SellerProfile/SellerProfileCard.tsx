import React, {useState, useCallback, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {SellerProfile, SellerType, CreateSellerProfileRequest, UpdateSellerProfileRequest} from '@/global/types'
import {profileService} from '../../services/profileService'
import {SellerProfileDisplay} from './SellerProfileDisplay'
import {SellerProfileEmpty} from './SellerProfileEmpty'
import {SellerProfileForm} from './SellerProfileForm'
import type {FormState} from './SellerProfileForm'

const ARABIC = {
    SELLER_PROFILE: 'الملف التجاري',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    TYPE_REQUIRED: 'نوع البائع مطلوب',
}

interface SellerProfileCardProps {
    onToast: (message: string) => void
}

const EMPTY_FORM: FormState = {
    sellerTypeId: null,
    phone: '',
    storeName: '',
    city: '',
    description: '',
    workingHours: '',
}

export const SellerProfileCard = ({onToast}: SellerProfileCardProps) => {
    const theme = useAppTheme()
    const [loading, setLoading] = useState(true)
    const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null)
    const [sellerTypes, setSellerTypes] = useState<SellerType[]>([])
    const [editing, setEditing] = useState(false)
    const [creating, setCreating] = useState(false)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState<FormState>(EMPTY_FORM)
    const [error, setError] = useState<string | null>(null)

    const loadData = useCallback(async () => {
        try {
            const [profileResult, typesResult] = await Promise.allSettled([
                profileService.getSellerProfile(),
                profileService.getSellerTypes(),
            ])
            if (profileResult.status === 'fulfilled') {
                setSellerProfile(profileResult.value)
            }
            if (typesResult.status === 'fulfilled') {
                setSellerTypes(typesResult.value)
            }
        } catch {
            // silently handle
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void loadData()
    }, [loadData])

    const startCreate = useCallback(() => {
        setForm(EMPTY_FORM)
        setError(null)
        setCreating(true)
    }, [])

    const startEdit = useCallback(() => {
        if (!sellerProfile) return
        setForm({
            sellerTypeId: sellerProfile.sellerType.id,
            phone: sellerProfile.phone ?? '',
            storeName: sellerProfile.storeName ?? '',
            city: sellerProfile.city ?? '',
            description: sellerProfile.description ?? '',
            workingHours: sellerProfile.workingHours ?? '',
        })
        setError(null)
        setEditing(true)
    }, [sellerProfile])

    const cancelForm = useCallback(() => {
        setEditing(false)
        setCreating(false)
        setError(null)
    }, [])

    const handleSave = useCallback(async () => {
        if (!form.sellerTypeId) {
            setError(ARABIC.TYPE_REQUIRED)
            return
        }
        setSaving(true)
        setError(null)
        try {
            const payload: CreateSellerProfileRequest | UpdateSellerProfileRequest = {
                sellerTypeId: form.sellerTypeId,
                phone: form.phone.trim(),
                storeName: form.storeName.trim() || undefined,
                city: form.city.trim() || undefined,
                description: form.description.trim() || undefined,
                workingHours: form.workingHours.trim() || undefined,
            }
            let result: SellerProfile
            if (creating) {
                result = await profileService.createSellerProfile(payload)
            } else {
                result = await profileService.updateSellerProfile(payload)
            }
            setSellerProfile(result)
            setEditing(false)
            setCreating(false)
            onToast(creating ? 'تم إنشاء الملف التجاري' : 'تم حفظ التعديلات')
        } catch {
            setError(ARABIC.ERROR)
        } finally {
            setSaving(false)
        }
    }, [form, creating, onToast])

    if (loading) {
        return (
            <View style={styles.section}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.SELLER_PROFILE}
                </Text>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='small' color={theme.colors.primary} />
                </View>
            </View>
        )
    }

    if (editing || creating) {
        return (
            <SellerProfileForm
                creating={creating}
                saving={saving}
                form={form}
                sellerTypes={sellerTypes}
                error={error}
                onFormChange={setForm}
                onCancel={cancelForm}
                onSave={() => void handleSave()}
            />
        )
    }

    if (!sellerProfile) {
        return <SellerProfileEmpty onCreatePress={startCreate} />
    }

    return <SellerProfileDisplay sellerProfile={sellerProfile} onEditPress={startEdit} />
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    loadingContainer: {paddingVertical: 24, alignItems: 'center'},
})
