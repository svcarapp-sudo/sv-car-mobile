import {MD3LightTheme, MD3Theme} from 'react-native-paper'

export const appTheme: MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#6200ee',
        secondary: '#03dac6',
        error: '#b00020',
        background: '#ffffff',
        surface: '#ffffff',
    },
}
