import React, {useCallback} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {useNavigation, useNavigationState, CommonActions} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Text, useTheme, IconButton} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import type {PartCategory} from '@/global/types'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    HOME: 'الرئيسية',
    SEARCH: 'البحث',
    MY_PARTS: 'قطع الغيار',
    SETTINGS: 'الإعدادات',
}

/** Screens that are tabs in the bottom nav (live inside Main stack). */
const BOTTOM_NAV_SCREENS = ['Home', 'PartsList', 'MyParts'] as const

interface NavItem {
    key: string
    icon: string
    label: string
    /** Screen name inside the Main stack */
    screenName: 'Home' | 'PartsList' | 'MyParts'
    params?: Record<string, unknown>
}

const NAV_ITEMS: NavItem[] = [
    {
        key: 'Home',
        icon: 'home',
        label: ARABIC_TEXT.HOME,
        screenName: 'Home',
    },
    {
        key: 'PartsList',
        icon: 'magnify',
        label: ARABIC_TEXT.SEARCH,
        screenName: 'PartsList',
        params: {category: null},
    },
    {
        key: 'MyParts',
        icon: 'package-variant',
        label: ARABIC_TEXT.MY_PARTS,
        screenName: 'MyParts',
    },
    {
        key: 'Settings',
        icon: 'cog',
        label: ARABIC_TEXT.SETTINGS,
        screenName: 'Home', // TODO: Navigate to settings when implemented
    },
]

export const BottomNav = React.memo(() => {
    const theme = useTheme()
    const insets = useSafeAreaInsets()
    // BottomNav is rendered inside MainLayout, which is a sibling to the inner Stack;
    // so we get the root navigator and must target nested screen via 'Main'.
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    // Active route: when we're on Main, read the inner stack's current route
    const activeRoute = useNavigationState(state => {
        if (!state?.routes?.length) return 'Home'
        const mainRoute = state.routes[state.index]
        if (mainRoute?.name !== 'Main' || !mainRoute.state?.routes?.length) return 'Home'
        const inner = mainRoute.state
        const innerRoute = inner.routes[inner.index ?? 0]
        return (innerRoute?.name as string) || 'Home'
    })

    const handleNavigate = useCallback(
        (item: NavItem) => {
            if (activeRoute === item.key) return

            const isCurrentlyOnBottomNavScreen = BOTTOM_NAV_SCREENS.includes(activeRoute as any)

            if (isCurrentlyOnBottomNavScreen) {
                // Reset inner stack to this tab so back doesn't go to previous tab
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Main',
                                state: {
                                    index: 0,
                                    routes: item.params
                                        ? [{name: item.screenName, params: item.params}]
                                        : [{name: item.screenName}],
                                },
                            },
                        ],
                    })
                )
            } else {
                const mainParams: { screen: 'Home'; params?: undefined } | { screen: 'PartsList'; params: { category: PartCategory | null } } | { screen: 'MyParts'; params?: undefined } =
                    item.screenName === 'PartsList'
                        ? { screen: 'PartsList', params: (item.params ?? { category: null }) as { category: PartCategory | null } }
                        : item.screenName === 'MyParts'
                          ? { screen: 'MyParts' }
                          : { screen: 'Home' }
                navigation.navigate('Main', mainParams)
            }
        },
        [navigation, activeRoute]
    )

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
})

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
