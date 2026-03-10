import React, {useState, useCallback, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {
    ActivityIndicator,
    Button,
    Chip,
    Divider,
    Icon,
    Text,
    TextInput,
} from 'react-native-paper'

import {SellerTypePicker, getSellerTypeFieldConfig} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {SellerProfile, SellerType, CreateSellerProfileRequest, UpdateSellerProfileRequest} from '@/global/types'
import {profileService} from '../services/profileService'

const ARABIC = {
    SELLER_PROFILE: 'الملف التجاري',
    SELLER_PROFILE_DESC: 'أنشئ ملفك التجاري لتتمكن من عرض قطع الغيار للبيع',
    CREATE_PROFILE: 'إنشاء ملف تجاري',
    EDIT: 'تعديل',
    CANCEL: 'إلغاء',
    SAVE: 'حفظ',
    SAVING: 'جاري الحفظ...',
    SELLER_TYPE: 'نوع البائع',
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    DESCRIPTION: 'الوصف',
    WORKING_HOURS: 'ساعات العمل',
    SELECT_TYPE: 'اختر نوع البائع',
    NO_PROFILE: 'لا يوجد ملف تجاري',
    NO_PROFILE_DESC: 'أنشئ ملفك التجاري للبدء في بيع قطع الغيار',
    ERROR: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    TYPE_REQUIRED: 'نوع البائع مطلوب',
}

interface SellerProfileCardProps {
    onToast: (message: string) => void
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

    const isFormMode = editing || creating

    // Form view (create or edit)
    if (isFormMode) {
        return (
            <View style={styles.section}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {creating ? ARABIC.CREATE_PROFILE : ARABIC.SELLER_PROFILE}
                </Text>

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
                                    numberOfLines={3}
                                    style={styles.input}
                                    left={<TextInput.Icon icon='text-box-outline' />}
                                />
                            )}
                        </>
                    )
                })()}

                {error && (
                    <Text variant='bodySmall' style={[styles.errorText, {color: theme.colors.error}]}>
                        {error}
                    </Text>
                )}

                <View style={styles.formActions}>
                    <Button mode='outlined' onPress={cancelForm} disabled={saving} style={styles.actionButton}>
                        {ARABIC.CANCEL}
                    </Button>
                    <Button
                        mode='contained'
                        onPress={() => void handleSave()}
                        loading={saving}
                        disabled={saving || !form.sellerTypeId || !form.phone.trim()}
                        style={styles.actionButton}
                        icon='content-save-outline'>
                        {saving ? ARABIC.SAVING : ARABIC.SAVE}
                    </Button>
                </View>
            </View>
        )
    }

    // Display view — no profile yet
    if (!sellerProfile) {
        return (
            <View style={styles.section}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.SELLER_PROFILE}
                </Text>
                <View style={[styles.emptyCard, {backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.outlineVariant}]}>
                    <View style={styles.emptyContent}>
                        <Icon source='store-plus-outline' size={32} color={theme.colors.onSurfaceVariant} />
                        <Text variant='bodyMedium' style={[styles.emptyTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC.NO_PROFILE}
                        </Text>
                        <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant, textAlign: 'center'}}>
                            {ARABIC.NO_PROFILE_DESC}
                        </Text>
                    </View>
                    <Button mode='contained' onPress={startCreate} icon='plus' style={styles.createButton} contentStyle={styles.createButtonContent}>
                        {ARABIC.CREATE_PROFILE}
                    </Button>
                </View>
            </View>
        )
    }

    // Display view — has profile
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface, marginBottom: 0}]}>
                    {ARABIC.SELLER_PROFILE}
                </Text>
                <Button mode='text' onPress={startEdit} compact icon='pencil-outline'>
                    {ARABIC.EDIT}
                </Button>
            </View>

            <View style={[styles.profileCard, {backgroundColor: theme.colors.elevation.level2, borderColor: theme.colors.outlineVariant}]}>
                {/* Header with type */}
                <View style={styles.profileHeader}>
                    <View style={{flex: 1}}>
                        <Text variant='titleMedium' style={[styles.profileName, {color: theme.colors.onSurface}]}>
                            {sellerProfile.storeName || sellerProfile.userName}
                        </Text>
                    </View>
                    <Chip icon='tag-outline' compact textStyle={styles.chipText} style={{backgroundColor: theme.colors.primaryContainer}}>
                        {sellerProfile.sellerType.name}
                    </Chip>
                </View>

                <Divider />

                {/* Info rows */}
                <View style={styles.infoSection}>
                    <InfoRow icon='phone-outline' label={ARABIC.PHONE} value={sellerProfile.phone} theme={theme} />
                    {sellerProfile.city && <InfoRow icon='map-marker-outline' label={ARABIC.CITY} value={sellerProfile.city} theme={theme} />}
                    {sellerProfile.workingHours && (
                        <InfoRow icon='clock-outline' label={ARABIC.WORKING_HOURS} value={sellerProfile.workingHours} theme={theme} />
                    )}
                    {sellerProfile.description && (
                        <InfoRow icon='text-box-outline' label={ARABIC.DESCRIPTION} value={sellerProfile.description} theme={theme} />
                    )}
                </View>
            </View>
        </View>
    )
}

interface InfoRowProps {
    icon: string
    label: string
    value: string
    theme: ReturnType<typeof useAppTheme>
}

const InfoRow = ({icon, label, value, theme}: InfoRowProps) => (
    <View style={styles.infoRow}>
        <Icon source={icon} size={18} color={theme.colors.onSurfaceVariant} />
        <View style={styles.infoContent}>
            <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
                {label}
            </Text>
            <Text variant='bodyMedium' style={{color: theme.colors.onSurface}}>
                {value}
            </Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
    loadingContainer: {paddingVertical: 24, alignItems: 'center'},
    input: {marginBottom: 12},
    errorText: {marginBottom: 8, fontWeight: '500'},
    formActions: {flexDirection: 'row', gap: 12, marginTop: 8},
    actionButton: {flex: 1, borderRadius: 12},
    emptyCard: {borderRadius: 16, borderWidth: 1, padding: 24, alignItems: 'center'},
    emptyContent: {alignItems: 'center', gap: 8, marginBottom: 20},
    emptyTitle: {fontWeight: '600', marginTop: 4},
    createButton: {borderRadius: 12, alignSelf: 'stretch'},
    createButtonContent: {paddingVertical: 4},
    profileCard: {borderRadius: 16, borderWidth: 1, overflow: 'hidden'},
    profileHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, gap: 12},
    profileName: {fontWeight: '700'},
    chipText: {fontSize: 12, fontWeight: '600'},
    infoSection: {padding: 16, gap: 14},
    infoRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 12},
    infoContent: {flex: 1, gap: 2},
})
