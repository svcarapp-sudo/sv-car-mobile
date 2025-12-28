import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

import type {User} from '@/shared/types'

// Note: User type is defined in shared/types as it's used across the app

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
}

interface AuthActions {
    login: (user: User, token: string) => void
    logout: () => void
    updateUser: (user: Partial<User>) => void
    setToken: (token: string) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            set => ({
                ...initialState,
                login: (user, token) => set({user, token, isAuthenticated: true}, false, 'login'),
                logout: () => set(initialState, false, 'logout'),
                updateUser: userData =>
                    set(state => ({user: state.user ? {...state.user, ...userData} : null}), false, 'updateUser'),
                setToken: token => set({token}, false, 'setToken'),
            }),
            {
                name: 'auth-storage', // unique name for localStorage key
            }
        ),
        {name: 'AuthStore'} // name for Redux DevTools
    )
)
