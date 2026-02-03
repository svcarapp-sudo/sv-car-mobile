import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/global/storage'
import type {Part, PartCategory} from '@/global/types'

interface PartsState {
    parts: Part[]
    selectedCategory: PartCategory | null
}

interface PartsActions {
    setParts: (parts: Part[]) => void
    addPart: (part: Part) => void
    updatePart: (id: string, updates: Partial<Part>) => void
    deletePart: (id: string) => void
    selectCategory: (category: PartCategory | null) => void
}

type PartsStore = PartsState & PartsActions

const initialState: PartsState = {
    parts: [],
    selectedCategory: null,
}

export const usePartsStore = create<PartsStore>()(
    persist(
        set => ({
            ...initialState,
            setParts: parts => set({parts}),
            addPart: part => set(state => ({parts: [...state.parts, part]})),
            updatePart: (id, updates) =>
                set(state => ({
                    parts: state.parts.map(p => (p.id === id ? {...p, ...updates} : p)),
                })),
            deletePart: id => set(state => ({parts: state.parts.filter(p => p.id !== id)})),
            selectCategory: category => set({selectedCategory: category}),
        }),
        {
            name: 'parts-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
            partialize: state => ({parts: state.parts}),
        }
    )
)
