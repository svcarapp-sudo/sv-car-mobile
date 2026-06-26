import {AnchoredMenu} from '@/global/components'
import type {AnchoredMenuItem} from '@/global/components'

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
    const items: AnchoredMenuItem[] = [
        ...(status === 'OPEN'
            ? [
                  {
                      key: 'fulfill',
                      label: T.MARK_FULFILLED,
                      icon: 'check-decagram-outline',
                      onPress: () => onStatusChange('FULFILLED'),
                  },
                  {key: 'close', label: T.CLOSE, icon: 'lock-outline', onPress: () => onStatusChange('CLOSED')},
              ]
            : [{key: 'reopen', label: T.REOPEN, icon: 'broadcast', onPress: () => onStatusChange('OPEN')}]),
        {key: 'delete', label: T.DELETE, icon: 'delete-outline', onPress: onDelete, destructive: true},
    ]

    return <AnchoredMenu items={items} />
}
