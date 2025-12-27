import {StyleSheet, View} from 'react-native'

import {StatusBar} from 'expo-status-bar'

import {Text} from 'react-native-paper'

import {ThemeProvider} from '@/core/providers'

export default function App() {
    return (
        <ThemeProvider>
            <View style={styles.container}>
                <Text variant='headlineMedium'>Welcome to SV Car Mobile</Text>
                <Text variant='bodyMedium' style={styles.subtitle}>
                    React Native Paper is now set up!
                </Text>
                <StatusBar style='auto' />
            </View>
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    subtitle: {
        marginTop: 8,
        opacity: 0.7,
    },
})
