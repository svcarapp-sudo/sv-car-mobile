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
            {onCancel && (
                <Button
                    mode='outlined'
                    onPress={onCancel}
                    style={styles.cancelBtn}
                    contentStyle={styles.btnContent}
                    labelStyle={styles.cancelLabel}
                    disabled={loading}>
                    {ARABIC_TEXT.CANCEL}
                </Button>
            )}
            <Button
                mode='contained'
                onPress={onSubmit}
                style={[styles.submitBtn, !onCancel && styles.fullWidth]}
                contentStyle={styles.btnContent}
                labelStyle={styles.submitLabel}
                icon='check-circle-outline'
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
        gap: 10,
        marginTop: 8,
    },
    cancelBtn: {
        flex: 1,
        borderRadius: 14,
    },
    submitBtn: {
        flex: 2,
        borderRadius: 14,
    },
    fullWidth: {
        flex: 1,
    },
    btnContent: {
        paddingVertical: 8,
    },
    cancelLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    submitLabel: {
        fontSize: 15,
        fontWeight: '700',
    },
})
