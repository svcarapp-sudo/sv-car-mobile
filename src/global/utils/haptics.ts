type HapticsModule = typeof import('expo-haptics')

/**
 * expo-haptics is resolved lazily so the app keeps working in a dev client
 * built before the module was added (calls become no-ops until the next
 * native build). In Expo Go it is available immediately.
 */
let impl: HapticsModule | null = null
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    impl = require('expo-haptics')
} catch {
    impl = null
}

const run = (fire: (h: HapticsModule) => Promise<unknown>) => {
    if (!impl) return
    try {
        fire(impl).catch(() => {})
    } catch {
        impl = null
    }
}

/**
 * Haptic vocabulary following Apple HIG / Material conventions — used sparingly
 * and always paired with visual feedback:
 *  - selection: discrete value changes (tabs, pickers, chips, toggles)
 *  - light/medium: physical taps (save heart, sheet snap, pull-to-refresh)
 *  - success/warning/error: outcome notifications (submit, delete, failure)
 */
export const haptics = {
    selection: () => run(h => h.selectionAsync()),
    light: () => run(h => h.impactAsync(h.ImpactFeedbackStyle.Light)),
    medium: () => run(h => h.impactAsync(h.ImpactFeedbackStyle.Medium)),
    success: () => run(h => h.notificationAsync(h.NotificationFeedbackType.Success)),
    warning: () => run(h => h.notificationAsync(h.NotificationFeedbackType.Warning)),
    error: () => run(h => h.notificationAsync(h.NotificationFeedbackType.Error)),
}
