import {apiClient} from '@/shared/services'

import type {Vehicle, CreateVehicleRequest, UpdateVehicleRequest, VehicleResponse, VehiclesListResponse} from '../types'

class VehicleService {
    private readonly basePath = '/vehicles'

    /**
     * Get all vehicles for the current user
     */
    async getVehicles(): Promise<Vehicle[]> {
        const response = await apiClient.get<VehiclesListResponse>(this.basePath)

        return response.vehicles
    }

    /**
     * Get a single vehicle by ID
     */
    async getVehicleById(id: string): Promise<Vehicle> {
        return apiClient.get<VehicleResponse>(`${this.basePath}/${id}`)
    }

    /**
     * Create a new vehicle
     */
    async createVehicle(data: CreateVehicleRequest): Promise<Vehicle> {
        return apiClient.post<VehicleResponse>(this.basePath, data)
    }

    /**
     * Update an existing vehicle
     */
    async updateVehicle(id: string, data: UpdateVehicleRequest): Promise<Vehicle> {
        return apiClient.patch<VehicleResponse>(`${this.basePath}/${id}`, data)
    }

    /**
     * Delete a vehicle
     */
    async deleteVehicle(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.basePath}/${id}`)
    }

    /**
     * Set the selected vehicle (for filtering parts)
     */
    async setSelectedVehicle(id: string | null): Promise<void> {
        if (id) {
            return apiClient.post<void>(`${this.basePath}/${id}/select`)
        }

        return apiClient.post<void>(`${this.basePath}/deselect`)
    }
}

// Export singleton instance
export const vehicleService = new VehicleService()
