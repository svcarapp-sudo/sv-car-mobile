import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/shared/storage'

interface AppState {
    isLoading: boolean
    language: string
}

interface AppActions {
    setLoading: (loading: boolean) => void
    setLanguage: (language: string) => void
    reset: () => void
}

type AppStore = AppState & AppActions

const initialState: AppState = {
    isLoading: false,
    language: 'en',
}

export const useAppStore = create<AppStore>()(
    persist(
        set => ({
            ...initialState,
            setLoading: loading => set({isLoading: loading}),
            setLanguage: language => set({language}),
            reset: () => set(initialState),
        }),
        {
            name: 'app-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
            partialize: state => ({language: state.language}),
        }
    )
)
