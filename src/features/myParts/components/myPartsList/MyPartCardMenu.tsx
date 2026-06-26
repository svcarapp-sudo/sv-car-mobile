import {AnchoredMenu} from '@/global/components'
import type {AnchoredMenuItem} from '@/global/components'
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
    const isHidden = part.status === 'HIDDEN'
    const isSold = part.status === 'SOLD'

    const items: AnchoredMenuItem[] = [
        {key: 'edit', label: T.EDIT, icon: 'pencil-outline', onPress: () => onEdit(part.id)},
        ...(!isSold ? [{key: 'sold', label: T.MARK_SOLD, icon: 'tag-check-outline', onPress: () => onMarkSold(part.id)}] : []),
        {
            key: 'hidden',
            label: isHidden ? T.SHOW : T.HIDE,
            icon: isHidden ? 'eye-outline' : 'eye-off-outline',
            onPress: () => onToggleHidden(part),
        },
        {key: 'delete', label: T.DELETE, icon: 'delete-outline', onPress: () => onDelete(part.id, part.name), destructive: true},
    ]

    return <AnchoredMenu items={items} anchorIconSize={18} anchorStyle={{marginStart: 'auto'}} />
}
