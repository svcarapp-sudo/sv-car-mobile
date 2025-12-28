// App constants
// Part Categories
import type {PartCategoryInfo, PartCategory} from '@/shared/types'

export const APP_NAME = 'SV Car Mobile'

export const API_BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'https://api.example.com'

export const PART_CATEGORIES: Record<PartCategory, PartCategoryInfo> = {
    engine: {
        id: 'engine',
        name: 'Engine',
        icon: 'car-engine',
        description: 'Engine components and parts',
    },
    suspension: {
        id: 'suspension',
        name: 'Suspension',
        icon: 'car-suspension',
        description: 'Suspension systems and components',
    },
    brakes: {
        id: 'brakes',
        name: 'Brakes',
        icon: 'car-brake-alert',
        description: 'Brake pads, rotors, and systems',
    },
    electrical: {
        id: 'electrical',
        name: 'Electrical',
        icon: 'lightning-bolt',
        description: 'Electrical components and wiring',
    },
    body: {
        id: 'body',
        name: 'Body',
        icon: 'car-door',
        description: 'Body panels and exterior parts',
    },
    interior: {
        id: 'interior',
        name: 'Interior',
        icon: 'car-seat',
        description: 'Interior components and trim',
    },
    exhaust: {
        id: 'exhaust',
        name: 'Exhaust',
        icon: 'car-exhaust',
        description: 'Exhaust systems and mufflers',
    },
    cooling: {
        id: 'cooling',
        name: 'Cooling',
        icon: 'water',
        description: 'Radiators, hoses, and cooling systems',
    },
    transmission: {
        id: 'transmission',
        name: 'Transmission',
        icon: 'car-shift-pattern',
        description: 'Transmission components',
    },
    fuel: {
        id: 'fuel',
        name: 'Fuel System',
        icon: 'fuel',
        description: 'Fuel pumps, filters, and injectors',
    },
    tires: {
        id: 'tires',
        name: 'Tires & Wheels',
        icon: 'car-wheel',
        description: 'Tires, wheels, and related components',
    },
    other: {
        id: 'other',
        name: 'Other',
        icon: 'toolbox',
        description: 'Miscellaneous auto parts',
    },
}

export const PART_CATEGORIES_LIST = Object.values(PART_CATEGORIES)

// Common vehicle makes (sample data - can be expanded)
export const COMMON_MAKES = [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Volkswagen',
    'Nissan',
    'Hyundai',
    'Kia',
    'Mazda',
    'Subaru',
    'Jeep',
    'Dodge',
    'Ram',
    'Lexus',
    'Acura',
    'Infiniti',
    'Cadillac',
]

// Year range for vehicles
export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_YEAR = 1900
export const MAX_YEAR = CURRENT_YEAR + 1
