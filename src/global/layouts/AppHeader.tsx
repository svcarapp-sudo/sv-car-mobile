import {useEffect, useState} from 'react'
import {StyleSheet, View, I18nManager} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Text, IconButton} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {navigationRef} from '@/global/navigation/navigationRef'
import {resetMainTo} from '@/global/navigation/navActions'
import {useSavedPartsStore} from '@/global/store'
import {useLayoutStore} from './layoutStore'
import {FavoritesButton} from './FavoritesButton'

/**
 * Reads the deepest active route and whether we can go back straight from the
 * container ref. This is reliable across nested navigators — a parent-level
 * useNavigationState selector does NOT re-render on a nested push, which left
 * the header stuck showing the Home favorites button on pushed sub-pages.
 */
const readNav = () => ({
    routeName: navigationRef.isReady() ? (navigationRef.getCurrentRoute()?.name ?? 'Home') : 'Home',
    canGoBack: navigationRef.isReady() ? navigationRef.canGoBack() : false,
})

export const AppHeader = () => {
    const theme = useAppTheme()
    const {toggleDrawer} = useLayoutStore()
    const insets = useSafeAreaInsets()
    const savedCount = useSavedPartsStore(s => s.ids.length)

    const [nav, setNav] = useState(readNav)

    useEffect(() => {
        const sync = () => setNav(readNav())
        sync()
        return navigationRef.addListener('state', sync)
    }, [])

    // Favorites lives only on Home. Every screen you can navigate back from
    // (any pushed sub-page) shows a back arrow in its place instead. Bottom-nav
    // tabs reset the stack to index 0, so canGoBack is false on those roots.
    const showFavorites = nav.routeName === 'Home'
    const showBackButton = nav.canGoBack
    const showMenuIcon = !nav.canGoBack

    const headerHeight = 58 + insets.top

    const goToFavorites = () => {
        // Reset to SavedParts so it behaves exactly like the drawer's favorites entry.
        resetMainTo('SavedParts')
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
                        accessibilityLabel='القائمة'
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
                        accessibilityLabel='رجوع'
                    />
                ) : showFavorites ? (
                    <FavoritesButton count={savedCount} onPress={goToFavorites} />
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
})
