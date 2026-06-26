import {useCallback, useState} from 'react'

import {showToast} from '@/global/components'
import {haptics} from '@/global/utils'
import type {Part, PartStatus} from '@/global/types'

import type {BulkAction} from '../components/myPartsList/MyPartsBulkBar'
import {useMyParts} from './useMyParts'

const T = {
    MARKED_SOLD: 'تم تمييز القطعة كمباعة',
    HIDDEN: 'تم إخفاء القطعة',
    SHOWN: 'تم إظهار القطعة',
    STATUS_ERROR: 'تعذر تحديث الحالة',
    BULK_DONE: (n: number) => `تم تحديث ${n} قطعة`,
    BULK_PARTIAL: (ok: number, failed: number) => `تم تحديث ${ok}، فشل ${failed}`,
    BULK_ERROR: 'تعذر تنفيذ العملية',
}

/** Wraps single + bulk inventory actions with toasts, haptics and busy state. */
export const useMyPartsActions = (mp: ReturnType<typeof useMyParts>) => {
    const {setStatus, deletePart, selectedIds, clearSelection, runBulk} = mp
    const [bulkBusy, setBulkBusy] = useState(false)

    const markSold = useCallback(
        async (id: string) => {
            try {
                await setStatus(id, 'SOLD')
                haptics.success()
                showToast(T.MARKED_SOLD, 'success')
            } catch {
                haptics.error()
                showToast(T.STATUS_ERROR, 'error')
            }
        },
        [setStatus]
    )

    const toggleHidden = useCallback(
        async (part: Part) => {
            const next: PartStatus = part.status === 'HIDDEN' ? 'ACTIVE' : 'HIDDEN'
            try {
                await setStatus(part.id, next)
                haptics.success()
                showToast(next === 'HIDDEN' ? T.HIDDEN : T.SHOWN, 'success')
            } catch {
                haptics.error()
                showToast(T.STATUS_ERROR, 'error')
            }
        },
        [setStatus]
    )

    const runBulkAction = useCallback(
        async (action: BulkAction) => {
            const total = selectedIds.size
            if (total === 0) return
            setBulkBusy(true)
            const op =
                action === 'delete'
                    ? (id: string) => deletePart(id)
                    : (id: string) => setStatus(id, action === 'sold' ? 'SOLD' : 'HIDDEN')
            try {
                const {ok, failed} = await runBulk(op)
                if (failed === 0) {
                    haptics.success()
                    showToast(T.BULK_DONE(ok), 'success')
                } else {
                    haptics.warning()
                    showToast(T.BULK_PARTIAL(ok, failed), failed >= ok ? 'error' : 'info')
                }
            } catch {
                haptics.error()
                showToast(T.BULK_ERROR, 'error')
            } finally {
                setBulkBusy(false)
                clearSelection()
            }
        },
        [selectedIds, deletePart, setStatus, runBulk, clearSelection]
    )

    return {bulkBusy, markSold, toggleHidden, runBulkAction}
}
