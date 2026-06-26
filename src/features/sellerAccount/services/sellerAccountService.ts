import {apiClient} from '@/global/services'
import type {SellerAnalytics, SellerSummary} from '../types'

const BASE = '/api/seller'

/**
 * Wraps the seller dashboard endpoints. The summary is always resolvable for an
 * authenticated user — when no seller profile exists yet, `hasSellerProfile` is
 * false and the KPI counts are zero (the screen renders an empty state).
 */
class SellerAccountService {
    async getSummary(): Promise<SellerSummary> {
        return apiClient.get<SellerSummary>(`${BASE}/summary`)
    }

    async getAnalytics(days = 30): Promise<SellerAnalytics> {
        return apiClient.get<SellerAnalytics>(`${BASE}/analytics`, {params: {days}})
    }
}

export const sellerAccountService = new SellerAccountService()
