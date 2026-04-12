import {QueryClient} from '@tanstack/react-query'
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            retry: 2,
        },
    },
})

export const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
    key: 'sv-car-query-cache',
})
