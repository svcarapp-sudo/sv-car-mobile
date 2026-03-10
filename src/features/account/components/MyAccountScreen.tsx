import React, {useState, useCallback, useEffect} from 'react'
import {ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {Divider, Snackbar, ActivityIndicator} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import type {UserSubscription} from '@/global/types'
import {profileService} from '../services/profileService'
import {ProfileHeader} from './ProfileHeader'
import {SellerProfileCard} from './SellerProfileCard'
import {SubscriptionCard} from './SubscriptionCard'
import {ProfileForm} from './ProfileForm'
import type {ProfileFormState} from './ProfileForm'

const ARABIC = {
    SAVED: 'تم حفظ التعديلات بنجاح',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
}

export const MyAccountScreen = () => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const user = useAuthStore(s => s.user)
    const updateUser = useAuthStore(s => s.updateUser)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState<string | null>(null)
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
            const [profile, sub] = await Promise.allSettled([
                profileService.getProfile(),
                profileService.getMySubscription(),
            ])
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

    const handleSave = useCallback(async () => {
        if (!form.name.trim()) return
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
            setToast(ARABIC.SAVED)
        } catch {
            setToast(ARABIC.ERROR)
        } finally {
            setSaving(false)
        }
    }, [form, updateUser])

    if (loading) {
        return (
            <View style={[styles.loadingContainer, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
            </View>
        )
    }

    const plan = subscription?.plan ?? null

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                style={[styles.flex, {backgroundColor: theme.colors.background}]}
                contentContainerStyle={{paddingBottom: insets.bottom + 24}}
                keyboardShouldPersistTaps='handled'>
                <ProfileHeader name={user?.name ?? ''} email={user?.email ?? ''} plan={plan} />
                <Divider />
                <SellerProfileCard onToast={setToast} />
                <Divider />
                <SubscriptionCard plan={plan} />
                <Divider />
                <ProfileForm
                    form={form}
                    onFormChange={patch => setForm(f => ({...f, ...patch}))}
                    onSave={() => void handleSave()}
                    saving={saving}
                    hasChanges={hasChanges}
                />
            </ScrollView>
            <Snackbar visible={!!toast} onDismiss={() => setToast(null)} duration={2500}>
                {toast ?? ''}
            </Snackbar>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})
