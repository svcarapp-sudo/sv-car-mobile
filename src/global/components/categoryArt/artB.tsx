import React from 'react'
import {Circle, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const DRILL_HOLES: [number, number][] = [
    [28.8, 20.9],
    [20.7, 24.7],
    [16.8, 32.8],
    [19.2, 41.6],
    [26.6, 46.8],
    [35.6, 46],
    [42, 39.6],
]
const LUG_HOLES: [number, number][] = [
    [30, 29],
    [25.2, 32.5],
    [27.1, 38],
    [32.9, 38],
    [34.8, 32.5],
]

// Brakes — cross-drilled rotor with friction band, five lug holes and centre bore,
// gripped from above by an amber caliper with pads, bleed nipple and brake hose.
const brakes: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Circle cx={30} cy={34} r={17} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.5} />
        <Circle cx={30} cy={34} r={9.8} fill='none' stroke={c.navy} strokeWidth={1} opacity={0.2} />
        {DRILL_HOLES.map(([x, y]) => (
            <Circle key={`d${x}`} cx={x} cy={y} r={1.3} fill={c.navyDark} opacity={0.5} />
        ))}
        <Path d='M15.3 25.5 A17 17 0 0 1 24.2 18' fill='none' stroke={c.surface} strokeWidth={1.8} opacity={0.5} />
        <Circle cx={30} cy={34} r={8} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.2} />
        {LUG_HOLES.map(([x, y]) => (
            <Circle key={`l${x}`} cx={x} cy={y} r={1.5} fill={c.navyDark} opacity={0.8} />
        ))}
        <Circle cx={30} cy={34} r={2.8} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Path d='M41.8 29.7 A12.6 12.6 0 0 0 34.3 22.2' fill='none' stroke={c.navyDark} strokeWidth={2.2} opacity={0.65} />
        <Path
            d='M50.8 31.1 A21 21 0 0 0 32.9 13.2 L32 20.1 A14 14 0 0 1 43.9 32.1 Z'
            fill={c.amberGrad}
            stroke={c.amberDark}
            strokeWidth={1.4}
        />
        <Circle cx={45.2} cy={25.3} r={1.2} fill={c.navyDark} opacity={0.6} />
        <Circle cx={38.8} cy={18.8} r={1.2} fill={c.navyDark} opacity={0.6} />
        <Rect x={31.6} y={10.6} width={2} height={3} rx={0.9} fill={c.amberDark} />
        <Path d='M32.6 10.8 Q36.5 6.8 41.5 7.6' fill='none' stroke={c.navyDark} strokeWidth={2} />
        <Circle cx={42.3} cy={7.7} r={1.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
    </G>
)

// Suspension — coil-over shock: eyelet mounts top and bottom, chrome piston rod with
// dust boot, gradient shock body, amber coil wound over spring seats, and a threaded
// preload adjuster collar.
const suspension: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Circle cx={32} cy={9} r={3.2} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.3} />
        <Circle cx={32} cy={9} r={1.3} fill={c.navyLt} stroke={c.navyDark} strokeWidth={0.7} />
        <Rect x={30.6} y={11.8} width={2.8} height={3.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Rect x={30.6} y={15} width={2.8} height={7} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Rect x={22} y={20.4} width={20} height={2.8} rx={1.4} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Rect x={28.6} y={19.4} width={6.8} height={4.4} rx={1.6} fill={c.navyDark} />
        <Line x1={29.8} y1={21} x2={34.2} y2={21} stroke={c.surface} strokeWidth={0.8} opacity={0.2} />
        <Line x1={29.8} y1={22.4} x2={34.2} y2={22.4} stroke={c.surface} strokeWidth={0.8} opacity={0.2} />
        <Rect x={27} y={23} width={10} height={22.5} rx={4} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.4} />
        <Line x1={29.4} y1={25.5} x2={29.4} y2={40.5} stroke={c.surface} strokeWidth={1.2} opacity={0.3} />
        <Path d='M22 24 Q32 29 42 23' fill='none' stroke={c.amberGrad} strokeWidth={3} />
        <Path d='M22 29 Q32 34 42 28' fill='none' stroke={c.amberGrad} strokeWidth={3} />
        <Path d='M22 34 Q32 39 42 33' fill='none' stroke={c.amberGrad} strokeWidth={3} />
        <Rect x={22} y={37.8} width={20} height={2.8} rx={1.4} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Line x1={28} y1={41.4} x2={36} y2={41.4} stroke={c.navyLt} strokeWidth={0.9} opacity={0.6} />
        <Line x1={28} y1={42.8} x2={36} y2={42.8} stroke={c.navyLt} strokeWidth={0.9} opacity={0.6} />
        <Rect x={25.8} y={43.4} width={12.4} height={2.6} rx={1.3} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.9} />
        <Rect x={30.6} y={46} width={2.8} height={1.8} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Circle cx={32} cy={49.9} r={3} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.3} />
        <Circle cx={32} cy={49.9} r={1.2} fill={c.navyLt} stroke={c.navyDark} strokeWidth={0.7} />
    </G>
)

export const ART_B: Record<string, CategoryArtRenderer> = {brakes, suspension}
