import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const T = {
    SUBMIT: 'نشر الطلب',
    CANCEL: 'إلغاء',
}

interface AddPartRequestActionsProps {
    submitting: boolean
    canSubmit: boolean
    onCancel: () => void
    onSubmit: () => void
}

export const AddPartRequestActions = ({submitting, canSubmit, onCancel, onSubmit}: AddPartRequestActionsProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.row}>
            <Button
                mode='outlined'
                onPress={onCancel}
                disabled={submitting}
                style={styles.cancelBtn}
                contentStyle={styles.btnContent}>
                {T.CANCEL}
            </Button>
            <Button
                mode='contained'
                onPress={onSubmit}
                loading={submitting}
                disabled={submitting || !canSubmit}
                buttonColor={theme.colors.primary}
                icon='send'
                style={styles.submitBtn}
                contentStyle={styles.btnContent}>
                {T.SUBMIT}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', gap: 10, marginTop: 6},
    cancelBtn: {flexBasis: 110, borderRadius: 14},
    submitBtn: {flex: 1, borderRadius: 14},
    btnContent: {paddingVertical: 8},
})
