import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Text, useTheme, IconButton} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    HOME: 'الرئيسية',
    SEARCH: 'البحث',
    MY_PARTS: 'قطع الغيار',
    SETTINGS: 'الإعدادات',
}

interface NavItem {
    key: string
    icon: string
    label: string
    route: keyof RootStackParamList | {screen: string; params?: any}
}

const NAV_ITEMS: NavItem[] = [
    {
        key: 'Home',
        icon: 'home',
        label: ARABIC_TEXT.HOME,
        route: {screen: 'Home'},
    },
    {
        key: 'PartsList',
        icon: 'magnify',
        label: ARABIC_TEXT.SEARCH,
        route: {screen: 'PartsList', params: {category: null}},
    },
    {
        key: 'MyParts',
        icon: 'package-variant',
        label: ARABIC_TEXT.MY_PARTS,
        route: {screen: 'MyParts'},
    },
    {
        key: 'Settings',
        icon: 'cog',
        label: ARABIC_TEXT.SETTINGS,
        route: {screen: 'Home'}, // TODO: Navigate to settings when implemented
    },
]

export const BottomNav = () => {
    const theme = useTheme()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const route = useRoute()

    // Get current active route name
    const getActiveRouteName = (): string => {
        if (route.name === 'Main') {
            // For nested routes, we need to check the navigation state
            const state = navigation.getState()
            const mainRoute = state.routes.find(r => r.name === 'Main')
            if (mainRoute && 'state' in mainRoute && mainRoute.state) {
                const mainState = mainRoute.state as any
                const currentRoute = mainState.routes?.[mainState.index]
                return currentRoute?.name || 'Home'
            }
        }
        return route.name
    }

    const activeRoute = getActiveRouteName()

    const handleNavigate = (item: NavItem) => {
        if (typeof item.route === 'string') {
            navigation.navigate(item.route as any)
        } else {
            navigation.navigate('Main', item.route as any)
        }
    }

    const isActive = (item: NavItem): boolean => {
        return activeRoute === item.key
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.surface,
                    paddingBottom: insets.bottom,
                    borderTopColor: theme.colors.outline,
                },
            ]}>
            {NAV_ITEMS.map(item => {
                const active = isActive(item)
                return (
                    <TouchableOpacity
                        key={item.key}
                        style={styles.navItem}
                        onPress={() => handleNavigate(item)}
                        activeOpacity={0.7}>
                        <View style={styles.iconContainer}>
                            <IconButton
                                icon={item.icon}
                                size={24}
                                iconColor={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
                                style={{margin: 0}}
                            />
                            {active && <View style={[styles.activeIndicator, {backgroundColor: theme.colors.primary}]} />}
                        </View>
                        <Text
                            variant='labelSmall'
                            style={[
                                styles.label,
                                {
                                    color: active ? theme.colors.primary : theme.colors.onSurfaceVariant,
                                    fontWeight: active ? '600' : '400',
                                },
                            ]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingTop: 8,
        minHeight: 64,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 2,
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    label: {
        fontSize: 11,
        textAlign: 'center',
    },
})
