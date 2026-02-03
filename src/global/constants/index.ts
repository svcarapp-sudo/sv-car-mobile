// eslint-disable-next-line import/no-named-as-default -- expo-constants default export is the config object
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
