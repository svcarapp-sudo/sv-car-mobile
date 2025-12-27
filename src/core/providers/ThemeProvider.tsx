import {Provider as PaperProvider} from 'react-native-paper'

import {appTheme} from '@/shared/theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    return <PaperProvider theme={appTheme}>{children}</PaperProvider>
}
