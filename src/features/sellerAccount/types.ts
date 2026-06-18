import type {SellerSpecialization} from '@/global/types'

/**
 * Aggregated seller account details + summary KPIs.
 * Mirrors the backend `SellerSummaryResponse` (GET /api/seller/summary).
 */
export interface SellerSummary {
    userId: number
    userName: string | null
    phone: string | null
    hasSellerProfile: boolean

    storeName: string | null
    sellerTypeName: string | null
    sellerTypeSlug: string | null
    city: string | null
    description: string | null
    workingHours: string | null
    profileImageUrl: string | null
    memberSince: string | null

    /** Derived trust signal: an active, paid (non-default) plan marks a verified/pro seller. */
    verified: boolean

    totalPartsListed: number
    totalViews: number
    favoritesReceived: number
    partRequestsTotal: number
    partRequestsOpen: number

    /** Makes the seller specializes in, and how many open requests currently match them. */
    specializations: SellerSpecialization[]
    matchedRequestsCount: number

    hasActiveSubscription: boolean
    subscriptionPlanName: string | null
    subscriptionPlanSlug: string | null
    subscriptionStatus: string | null
    subscriptionBillingPeriod: string | null
    subscriptionPrice: number | null
    subscriptionStartedAt: string | null
    subscriptionExpiresAt: string | null
}
