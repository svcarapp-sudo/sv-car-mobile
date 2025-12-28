import axios from 'axios'

import {useAuthStore} from '@/features/auth/store'
import {API_BASE_URL} from '@/shared/constants'

interface RequestOptions {
    params?: Record<string, string | number | boolean | undefined>
    headers?: Record<string, string>
    skipAuth?: boolean
    timeout?: number
    data?: unknown
}

class ApiError extends Error {
    status: number
    data?: unknown

    constructor(message: string, status: number, data?: unknown) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
    }
}

class ApiClient {
    private axiosInstance: ReturnType<typeof axios.create>

    constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: 30000, // 30 seconds default timeout
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Request interceptor to add auth token
        this.axiosInstance.interceptors.request.use(
            config => {
                // Check if auth should be skipped
                if (config.headers) {
                    const skipAuth = (config.headers as Record<string, unknown>).skipAuth === 'true'

                    if (!skipAuth) {
                        const state = useAuthStore.getState()

                        if (state.token) {
                            config.headers.Authorization = `Bearer ${state.token}`
                        }
                    }

                    // Remove skipAuth from headers before sending
                    delete (config.headers as Record<string, unknown>).skipAuth
                }

                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        // Response interceptor for error handling
        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    // Server responded with error status
                    const {status, data} = error.response
                    const message = (data as {message?: string})?.message || error.message || `HTTP error! status: ${status}`

                    return Promise.reject(new ApiError(message, status, data))
                }

                if (error.request) {
                    // Request was made but no response received
                    return Promise.reject(new ApiError('Network error: No response received', 0))
                }

                // Something else happened
                return Promise.reject(new ApiError(error.message || 'An unexpected error occurred', 0))
            }
        )
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}, method?: string): Promise<T> {
        const {params, headers, skipAuth, timeout, data, ...otherOptions} = options

        const config: Record<string, unknown> = {
            url: endpoint,
            method: method as string,
            params,
            data,
            headers: {
                ...headers,
                ...(skipAuth ? {skipAuth: 'true'} : {}),
            },
            ...(timeout ? {timeout} : {}),
            ...otherOptions,
        }

        try {
            const response = await this.axiosInstance.request<T>(config as Parameters<typeof this.axiosInstance.request>[0])

            return response.data
        } catch (error) {
            // Error is already transformed by interceptor
            throw error
        }
    }

    async get<T>(endpoint: string, options?: Omit<RequestOptions, 'data'>): Promise<T> {
        return this.request<T>(endpoint, options, 'GET')
    }

    async post<T>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'data'>): Promise<T> {
        return this.request<T>(
            endpoint,
            {
                ...options,
                data,
            },
            'POST'
        )
    }

    async put<T>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'data'>): Promise<T> {
        return this.request<T>(
            endpoint,
            {
                ...options,
                data,
            },
            'PUT'
        )
    }

    async patch<T>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'data'>): Promise<T> {
        return this.request<T>(
            endpoint,
            {
                ...options,
                data,
            },
            'PATCH'
        )
    }

    async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'data'>): Promise<T> {
        return this.request<T>(endpoint, options, 'DELETE')
    }

    // Expose axios instance for advanced use cases
    getAxiosInstance() {
        return this.axiosInstance
    }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export error class for type checking
export {ApiError}
