import {StyleSheet, View, ScrollView} from 'react-native'

import {Drawer, Text, Avatar, useTheme, Divider} from 'react-native-paper'

import {useLayoutStore} from './layoutStore'

interface AppDrawerProps {
    onClose?: () => void
}

export const AppDrawer = ({onClose}: AppDrawerProps) => {
    const theme = useTheme()
    const {toggleDrawer} = useLayoutStore()

    const menuItems = [
        {id: 'home', label: 'Home', icon: 'home-outline'},
        {id: 'my-vehicle', label: 'My Vehicle', icon: 'car-outline'},
        {id: 'orders', label: 'My Orders', icon: 'package-variant-closed'},
        {id: 'appointments', label: 'Service Appointments', icon: 'calendar-check-outline'},
        {id: 'favorites', label: 'Favorites', icon: 'heart-outline'},
        {id: 'settings', label: 'Settings', icon: 'cog-outline'},
        {id: 'help', label: 'Help & Support', icon: 'help-circle-outline'},
    ]

    const handlePress = (_id: string) => {
        onClose?.()
        toggleDrawer(false)
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
            <View style={[styles.header, {backgroundColor: theme.colors.primaryContainer}]}>
                <Avatar.Text size={64} label='SV' style={{backgroundColor: theme.colors.primary}} />
                <View style={styles.headerInfo}>
                    <Text variant='titleLarge' style={{color: theme.colors.primary}}>
                        SV User
                    </Text>
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                        Premium Member
                    </Text>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <Drawer.Section title='Main Menu'>
                    {menuItems.slice(0, 4).map(item => (
                        <Drawer.Item key={item.id} label={item.label} icon={item.icon} onPress={() => handlePress(item.id)} />
                    ))}
                </Drawer.Section>

                <Divider />

                <Drawer.Section title='Account'>
                    {menuItems.slice(4).map(item => (
                        <Drawer.Item key={item.id} label={item.label} icon={item.icon} onPress={() => handlePress(item.id)} />
                    ))}
                </Drawer.Section>
            </ScrollView>

            <View style={styles.footer}>
                <Text variant='bodySmall' style={styles.version}>
                    v1.0.0
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInfo: {
        marginLeft: 16,
    },
    content: {
        flex: 1,
    },
    footer: {
        padding: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
    },
    version: {
        opacity: 0.5,
    },
})
