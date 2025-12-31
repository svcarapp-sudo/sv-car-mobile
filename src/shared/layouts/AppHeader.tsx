import {StyleSheet, View, I18nManager} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import {Text, IconButton, useTheme} from 'react-native-paper'

import {useLayoutStore} from './layoutStore'

export const AppHeader = ({navigation, back}: NativeStackHeaderProps) => {
    const theme = useTheme()
    const {toggleDrawer} = useLayoutStore()
    const insets = useSafeAreaInsets()
    const openMenu = () => {
        toggleDrawer(true)
    }

    // Use consistent header height across platforms (56px is Material Design standard)
    const headerHeight = 56 + insets.top

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: theme.colors.surface,
                    paddingTop: insets.top,
                    height: headerHeight,
                    borderBottomColor: theme.colors.outline,
                },
            ]}>
            {/* Left side - Menu button (when back is false) */}
            <View style={styles.leftContainer}>
                {!back && (
                    <IconButton
                        icon='menu'
                        size={28}
                        iconColor={theme.colors.primary}
                        onPress={openMenu}
                        accessibilityLabel='Open menu'
                        accessibilityRole='button'
                    />
                )}
            </View>

            {/* Center - Logo */}
            <View style={styles.centerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.logoText, {color: theme.colors.primary}]}>
                        sv-<Text style={{color: theme.colors.tertiary}}>car</Text>
                    </Text>
                </View>
            </View>

            {/* Right side - Back button (when back is true) */}
            <View style={styles.rightContainer}>
                {back && (
                    <IconButton
                        icon={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
                        size={28}
                        iconColor={theme.colors.primary}
                        onPress={navigation.goBack}
                        accessibilityLabel='Go back'
                        accessibilityRole='button'
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    leftContainer: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingStart: 8,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainer: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingEnd: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    logoText: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.5,
        textTransform: 'uppercase',
    },
})
