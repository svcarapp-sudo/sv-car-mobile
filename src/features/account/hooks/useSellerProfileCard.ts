import {useCallback, useEffect, useState} from 'react'

import {showToast} from '@/global/components'
import {useAuthStore} from '@/global/store'
import type {
    CreateSellerProfileRequest,
    SellerProfile,
    SellerSpecialization,
    SellerType,
    UpdateSellerProfileRequest,
} from '@/global/types'
import {profileService} from '../services/profileService'

const ARABIC = {
    CREATED: 'تم إنشاء الملف التجاري',
    SAVED: 'تم حفظ ملف البائع',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    TYPE_REQUIRED: 'نوع البائع مطلوب',
}

export interface SellerProfileFormState {
    sellerTypeId: number | null
    phone: string
    storeName: string
    city: string
    description: string
    workingHours: string
    specializations: SellerSpecialization[]
}

const EMPTY_FORM: SellerProfileFormState = {
    sellerTypeId: null,
    phone: '',
    storeName: '',
    city: '',
    description: '',
    workingHours: '',
    specializations: [],
}

/**
 * State machine behind the seller-profile section of My Account:
 * load → display / empty → create / edit → save (with toast feedback).
 */
export const useSellerProfileCard = () => {
    // The seller's contact phone is their account phone — pre-fill from it so the
    // form is valid by default (the backend keeps phone on the user, not the profile).
    const accountPhone = useAuthStore(s => s.user?.phone ?? '')
    const [loading, setLoading] = useState(true)
    const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null)
    const [sellerTypes, setSellerTypes] = useState<SellerType[]>([])
    const [editing, setEditing] = useState(false)
    const [creating, setCreating] = useState(false)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState<SellerProfileFormState>(EMPTY_FORM)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const load = async () => {
            const [profileResult, typesResult] = await Promise.allSettled([
                profileService.getSellerProfile(),
                profileService.getSellerTypes(),
            ])
            if (profileResult.status === 'fulfilled') setSellerProfile(profileResult.value)
            if (typesResult.status === 'fulfilled') setSellerTypes(typesResult.value)
            setLoading(false)
        }
        void load()
    }, [])

    const startCreate = useCallback(() => {
        setForm({...EMPTY_FORM, phone: accountPhone})
        setError(null)
        setCreating(true)
    }, [accountPhone])

    const startEdit = useCallback(() => {
        if (!sellerProfile) return
        setForm({
            sellerTypeId: sellerProfile.sellerType.id,
            phone: sellerProfile.phone || accountPhone,
            storeName: sellerProfile.storeName ?? '',
            city: sellerProfile.city ?? '',
            description: sellerProfile.description ?? '',
            workingHours: sellerProfile.workingHours ?? '',
            specializations: sellerProfile.specializations ?? [],
        })
        setError(null)
        setEditing(true)
    }, [sellerProfile, accountPhone])

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
                specializationMakeIds: form.specializations.map(s => s.id),
            }
            const result = creating
                ? await profileService.createSellerProfile(payload)
                : await profileService.updateSellerProfile(payload)
            setSellerProfile(result)
            setEditing(false)
            setCreating(false)
            showToast(creating ? ARABIC.CREATED : ARABIC.SAVED, 'success')
        } catch {
            showToast(ARABIC.ERROR, 'error')
        } finally {
            setSaving(false)
        }
    }, [form, creating])

    return {
        loading,
        sellerProfile,
        sellerTypes,
        editing,
        creating,
        saving,
        form,
        error,
        setForm,
        startCreate,
        startEdit,
        cancelForm,
        handleSave,
    }
}
