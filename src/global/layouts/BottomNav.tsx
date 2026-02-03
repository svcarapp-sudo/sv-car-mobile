import {StyleSheet} from 'react-native'

import {Appbar, useTheme} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export const BottomNav = () => {
    const theme = useTheme()
    const insets = useSafeAreaInsets()

    return (
        <Appbar
            style={[
                styles.bottom,
                {
                    backgroundColor: theme.colors.surface,
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                },
            ]}>
            <Appbar.Action icon='home' onPress={() => {}} color={theme.colors.primary} />
            <Appbar.Action icon='magnify' onPress={() => {}} />
            <Appbar.Action icon='cart' onPress={() => {}} />
            <Appbar.Action icon='car-cog' onPress={() => {}} />
        </Appbar>
    )
}

const styles = StyleSheet.create({
    bottom: {
        justifyContent: 'space-around',
        elevation: 1,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
})
