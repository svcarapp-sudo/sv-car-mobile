// Comprehensive Vehicle Information Constants

// Manufacturers list - expanded to be more comprehensive
export const COMMON_MAKES = [
    // American
    {name: 'Ford', icon: 'car-info'},
    {name: 'Chevrolet', icon: 'car-info'},
    {name: 'Dodge', icon: 'car-info'},
    {name: 'Jeep', icon: 'car-info'},
    {name: 'Ram', icon: 'car-info'},
    {name: 'Cadillac', icon: 'car-info'},
    {name: 'GMC', icon: 'car-info'},
    {name: 'Buick', icon: 'car-info'},
    {name: 'Chrysler', icon: 'car-info'},
    {name: 'Lincoln', icon: 'car-info'},
    {name: 'Tesla', icon: 'car-info'},

    // Japanese
    {name: 'Toyota', icon: 'car-info'},
    {name: 'Honda', icon: 'car-info'},
    {name: 'Nissan', icon: 'car-info'},
    {name: 'Mazda', icon: 'car-info'},
    {name: 'Subaru', icon: 'car-info'},
    {name: 'Mitsubishi', icon: 'car-info'},
    {name: 'Lexus', icon: 'car-info'},
    {name: 'Acura', icon: 'car-info'},
    {name: 'Infiniti', icon: 'car-info'},
    {name: 'Suzuki', icon: 'car-info'},
    {name: 'Isuzu', icon: 'car-info'},

    // European (German)
    {name: 'BMW', icon: 'car-info'},
    {name: 'Mercedes-Benz', icon: 'car-info'},
    {name: 'Audi', icon: 'car-info'},
    {name: 'Volkswagen', icon: 'car-info'},
    {name: 'Porsche', icon: 'car-info'},

    // European (Others)
    {name: 'Volvo', icon: 'car-info'},
    {name: 'Jaguar', icon: 'car-info'},
    {name: 'Land Rover', icon: 'car-info'},
    {name: 'Mini', icon: 'car-info'},
    {name: 'Fiat', icon: 'car-info'},
    {name: 'Alfa Romeo', icon: 'car-info'},
    {name: 'Peugeot', icon: 'car-info'},
    {name: 'Renault', icon: 'car-info'},
    {name: 'Citroen', icon: 'car-info'},
    {name: 'Saab', icon: 'car-info'},

    // Korean
    {name: 'Hyundai', icon: 'car-info'},
    {name: 'Kia', icon: 'car-info'},
    {name: 'Genesis', icon: 'car-info'},

    // Others
    {name: 'MG', icon: 'car-info'},
    {name: 'BYD', icon: 'car-info'},
    {name: 'Geely', icon: 'car-info'},
    {name: 'Great Wall', icon: 'car-info'},
]

// Fuel Types
export const FUEL_TYPES = [
    {id: 'gasoline', name: 'بنزين', icon: 'gas-station'},
    {id: 'diesel', name: 'ديزل', icon: 'gas-station-outline'},
    {id: 'electric', name: 'كهرباء', icon: 'ev-station'},
    {id: 'hybrid', name: 'هجين', icon: 'leaf'},
    {id: 'plugin_hybrid', name: 'هجين قابل للشحن', icon: 'battery-charging'},
    {id: 'hydrogen', name: 'هيدروجين', icon: 'water-outline'},
]

// Expanded Model List for common makes
export const SAMPLE_MODELS: Record<string, string[]> = {
    Toyota: [
        'Camry',
        'Corolla',
        'RAV4',
        'Tacoma',
        'Highlander',
        'Prius',
        '4Runner',
        'Avalon',
        'Sienna',
        'Tundra',
        'Supra',
        'Land Cruiser',
    ],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline', 'Insight', 'Passport'],
    Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus', 'Ranger', 'Edge', 'Expedition', 'Fusion', 'EcoSport', 'Bronco'],
    Chevrolet: [
        'Silverado',
        'Equinox',
        'Malibu',
        'Tahoe',
        'Traverse',
        'Camaro',
        'Colorado',
        'Corvette',
        'Suburban',
        'Impala',
        'Cruze',
    ],
    BMW: ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M5', '2 Series', '4 Series', '7 Series', 'X1', 'X7', 'Z4'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'CLA', 'CLS', 'GLA', 'GLS', 'G-Class'],
    Audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'A5', 'A8', 'Q8', 'TT', 'R8'],
    Volkswagen: ['Golf', 'Jetta', 'Tiguan', 'Passat', 'Atlas', 'Arteon', 'Polo', 'Touareg', 'ID.4'],
    Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Maxima', 'Murano', '370Z', 'GT-R', 'Leaf', 'Titan'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Accent', 'Veloster', 'Ioniq'],
    Kia: ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride', 'Soul', 'Rio', 'Stinger', 'Seltos', 'EV6'],
    Mazda: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'CX-30', 'MX-5 Miata'],
    Subaru: ['Impreza', 'Legacy', 'Forester', 'Outback', 'Crosstrek', 'Ascent', 'WRX', 'BRZ'],
    Jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator'],
    Dodge: ['Charger', 'Challenger', 'Durango', 'Journey', 'Dart'],
    Lexus: ['IS', 'ES', 'LS', 'NX', 'RX', 'GX', 'LX', 'LC', 'UX'],
}

// Year range for vehicles
export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_YEAR = 1980 // Expanded range
export const MAX_YEAR = CURRENT_YEAR + 1
