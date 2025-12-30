import {StyleSheet, View, ScrollView} from 'react-native'

import {Drawer, Text, Avatar, useTheme, Divider} from 'react-native-paper'

import {useLayoutStore} from './layoutStore'

const ARABIC_TEXT = {
    HOME: 'الرئيسية',
    MY_VEHICLE: 'مركبتي',
    MY_ORDERS: 'طلباتي',
    SERVICE_APPOINTMENTS: 'مواعيد الخدمة',
    FAVORITES: 'المفضلة',
    SETTINGS: 'الإعدادات',
    HELP_SUPPORT: 'المساعدة والدعم',
    MAIN_MENU: 'القائمة الرئيسية',
    ACCOUNT: 'الحساب',
    USER_NAME: 'مستخدم SV',
    USER_STATUS: 'عضو مميز',
}

interface AppDrawerProps {
    onClose?: () => void
}

export const AppDrawer = ({onClose}: AppDrawerProps) => {
    const theme = useTheme()
    const {toggleDrawer} = useLayoutStore()

    const menuItems = [
        {id: 'home', label: ARABIC_TEXT.HOME, icon: 'home-outline'},
        {id: 'my-vehicle', label: ARABIC_TEXT.MY_VEHICLE, icon: 'car-outline'},
        {id: 'orders', label: ARABIC_TEXT.MY_ORDERS, icon: 'package-variant-closed'},
        {id: 'appointments', label: ARABIC_TEXT.SERVICE_APPOINTMENTS, icon: 'calendar-check-outline'},
        {id: 'favorites', label: ARABIC_TEXT.FAVORITES, icon: 'heart-outline'},
        {id: 'settings', label: ARABIC_TEXT.SETTINGS, icon: 'cog-outline'},
        {id: 'help', label: ARABIC_TEXT.HELP_SUPPORT, icon: 'help-circle-outline'},
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
                        {ARABIC_TEXT.USER_NAME}
                    </Text>
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                        {ARABIC_TEXT.USER_STATUS}
                    </Text>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <Drawer.Section title={ARABIC_TEXT.MAIN_MENU}>
                    {menuItems.slice(0, 4).map(item => (
                        <Drawer.Item key={item.id} label={item.label} icon={item.icon} onPress={() => handlePress(item.id)} />
                    ))}
                </Drawer.Section>

                <Divider />

                <Drawer.Section title={ARABIC_TEXT.ACCOUNT}>
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
        marginStart: 16,
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
