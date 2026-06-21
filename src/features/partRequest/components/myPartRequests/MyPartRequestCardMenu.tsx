import {useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {Icon, Menu} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequestStatus} from '../../types'

const T = {
    MARK_FULFILLED: 'تم التوفير',
    CLOSE: 'إغلاق الطلب',
    REOPEN: 'إعادة فتح',
    DELETE: 'حذف',
}

interface MyPartRequestCardMenuProps {
    status: PartRequestStatus
    onStatusChange: (status: PartRequestStatus) => void
    onDelete: () => void
}

/** Kebab menu carrying status transitions + delete for an own-request card. */
export const MyPartRequestCardMenu = ({status, onStatusChange, onDelete}: MyPartRequestCardMenuProps) => {
    const theme = useAppTheme()
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)
    const run = (fn: () => void) => () => {
        close()
        fn()
    }

    return (
        <Menu
            visible={open}
            onDismiss={close}
            contentStyle={{backgroundColor: theme.colors.surface}}
            anchor={
                <Pressable onPress={() => setOpen(true)} hitSlop={10} style={styles.kebab} accessibilityRole='button'>
                    <Icon source='dots-horizontal' size={20} color={theme.colors.onSurfaceVariant} />
                </Pressable>
            }>
            {status === 'OPEN' && (
                <Menu.Item
                    leadingIcon='check-decagram-outline'
                    onPress={run(() => onStatusChange('FULFILLED'))}
                    title={T.MARK_FULFILLED}
                />
            )}
            {status === 'OPEN' && (
                <Menu.Item leadingIcon='lock-outline' onPress={run(() => onStatusChange('CLOSED'))} title={T.CLOSE} />
            )}
            {status !== 'OPEN' && (
                <Menu.Item leadingIcon='broadcast' onPress={run(() => onStatusChange('OPEN'))} title={T.REOPEN} />
            )}
            <Menu.Item
                leadingIcon='delete-outline'
                onPress={run(onDelete)}
                title={T.DELETE}
                titleStyle={{color: theme.colors.error}}
            />
        </Menu>
    )
}

const styles = StyleSheet.create({
    kebab: {padding: 2},
})
