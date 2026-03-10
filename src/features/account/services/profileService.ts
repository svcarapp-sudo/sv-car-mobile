import {apiClient} from '@/global/services/ApiClient'
import type {
    User,
    UpdateProfileRequest,
    UserSubscription,
    SellerProfile,
    SellerType,
    CreateSellerProfileRequest,
    UpdateSellerProfileRequest,
} from '@/global/types'

class ProfileService {
    async getProfile(): Promise<User> {
        return apiClient.get<User>('/api/users/me')
    }

    async updateProfile(data: UpdateProfileRequest): Promise<User> {
        return apiClient.patch<User>('/api/users/me', data)
    }

    async getMySubscription(): Promise<UserSubscription> {
        return apiClient.get<UserSubscription>('/api/subscriptions/my-subscription')
    }

    async getSellerProfile(): Promise<SellerProfile> {
        return apiClient.get<SellerProfile>('/api/seller-profile')
    }

    async createSellerProfile(data: CreateSellerProfileRequest): Promise<SellerProfile> {
        return apiClient.post<SellerProfile>('/api/seller-profile', data)
    }

    async updateSellerProfile(data: UpdateSellerProfileRequest): Promise<SellerProfile> {
        return apiClient.patch<SellerProfile>('/api/seller-profile', data)
    }

    async getSellerTypes(): Promise<SellerType[]> {
        return apiClient.get<SellerType[]>('/api/seller-types')
    }
}

export const profileService = new ProfileService()
