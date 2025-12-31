import {useEffect} from 'react'
import {I18nManager} from 'react-native'
import {Provider as PaperProvider} from 'react-native-paper'

import {useAppStore} from '@/shared/store'
import {createAppTheme} from '@/shared/theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const {language} = useAppStore()
    // Arabic and other RTL languages
    const isRTL = language === 'ar' || language?.startsWith('ar-')

    // Configure I18nManager for RTL support
    useEffect(() => {
        if (I18nManager.isRTL !== isRTL) {
            I18nManager.allowRTL(true)
            I18nManager.forceRTL(isRTL)
            // Note: In development, you may need to restart the app for RTL changes to take effect
            // In production, the app should handle this automatically
        }
    }, [isRTL])

    const theme = createAppTheme(isRTL)

    return <PaperProvider theme={theme}>{children}</PaperProvider>
}
