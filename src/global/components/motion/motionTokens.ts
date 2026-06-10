import {Easing} from 'react-native'

/**
 * Motion tokens — aligned with Material 3 motion durations and the timing used
 * by top consumer apps: entrances decelerate (~300-450ms), exits accelerate and
 * run shorter (~200ms), image fades ~250ms, list staggers 50-70ms per item.
 * Tune the feel of the whole app from this single file.
 */
export const MOTION = {
    duration: {
        /** Micro state changes: chip select, toggle. */
        xs: 150,
        /** Exits and quick fades. */
        sm: 220,
        /** Standard content entrances. */
        md: 340,
        /** Hero / first-screen entrances. */
        lg: 440,
    },
    easing: {
        /** Decelerate — for anything entering the screen. */
        enter: Easing.out(Easing.cubic),
        /** Accelerate — for anything leaving the screen. */
        exit: Easing.in(Easing.cubic),
        standard: Easing.inOut(Easing.cubic),
    },
    /** Stagger interval between sibling list/grid items. */
    staggerStep: 60,
    /** Cap so long lists don't keep the user waiting (≈ first 6 items animate). */
    staggerMax: 360,
} as const

/** Entrance delay for the item at `index`, capped so long lists stay fast. */
export const staggerDelay = (index: number, step: number = MOTION.staggerStep, max: number = MOTION.staggerMax): number =>
    Math.min(index * step, max)
