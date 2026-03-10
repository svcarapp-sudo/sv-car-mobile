import React, {useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {useNavigation, useNavigationState, CommonActions} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {RootStackParamList} from '@/global/navigation/types'

import {BottomNavItem} from './BottomNavItem'

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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

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
                const mainRoute = state.routes.find(r => r.name === 'Main')
                const innerState = mainRoute?.state

                if (!innerState?.key) {
                    return CommonActions.navigate({
                        name: 'Main',
                        params: {screen: item.screenName, params: item.params},
                    })
                }

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
            {NAV_ITEMS.map(item => (
                <BottomNavItem
                    key={item.key}
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    label={item.label}
                    active={activeRoute === item.key}
                    onPress={() => handleNavigate(item)}
                />
            ))}
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
})
