import './src/global/ReactotronConfig'
import {useEffect, useCallback} from 'react'
import {StatusBar} from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useFonts, Cairo_400Regular, Cairo_500Medium, Cairo_600SemiBold, Cairo_700Bold} from '@expo-google-fonts/cairo'
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client'

import {queryClient, asyncStoragePersister} from '@/global/services/queryClient'
import {AppNavigator} from '@/global/navigation'
import {ToastHost} from '@/global/components'
import {ThemeProvider} from '@/global/providers'

// Keep the native splash screen visible while fonts load
SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontsLoaded] = useFonts({
        Cairo_400Regular,
        Cairo_500Medium,
        Cairo_600SemiBold,
        Cairo_700Bold,
    })

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
        <PersistQueryClientProvider client={queryClient} persistOptions={{persister: asyncStoragePersister}}>
            <SafeAreaProvider>
                <ThemeProvider>
                    <AppNavigator />
                    <ToastHost />
                    <StatusBar style='auto' />
                </ThemeProvider>
            </SafeAreaProvider>
        </PersistQueryClientProvider>
    )
}
