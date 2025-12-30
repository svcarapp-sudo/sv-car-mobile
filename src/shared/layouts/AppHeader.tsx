import {StyleSheet, View} from 'react-native'

import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import {Appbar, Text, useTheme} from 'react-native-paper'

import {useLayoutStore} from './layoutStore'

export const AppHeader = ({navigation, back}: NativeStackHeaderProps) => {
    const theme = useTheme()
    const {toggleDrawer} = useLayoutStore()

    const openMenu = () => {
        toggleDrawer(true)
    }

    return (
        <Appbar.Header style={[styles.header, {backgroundColor: theme.colors.surface}]} elevated>
            {back ? (
                <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary} />
            ) : (
                <Appbar.Action icon='menu' onPress={openMenu} color={theme.colors.primary} />
            )}

            <Appbar.Content
                title={
                    <View style={styles.titleContainer}>
                        <Text style={[styles.logoText, {color: theme.colors.primary}]}>
                            sv-<Text style={{color: theme.colors.tertiary}}>car</Text>
                        </Text>
                    </View>
                }
            />

            <Appbar.Action icon='bell-outline' onPress={() => {}} color={theme.colors.onSurfaceVariant} />
            <Appbar.Action icon='account-circle-outline' onPress={() => {}} color={theme.colors.onSurfaceVariant} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
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
