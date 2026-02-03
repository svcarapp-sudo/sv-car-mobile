import {apiClient, ApiError} from '@/global/services'
import type {AuthResponse, LoginRequest, RegisterRequest, User} from '@/global/types'

const AUTH_PREFIX = '/api/auth'

function mapUser(u: AuthResponse['user']): User {
    return {
        id: String(u.id),
        name: u.name,
        email: u.email,
        selectedVehicleId: u.selectedVehicleId ?? null,
    }
}

export const authService = {
    async login(body: LoginRequest): Promise<{user: User; token: string}> {
        const res = await apiClient.post<AuthResponse>(`${AUTH_PREFIX}/login`, body, {skipAuth: true})
        if (!res.user) {
            throw new ApiError('Invalid response', 0)
        }
        const token = res.token ?? res.user.id
        return {user: mapUser(res.user), token}
    },

    async register(body: RegisterRequest): Promise<{user: User; token: string}> {
        const res = await apiClient.post<AuthResponse>(`${AUTH_PREFIX}/register`, body, {skipAuth: true})
        if (!res.user) {
            throw new ApiError('Invalid response', 0)
        }
        const token = res.token ?? res.user.id
        return {user: mapUser(res.user), token}
    },
}
