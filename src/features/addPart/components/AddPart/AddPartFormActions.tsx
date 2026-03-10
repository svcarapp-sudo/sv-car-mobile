import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'

const ARABIC_TEXT = {
    SUBMIT: 'إضافة القطعة',
    CANCEL: 'إلغاء',
    LOADING: 'جاري الإضافة...',
}

interface AddPartFormActionsProps {
    loading: boolean
    canSubmit: boolean
    onSubmit: () => void
    onCancel?: () => void
    submitLabel?: string
    submitLoadingLabel?: string
}

export const AddPartFormActions = ({
    loading,
    canSubmit,
    onSubmit,
    onCancel,
    submitLabel = ARABIC_TEXT.SUBMIT,
    submitLoadingLabel = ARABIC_TEXT.LOADING,
}: AddPartFormActionsProps) => {
    return (
        <View style={styles.buttons}>
            {onCancel ? (
                <Button mode='outlined' onPress={onCancel} style={styles.cancelBtn} disabled={loading}>
                    {ARABIC_TEXT.CANCEL}
                </Button>
            ) : null}
            <Button
                mode='contained'
                onPress={onSubmit}
                style={[styles.submitBtn, !onCancel && styles.fullWidth]}
                contentStyle={styles.submitContent}
                icon='plus'
                loading={loading}
                disabled={loading || !canSubmit}>
                {loading ? submitLoadingLabel : submitLabel}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 4,
    },
    cancelBtn: {
        flex: 1,
        borderRadius: 12,
    },
    submitBtn: {
        flex: 1,
        borderRadius: 12,
    },
    fullWidth: {
        flex: 1,
    },
    submitContent: {
        paddingVertical: 4,
    },
})
