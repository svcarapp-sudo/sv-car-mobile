export const COMMON_MAKES = [
    // Japanese
    {name: 'Toyota', icon: 'car-info', country: 'ياباني'},
    {name: 'Honda', icon: 'car-info', country: 'ياباني'},
    {name: 'Nissan', icon: 'car-info', country: 'ياباني'},
    {name: 'Mazda', icon: 'car-info', country: 'ياباني'},
    {name: 'Subaru', icon: 'car-info', country: 'ياباني'},
    {name: 'Mitsubishi', icon: 'car-info', country: 'ياباني'},
    {name: 'Lexus', icon: 'car-info', country: 'ياباني'},
    {name: 'Acura', icon: 'car-info', country: 'ياباني'},
    {name: 'Infiniti', icon: 'car-info', country: 'ياباني'},
    {name: 'Suzuki', icon: 'car-info', country: 'ياباني'},
    {name: 'Isuzu', icon: 'car-info', country: 'ياباني'},

    // Korean
    {name: 'Hyundai', icon: 'car-info', country: 'كوري'},
    {name: 'Kia', icon: 'car-info', country: 'كوري'},
    {name: 'Genesis', icon: 'car-info', country: 'كوري'},

    // American
    {name: 'Ford', icon: 'car-info', country: 'أمريكي'},
    {name: 'Chevrolet', icon: 'car-info', country: 'أمريكي'},
    {name: 'Dodge', icon: 'car-info', country: 'أمريكي'},
    {name: 'Jeep', icon: 'car-info', country: 'أمريكي'},
    {name: 'Ram', icon: 'car-info', country: 'أمريكي'},
    {name: 'Cadillac', icon: 'car-info', country: 'أمريكي'},
    {name: 'GMC', icon: 'car-info', country: 'أمريكي'},
    {name: 'Buick', icon: 'car-info', country: 'أمريكي'},
    {name: 'Chrysler', icon: 'car-info', country: 'أمريكي'},
    {name: 'Lincoln', icon: 'car-info', country: 'أمريكي'},
    {name: 'Tesla', icon: 'car-info', country: 'أمريكي'},

    // European (German)
    {name: 'BMW', icon: 'car-info', country: 'ألماني'},
    {name: 'Mercedes-Benz', icon: 'car-info', country: 'ألماني'},
    {name: 'Audi', icon: 'car-info', country: 'ألماني'},
    {name: 'Volkswagen', icon: 'car-info', country: 'ألماني'},
    {name: 'Porsche', icon: 'car-info', country: 'ألماني'},

    // European (Others)
    {name: 'Volvo', icon: 'car-info', country: 'أوروبي'},
    {name: 'Jaguar', icon: 'car-info', country: 'أوروبي'},
    {name: 'Land Rover', icon: 'car-info', country: 'أوروبي'},
    {name: 'Mini', icon: 'car-info', country: 'أوروبي'},
    {name: 'Fiat', icon: 'car-info', country: 'أوروبي'},
    {name: 'Alfa Romeo', icon: 'car-info', country: 'أوروبي'},
    {name: 'Peugeot', icon: 'car-info', country: 'أوروبي'},
    {name: 'Renault', icon: 'car-info', country: 'أوروبي'},
    {name: 'Citroen', icon: 'car-info', country: 'أوروبي'},
    {name: 'Saab', icon: 'car-info', country: 'أوروبي'},

    // Others
    {name: 'MG', icon: 'car-info', country: 'صيني / أخرى'},
    {name: 'BYD', icon: 'car-info', country: 'صيني / أخرى'},
    {name: 'Geely', icon: 'car-info', country: 'صيني / أخرى'},
    {name: 'Great Wall', icon: 'car-info', country: 'صيني / أخرى'},
]

// Fuel Types
export const FUEL_TYPES = [
    {id: 'gasoline', name: 'بنزين', icon: 'gas-station'},
    {id: 'diesel', name: 'ديزل', icon: 'gas-station-outline'},
    {id: 'electric', name: 'كهرباء', icon: 'ev-station'},
    {id: 'hybrid', name: 'هايبرد', icon: 'leaf'},
    {id: 'plugin_hybrid', name: 'هجين قابل للشحن', icon: 'battery-charging'},
]

// Re-export models from separate file for backward compatibility
export {CAR_MODELS as SAMPLE_MODELS} from './carModels'

// Year range for vehicles
export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_YEAR = 1980 // Expanded range
export const MAX_YEAR = CURRENT_YEAR + 1
