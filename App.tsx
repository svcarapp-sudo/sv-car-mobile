import {useEffect, useCallback} from 'react'
import {StatusBar} from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {useFonts, Cairo_400Regular, Cairo_500Medium, Cairo_600SemiBold, Cairo_700Bold} from '@expo-google-fonts/cairo'

import {AppNavigator} from '@/global/navigation'
import {ThemeProvider} from '@/global/providers'
import {usePartsStore} from '@/global/store'
import {SAMPLE_PARTS} from '@/global/utils'

// Keep the native splash screen visible while fonts load
SplashScreen.preventAutoHideAsync()

export default function App() {
    const {setParts} = usePartsStore()

    const [fontsLoaded] = useFonts({
        Cairo_400Regular,
        Cairo_500Medium,
        Cairo_600SemiBold,
        Cairo_700Bold,
    })

    // Load sample parts data on app start
    useEffect(() => {
        setParts(SAMPLE_PARTS)
    }, [setParts])

    const onReady = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    useEffect(() => {
        onReady()
    }, [onReady])

    if (!fontsLoaded) return null

    return (
        <ThemeProvider>
            <AppNavigator />
            <StatusBar style='auto' />
        </ThemeProvider>
    )
}
