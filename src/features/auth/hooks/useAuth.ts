// Auth feature hook that uses Zustand store
import {useAuthStore} from '../store'

/**
 * Custom hook for authentication
 * Provides easy access to auth state and actions
 */
export const useAuth = () => {
    const {user, token, isAuthenticated, login, logout, updateUser} = useAuthStore()

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
    }
}
