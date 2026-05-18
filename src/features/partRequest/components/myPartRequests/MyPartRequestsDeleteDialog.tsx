import {Button, Dialog, Portal, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const T = {
    TITLE: 'حذف الطلب',
    MESSAGE: (name: string) => `هل أنت متأكد من حذف الطلب "${name}"؟ لا يمكن التراجع عن هذا الإجراء.`,
    CONFIRM: 'حذف',
    CANCEL: 'إلغاء',
}

interface MyPartRequestsDeleteDialogProps {
    visible: boolean
    title?: string
    submitting?: boolean
    onCancel: () => void
    onConfirm: () => void
}

export const MyPartRequestsDeleteDialog = ({
    visible,
    title,
    submitting,
    onCancel,
    onConfirm,
}: MyPartRequestsDeleteDialogProps) => {
    const theme = useAppTheme()

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel}>
                <Dialog.Title>{T.TITLE}</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium'>{T.MESSAGE(title ?? '')}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel} disabled={submitting}>
                        {T.CANCEL}
                    </Button>
                    <Button onPress={onConfirm} loading={submitting} disabled={submitting} textColor={theme.colors.error}>
                        {T.CONFIRM}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
