import React from 'react'
import {Circle, Ellipse, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

// Body — car side profile with glasshouse, headlight and alloy wheels.
const body: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path
            d='M8 39 C8 35 10 34 13 34 C15 26 21 23 30 23 C38 23 43 26 47 33 C50 33.5 56 34 56 39 L56 40 C56 42 54 42.5 52 42.5 L12 42.5 C9.5 42.5 8 41.5 8 39 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1.6}
        />
        <Path d='M18 33 C20 28 24 26 30 26 L30 33 Z' fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Path d='M33 26 C39 26 42 28.5 45 33 L33 33 Z' fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Line x1={31.5} y1={26} x2={31.5} y2={41} stroke={c.navyDark} strokeWidth={1} opacity={0.4} />
        <Path d='M14 33 C16 27.5 21 25 30 25' fill='none' stroke={c.surface} strokeWidth={1.4} opacity={0.5} />
        <Path d='M51 36 L56 37 L56 39 L51 39 Z' fill={c.amberGrad} />
        <Circle cx={20} cy={43} r={6.5} fill={c.navyDark} stroke={c.navy} strokeWidth={1} />
        <Circle cx={20} cy={43} r={3} fill={c.steelGrad} />
        <Circle cx={20} cy={43} r={1} fill={c.amber} />
        <Circle cx={44} cy={43} r={6.5} fill={c.navyDark} stroke={c.navy} strokeWidth={1} />
        <Circle cx={44} cy={43} r={3} fill={c.steelGrad} />
        <Circle cx={44} cy={43} r={1} fill={c.amber} />
    </G>
)

// Interior — car seat (side profile) with headrest, tufted panel and seatbelt.
const interior: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path
            d='M20 36 H40 Q44 36 44 40 L44 41 Q44 44 41 44 L23 44 Q20 44 20 41 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1.5}
        />
        <Path
            d='M22 38 L22 18 Q22 12 28 12 L31 12 Q36 12 36 18 L35 38 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1.5}
        />
        <Path d='M26 35 L26 20 Q26 17.5 28.5 17.5 L30.5 17.5 Q33 17.5 33 20 L32.6 35 Z' fill={c.navyLt} opacity={0.55} />
        <Rect x={24} y={7.5} width={9} height={6} rx={3} fill={c.navyLt} stroke={c.navy} strokeWidth={1.3} />
        <Line x1={27} y1={13} x2={27} y2={16} stroke={c.navyDark} strokeWidth={1.6} />
        <Line x1={30} y1={13} x2={30} y2={16} stroke={c.navyDark} strokeWidth={1.6} />
        <Path d='M23 37 Q32 36 40 37' fill='none' stroke={c.surface} strokeWidth={1.2} opacity={0.4} />
        <Path d='M26.5 19 L40 42' fill='none' stroke={c.amberGrad} strokeWidth={2.8} />
        <Rect x={37} y={39} width={6} height={4.5} rx={1.3} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1} />
    </G>
)

// Exhaust — steel muffler with twin tailpipe tips and rising smoke.
const exhaust: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path d='M8 34 H16' fill='none' stroke={c.navyGrad} strokeWidth={3.5} />
        <Rect x={14} y={26} width={22} height={15} rx={7.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.5} />
        <Line x1={21} y1={26} x2={21} y2={41} stroke={c.navy} strokeWidth={1.2} opacity={0.35} />
        <Line x1={29} y1={26} x2={29} y2={41} stroke={c.navy} strokeWidth={1.2} opacity={0.35} />
        <Path d='M18 29 Q24 27.5 31 29' fill='none' stroke={c.surface} strokeWidth={1.6} opacity={0.5} />
        <Path d='M36 31 H46' fill='none' stroke={c.navyGrad} strokeWidth={3} />
        <Path d='M36 37 H46' fill='none' stroke={c.navyGrad} strokeWidth={3} />
        <Ellipse cx={46} cy={31} rx={2.4} ry={3} fill={c.navyLt} stroke={c.navy} strokeWidth={1.4} />
        <Ellipse cx={46} cy={37} rx={2.4} ry={3} fill={c.navyLt} stroke={c.navy} strokeWidth={1.4} />
        <Circle cx={51} cy={24} r={2.6} fill={c.amber} opacity={0.5} />
        <Circle cx={55} cy={19} r={1.8} fill={c.amber} opacity={0.32} />
    </G>
)

// Cooling — radiator core with filler cap, fins and a coolant drop.
const cooling: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={27} y={9} width={10} height={4.5} rx={2} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.2} />
        <Rect x={14} y={13} width={34} height={31} rx={4} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.6} />
        <Path d='M14 19 V17 Q14 13 18 13 H44 Q48 13 48 17 V19 Z' fill={c.navyLt} opacity={0.5} />
        <Path d='M14 38 H48 V40 Q48 44 44 44 H18 Q14 44 14 40 Z' fill={c.navyLt} opacity={0.5} />
        <Line x1={19} y1={20} x2={19} y2={37} stroke={c.navyLt} strokeWidth={1.6} opacity={0.7} />
        <Line x1={24} y1={20} x2={24} y2={37} stroke={c.navyLt} strokeWidth={1.6} opacity={0.7} />
        <Line x1={29} y1={20} x2={29} y2={37} stroke={c.navyLt} strokeWidth={1.6} opacity={0.7} />
        <Line x1={34} y1={20} x2={34} y2={37} stroke={c.navyLt} strokeWidth={1.6} opacity={0.7} />
        <Line x1={39} y1={20} x2={39} y2={37} stroke={c.navyLt} strokeWidth={1.6} opacity={0.7} />
        <Line x1={43} y1={20} x2={43} y2={37} stroke={c.navyLt} strokeWidth={1.6} opacity={0.7} />
        <Path
            d='M35 45 C35 48.5 29 48.5 29 45 C29 41.5 32 37.5 32 37.5 C32 37.5 35 41.5 35 45 Z'
            fill={c.amberGrad}
            stroke={c.amberDark}
            strokeWidth={1}
        />
    </G>
)

export const ART_B: Record<string, CategoryArtRenderer> = {body, interior, exhaust, cooling}
