import {registerRootComponent} from 'expo'
import {I18nManager, Platform, TextInput} from 'react-native'

import App from './App'

// Global RTL override for all TextInput components (including Paper's TextInput).
// TextInput is a forwardRef component with an internal .render function.
// We patch it to inject textAlign/writingDirection so every input is RTL by default.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RNTextInput = TextInput as any
if (typeof RNTextInput.render === 'function') {
    const origRender = RNTextInput.render
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RNTextInput.render = function (props: any, ref: any) {
        const rtlStyle = {textAlign: 'right' as const, writingDirection: 'rtl' as const}
        return origRender.call(this, {...props, style: [rtlStyle, props.style]}, ref)
    }
}

// Force RTL for Arabic
I18nManager.allowRTL(true)

if (!I18nManager.isRTL) {
    I18nManager.forceRTL(true)
    // forceRTL sets a persistent native flag but only takes effect after restart.
    // Trigger an automatic reload so the user doesn't have to manually restart.
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const RCTDevSettings =
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require('react-native').NativeModules?.DevSettings
        if (__DEV__ && RCTDevSettings?.reload) {
            setTimeout(() => RCTDevSettings.reload(), 50)
        }
    }
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
