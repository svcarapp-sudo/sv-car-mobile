import {apiClient} from '@/global/services'
import type {CreateOfferRequest, Offer, OfferStatus} from '@/global/types'

const BASE_PATH = '/api/part-requests'

export interface MyOffersResult {
    offers: Offer[]
    total: number
    page: number
    limit: number
    totalPages: number
}

interface MyOffersApiResponse {
    offers: Offer[]
    total: number
    page: number
    limit: number
    totalPages: number
}

/** Fields a seller may edit on a PENDING offer. */
export type UpdateOfferPayload = Partial<CreateOfferRequest>

class OfferService {
    /** Seller posts a price quote on a buyer's request. */
    async createOffer(requestId: string, body: CreateOfferRequest): Promise<Offer> {
        return apiClient.post<Offer>(`${BASE_PATH}/${requestId}/offers`, body)
    }

    /** Requester-only: every offer received on a request. */
    async getOffersForRequest(requestId: string): Promise<Offer[]> {
        return apiClient.get<Offer[]>(`${BASE_PATH}/${requestId}/offers`)
    }

    /** Seller's own sent offers, paginated. */
    async getMyOffers(page = 0, limit = 50): Promise<MyOffersResult> {
        const response = await apiClient.get<MyOffersApiResponse>('/api/me/offers', {params: {page, limit}})
        return {
            offers: response.offers ?? [],
            total: response.total,
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages,
        }
    }

    /** Seller edits a PENDING offer. */
    async updateOffer(offerId: number, body: UpdateOfferPayload): Promise<Offer> {
        return apiClient.patch<Offer>(`/api/offers/${offerId}`, body)
    }

    /** Buyer accepts/declines, or seller withdraws. */
    async respondToOffer(offerId: number, status: OfferStatus): Promise<Offer> {
        return apiClient.patch<Offer>(`/api/offers/${offerId}/status`, {status})
    }
}

export const offerService = new OfferService()
