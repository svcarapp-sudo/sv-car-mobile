import {useState, useEffect, useCallback, useMemo, useRef} from 'react'

import {catalogService} from '../services/catalogService'
import {FUEL_TYPES, MAX_YEAR, MIN_YEAR} from '../constants'

import type {OriginApi, MakeApi, ModelApi} from '../services/catalogService'
import type {PartCategoryApi} from '@/global/types'

type MakeModelCache = Record<number, {name: string; logoUrl?: string | null}> & Record<string, {name: string}>

interface UseCatalogOptions {
    /** Pass a parts array to auto-resolve make/model names for display. */
    parts?: Array<{makeId?: number; modelId?: number}>
}

export const useCatalog = (options?: UseCatalogOptions) => {
    const parts = options?.parts

    // --- Origins ---
    const [origins, setOrigins] = useState<OriginApi[]>([])
    const [originsLoading, setOriginsLoading] = useState(true)

    const fetchOrigins = useCallback(async () => {
        setOriginsLoading(true)
        try {
            setOrigins(await catalogService.getOrigins())
        } catch {
            setOrigins([])
        } finally {
            setOriginsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchOrigins()
    }, [fetchOrigins])

    // --- Part categories ---
    const [categories, setCategories] = useState<PartCategoryApi[]>([])
    const [categoriesLoading, setCategoriesLoading] = useState(true)
    const [categoriesError, setCategoriesError] = useState<string | null>(null)

    const fetchCategories = useCallback(async () => {
        setCategoriesLoading(true)
        setCategoriesError(null)
        try {
            const list = await catalogService.getPartCategories()
            setCategories(Array.isArray(list) ? list : [])
        } catch (err) {
            setCategories([])
            setCategoriesError((err as Error)?.message ?? 'فشل تحميل الفئات')
        } finally {
            setCategoriesLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const getBySlug = useCallback(
        (slug: string): PartCategoryApi | undefined => categories.find(c => c.slug === slug),
        [categories],
    )

    // --- On-demand fetchers (cached in catalogService) ---
    const getMakes = useCallback(async (originId?: number | null): Promise<MakeApi[]> => {
        try {
            return await catalogService.getMakes(originId)
        } catch {
            return []
        }
    }, [])

    const getModels = useCallback(async (makeId: number): Promise<ModelApi[]> => {
        try {
            return await catalogService.getModels(makeId)
        } catch {
            return []
        }
    }, [])

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
                        allMakes = await catalogService.getMakes()
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
                        const models = await catalogService.getModels(makeId)
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
        origins,
        originsLoading,
        refreshOrigins: fetchOrigins,

        // Part categories
        categories,
        categoriesLoading,
        categoriesError,
        getBySlug,
        refreshCategories: fetchCategories,

        // On-demand fetchers
        getMakes,
        getModels,

        // Static lists
        years,
        fuelTypes: FUEL_TYPES,

        // Make/model name cache (populated when `parts` option is provided)
        makeModelCache,
    }
}
