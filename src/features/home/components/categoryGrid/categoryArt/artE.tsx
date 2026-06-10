import React from 'react'
import {Circle, Ellipse, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const GRADE_BUTTONS = [20.5, 24.5, 28.5]

// Exhaust — system segment: header pipe with bolted flange, brushed-steel muffler
// with rolled seams, twin flared chrome tips and fading puffs.
const exhaust: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path d='M7.5 33 L18 33' fill='none' stroke={c.darkGrad} strokeWidth={3.8} />
        <Rect x={16.2} y={27.6} width={3.2} height={10.8} rx={1.2} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Circle cx={17.8} cy={29.4} r={1} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.6} />
        <Circle cx={17.8} cy={36.6} r={1} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.6} />
        <Path d='M41 29 L48 28.4' fill='none' stroke={c.darkGrad} strokeWidth={3.4} />
        <Path d='M41 36.8 L48 37.4' fill='none' stroke={c.darkGrad} strokeWidth={3.4} />
        <Rect x={19} y={25.6} width={24.5} height={14.8} rx={7.4} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.5} />
        <Line x1={23} y1={26.4} x2={23} y2={39.6} stroke={c.navy} strokeWidth={1.1} opacity={0.3} />
        <Line x1={39.5} y1={26.4} x2={39.5} y2={39.6} stroke={c.navy} strokeWidth={1.1} opacity={0.3} />
        <Path d='M22.5 28.6 Q31 26.8 40 28.6' fill='none' stroke={c.surface} strokeWidth={1.5} opacity={0.6} />
        <Path d='M22.5 37.6 Q31 39.2 40 37.6' fill='none' stroke={c.navy} strokeWidth={1.5} opacity={0.25} />
        <Path d='M48 25.9 L52.6 25.1 Q53.8 28.1 52.6 31.1 L48 30.5 Z' fill={c.steelGrad} stroke={c.navy} strokeWidth={1.1} />
        <Ellipse cx={52.7} cy={28.1} rx={1.1} ry={2.6} fill={c.navyDark} />
        <Path d='M48 34.9 L52.6 34.3 Q53.8 37.3 52.6 40.3 L48 39.5 Z' fill={c.steelGrad} stroke={c.navy} strokeWidth={1.1} />
        <Ellipse cx={52.7} cy={37.3} rx={1.1} ry={2.6} fill={c.navyDark} />
        <Circle cx={56.2} cy={22.6} r={2.5} fill={c.amber} opacity={0.4} />
        <Circle cx={59.2} cy={18} r={1.7} fill={c.amber} opacity={0.26} />
    </G>
)

// Fuel — service pump: crowned cabinet with amber pinstripe, price display, grade
// buttons, fuel-drop badge, and a holstered amber nozzle on a looping hose.
const fuel: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path d='M34.5 19.5 C44 20.5 45.5 24 42.8 29' fill='none' stroke={c.darkGrad} strokeWidth={2.6} />
        <Rect x={13} y={47.2} width={23} height={3.2} rx={1.2} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Rect x={14.5} y={10.5} width={20} height={37} rx={3.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        <Path d='M14.5 16 Q14.5 10.5 18.5 10.5 H30.5 Q34.5 10.5 34.5 16 Z' fill={c.navyLt} opacity={0.55} />
        <Rect x={14.5} y={16.8} width={20} height={1.3} fill={c.amberGrad} opacity={0.9} />
        <Line x1={16.4} y1={12.8} x2={16.4} y2={44} stroke={c.surface} strokeWidth={1.2} opacity={0.35} />
        <Rect x={17.5} y={20} width={14} height={8.5} rx={1.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Rect x={19.5} y={22} width={7.5} height={1.7} rx={0.8} fill={c.amberGrad} opacity={0.95} />
        <Rect x={19.5} y={24.8} width={5} height={1.7} rx={0.8} fill={c.amberGrad} opacity={0.6} />
        {GRADE_BUTTONS.map(x => (
            <Circle key={`b${x}`} cx={x} cy={32} r={1.3} fill={c.navyLt} stroke={c.navy} strokeWidth={0.7} />
        ))}
        <Circle cx={24.5} cy={39.5} r={4.8} fill={c.amberLt} />
        <Path
            d='M26.6 40.3 C26.6 42.9 22.4 42.9 22.4 40.3 C22.4 38.2 24.5 35.6 24.5 35.6 C24.5 35.6 26.6 38.2 26.6 40.3 Z'
            fill={c.amberGrad}
            stroke={c.amberDark}
            strokeWidth={0.9}
        />
        <Rect x={34.5} y={33.8} width={4.4} height={2.6} rx={1} fill={c.navyDark} opacity={0.85} />
        <G rotation={-18} originX={41.5} originY={31.5}>
            <Rect x={38.3} y={28.3} width={6.4} height={6.6} rx={2} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.1} />
            <Path d='M43 34.6 Q45.8 36.4 45.2 40.2' fill='none' stroke={c.darkGrad} strokeWidth={2.3} />
            <Path d='M39.6 34.9 Q39.2 37.4 41.4 38.2' fill='none' stroke={c.amberDark} strokeWidth={1.3} opacity={0.8} />
        </G>
    </G>
)

export const ART_E: Record<string, CategoryArtRenderer> = {exhaust, fuel}
