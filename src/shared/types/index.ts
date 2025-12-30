// Global type definitions
export interface User {
    id: string
    name: string
    email: string
}

// Vehicle types
export interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    fuelType?: string
    engine?: string
    trim?: string
    vin?: string
    displayName?: string
    createdAt: number
}

// Part Category types
export type PartCategory =
    | 'engine'
    | 'suspension'
    | 'brakes'
    | 'electrical'
    | 'body'
    | 'interior'
    | 'exhaust'
    | 'cooling'
    | 'transmission'
    | 'fuel'
    | 'tires'
    | 'other'

export interface PartCategoryInfo {
    id: PartCategory
    name: string
    icon: string
    description?: string
}

// Part types
export interface Part {
    id: string
    name: string
    description?: string
    category: PartCategory
    price: number
    imageUrl?: string
    sku?: string
    brand?: string
    // Compatibility information
    compatibleVehicles: VehicleCompatibility[]
    // Additional metadata
    inStock: boolean
    rating?: number
}

export interface VehicleCompatibility {
    make: string
    model: string
    yearFrom?: number
    yearTo?: number
    engine?: string
    trim?: string
}

// Compatibility check result
export interface CompatibilityResult {
    isCompatible: boolean
    exactMatch: boolean
    reason?: string
}
