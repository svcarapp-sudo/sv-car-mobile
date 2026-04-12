interface CacheEntry<T> {
    data: T
    timestamp: number
}

/**
 * Generic in-memory cache with TTL and request deduplication.
 * Use for catalog/reference data that rarely changes.
 */
export class RequestCache {
    private cache = new Map<string, CacheEntry<unknown>>()
    private pending = new Map<string, Promise<unknown>>()
    private readonly ttl: number

    /** @param ttlMinutes How long cached entries stay fresh (default: 30 min) */
    constructor(ttlMinutes: number = 30) {
        this.ttl = ttlMinutes * 60 * 1000
    }

    /**
     * Returns cached data if fresh, otherwise calls `fetcher` once
     * and shares the result with any concurrent callers for the same key.
     */
    async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
        const cached = this.cache.get(key)
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.data as T
        }

        // Deduplicate concurrent requests for the same key
        const pending = this.pending.get(key)
        if (pending) return pending as Promise<T>

        const promise = fetcher()
            .then(data => {
                this.cache.set(key, {data, timestamp: Date.now()})
                this.pending.delete(key)
                return data
            })
            .catch(err => {
                this.pending.delete(key)
                throw err
            })

        this.pending.set(key, promise)
        return promise
    }

    /** Clear a specific key, or all entries if no key given. */
    invalidate(key?: string) {
        if (key) {
            this.cache.delete(key)
        } else {
            this.cache.clear()
        }
    }
}
