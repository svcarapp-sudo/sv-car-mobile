import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * AsyncStorage adapter for Zustand persist middleware
 * This allows Zustand to use AsyncStorage instead of localStorage in React Native
 *
 * Note: We handle serialization here to ensure values are always stored as strings,
 * as AsyncStorage requires string values
 */
export const asyncStorageAdapter = {
    getItem: async (name: string): Promise<string | null> => {
        return AsyncStorage.getItem(name)
    },
    setItem: async (name: string, value: unknown): Promise<void> => {
        // AsyncStorage requires string values, so we serialize if needed
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
        await AsyncStorage.setItem(name, stringValue)
    },
    removeItem: async (name: string): Promise<void> => {
        await AsyncStorage.removeItem(name)
    },
}
