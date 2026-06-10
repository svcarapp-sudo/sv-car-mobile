import {create} from 'zustand'

export type ToastKind = 'success' | 'error' | 'info'

export interface ToastData {
    id: number
    message: string
    kind: ToastKind
}

interface ToastState {
    toast: ToastData | null
}

interface ToastActions {
    show: (message: string, kind?: ToastKind) => void
    hide: () => void
}

let nextId = 1

export const useToastStore = create<ToastState & ToastActions>(set => ({
    toast: null,
    show: (message, kind = 'info') => set({toast: {id: nextId++, message, kind}}),
    hide: () => set({toast: null}),
}))

/**
 * Imperative one-liner for anywhere in the app (screens, hooks, services):
 * `showToast('تم الحفظ', 'success')`. The host animates it in above the bottom
 * nav and pairs it with the matching haptic automatically.
 */
export const showToast = (message: string, kind: ToastKind = 'info') => useToastStore.getState().show(message, kind)
