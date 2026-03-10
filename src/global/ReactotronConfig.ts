import Reactotron from 'reactotron-react-native'

if (__DEV__) {
    const reactotron = Reactotron.configure({name: 'SV Car', host: '10.58.107.91'})
        .useReactNative({
            networking: {
                ignoreUrls: /symbolicate|logs/,
            },
        })
        .connect()

    // Verify connection — you should see this in the Reactotron timeline
    reactotron.log?.('Reactotron connected!')

    // Also make it available on console for debugging
    console.log('Reactotron configured, host: 10.58.107.91')
}
