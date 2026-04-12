import type {PartCategory, Part} from '@/global/types'

/** Backend compatibility entry shape */
export interface PartCompatibilityResponse {
    makeId: number
    modelId: number
    yearFrom: number
    yearTo: number
    makeName?: string | null
    modelName?: string | null
}

/** Backend PartResponse shape */
export interface PartModelResponse {
    id: number
    sellerUserId: number
    categoryId?: number
    name: string
    description?: string | null
    price: number
    imageUrls?: string[] | null
    sku?: string | null
    compatibilities?: PartCompatibilityResponse[]
    createdAt?: string | number
    updatedAt?: string | number
}

/** Maps a backend PartResponse to the mobile Part type. */
export function mapPartModelToPart(
    model: PartModelResponse,
    categories?: Array<{id: number; slug: string}>,
): Part {
    let categorySlug: PartCategory = 'other'
    if (model.categoryId && categories) {
        const category = categories.find(c => c.id === model.categoryId)
        if (category) {
            categorySlug = category.slug as PartCategory
        }
    }

    const compats = model.compatibilities ?? []
    const first = compats[0]

    return {
        id: String(model.id),
        name: model.name,
        description: model.description || undefined,
        category: categorySlug,
        categoryId: model.categoryId,
        price: typeof model.price === 'number' ? model.price : parseFloat(String(model.price)),
        imageUrl: model.imageUrls?.[0] || undefined,
        sku: model.sku || undefined,
        brand: undefined,
        makeId: first?.makeId,
        modelId: first?.modelId,
        year: first?.yearFrom,
        makeName: first?.makeName || undefined,
        modelName: first?.modelName || undefined,
        compatibleVehicles: compats.map(c => ({
            make: c.makeName ?? '',
            model: c.modelName ?? '',
            yearFrom: c.yearFrom,
            yearTo: c.yearTo,
        })),
        inStock: true,
        rating: undefined,
    }
}
