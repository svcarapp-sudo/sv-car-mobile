import React from 'react'
import Svg, {Circle, Defs, Ellipse, LinearGradient, RadialGradient, Stop} from 'react-native-svg'

import {useAppTheme} from '@/global/hooks'

import {ART_A} from './artA'
import {ART_B} from './artB'
import {ART_C} from './artC'
import type {ArtColors, CategoryArtRenderer} from './types'

const RENDERERS: Record<string, CategoryArtRenderer> = {...ART_A, ...ART_B, ...ART_C}

interface CategoryArtProps {
    slug: string
    size?: number
}

/**
 * Dimensional, two-tone category illustration: gradient-shaded bodies with
 * amber accents, sitting on a soft glow + contact shadow. Falls back to "other".
 */
export const CategoryArt = ({slug, size = 64}: CategoryArtProps) => {
    const theme = useAppTheme()
    const gid = (prefix: string) => `${prefix}-${slug}`
    const c: ArtColors = {
        navy: theme.colors.primary,
        navyDark: theme.colors.surfaceDark,
        navyLt: theme.colors.primaryContainer,
        amber: theme.colors.tertiary,
        amberDark: theme.colors.tertiaryDark,
        amberLt: theme.colors.tertiaryContainer,
        surface: theme.colors.surface,
        line: theme.colors.outline,
        shadow: theme.colors.shadow,
        navyGrad: `url(#${gid('nv')})`,
        amberGrad: `url(#${gid('am')})`,
        steelGrad: `url(#${gid('st')})`,
    }
    const render = RENDERERS[slug] ?? RENDERERS.other

    return (
        <Svg width={size} height={size} viewBox='0 0 64 64' fill='none'>
            <Defs>
                <LinearGradient id={gid('nv')} x1='0' y1='0' x2='0' y2='1'>
                    <Stop offset='0' stopColor={theme.colors.primaryTint} />
                    <Stop offset='1' stopColor={c.navy} />
                </LinearGradient>
                <LinearGradient id={gid('am')} x1='0' y1='0' x2='0' y2='1'>
                    <Stop offset='0' stopColor={c.amber} />
                    <Stop offset='1' stopColor={c.amberDark} />
                </LinearGradient>
                <LinearGradient id={gid('st')} x1='0' y1='0' x2='0' y2='1'>
                    <Stop offset='0' stopColor={c.surface} />
                    <Stop offset='1' stopColor={c.navyLt} />
                </LinearGradient>
                <RadialGradient id={gid('bg')} cx='50%' cy='42%' r='55%'>
                    <Stop offset='0' stopColor={c.amberLt} stopOpacity={0.55} />
                    <Stop offset='1' stopColor={c.amberLt} stopOpacity={0} />
                </RadialGradient>
                <RadialGradient id={gid('sh')} cx='50%' cy='50%' r='50%'>
                    <Stop offset='0' stopColor={c.shadow} stopOpacity={0.2} />
                    <Stop offset='1' stopColor={c.shadow} stopOpacity={0} />
                </RadialGradient>
            </Defs>
            <Circle cx={32} cy={32} r={29} fill={`url(#${gid('bg')})`} />
            <Ellipse cx={32} cy={51} rx={17} ry={5} fill={`url(#${gid('sh')})`} />
            {render(c)}
        </Svg>
    )
}
