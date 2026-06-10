import React from 'react'
import {Circle, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const TREAD = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
const SPOKES = [0, 72, 144, 216, 288]
const LUG_NUTS: [number, number][] = [
    [32, 26.9],
    [27.6, 30.1],
    [29.3, 35.2],
    [34.7, 35.2],
    [36.4, 30.1],
]

// Tires — chunky-tread tyre: knobby blocks over the shoulder, moulded sidewall
// lettering ring, alloy rim with five amber twin spokes, lug nuts and a valve stem.
const tires: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Circle cx={32} cy={31.5} r={18.5} fill={c.darkGrad} stroke={c.navyDark} strokeWidth={1.6} />
        {TREAD.map(a => (
            <Rect
                key={`t${a}`}
                x={30.1}
                y={11.2}
                width={3.8}
                height={4.8}
                rx={1}
                fill={c.navyDark}
                opacity={0.9}
                rotation={a}
                originX={32}
                originY={31.5}
            />
        ))}
        <Circle cx={32} cy={31.5} r={13.8} fill='none' stroke={c.navyDark} strokeWidth={1} opacity={0.55} />
        <Circle
            cx={32}
            cy={31.5}
            r={12.4}
            fill='none'
            stroke={c.navyLt}
            strokeWidth={1.1}
            strokeDasharray='2.2 3.4'
            opacity={0.35}
        />
        <Path d='M16 22.3 A18.5 18.5 0 0 1 24.2 14.7' fill='none' stroke={c.surface} strokeWidth={1.7} opacity={0.35} />
        <Circle cx={32} cy={31.5} r={10.6} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.2} />
        <Circle cx={32} cy={31.5} r={9.4} fill='none' stroke={c.navy} strokeWidth={1} opacity={0.25} />
        {SPOKES.map(a => (
            <Path
                key={`s${a}`}
                d='M32 31.5 L29.6 23.3 Q32 22.3 34.4 23.3 Z'
                fill={c.amberGrad}
                stroke={c.amberDark}
                strokeWidth={0.7}
                rotation={a}
                originX={32}
                originY={31.5}
            />
        ))}
        {LUG_NUTS.map(([x, y]) => (
            <Circle key={`n${x}`} cx={x} cy={y} r={1.05} fill={c.navyDark} />
        ))}
        <Circle cx={32} cy={31.5} r={3.2} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1} />
        <Circle cx={32} cy={31.5} r={1.1} fill={c.amber} />
        <Line x1={25.6} y1={40} x2={24.2} y2={41.9} stroke={c.navyDark} strokeWidth={1.7} />
        <Circle cx={23.9} cy={42.3} r={1} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.7} />
    </G>
)

// Other — crossed workshop tools: combination wrench (open jaw + ring end with hex
// socket) and an amber fluted screwdriver, with a loose hex nut and washer below.
const other: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <G rotation={-42} originX={32} originY={32}>
            <Rect x={29.9} y={15.5} width={4.2} height={26} rx={2.1} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.1} />
            <Path
                d='M27.2 8.6 Q32 6.4 36.8 8.6 L36.8 15.2 L34.2 17.4 L34.2 12.4 L29.8 12.4 L29.8 17.4 L27.2 15.2 Z'
                fill={c.steelGrad}
                stroke={c.navy}
                strokeWidth={1.1}
            />
            <Circle cx={32} cy={44.5} r={4.6} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.1} />
            <Path d='M32 42.3 L33.9 43.4 L33.9 45.6 L32 46.7 L30.1 45.6 L30.1 43.4 Z' fill={c.navyDark} />
        </G>
        <G rotation={44} originX={32} originY={32}>
            <Rect x={28.4} y={9} width={7.2} height={13.5} rx={3.2} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.2} />
            <Line x1={30.6} y1={11.5} x2={30.6} y2={20} stroke={c.amberDark} strokeWidth={1} opacity={0.5} />
            <Line x1={33.2} y1={11.5} x2={33.2} y2={20} stroke={c.amberDark} strokeWidth={1} opacity={0.5} />
            <Rect x={30.1} y={22.5} width={3.8} height={2.6} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
            <Rect x={31.1} y={25.1} width={1.8} height={14} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.8} />
            <Path d='M31.1 39 L30.5 42.6 L33.5 42.6 L32.9 39 Z' fill={c.navyDark} />
        </G>
        <Path
            d='M13.6 44.3 L16.5 42.6 L19.4 44.3 L19.4 47.7 L16.5 49.4 L13.6 47.7 Z'
            fill={c.navyGrad}
            stroke={c.navyDark}
            strokeWidth={1}
        />
        <Circle cx={16.5} cy={46} r={1.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.7} />
        <Circle cx={47.5} cy={46.5} r={2.3} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Circle cx={47.5} cy={46.5} r={0.9} fill={c.navyDark} />
    </G>
)

export const ART_F: Record<string, CategoryArtRenderer> = {tires, other}
