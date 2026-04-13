import Reactotron from 'reactotron-react-native'
import ExpoConstants from 'expo-constants'

if (__DEV__) {
    // Reuse the same API host from .env (set automatically by scripts/set-api-host.js)
    const host = (ExpoConstants.expoConfig as {extra?: {apiHost?: string}} | null)?.extra?.apiHost ?? 'localhost'

    const reactotron = Reactotron.configure({name: 'SV Car', host})
        .useReactNative({
            networking: {
                ignoreUrls: /symbolicate|logs/,
            },
        })
        .connect()

    reactotron.log?.('Reactotron connected!')
    console.log(`Reactotron configured, host: ${host}`)
}
