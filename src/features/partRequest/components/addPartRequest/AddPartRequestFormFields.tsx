import {StyleSheet, View} from 'react-native'
import {HelperText, Text, TextInput} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const T = {
    TITLE_LABEL: 'عنوان الطلب *',
    TITLE_HINT: 'مثال: "بطارية تويوتا كامري 2018 أصلية"',
    DESCRIPTION_LABEL: 'تفاصيل إضافية',
    DESCRIPTION_HINT: 'اذكر أي مواصفات مهمة (الجزء الدقيق، رقم القطعة، حالة معينة...)',
    BUDGET_LABEL: 'الميزانية (اختياري)',
    MIN: 'الأدنى',
    MAX: 'الأعلى',
    CURRENCY: 'ر.س',
    PHONE_LABEL: 'رقم التواصل *',
    PHONE_HINT: 'سيتم عرضه للبائعين المهتمين بطلبك',
    CITY_LABEL: 'المدينة (اختياري)',
}

export interface AddPartRequestFieldState {
    title: string
    description: string
    budgetMin: string
    budgetMax: string
    contactPhone: string
    city: string
}

interface AddPartRequestFormFieldsProps {
    values: AddPartRequestFieldState
    errors?: Partial<Record<keyof AddPartRequestFieldState, string>>
    onChange: <K extends keyof AddPartRequestFieldState>(key: K, value: AddPartRequestFieldState[K]) => void
}

export const AddPartRequestFormFields = ({values, errors, onChange}: AddPartRequestFormFieldsProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <View>
                <TextInput
                    label={T.TITLE_LABEL}
                    value={values.title}
                    onChangeText={t => onChange('title', t)}
                    placeholder={T.TITLE_HINT}
                    mode='outlined'
                    maxLength={200}
                    error={!!errors?.title}
                />
                {errors?.title ? <HelperText type='error'>{errors.title}</HelperText> : null}
            </View>

            <TextInput
                label={T.DESCRIPTION_LABEL}
                value={values.description}
                onChangeText={t => onChange('description', t)}
                placeholder={T.DESCRIPTION_HINT}
                mode='outlined'
                multiline
                numberOfLines={3}
                maxLength={4000}
            />

            <View>
                <Text style={[styles.budgetLabel, {color: theme.colors.onSurface}]}>{T.BUDGET_LABEL}</Text>
                <View style={styles.budgetRow}>
                    <TextInput
                        label={T.MIN}
                        value={values.budgetMin}
                        onChangeText={t => onChange('budgetMin', t.replace(/[^0-9]/g, ''))}
                        mode='outlined'
                        keyboardType='numeric'
                        right={<TextInput.Affix text={T.CURRENCY} />}
                        style={styles.budgetInput}
                        error={!!errors?.budgetMin}
                    />
                    <TextInput
                        label={T.MAX}
                        value={values.budgetMax}
                        onChangeText={t => onChange('budgetMax', t.replace(/[^0-9]/g, ''))}
                        mode='outlined'
                        keyboardType='numeric'
                        right={<TextInput.Affix text={T.CURRENCY} />}
                        style={styles.budgetInput}
                        error={!!errors?.budgetMax}
                    />
                </View>
                {errors?.budgetMax ? <HelperText type='error'>{errors.budgetMax}</HelperText> : null}
            </View>

            <View>
                <TextInput
                    label={T.PHONE_LABEL}
                    value={values.contactPhone}
                    onChangeText={t => onChange('contactPhone', t)}
                    mode='outlined'
                    keyboardType='phone-pad'
                    left={<TextInput.Icon icon='phone-outline' />}
                    error={!!errors?.contactPhone}
                />
                {errors?.contactPhone ? (
                    <HelperText type='error'>{errors.contactPhone}</HelperText>
                ) : (
                    <HelperText type='info'>{T.PHONE_HINT}</HelperText>
                )}
            </View>

            <TextInput
                label={T.CITY_LABEL}
                value={values.city}
                onChangeText={t => onChange('city', t)}
                mode='outlined'
                left={<TextInput.Icon icon='map-marker-outline' />}
                maxLength={100}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    section: {gap: 12},
    budgetLabel: {fontSize: 13, fontWeight: '700', marginBottom: 6, letterSpacing: -0.1},
    budgetRow: {flexDirection: 'row', gap: 10},
    budgetInput: {flex: 1},
})
