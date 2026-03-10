import React, {useCallback} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {useNavigation, useNavigationState, CommonActions} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Icon, Text} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    HOME: 'الرئيسية',
    MY_PARTS: 'إعلاناتي',
    MY_ACCOUNT: 'حسابي',
}

interface NavItem {
    key: string
    icon: string
    activeIcon: string
    label: string
    /** Screen name inside the Main stack */
    screenName: 'Home' | 'PartsList' | 'MyParts' | 'MyAccount'
    params?: Record<string, unknown>
}

const NAV_ITEMS: NavItem[] = [
    {
        key: 'Home',
        icon: 'home-outline',
        activeIcon: 'home',
        label: ARABIC_TEXT.HOME,
        screenName: 'Home',
    },
    {
        key: 'MyParts',
        icon: 'package-variant',
        activeIcon: 'package-variant-closed',
        label: ARABIC_TEXT.MY_PARTS,
        screenName: 'MyParts',
    },
    {
        key: 'MyAccount',
        icon: 'account-outline',
        activeIcon: 'account',
        label: ARABIC_TEXT.MY_ACCOUNT,
        screenName: 'MyAccount',
    },
]

export const BottomNav = React.memo(() => {
    const theme = useAppTheme()
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

            navigation.dispatch(state => {
                // Find the Main route to get the inner stack navigator's key
                const mainRoute = state.routes.find(r => r.name === 'Main')
                const innerState = mainRoute?.state

                // Fallback: if inner state isn't available yet, use navigate
                if (!innerState?.key) {
                    return CommonActions.navigate({
                        name: 'Main',
                        params: {screen: item.screenName, params: item.params},
                    })
                }

                // Reset ONLY the inner stack (targeted by its key).
                // The root stack stays untouched so MainLayout + BottomNav never remount.
                return {
                    ...CommonActions.reset({
                        index: 0,
                        routes: item.params ? [{name: item.screenName, params: item.params}] : [{name: item.screenName}],
                    }),
                    target: innerState.key,
                }
            })
        },
        [navigation, activeRoute]
    )

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.surface,
                    paddingBottom: insets.bottom,
                },
            ]}>
            {NAV_ITEMS.map(item => {
                const active = activeRoute === item.key
                return (
                    <TouchableOpacity
                        key={item.key}
                        style={styles.navItem}
                        onPress={() => handleNavigate(item)}
                        activeOpacity={0.7}>
                        <View
                            style={[
                                styles.iconPill,
                                active && [styles.iconPillActive, {backgroundColor: theme.colors.primaryContainer}],
                            ]}>
                            <Icon
                                source={active ? item.activeIcon : item.icon}
                                size={22}
                                color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: active ? theme.colors.primary : theme.colors.onSurfaceVariant,
                                    fontWeight: active ? '700' : '400',
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
        elevation: 8,
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.08,
        shadowRadius: 8,
        paddingTop: 4,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    iconPill: {
        width: 52,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
    },
    iconPillActive: {
        width: 56,
        height: 30,
        borderRadius: 15,
    },
    label: {
        fontSize: 10,
        textAlign: 'center',
        letterSpacing: 0.1,
    },
})
