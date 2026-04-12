import {useEffect} from 'react'
import {I18nManager} from 'react-native'
import {Provider as PaperProvider} from 'react-native-paper'

import {createAppTheme} from '@/global/theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    useEffect(() => {
        I18nManager.allowRTL(true)
        if (!I18nManager.isRTL) {
            I18nManager.forceRTL(true)
        }
    }, [])

    const theme = createAppTheme(true)

    return <PaperProvider theme={theme}>{children}</PaperProvider>
}
