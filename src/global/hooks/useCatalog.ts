import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useQuery, useQueryClient} from '@tanstack/react-query'

import {catalogApi, catalogKeys} from '../services/catalogService'
import {FUEL_TYPES, MAX_YEAR, MIN_YEAR} from '../constants'

import type {MakeApi, ModelApi} from '../services/catalogService'
import type {PartCategoryApi} from '@/global/types'

type MakeModelCache = Record<number, {name: string; logoUrl?: string | null}> & Record<string, {name: string}>

interface UseCatalogOptions {
    /** Pass a parts array to auto-resolve make/model names for display. */
    parts?: {makeId?: number; modelId?: number}[]
}

export const useCatalog = (options?: UseCatalogOptions) => {
    const parts = options?.parts
    const qc = useQueryClient()

    // --- Origins ---
    const originsQuery = useQuery({
        queryKey: catalogKeys.origins(),
        queryFn: catalogApi.getOrigins,
    })

    // --- Part categories ---
    const categoriesQuery = useQuery({
        queryKey: catalogKeys.partCategories(),
        queryFn: catalogApi.getPartCategories,
    })

    const categories = categoriesQuery.data ?? []

    const getBySlug = useCallback(
        (slug: string): PartCategoryApi | undefined => categories.find(c => c.slug === slug),
        [categories]
    )

    // --- On-demand fetchers (go through queryClient cache) ---
    const getMakes = useCallback(
        async (originId?: number | null): Promise<MakeApi[]> => {
            try {
                return await qc.fetchQuery({
                    queryKey: catalogKeys.makes(originId),
                    queryFn: () => catalogApi.getMakes(originId),
                })
            } catch {
                return []
            }
        },
        [qc]
    )

    const getModels = useCallback(
        async (makeId: number): Promise<ModelApi[]> => {
            try {
                return await qc.fetchQuery({
                    queryKey: catalogKeys.models(makeId),
                    queryFn: () => catalogApi.getModels(makeId),
                })
            } catch {
                return []
            }
        },
        [qc]
    )

    // --- Static lists ---
    const years = useMemo(() => {
        const list: number[] = []
        for (let i = MAX_YEAR; i >= MIN_YEAR; i--) list.push(i)
        return list
    }, [])

    // --- Make/model name cache (only active when `parts` is provided) ---
    const [makeModelCache, setMakeModelCache] = useState<MakeModelCache>({})
    const fetchingRef = useRef(false)

    const partsKey = useMemo(() => {
        if (!parts) return ''
        return parts
            .map(p => `${p.makeId || ''}_${p.modelId || ''}`)
            .sort()
            .join('|')
    }, [parts])

    useEffect(() => {
        if (!parts || parts.length === 0 || fetchingRef.current) return

        const fetchMakeModelNames = async () => {
            fetchingRef.current = true
            try {
                const uniqueMakeIds = new Set(parts.map(p => p.makeId).filter(Boolean) as number[])
                const cache: MakeModelCache = {}

                let allMakes: MakeApi[] = []
                if (uniqueMakeIds.size > 0) {
                    try {
                        allMakes = await getMakes()
                    } catch {
                        // ignore
                    }
                }

                for (const makeId of uniqueMakeIds) {
                    const make = allMakes.find(m => Number(m.id) === makeId)
                    if (make) cache[makeId] = {name: make.name, logoUrl: make.logoUrl}
                }

                const makeIdToModelIds = new Map<number, number[]>()
                for (const part of parts) {
                    if (part.modelId && part.makeId) {
                        const existing = makeIdToModelIds.get(part.makeId) || []
                        if (!existing.includes(part.modelId)) {
                            makeIdToModelIds.set(part.makeId, [...existing, part.modelId])
                        }
                    }
                }

                for (const [makeId, modelIds] of makeIdToModelIds) {
                    try {
                        const models = await getModels(makeId)
                        for (const modelId of modelIds) {
                            const model = models.find(m => Number(m.id) === modelId)
                            if (model) cache[`model_${modelId}`] = {name: model.name}
                        }
                    } catch {
                        // ignore
                    }
                }

                setMakeModelCache(cache)
            } finally {
                fetchingRef.current = false
            }
        }

        fetchMakeModelNames()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partsKey])

    return {
        // Origins
        origins: originsQuery.data ?? [],
        originsLoading: originsQuery.isLoading,
        refreshOrigins: () => qc.invalidateQueries({queryKey: catalogKeys.origins()}),

        // Part categories
        categories,
        categoriesLoading: categoriesQuery.isLoading,
        categoriesError: categoriesQuery.error?.message ?? null,
        getBySlug,
        refreshCategories: () => qc.invalidateQueries({queryKey: catalogKeys.partCategories()}),

        // On-demand fetchers
        getMakes,
        getModels,

        // Static lists
        years,
        fuelTypes: FUEL_TYPES,

        // Make/model name cache
        makeModelCache,
    }
}
