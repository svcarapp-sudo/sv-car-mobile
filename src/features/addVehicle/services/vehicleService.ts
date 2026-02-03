import {apiClient} from '@/global/services'

import type {Vehicle} from '@/global/types'
import type {
    CreateVehicleRequest,
    UpdateVehicleRequest,
    VehicleResponseDto,
    VehiclesListResponseDto,
} from '../types'

const API_BASE = '/api/vehicles'

function mapResponseToVehicle(dto: VehicleResponseDto): Vehicle {
    return {
        id: dto.id,
        make: dto.makeName ?? '',
        model: dto.modelName ?? '',
        year: dto.year,
        makeId: dto.makeId,
        modelId: dto.modelId,
        makeLogoUrl: dto.makeLogoUrl ?? undefined,
        fuelType: dto.fuelType ?? undefined,
        engine: dto.engine ?? undefined,
        trim: dto.trim ?? undefined,
        vin: dto.vin ?? undefined,
        displayName: dto.displayName ?? undefined,
        createdAt: dto.createdAt ?? Date.now(),
    }
}

class VehicleService {
    /**
     * Get all vehicles for the current user
     */
    async getVehicles(): Promise<Vehicle[]> {
        const response = await apiClient.get<VehiclesListResponseDto>(API_BASE)
        return (response.vehicles ?? []).map(mapResponseToVehicle)
    }

    /**
     * Create a new vehicle
     */
    async createVehicle(data: CreateVehicleRequest): Promise<Vehicle> {
        const dto = await apiClient.post<VehicleResponseDto>(API_BASE, data)
        return mapResponseToVehicle(dto)
    }

    /**
     * Update an existing vehicle
     */
    async updateVehicle(id: string, data: UpdateVehicleRequest): Promise<Vehicle> {
        const dto = await apiClient.patch<VehicleResponseDto>(`${API_BASE}/${id}`, data)
        return mapResponseToVehicle(dto)
    }

    /**
     * Delete a vehicle
     */
    async deleteVehicle(id: string): Promise<void> {
        await apiClient.delete<void>(`${API_BASE}/${id}`)
    }

    /**
     * Set the selected vehicle (for filtering parts)
     */
    async setSelectedVehicle(id: string | null): Promise<void> {
        if (id) {
            await apiClient.post<void>(`${API_BASE}/${id}/select`)
        } else {
            await apiClient.post<void>(`${API_BASE}/deselect`)
        }
    }
}

// Export singleton instance
export const vehicleService = new VehicleService()
