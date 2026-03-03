import {useEffect} from 'react'
import {I18nManager} from 'react-native'
import {Provider as PaperProvider} from 'react-native-paper'

import {useAppStore} from '@/global/store'
import {createAppTheme} from '@/global/theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const {language} = useAppStore()
    // Arabic and other RTL languages
    const isRTL = language === 'ar' || language?.startsWith('ar-')

    // Ensure RTL is always enforced for Arabic
    useEffect(() => {
        I18nManager.allowRTL(true)
        if (I18nManager.isRTL !== isRTL) {
            I18nManager.forceRTL(isRTL)
        }
    }, [isRTL])

    const theme = createAppTheme(isRTL)

    return <PaperProvider theme={theme}>{children}</PaperProvider>
}
