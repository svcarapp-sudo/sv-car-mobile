import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import {asyncStorageAdapter} from '@/global/storage'
import {savedPartsService} from '@/global/services/savedPartsService'

interface SavedPartsState {
    ids: string[]
    isHydrated: boolean
}

interface SavedPartsActions {
    has: (partId: string) => boolean
    toggle: (partId: string) => Promise<boolean>
    hydrate: () => Promise<void>
    clear: () => void
}

type SavedPartsStore = SavedPartsState & SavedPartsActions

const initialState: SavedPartsState = {
    ids: [],
    isHydrated: false,
}

export const useSavedPartsStore = create<SavedPartsStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            has: partId => get().ids.includes(partId),

            toggle: async partId => {
                const currentlySaved = get().ids.includes(partId)
                const nextSaved = !currentlySaved
                set({
                    ids: nextSaved ? [partId, ...get().ids.filter(id => id !== partId)] : get().ids.filter(id => id !== partId),
                })
                try {
                    if (nextSaved) {
                        await savedPartsService.save(partId)
                    } else {
                        await savedPartsService.unsave(partId)
                    }
                    return nextSaved
                } catch (err) {
                    set({
                        ids: currentlySaved
                            ? [partId, ...get().ids.filter(id => id !== partId)]
                            : get().ids.filter(id => id !== partId),
                    })
                    throw err
                }
            },

            hydrate: async () => {
                try {
                    const ids = await savedPartsService.getIds()
                    set({ids, isHydrated: true})
                } catch {
                    set({isHydrated: true})
                }
            },

            clear: () => set({...initialState, isHydrated: true}),
        }),
        {
            name: 'saved-parts-storage',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: asyncStorageAdapter as any,
            partialize: state => ({ids: state.ids}),
        }
    )
)
