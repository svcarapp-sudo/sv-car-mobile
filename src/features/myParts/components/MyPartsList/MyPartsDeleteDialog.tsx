import {StyleSheet, View} from 'react-native'
import {Button, Dialog, Icon, Portal, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

interface MyPartsDeleteDialogProps {
    visible: boolean
    partName?: string
    submitting?: boolean
    onCancel: () => void
    onConfirm: () => void
}

const ARABIC_TEXT = {
    TITLE: 'حذف القطعة؟',
    DESCRIPTION: 'سيتم حذف هذه القطعة نهائياً من قائمتك ولا يمكن التراجع عن هذا الإجراء.',
    CANCEL: 'إلغاء',
    DELETE: 'نعم، احذف',
}

export const MyPartsDeleteDialog = ({visible, partName, submitting = false, onCancel, onConfirm}: MyPartsDeleteDialogProps) => {
    const theme = useAppTheme()
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel} style={[styles.dialog, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.iconWrap}>
                    <View style={[styles.iconCircle, {backgroundColor: theme.colors.surfaceContainerLowest}]}>
                        <Icon source='delete-alert-outline' size={28} color={theme.colors.error} />
                    </View>
                </View>
                <Dialog.Title style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Dialog.Title>
                <Dialog.Content>
                    <Text style={[styles.desc, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.DESCRIPTION}</Text>
                    {partName ? (
                        <View style={[styles.namePill, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                            <Icon source='package-variant' size={14} color={theme.colors.onSurfaceVariant} />
                            <Text style={[styles.nameText, {color: theme.colors.onSurface}]} numberOfLines={1}>
                                {partName}
                            </Text>
                        </View>
                    ) : null}
                </Dialog.Content>
                <Dialog.Actions style={styles.actions}>
                    <Button onPress={onCancel} mode='text' textColor={theme.colors.onSurfaceVariant} disabled={submitting}>
                        {ARABIC_TEXT.CANCEL}
                    </Button>
                    <Button
                        onPress={onConfirm}
                        mode='contained'
                        buttonColor={theme.colors.error}
                        textColor={theme.colors.onError}
                        loading={submitting}
                        disabled={submitting}
                        style={styles.confirmBtn}>
                        {ARABIC_TEXT.DELETE}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog: {borderRadius: 22, paddingTop: 8},
    iconWrap: {alignItems: 'center', marginTop: 16},
    iconCircle: {width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center'},
    title: {textAlign: 'center', fontSize: 18, fontWeight: '800', marginTop: 8, marginBottom: 0},
    desc: {fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 12},
    namePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        maxWidth: '100%',
    },
    nameText: {fontSize: 13, fontWeight: '700', flexShrink: 1},
    actions: {paddingHorizontal: 16, paddingBottom: 12, gap: 8},
    confirmBtn: {borderRadius: 12},
})
