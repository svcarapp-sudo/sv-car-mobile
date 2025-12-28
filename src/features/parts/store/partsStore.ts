import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

import type {Part, PartCategory} from '@/shared/types'

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
    devtools(
        persist(
            set => ({
                ...initialState,
                setParts: parts => set({parts}, false, 'setParts'),
                addPart: part =>
                    set(
                        state => ({
                            parts: [...state.parts, part],
                        }),
                        false,
                        'addPart'
                    ),
                updatePart: (id, updates) =>
                    set(
                        state => ({
                            parts: state.parts.map(p => (p.id === id ? {...p, ...updates} : p)),
                        }),
                        false,
                        'updatePart'
                    ),
                deletePart: id =>
                    set(
                        state => ({
                            parts: state.parts.filter(p => p.id !== id),
                        }),
                        false,
                        'deletePart'
                    ),
                selectCategory: category => set({selectedCategory: category}, false, 'selectCategory'),
            }),
            {
                name: 'parts-storage',
                partialize: state => ({
                    parts: state.parts,
                    // Don't persist selectedCategory as it depends on runtime state
                }),
            }
        ),
        {name: 'PartsStore'}
    )
)
