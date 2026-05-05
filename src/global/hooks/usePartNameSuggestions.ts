import {useEffect, useRef, useState} from 'react'

import {partNameApi, type PartNameSuggestion} from '@/global/services/partNameService'

const DEBOUNCE_MS = 200
const MIN_CHARS = 1
const SUGGESTION_LIMIT = 8

interface Options {
    query: string
    categoryId?: number | null
    enabled?: boolean
}

export const usePartNameSuggestions = ({query, categoryId, enabled = true}: Options) => {
    const [suggestions, setSuggestions] = useState<PartNameSuggestion[]>([])
    const [loading, setLoading] = useState(false)
    const reqIdRef = useRef(0)

    useEffect(() => {
        if (!enabled || query.trim().length < MIN_CHARS) {
            setSuggestions([])
            setLoading(false)
            return
        }

        const reqId = ++reqIdRef.current
        setLoading(true)
        const handle = setTimeout(async () => {
            try {
                const result = await partNameApi.search(query.trim(), categoryId, SUGGESTION_LIMIT)
                if (reqIdRef.current === reqId) {
                    setSuggestions(result)
                    setLoading(false)
                }
            } catch {
                if (reqIdRef.current === reqId) {
                    setSuggestions([])
                    setLoading(false)
                }
            }
        }, DEBOUNCE_MS)

        return () => clearTimeout(handle)
    }, [query, categoryId, enabled])

    return {suggestions, loading}
}
