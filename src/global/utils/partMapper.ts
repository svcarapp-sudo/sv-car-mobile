import type {PartCategory, Part} from '@/global/types'

/** Backend PartModel response shape */
export interface PartModelResponse {
    id: number
    sellerUserId: number
    makeId: number
    modelId: number
    year: number
    categoryId?: number
    name: string
    description?: string | null
    price: number
    imageUrl?: string | null
    sku?: string | null
    createdAt?: string | number
    updatedAt?: string | number
}

/** Maps a backend PartModel to the mobile Part type. */
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

    return {
        id: String(model.id),
        name: model.name,
        description: model.description || undefined,
        category: categorySlug,
        categoryId: model.categoryId,
        price: typeof model.price === 'number' ? model.price : parseFloat(String(model.price)),
        imageUrl: model.imageUrl || undefined,
        sku: model.sku || undefined,
        brand: undefined,
        makeId: model.makeId,
        modelId: model.modelId,
        year: model.year,
        compatibleVehicles: [
            {
                make: '',
                model: '',
                yearFrom: model.year,
                yearTo: model.year,
            },
        ],
        inStock: true,
        rating: undefined,
    }
}
