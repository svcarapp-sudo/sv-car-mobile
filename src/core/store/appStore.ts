import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

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
    devtools(
        persist(
            set => ({
                ...initialState,
                setLoading: loading => set({isLoading: loading}, false, 'setLoading'),
                setLanguage: language => set({language}, false, 'setLanguage'),
                reset: () => set(initialState, false, 'reset'),
            }),
            {
                name: 'app-storage', // unique name for localStorage key
                partialize: state => ({language: state.language}), // only persist language
            }
        ),
        {name: 'AppStore'} // name for Redux DevTools
    )
)
