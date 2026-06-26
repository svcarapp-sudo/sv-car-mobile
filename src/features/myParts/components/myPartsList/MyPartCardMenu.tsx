import {useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {Icon, Menu} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Part} from '@/global/types'

const T = {EDIT: 'تعديل', DELETE: 'حذف', MARK_SOLD: 'تمييز كمباع', HIDE: 'إخفاء', SHOW: 'إظهار'}

interface MyPartCardMenuProps {
    part: Part
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
    onMarkSold: (partId: string) => void
    onToggleHidden: (part: Part) => void
}

export const MyPartCardMenu = ({part, onEdit, onDelete, onMarkSold, onToggleHidden}: MyPartCardMenuProps) => {
    const theme = useAppTheme()
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)
    const run = (fn: () => void) => () => {
        close()
        fn()
    }
    const isHidden = part.status === 'HIDDEN'
    const isSold = part.status === 'SOLD'

    return (
        <Menu
            visible={open}
            onDismiss={close}
            contentStyle={{backgroundColor: theme.colors.surface}}
            anchor={
                <Pressable onPress={() => setOpen(true)} hitSlop={10} style={styles.kebab}>
                    <Icon source='dots-horizontal' size={18} color={theme.colors.onSurfaceVariant} />
                </Pressable>
            }>
            <Menu.Item onPress={run(() => onEdit(part.id))} title={T.EDIT} leadingIcon='pencil-outline' />
            {!isSold && (
                <Menu.Item onPress={run(() => onMarkSold(part.id))} title={T.MARK_SOLD} leadingIcon='tag-check-outline' />
            )}
            <Menu.Item
                onPress={run(() => onToggleHidden(part))}
                title={isHidden ? T.SHOW : T.HIDE}
                leadingIcon={isHidden ? 'eye-outline' : 'eye-off-outline'}
            />
            <Menu.Item
                onPress={run(() => onDelete(part.id, part.name))}
                title={T.DELETE}
                leadingIcon='delete-outline'
                titleStyle={{color: theme.colors.error}}
            />
        </Menu>
    )
}

const styles = StyleSheet.create({
    kebab: {padding: 2, marginStart: 'auto'},
})
