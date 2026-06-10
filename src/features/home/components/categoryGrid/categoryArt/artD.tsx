import React from 'react'
import {Circle, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const CUSHION_SEAMS = [31, 36, 41]

// Body — sedan profile: windshield and rear glass with B-pillar, door cut lines and
// handles, side mirror, character line, amber headlight, wheel-arch flares and alloys.
const body: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path
            d='M8.5 39.8 C8.5 36.6 10.6 35.6 14 35.1 C16.6 27.8 22.4 24.2 30.6 24.2 C38.4 24.2 43.4 27.1 47.3 33.3 C51.6 33.9 55.5 35.1 55.5 39 C55.5 41.3 53.9 42.3 51 42.3 L13 42.3 C10 42.3 8.5 41.5 8.5 39.8 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1.6}
        />
        <Path d='M19.6 32.9 C21.6 27.7 25.6 25.9 30.6 25.9 L30.6 32.9 Z' fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Path d='M33.4 25.9 C39 26.1 42.3 28.5 44.9 32.9 L33.4 32.9 Z' fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Path d='M16.2 33.2 C19.6 27.4 25 25 30.6 25' fill='none' stroke={c.surface} strokeWidth={1.3} opacity={0.5} />
        <Path d='M13 37.6 C25 36.5 39 36.5 51 37.7' fill='none' stroke={c.surface} strokeWidth={1.1} opacity={0.3} />
        <Path d='M31.7 33.6 C31.7 36.4 31.7 39.2 31.5 41.9' fill='none' stroke={c.navyDark} strokeWidth={1} opacity={0.45} />
        <Path d='M42.2 33.6 C42.6 36.3 42.6 39.1 42.2 41.9' fill='none' stroke={c.navyDark} strokeWidth={1} opacity={0.45} />
        <Rect x={27.6} y={34.6} width={3.2} height={1.2} rx={0.6} fill={c.navyLt} opacity={0.95} />
        <Rect x={39.2} y={34.6} width={3.2} height={1.2} rx={0.6} fill={c.navyLt} opacity={0.95} />
        <Rect x={17.5} y={29.8} width={2.8} height={2} rx={0.9} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Path d='M51.8 35.2 L55.2 36.1 L55.2 38 L51.8 38 Z' fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.7} />
        <Rect x={8.9} y={35.8} width={1.9} height={2.6} rx={0.6} fill={c.amberDark} opacity={0.9} />
        <Path d='M13.4 42.6 A7.1 7.1 0 0 1 27.6 42.6' fill='none' stroke={c.navyDark} strokeWidth={2.2} opacity={0.55} />
        <Path d='M36.4 42.6 A7.1 7.1 0 0 1 50.6 42.6' fill='none' stroke={c.navyDark} strokeWidth={2.2} opacity={0.55} />
        <Circle cx={20.5} cy={42.6} r={6.2} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={1.2} />
        <Circle cx={20.5} cy={42.6} r={3.1} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.8} />
        <Circle cx={20.5} cy={42.6} r={0.9} fill={c.amber} />
        <Circle cx={43.5} cy={42.6} r={6.2} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={1.2} />
        <Circle cx={43.5} cy={42.6} r={3.1} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.8} />
        <Circle cx={43.5} cy={42.6} r={0.9} fill={c.amber} />
    </G>
)

// Interior — bucket seat in profile: headrest on posts, stitched backrest panel,
// channelled cushion, recline knob, slide rails with feet, and a seatbelt with buckle.
const interior: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={20.5} y={47.6} width={26} height={2.4} rx={1.2} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Rect x={23} y={46} width={2.4} height={2.2} fill={c.navyDark} />
        <Rect x={39} y={46} width={2.4} height={2.2} fill={c.navyDark} />
        <Rect x={17.6} y={45.2} width={4.6} height={1.8} rx={0.9} fill={c.navyLt} stroke={c.navy} strokeWidth={0.7} />
        <Path
            d='M23 40 C21.9 32 21.7 23.5 22.5 16.6 Q23.1 11.2 28.3 11.2 L30.6 11.2 Q35.6 11.2 35.3 16.6 L34.3 35.4 Q34.1 39.6 30.2 39.9 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1.4}
        />
        <Path
            d='M25.4 36.5 C24.7 30 24.6 23 25.2 17.4 Q25.5 14.2 28.6 14.2 L30 14.2 Q32.8 14.2 32.7 17.4 L31.9 33.8 Q31.8 36.5 29.4 36.5 Z'
            fill={c.navyLt}
            opacity={0.5}
        />
        <Line x1={25.2} y1={19.5} x2={32.4} y2={19.5} stroke={c.navyDark} strokeWidth={1} opacity={0.3} />
        <Line x1={25} y1={24} x2={32.2} y2={24} stroke={c.navyDark} strokeWidth={1} opacity={0.3} />
        <Line x1={25} y1={28.5} x2={32} y2={28.5} stroke={c.navyDark} strokeWidth={1} opacity={0.3} />
        <Path
            d='M22.6 38.6 C22.6 36 24.8 34.8 28 34.8 L39.4 34.8 Q45.2 34.8 45.2 40.4 L45.2 42.2 Q45.2 45.8 41.2 45.8 L26.4 45.8 Q22.6 45.8 22.6 42.2 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1.4}
        />
        {CUSHION_SEAMS.map(x => (
            <Line key={`s${x}`} x1={x} y1={35.6} x2={x - 0.4} y2={44.8} stroke={c.navyDark} strokeWidth={1} opacity={0.3} />
        ))}
        <Line x1={26.8} y1={12} x2={26.8} y2={14.6} stroke={c.navy} strokeWidth={1.6} />
        <Line x1={30.8} y1={12} x2={30.8} y2={14.6} stroke={c.navy} strokeWidth={1.6} />
        <Rect x={23.2} y={5.2} width={10.5} height={6.8} rx={3.2} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.3} />
        <Line x1={25.4} y1={7.4} x2={31.6} y2={7.4} stroke={c.surface} strokeWidth={1.1} opacity={0.45} />
        <Circle cx={23.2} cy={40.6} r={2.3} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.9} />
        <Circle cx={23.2} cy={40.6} r={0.8} fill={c.amberDark} />
        <Path d='M27.6 13.6 L40.2 40.2' fill='none' stroke={c.amberGrad} strokeWidth={2.8} />
        <Rect x={38.4} y={38.6} width={6.2} height={4.6} rx={1.3} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1} />
        <Rect x={40} y={40.3} width={3} height={1.3} rx={0.65} fill={c.amberDark} opacity={0.7} />
    </G>
)

export const ART_D: Record<string, CategoryArtRenderer> = {body, interior}
