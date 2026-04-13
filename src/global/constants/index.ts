import ExpoConstants from 'expo-constants'

export const APP_NAME = 'SV Car Mobile'

/**
 * In dev, use API host from Expo config so a physical device can reach your Mac's backend.
 * The host is set in app.config.js from EXPO_PUBLIC_API_HOST env var.
 * Set it when running: EXPO_PUBLIC_API_HOST=192.168.1.133 npx expo start
 */
const getDevApiHost = (): string => {
    try {
        const extra = (ExpoConstants.expoConfig as {extra?: {apiHost?: string}} | null)?.extra

        return extra?.apiHost ?? 'localhost'
    } catch {
        return 'localhost'
    }
}

export const API_BASE_URL = __DEV__ ? `http://${getDevApiHost()}:3000` : 'https://api.example.com'

/** Fuel types for vehicle selection (not from backend) */
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
