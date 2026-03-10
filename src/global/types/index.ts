// Global type definitions
export interface User {
    id: string
    name: string
    email: string
    phone?: string | null
    avatarUrl?: string | null
    city?: string | null
    bio?: string | null
    role?: string
    status?: string
    selectedVehicleId?: number | null
}

export interface UpdateProfileRequest {
    name?: string
    email?: string
    phone?: string
    city?: string
    bio?: string
}

export interface PlanEntitlement {
    id: number
    entitlementKey: string
    entitlementType: 'FLAG' | 'LIMIT'
    valueLimit: number | null
    valueFlag: boolean | null
}

export interface Plan {
    id: number
    name: string
    slug: string
    description: string | null
    price: number
    billingPeriod: string
    isDefault: boolean
    isActive: boolean
    sortOrder: number
    entitlements: PlanEntitlement[]
}

export interface UserSubscription {
    id: number
    userId: number
    plan: Plan
    status: string
    startedAt: string
    expiresAt: string | null
    autoRenew: boolean
}

// Seller types
export interface SellerType {
    id: number
    slug: string
    name: string
    description: string | null
    sortOrder: number
}

export interface SellerProfile {
    id: number
    userId: number
    userName: string
    userEmail: string
    sellerType: SellerType
    storeName: string | null
    phone: string
    city: string | null
    description: string | null
    profileImageUrl: string | null
    workingHours: string | null
}

export interface CreateSellerProfileRequest {
    sellerTypeId: number
    phone: string
    storeName?: string
    city?: string
    description?: string
    profileImageUrl?: string
    workingHours?: string
}

export interface UpdateSellerProfileRequest {
    sellerTypeId: number
    phone: string
    storeName?: string
    city?: string
    description?: string
    profileImageUrl?: string
    workingHours?: string
}

/** Auth API request/response (register, login) */
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface AuthResponse {
    user: User
    token?: string | null
}

// Vehicle types
export interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    makeId?: number
    modelId?: number
    makeLogoUrl?: string
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

/** API response type for part-categories catalog endpoint */
export interface PartCategoryApi {
    id: number
    slug: string
    name: string
    icon: string
    description?: string | null
    sortOrder: number
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
    // Vehicle compatibility information
    makeId?: number
    modelId?: number
    year?: number
    makeName?: string
    modelName?: string
    compatibleVehicles: VehicleCompatibility[]
    // Additional metadata
    inStock: boolean
    rating?: number
    categoryId?: number
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

export type {
    GetPartsRequest,
    CreatePartRequest,
    UpdatePartRequest,
    PartResponse,
    PartsListResponse,
    CheckCompatibilityRequest,
    CompatibilityResponse,
    PartApiError,
} from './partsApi'
