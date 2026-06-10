import type {ReactNode} from 'react'

/**
 * Palette + gradient handles passed to each category art renderer.
 * `*Grad` values are `url(#…)` references to gradients defined per-tile in CategoryArt.
 */
export interface ArtColors {
    navy: string
    navyDark: string
    navyLt: string
    amber: string
    amberDark: string
    amberLt: string
    surface: string
    line: string
    shadow: string
    navyGrad: string
    amberGrad: string
    steelGrad: string
    darkGrad: string
}

/** Renders a category's SVG glyph as children of a shared <Svg> (64×64 viewBox). */
export type CategoryArtRenderer = (c: ArtColors) => ReactNode
