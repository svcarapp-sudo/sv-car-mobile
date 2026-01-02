import {COMMON_MAKES, FUEL_TYPES, SAMPLE_MODELS, MAX_YEAR, MIN_YEAR} from '../constants'

import type {VehicleOptionsResponse} from '../types'

class VehicleInfoService {
    /**
     * Get all vehicle options (manufacturers, fuel types, years)
     * Currently returns dummy data
     */
    async getVehicleOptions(): Promise<VehicleOptionsResponse> {
        // Simulating API call
        // return apiClient.get<VehicleOptionsResponse>('/vehicle-info/options')

        const years: number[] = []
        for (let i = MAX_YEAR; i >= MIN_YEAR; i--) {
            years.push(i)
        }

        return {
            manufacturers: COMMON_MAKES,
            fuelTypes: FUEL_TYPES,
            years,
        }
    }

    /**
     * Get models for a specific manufacturer
     * Currently returns dummy data
     */
    async getModels(manufacturer: string): Promise<string[]> {
        // Simulating API call
        // return apiClient.get<string[]>(this.basePath + '/models', { params: { manufacturer } })

        return SAMPLE_MODELS[manufacturer] || []
    }

}

export const vehicleInfoService = new VehicleInfoService()
