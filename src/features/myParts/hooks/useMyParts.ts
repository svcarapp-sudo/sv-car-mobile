import {useState, useCallback, useEffect} from 'react'

import {ApiError} from '@/global/services'
import {myPartsService} from '../services'
import type {CreatePartRequest, PartStatus, UpdatePartRequest, Part} from '@/global/types'

export const useMyParts = () => {
    const [parts, setParts] = useState<Part[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    const fetchMyParts = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const myParts = await myPartsService.getMyParts()
            setParts(myParts)
            return myParts
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to fetch your parts'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const createPart = useCallback(async (data: CreatePartRequest): Promise<Part> => {
        setLoading(true)
        setError(null)

        try {
            const part = await myPartsService.createPart(data)
            setParts(prev => [...prev, part])
            return part
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to create part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const updatePart = useCallback(async (id: string, data: UpdatePartRequest): Promise<Part> => {
        setLoading(true)
        setError(null)

        try {
            const part = await myPartsService.updatePart(id, data)
            setParts(prev => prev.map(p => (p.id === id ? part : p)))
            return part
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to update part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const deletePart = useCallback(async (id: string): Promise<void> => {
        setLoading(true)
        setError(null)

        try {
            await myPartsService.deletePart(id)
            setParts(prev => prev.filter(p => p.id !== id))
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Failed to delete part'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const setStatus = useCallback((id: string, status: PartStatus): Promise<Part> => updatePart(id, {status}), [updatePart])

    const toggleSelect = useCallback((id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }, [])

    const clearSelection = useCallback(() => setSelectedIds(new Set()), [])

    /** Apply a per-id async operation to all selected ids; returns counts. */
    const runBulk = useCallback(
        async (op: (id: string) => Promise<unknown>): Promise<{ok: number; failed: number}> => {
            const ids = Array.from(selectedIds)
            const results = await Promise.allSettled(ids.map(op))
            const ok = results.filter(r => r.status === 'fulfilled').length
            return {ok, failed: ids.length - ok}
        },
        [selectedIds]
    )

    useEffect(() => {
        fetchMyParts().catch(() => {
            // Error already handled in fetchMyParts
        })
    }, [fetchMyParts])

    return {
        parts,
        loading,
        error,
        fetchMyParts,
        createPart,
        updatePart,
        deletePart,
        setStatus,
        selectedIds,
        selectionMode: selectedIds.size > 0,
        toggleSelect,
        clearSelection,
        runBulk,
    }
}
