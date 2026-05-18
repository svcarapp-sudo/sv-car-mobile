import {useMemo, useState} from 'react'
import {Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {useAppTheme, useCatalog} from '@/global/hooks'
import {useAuthStore, useVehicleStore} from '@/global/store'
import type {RootStackParamList} from '@/global/navigation/types'

import {useAddPartRequest} from '../../hooks'
import type {PartRequestCondition} from '../../types'
import {AddPartRequestActions} from './AddPartRequestActions'
import {AddPartRequestCategoryStrip} from './AddPartRequestCategoryStrip'
import {AddPartRequestConditionRow} from './AddPartRequestConditionRow'
import {AddPartRequestFormFields, type AddPartRequestFieldState} from './AddPartRequestFormFields'
import {AddPartRequestHero} from './AddPartRequestHero'
import {AddPartRequestVehicleCard} from './AddPartRequestVehicleCard'

const T = {
    SUCCESS: 'تم نشر طلبك بنجاح',
    SUCCESS_BODY: 'سيتمكن البائعون الآن من رؤية طلبك والتواصل معك.',
    ERR_VEHICLE: 'يجب اختيار مركبة أولاً',
    ERR_CATEGORY: 'الرجاء اختيار فئة القطعة',
    ERR_TITLE: 'العنوان مطلوب',
    ERR_PHONE: 'رقم التواصل مطلوب',
    ERR_BUDGET_RANGE: 'الحد الأعلى يجب أن يكون أكبر من الأدنى',
    OK: 'حسناً',
}

const INITIAL: AddPartRequestFieldState = {title: '', description: '', budgetMin: '', budgetMax: '', contactPhone: '', city: ''}

interface AddPartRequestScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const AddPartRequestScreen = ({navigation}: AddPartRequestScreenProps) => {
    const theme = useAppTheme()
    const vehicle = useVehicleStore(s => s.vehicle)
    const user = useAuthStore(s => s.user)
    const {categories} = useCatalog()
    const {submitting, create} = useAddPartRequest()

    const [fields, setFields] = useState<AddPartRequestFieldState>({
        ...INITIAL,
        contactPhone: user?.phone ?? '',
        city: user?.city ?? '',
    })
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [condition, setCondition] = useState<PartRequestCondition>('ANY')
    const [errors, setErrors] = useState<Partial<Record<keyof AddPartRequestFieldState | 'categoryId', string>>>({})

    const canSubmit = useMemo(
        () => !!vehicle && categoryId != null && fields.title.trim().length > 0 && fields.contactPhone.trim().length >= 5,
        [vehicle, categoryId, fields.title, fields.contactPhone]
    )

    const handleChange = <K extends keyof AddPartRequestFieldState>(key: K, value: AddPartRequestFieldState[K]) => {
        setFields(prev => ({...prev, [key]: value}))
        if (errors[key]) setErrors(prev => ({...prev, [key]: undefined}))
    }

    const goAddVehicle = () => navigation?.navigate('AddVehicle')

    const handleSubmit = async () => {
        if (!vehicle) {
            Alert.alert(T.ERR_VEHICLE)
            return
        }
        const nextErrors: typeof errors = {}
        if (!fields.title.trim()) nextErrors.title = T.ERR_TITLE
        if (!fields.contactPhone.trim()) nextErrors.contactPhone = T.ERR_PHONE
        if (categoryId == null) nextErrors.categoryId = T.ERR_CATEGORY
        const minNum = fields.budgetMin ? Number(fields.budgetMin) : undefined
        const maxNum = fields.budgetMax ? Number(fields.budgetMax) : undefined
        if (minNum != null && maxNum != null && minNum > maxNum) nextErrors.budgetMax = T.ERR_BUDGET_RANGE

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            if (nextErrors.categoryId) Alert.alert(nextErrors.categoryId)
            return
        }

        try {
            await create({
                categoryId: categoryId as number,
                makeId: vehicle.makeId ?? 0,
                modelId: vehicle.modelId ?? 0,
                year: vehicle.year,
                title: fields.title.trim(),
                description: fields.description.trim() || undefined,
                budgetMin: minNum,
                budgetMax: maxNum,
                conditionPreference: condition,
                contactPhone: fields.contactPhone.trim(),
                city: fields.city.trim() || undefined,
            })
            Alert.alert(T.SUCCESS, T.SUCCESS_BODY, [{text: T.OK, onPress: () => navigation?.goBack()}])
        } catch {
            // error already surfaced in hook state
        }
    }

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                style={[styles.flex, {backgroundColor: theme.colors.background}]}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps='handled'>
                <AddPartRequestHero />
                <AddPartRequestVehicleCard vehicle={vehicle} onAddVehicle={goAddVehicle} onChangeVehicle={goAddVehicle} />
                <AddPartRequestCategoryStrip categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
                <AddPartRequestConditionRow value={condition} onChange={setCondition} />
                <AddPartRequestFormFields values={fields} errors={errors} onChange={handleChange} />
                <AddPartRequestActions
                    submitting={submitting}
                    canSubmit={canSubmit}
                    onCancel={() => navigation?.goBack()}
                    onSubmit={handleSubmit}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    content: {padding: 16, gap: 18, paddingBottom: 40},
})
