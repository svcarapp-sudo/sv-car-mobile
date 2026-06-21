import {ScrollView, StyleSheet} from 'react-native'
import {HelperText, TextInput} from 'react-native-paper'

import type {PartRequestCondition} from '../../../types'
import {AddPartRequestConditionRow} from '../AddPartRequestConditionRow'
import type {AddPartRequestFieldState} from '../useAddPartRequestForm'

const T = {
    TITLE_LABEL: 'عنوان الطلب *',
    TITLE_HINT: 'مثال: "بطارية تويوتا كامري 2018 أصلية"',
    DESCRIPTION_LABEL: 'تفاصيل إضافية',
    DESCRIPTION_HINT: 'اذكر أي مواصفات مهمة (الجزء الدقيق، رقم القطعة، حالة معينة...)',
}

interface DetailsStepProps {
    fields: AddPartRequestFieldState
    condition: PartRequestCondition
    onChangeField: <K extends keyof AddPartRequestFieldState>(key: K, value: AddPartRequestFieldState[K]) => void
    onChangeCondition: (next: PartRequestCondition) => void
}

export const DetailsStep = ({fields, condition, onChangeField, onChangeCondition}: DetailsStepProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}>
            <TextInput
                label={T.TITLE_LABEL}
                value={fields.title}
                onChangeText={t => onChangeField('title', t)}
                placeholder={T.TITLE_HINT}
                mode='outlined'
                maxLength={200}
            />
            <HelperText type='info'>{T.TITLE_HINT}</HelperText>

            <AddPartRequestConditionRow value={condition} onChange={onChangeCondition} />

            <TextInput
                label={T.DESCRIPTION_LABEL}
                value={fields.description}
                onChangeText={t => onChangeField('description', t)}
                placeholder={T.DESCRIPTION_HINT}
                mode='outlined'
                multiline
                numberOfLines={4}
                maxLength={4000}
                style={styles.description}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {paddingTop: 4, paddingBottom: 24, gap: 10},
    description: {minHeight: 110},
})
