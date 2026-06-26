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
    activeListings: number
    lowStockCount: number
    outOfStockCount: number
    totalViews: number
    favoritesReceived: number
    partRequestsTotal: number
    partRequestsOpen: number

    /** Offers the seller has sent (funnel for the hub). */
    offersSent: number
    offersPending: number
    offersAccepted: number

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

/** A labelled count for distribution charts. */
export interface LabelCount {
    label: string
    count: number
}

/** One point in a daily time series (date = ISO yyyy-MM-dd). */
export interface TrendPoint {
    date: string
    count: number
}

/** A best-performing part for the analytics leaderboard. */
export interface TopPart {
    id: number
    name: string
    viewCount: number
    price: number
    categoryName: string | null
}

/**
 * Seller "Insights" analytics. Mirrors the backend `SellerAnalyticsResponse`
 * (GET /api/seller/analytics?days=N).
 */
export interface SellerAnalytics {
    rangeDays: number
    totalListed: number
    activeListings: number
    soldListings: number
    hiddenListings: number
    lowStockCount: number
    outOfStockCount: number
    totalViews: number
    favoritesReceived: number
    partsByStatus: LabelCount[]
    partsByCategory: LabelCount[]
    topParts: TopPart[]
    newListingsTrend: TrendPoint[]
    matchedDemandTrend: TrendPoint[]
    offersSent: number
    offersPending: number
    offersAccepted: number
}
