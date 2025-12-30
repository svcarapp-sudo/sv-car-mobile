import {create} from 'zustand'

interface LayoutState {
    isDrawerOpen: boolean
    toggleDrawer: (open?: boolean) => void
}

export const useLayoutStore = create<LayoutState>(set => ({
    isDrawerOpen: false,
    toggleDrawer: open =>
        set(state => ({
            isDrawerOpen: open !== undefined ? open : !state.isDrawerOpen,
        })),
}))
