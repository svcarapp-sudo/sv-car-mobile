import {StyleSheet, View, I18nManager} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigationState} from '@react-navigation/native'
import {Text, IconButton} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {navigationRef} from '@/global/navigation/navigationRef'
import {useSavedPartsStore} from '@/global/store'
import {useLayoutStore} from './layoutStore'

const BOTTOM_NAV_SCREENS = ['Home', 'PartsList', 'PartRequestsList', 'MyParts']
const SHOW_FAVORITES_ICON_ON = ['Home', 'PartsList', 'PartsCategories']

export const AppHeader = () => {
    const theme = useAppTheme()
    const {toggleDrawer} = useLayoutStore()
    const insets = useSafeAreaInsets()
    const savedCount = useSavedPartsStore(s => s.ids.length)

    const activeRoute = useNavigationState(state => {
        if (!state?.routes?.length) return 'Home'
        const mainRoute = state.routes[state.index]
        if (mainRoute?.name !== 'Main' || !mainRoute.state?.routes?.length) return 'Home'
        const inner = mainRoute.state
        const innerRoute = inner.routes[inner.index ?? 0]
        return (innerRoute?.name as string) || 'Home'
    })

    const canGoBack = useNavigationState(state => {
        if (!state?.routes?.length) return false
        const mainRoute = state.routes[state.index]
        if (mainRoute?.name !== 'Main' || !mainRoute.state) return false
        return (mainRoute.state.index ?? 0) > 0
    })

    const isBottomNavScreen = BOTTOM_NAV_SCREENS.includes(activeRoute)
    const showMenuIcon = !canGoBack || isBottomNavScreen
    const showBackButton = canGoBack && !isBottomNavScreen
    const showFavorites = SHOW_FAVORITES_ICON_ON.includes(activeRoute)

    const headerHeight = 58 + insets.top

    const goToFavorites = () => {
        if (navigationRef.isReady()) {
            navigationRef.navigate('Main', {screen: 'SavedParts'})
        }
    }

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
            <View style={styles.side}>
                {showMenuIcon && (
                    <IconButton
                        icon='menu'
                        size={26}
                        iconColor={theme.colors.onSurfaceVariant}
                        onPress={() => toggleDrawer(true)}
                        style={styles.iconBtn}
                    />
                )}
            </View>

            <View style={styles.center}>
                <Text style={[styles.brandText, {color: theme.colors.onSurface}]}>
                    sv-<Text style={{color: theme.colors.tertiary}}>car</Text>
                </Text>
            </View>

            <View style={styles.side}>
                {showBackButton ? (
                    <IconButton
                        icon={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
                        size={26}
                        iconColor={theme.colors.onSurfaceVariant}
                        onPress={() => {
                            if (navigationRef.canGoBack()) {
                                navigationRef.goBack()
                            }
                        }}
                        style={styles.iconBtn}
                    />
                ) : showFavorites ? (
                    <View style={styles.favWrap}>
                        <IconButton
                            icon='heart-outline'
                            size={24}
                            iconColor={theme.colors.onSurfaceVariant}
                            onPress={goToFavorites}
                            style={styles.iconBtn}
                            accessibilityLabel='Favorites'
                        />
                        {savedCount > 0 && (
                            <View style={[styles.badge, {backgroundColor: theme.colors.error}]} pointerEvents='none'>
                                <Text style={[styles.badgeText, {color: theme.colors.onError}]} numberOfLines={1}>
                                    {savedCount > 99 ? '99+' : savedCount}
                                </Text>
                            </View>
                        )}
                    </View>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        elevation: 2,
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    side: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBtn: {
        margin: 0,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandText: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    favWrap: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 4,
        end: 2,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 9.5,
        fontWeight: '800',
        lineHeight: 11,
    },
})
