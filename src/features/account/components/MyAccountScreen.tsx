import React, {useState, useCallback, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {Divider} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Screen, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import type {UserSubscription} from '@/global/types'
import {profileService} from '../services/profileService'
import {ProfileHeader} from './ProfileHeader'
import {SellerProfileCard} from './sellerProfile'
import {SubscriptionCard} from './SubscriptionCard'
import {MyAccountSkeleton} from './MyAccountSkeleton'
import {ProfileForm} from './profile'
import type {ProfileFormState} from './profile'

const ARABIC = {
    SAVED: 'تم حفظ التغييرات',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
}

export const MyAccountScreen = () => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const user = useAuthStore(s => s.user)
    const updateUser = useAuthStore(s => s.updateUser)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [subscription, setSubscription] = useState<UserSubscription | null>(null)
    const [form, setForm] = useState<ProfileFormState>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        city: user?.city ?? '',
        bio: user?.bio ?? '',
    })

    const loadData = useCallback(async () => {
        try {
            const [profile, sub] = await Promise.allSettled([profileService.getProfile(), profileService.getMySubscription()])
            if (profile.status === 'fulfilled') {
                const p = profile.value
                setForm({name: p.name ?? '', email: p.email ?? '', phone: p.phone ?? '', city: p.city ?? '', bio: p.bio ?? ''})
                updateUser(p)
            }
            if (sub.status === 'fulfilled') setSubscription(sub.value)
        } catch {
            // Use local data if API fails
        } finally {
            setLoading(false)
        }
    }, [updateUser])

    useEffect(() => {
        void loadData()
    }, [loadData])

    const hasChanges =
        form.name !== (user?.name ?? '') ||
        form.email !== (user?.email ?? '') ||
        form.phone !== (user?.phone ?? '') ||
        form.city !== (user?.city ?? '') ||
        form.bio !== (user?.bio ?? '')

    const handleSave = useCallback(async (): Promise<boolean> => {
        if (!form.name.trim()) return false
        setSaving(true)
        try {
            const updated = await profileService.updateProfile({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim() || undefined,
                city: form.city.trim() || undefined,
                bio: form.bio.trim() || undefined,
            })
            updateUser(updated)
            showToast(ARABIC.SAVED, 'success')
            return true
        } catch {
            showToast(ARABIC.ERROR, 'error')
            return false
        } finally {
            setSaving(false)
        }
    }, [form, updateUser])

    const handleCancel = useCallback(() => {
        setForm({
            name: user?.name ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
            city: user?.city ?? '',
            bio: user?.bio ?? '',
        })
    }, [user])

    if (loading) {
        return <MyAccountSkeleton />
    }

    const plan = subscription?.plan ?? null

    return (
        <Screen
            style={[styles.flex, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={{paddingBottom: insets.bottom + 24}}>
            <ProfileHeader name={user?.name ?? ''} email={user?.email ?? ''} plan={plan} />
            <SellerProfileCard />
            <Divider />
            <SubscriptionCard plan={plan} />
            <Divider />
            <ProfileForm
                form={form}
                onFormChange={patch => setForm(f => ({...f, ...patch}))}
                onSave={handleSave}
                onCancel={handleCancel}
                saving={saving}
                hasChanges={hasChanges}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
})
