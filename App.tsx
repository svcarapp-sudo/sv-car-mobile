import {useEffect} from 'react'

import {StatusBar} from 'expo-status-bar'

import {AppNavigator} from '@/core/navigation'
import {ThemeProvider} from '@/core/providers'
import {usePartsStore} from '@/features/parts/store'
import {SAMPLE_PARTS} from '@/shared/utils'

export default function App() {
    const {setParts} = usePartsStore()

    // Load sample parts data on app start
    useEffect(() => {
        setParts(SAMPLE_PARTS)
    }, [setParts])

    return (
        <ThemeProvider>
            <AppNavigator />
            <StatusBar style='auto' />
        </ThemeProvider>
    )
}
