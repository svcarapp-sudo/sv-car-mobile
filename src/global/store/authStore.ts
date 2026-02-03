import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/global/storage'
import type {User} from '@/global/types'

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
    persist(
        set => ({
            ...initialState,
            login: (user, token) => set({user, token, isAuthenticated: true}),
            logout: () => set(initialState),
            updateUser: userData => set(state => ({user: state.user ? {...state.user, ...userData} : null})),
            setToken: token => set({token}),
        }),
        {
            name: 'auth-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
        }
    )
)
