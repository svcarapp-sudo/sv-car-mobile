/**
 * Arabic-aware, case-insensitive matching for client-side list filtering.
 * Normalises alef/teh-marbuta variants so «جيب» matches regardless of how the
 * catalog spells hamzas, and lowercases Latin brand names.
 */
export const normalizeSearchText = (input: string): string =>
    input.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').trim()

/** True when `query` matches any of the candidate fields (contains, normalised). */
export const matchesSearch = (query: string, ...fields: (string | undefined | null)[]): boolean => {
    const q = normalizeSearchText(query)
    if (!q) return true
    return fields.some(field => field && normalizeSearchText(field).includes(q))
}
