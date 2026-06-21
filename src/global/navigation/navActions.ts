import {CommonActions} from '@react-navigation/native'

import {navigationRef} from './navigationRef'
import type {RootStackParamList} from './types'

/** Screens that live inside the Main stack (everything except the launch/auth roots). */
export type MainScreen = Exclude<keyof RootStackParamList, 'Launch' | 'Onboarding' | 'Login' | 'Register' | 'Main'>

/**
 * Go to a top-level destination by RESETTING the Main stack to that single screen.
 *
 * Every drawer entry, every bottom-nav tab, the Home favorites button and the
 * cross-section jumps route through here, so a top-level screen is ALWAYS a stack
 * root: the header shows the menu icon (never a stray back arrow) and Home keeps
 * its favorites button. Drill-down screens (PartsList, PartDetail, AddVehicle, …)
 * deliberately keep calling navigation.navigate so they still push a back arrow.
 *
 * Why this exists: mixing reset (bottom nav) with navigate/push (drawer) produced an
 * inconsistent header. A reset onto a non-Home tab dropped Home from the stack, so the
 * drawer then PUSHED Home on top → navigationRef.canGoBack() === true → the header
 * rendered a back arrow instead of the menu icon and hid the favorites button.
 */
export const resetMainTo = (screen: MainScreen, params?: Record<string, unknown>) => {
    if (!navigationRef.isReady()) return

    const mainRoute = navigationRef.getRootState().routes.find(route => route.name === 'Main')
    const inner = mainRoute?.state
    const innerKey = inner?.key

    // Already sitting on exactly this screen as a clean root — skip the reset so we
    // don't remount the current screen (which would drop its scroll/fetch state).
    if (!params && inner?.routes.length === 1 && inner.routes[0]?.name === screen) return

    const route = params ? {name: screen, params} : {name: screen}

    // Main isn't mounted yet (cold start / deep-link) — enter it straight on the target.
    if (!innerKey) {
        navigationRef.dispatch(CommonActions.navigate({name: 'Main', params: {screen, params}}))
        return
    }

    // Reset ONLY the inner stack (target its key) so MainLayout + the drawer survive.
    navigationRef.dispatch({
        ...CommonActions.reset({index: 0, routes: [route]}),
        target: innerKey,
    })
}
