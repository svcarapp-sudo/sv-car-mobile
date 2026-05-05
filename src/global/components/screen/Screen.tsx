import type {ReactNode} from 'react'
import {ScrollView, type NativeScrollEvent, type NativeSyntheticEvent, type StyleProp, type ViewStyle} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export interface ScreenProps {
    children: ReactNode
    contentContainerStyle?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
    onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
    scrollEventThrottle?: number
    showsVerticalScrollIndicator?: boolean
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
    /** Extra padding (px) kept between the focused input and the top of the keyboard. */
    extraScrollHeight?: number
    /** Disable the auto-scroll-to-focused-input behavior (e.g. for screens without inputs). */
    disableKeyboardHandling?: boolean
}

/**
 * Form-screen wrapper. Renders content inside a `KeyboardAwareScrollView` (pure JS,
 * Expo Go compatible) that auto-scrolls focused inputs above the keyboard on both iOS
 * and Android.
 *
 * If a screen never shows the keyboard, pass `disableKeyboardHandling` to fall back
 * to a plain `ScrollView`.
 */
export const Screen = ({
    children,
    contentContainerStyle,
    style,
    onScroll,
    scrollEventThrottle = 16,
    showsVerticalScrollIndicator = false,
    keyboardShouldPersistTaps = 'handled',
    extraScrollHeight = 20,
    disableKeyboardHandling = false,
}: ScreenProps) => {
    if (disableKeyboardHandling) {
        return (
            <ScrollView
                style={style}
                contentContainerStyle={contentContainerStyle}
                onScroll={onScroll}
                scrollEventThrottle={scrollEventThrottle}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
                {children}
            </ScrollView>
        )
    }

    return (
        <KeyboardAwareScrollView
            style={style}
            contentContainerStyle={contentContainerStyle}
            onScroll={onScroll}
            scrollEventThrottle={scrollEventThrottle}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            enableOnAndroid
            enableAutomaticScroll
            extraScrollHeight={extraScrollHeight}
            keyboardOpeningTime={0}>
            {children}
        </KeyboardAwareScrollView>
    )
}
