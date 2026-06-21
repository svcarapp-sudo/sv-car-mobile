import {useEffect, useState} from 'react'
import {Pressable, ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Avatar, Divider, Drawer, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {navigationRef} from '@/global/navigation/navigationRef'
import {resetMainTo} from '@/global/navigation/navActions'
import {useAuthStore} from '@/global/store'
import {themeColors} from '@/global/theme'
import {haptics} from '@/global/utils'

import {DRAWER_ACCOUNT_ITEMS, DRAWER_MAIN_ITEMS, DRAWER_TEXT} from './drawerMenu'
import type {DrawerMenuItem} from './drawerMenu'
import {useLayoutStore} from './layoutStore'

const readRoute = () => (navigationRef.isReady() ? (navigationRef.getCurrentRoute()?.name ?? 'Home') : 'Home')

interface AppDrawerProps {
    onClose?: () => void
    onLogout?: () => void
}

export const AppDrawer = ({onClose, onLogout}: AppDrawerProps) => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const {toggleDrawer} = useLayoutStore()
    const user = useAuthStore(s => s.user)
    const logout = useAuthStore(s => s.logout)

    const [activeRoute, setActiveRoute] = useState(readRoute)

    useEffect(() => {
        const sync = () => setActiveRoute(readRoute())
        sync()
        return navigationRef.addListener('state', sync)
    }, [])

    const close = () => {
        onClose?.()
        toggleDrawer(false)
    }

    const goTo = (screen: DrawerMenuItem['screen']) => {
        haptics.selection()
        close()
        // Reset to the destination so it's a clean stack root (menu icon, no stray
        // back arrow) — matching the bottom nav instead of pushing onto history.
        resetMainTo(screen)
    }

    const handleLogout = () => {
        logout()
        close()
        onLogout?.()
    }

    const renderItem = (item: DrawerMenuItem) => (
        <Drawer.Item
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={activeRoute === item.screen}
            onPress={() => goTo(item.screen)}
        />
    )

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
            <Pressable
                style={[styles.header, {backgroundColor: theme.colors.primaryContainer, paddingTop: insets.top + 28}]}
                onPress={() => goTo('MyAccount')}
                accessibilityRole='button'
                accessibilityLabel={DRAWER_TEXT.OPEN_PROFILE}>
                <Avatar.Text
                    size={64}
                    label={user?.name?.slice(0, 2).toUpperCase() ?? 'SV'}
                    style={{backgroundColor: theme.colors.primary}}
                />
                <View style={styles.headerInfo}>
                    <Text variant='titleLarge' style={{color: theme.colors.primary}} numberOfLines={1}>
                        {user?.name ?? DRAWER_TEXT.USER_NAME}
                    </Text>
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}} numberOfLines={1}>
                        {user?.email ?? DRAWER_TEXT.USER_STATUS}
                    </Text>
                </View>
            </Pressable>

            <ScrollView style={styles.content}>
                <Drawer.Section title={DRAWER_TEXT.MAIN_MENU}>{DRAWER_MAIN_ITEMS.map(renderItem)}</Drawer.Section>

                <Divider />

                <Drawer.Section title={DRAWER_TEXT.ACCOUNT}>
                    {DRAWER_ACCOUNT_ITEMS.map(renderItem)}
                    <Drawer.Item label={DRAWER_TEXT.LOGOUT} icon='logout' onPress={handleLogout} />
                </Drawer.Section>
            </ScrollView>

            <View style={[styles.footer, {paddingBottom: insets.bottom + 16}]}>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInfo: {
        marginStart: 16,
        flexShrink: 1,
    },
    content: {
        flex: 1,
    },
    footer: {
        padding: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: themeColors.scrim,
        alignItems: 'center',
    },
    version: {
        opacity: 0.5,
    },
})
