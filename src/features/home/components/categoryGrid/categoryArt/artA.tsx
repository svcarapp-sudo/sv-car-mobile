import React from 'react'
import {Circle, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const BLOCK_RIBS = [22, 27.4, 32.8, 38.2]
const HEAD_PORTS = [22.5, 30, 37.5]
const COILS = [26.5, 32.5, 38.5]
const GEAR_L = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]
const GEAR_S = [0, 45, 90, 135, 180, 225, 270, 315]
const WEB_HOLES: [number, number][] = [
    [27, 25.9],
    [21, 30.3],
    [23.3, 37.3],
    [30.7, 37.3],
    [33, 30.3],
]

// Engine — full inline block: valve cover with ignition coils and oil cap, head with
// intake ports, ribbed crankcase with freeze plug, curved intake runner, dipstick,
// finned oil pan with drain plug, and a grooved serpentine crank pulley.
const engine: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path d='M13.5 21 Q7.5 23.5 8.5 30.5 Q9.2 34.8 15.8 34.8' fill='none' stroke={c.amberGrad} strokeWidth={3.4} />
        <Circle cx={13.5} cy={20.6} r={2.2} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Line x1={18.5} y1={26} x2={16.2} y2={13.5} stroke={c.line} strokeWidth={1.5} />
        <Circle cx={15.9} cy={11.8} r={1.9} fill='none' stroke={c.amberGrad} strokeWidth={1.6} />
        <Rect x={12.6} y={39} width={4} height={5.5} rx={1.2} fill={c.navyDark} />
        <Rect x={18} y={21.5} width={30} height={5.5} fill={c.navyLt} stroke={c.navy} strokeWidth={1} />
        {HEAD_PORTS.map(x => (
            <Rect key={`p${x}`} x={x} y={23.1} width={3.2} height={2.3} rx={0.9} fill={c.navyDark} opacity={0.45} />
        ))}
        <Rect x={20} y={12.5} width={26} height={9} rx={3} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.4} />
        <Line x1={23} y1={14.4} x2={39} y2={14.4} stroke={c.surface} strokeWidth={1.3} opacity={0.5} />
        {COILS.map(x => (
            <Circle key={`c${x}`} cx={x} cy={17.4} r={1.6} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.8} />
        ))}
        <Circle cx={43} cy={15.6} r={1.8} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Rect x={16} y={27} width={32} height={17} rx={2.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        {BLOCK_RIBS.map(x => (
            <Line key={`r${x}`} x1={x} y1={29.5} x2={x} y2={41} stroke={c.navyDark} strokeWidth={1.3} opacity={0.35} />
        ))}
        <Circle cx={43.6} cy={33} r={2} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Path
            d='M19.5 44 H44.5 V46.5 Q44.5 49.5 40.5 49.5 H23.5 Q19.5 49.5 19.5 46.5 Z'
            fill={c.steelGrad}
            stroke={c.navy}
            strokeWidth={1.2}
        />
        <Circle cx={31} cy={49.3} r={1.2} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.7} />
        <Circle cx={44.6} cy={43.5} r={5.8} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.3} />
        <Circle cx={44.6} cy={43.5} r={4.1} fill='none' stroke={c.navyDark} strokeWidth={1.1} opacity={0.5} />
        <Circle cx={44.6} cy={43.5} r={2.9} fill='none' stroke={c.navyDark} strokeWidth={1.1} opacity={0.35} />
        <Circle cx={44.6} cy={43.5} r={1.8} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Circle cx={44.6} cy={43.5} r={0.8} fill={c.amber} />
    </G>
)

// Transmission — gear set on shafts: input and output shafts with yokes, a large
// machined gear (web holes, keyed steel hub) meshing with an amber pinion gear.
const transmission: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={36} y={16.1} width={18} height={2.8} rx={1.4} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={0.8} />
        <Rect x={9.5} y={30.6} width={45} height={3.2} rx={1.6} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={0.9} />
        <Rect x={9.5} y={29.2} width={3} height={6} rx={1.2} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Rect x={50.8} y={28.6} width={3.4} height={7.2} rx={1.2} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        {GEAR_L.map(a => (
            <Rect
                key={`l${a}`}
                x={24.6}
                y={15.4}
                width={4.8}
                height={5.4}
                rx={1.2}
                fill={c.navyGrad}
                rotation={a}
                originX={27}
                originY={32.2}
            />
        ))}
        <Circle cx={27} cy={32.2} r={12} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        <Circle cx={27} cy={32.2} r={8.8} fill='none' stroke={c.navyLt} strokeWidth={1.2} opacity={0.45} />
        {WEB_HOLES.map(([x, y]) => (
            <Circle key={`w${x}`} cx={x} cy={y} r={1.7} fill={c.navyDark} opacity={0.4} />
        ))}
        <Path d='M18.8 27.5 A9.5 9.5 0 0 1 25.4 22.9' fill='none' stroke={c.surface} strokeWidth={1.5} opacity={0.4} />
        <Circle cx={27} cy={32.2} r={4.2} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Rect x={26.3} y={29.1} width={1.4} height={1.6} fill={c.navyDark} opacity={0.55} />
        <Circle cx={27} cy={32.2} r={1.6} fill={c.navyDark} />
        {GEAR_S.map(a => (
            <Rect
                key={`s${a}`}
                x={44.9}
                y={7.3}
                width={3.2}
                height={4.2}
                rx={1}
                fill={c.amberGrad}
                rotation={a}
                originX={46.5}
                originY={17.5}
            />
        ))}
        <Circle cx={46.5} cy={17.5} r={7} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.3} />
        <Circle cx={46.5} cy={17.5} r={4.6} fill='none' stroke={c.amberLt} strokeWidth={1} opacity={0.5} />
        <Circle cx={46.5} cy={17.5} r={2.4} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Circle cx={46.5} cy={17.5} r={0.9} fill={c.navyDark} />
    </G>
)

export const ART_A: Record<string, CategoryArtRenderer> = {engine, transmission}
