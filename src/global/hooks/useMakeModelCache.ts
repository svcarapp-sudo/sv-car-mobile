import {useState, useEffect, useMemo, useRef} from 'react'
import {useVehicleInfo} from './useVehicleInfo'

type MakeModelCache = Record<number, {name: string; logoUrl?: string | null}> & Record<string, {name: string}>

interface UseMakeModelCacheProps {
    parts: Array<{makeId?: number; modelId?: number}>
}

/**
 * Hook to fetch and cache make/model names for parts
 */
export const useMakeModelCache = ({parts}: UseMakeModelCacheProps) => {
    const {getMakes, getModels} = useVehicleInfo()
    const [makeModelCache, setMakeModelCache] = useState<MakeModelCache>({})
    const fetchingRef = useRef(false)

    // Create a stable key from parts to detect changes
    const partsKey = useMemo(() => {
        return parts
            .map(p => `${p.makeId || ''}_${p.modelId || ''}`)
            .sort()
            .join('|')
    }, [parts])

    useEffect(() => {
        // Prevent concurrent fetches
        if (fetchingRef.current) {
            return
        }

        const fetchMakeModelNames = async () => {
            if (parts.length === 0) {
                return
            }

            fetchingRef.current = true

            try {
                const uniqueMakeIds = new Set(parts.map(p => p.makeId).filter(Boolean) as number[])
                const cache: MakeModelCache = {}

                // Fetch all makes once
                let allMakes: Array<{id: string; name: string; logoUrl?: string | null}> = []
                if (uniqueMakeIds.size > 0) {
                    try {
                        allMakes = await getMakes()
                    } catch {
                        // Ignore errors
                    }
                }

                // Map make IDs
                for (const makeId of uniqueMakeIds) {
                    const make = allMakes.find(m => Number(m.id) === makeId)
                    if (make) {
                        cache[makeId] = {name: make.name, logoUrl: make.logoUrl}
                    }
                }

                // Fetch models for each unique makeId
                const uniqueModelIds = new Set(parts.map(p => p.modelId).filter(Boolean) as number[])
                const makeIdToModelIds = new Map<number, number[]>()
                
                for (const part of parts) {
                    if (part.modelId && part.makeId) {
                        const existing = makeIdToModelIds.get(part.makeId) || []
                        if (!existing.includes(part.modelId)) {
                            makeIdToModelIds.set(part.makeId, [...existing, part.modelId])
                        }
                    }
                }

                // Fetch models for each make
                for (const [makeId, modelIds] of makeIdToModelIds) {
                    try {
                        const models = await getModels(makeId)
                        for (const modelId of modelIds) {
                            const model = models.find(m => Number(m.id) === modelId)
                            if (model) {
                                cache[`model_${modelId}`] = {name: model.name}
                            }
                        }
                    } catch {
                        // Ignore errors
                    }
                }

                setMakeModelCache(cache)
            } finally {
                fetchingRef.current = false
            }
        }

        fetchMakeModelNames()
        // Only depend on partsKey, not the functions (they're stable from useCallback)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partsKey])

    return makeModelCache
}
