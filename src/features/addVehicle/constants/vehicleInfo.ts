/** Fuel types for add-vehicle flow (not from backend) */
export const FUEL_TYPES = [
    {id: 'gasoline', name: 'بنزين', icon: 'gas-station'},
    {id: 'diesel', name: 'ديزل', icon: 'gas-station-outline'},
    {id: 'electric', name: 'كهرباء', icon: 'ev-station'},
    {id: 'hybrid', name: 'هايبرد', icon: 'leaf'},
    {id: 'plugin_hybrid', name: 'هجين قابل للشحن', icon: 'battery-charging'},
]

/** Year range for vehicles */
export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_YEAR = 1980
export const MAX_YEAR = CURRENT_YEAR + 1
