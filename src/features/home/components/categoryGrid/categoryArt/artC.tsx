import React from 'react'
import {Circle, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const GEAR_L = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]
const GEAR_S = [0, 45, 90, 135, 180, 225, 270, 315]
const SPOKES = [0, 72, 144, 216, 288]

// Transmission — two meshing gears (gearbox).
const transmission: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        {GEAR_L.map(a => (
            <Rect
                key={`l${a}`}
                x={24.5}
                y={14}
                width={5}
                height={5}
                rx={1.5}
                fill={c.navyGrad}
                rotation={a}
                originX={27}
                originY={28}
            />
        ))}
        <Circle cx={27} cy={28} r={11} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        <Circle cx={27} cy={28} r={5} fill={c.navyLt} stroke={c.navyDark} strokeWidth={1} />
        <Circle cx={27} cy={28} r={1.6} fill={c.surface} />
        {GEAR_S.map(a => (
            <Rect
                key={`s${a}`}
                x={43.2}
                y={11}
                width={3.6}
                height={4.5}
                rx={1}
                fill={c.amberGrad}
                rotation={a}
                originX={45}
                originY={20}
            />
        ))}
        <Circle cx={45} cy={20} r={6.5} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.4} />
        <Circle cx={45} cy={20} r={2.4} fill={c.amberLt} stroke={c.amberDark} strokeWidth={0.8} />
    </G>
)

// Fuel — pump with display, fuel-drop badge, hose and nozzle.
const fuel: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={12} y={45} width={22} height={4} rx={1.5} fill={c.navyDark} />
        <Rect x={14} y={12} width={18} height={33} rx={3.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.6} />
        <Rect x={18} y={16} width={10} height={8} rx={1.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Line x1={20} y1={19} x2={26} y2={19} stroke={c.navy} strokeWidth={1} opacity={0.4} />
        <Line x1={20} y1={21.5} x2={24} y2={21.5} stroke={c.amber} strokeWidth={1.2} />
        <Circle cx={23} cy={34} r={5} fill={c.amberLt} />
        <Path
            d='M25.5 35 C25.5 37.5 20.5 37.5 20.5 35 C20.5 32.8 23 29.5 23 29.5 C23 29.5 25.5 32.8 25.5 35 Z'
            fill={c.amberGrad}
            stroke={c.amberDark}
            strokeWidth={0.9}
        />
        <Path d='M32 18 H38 Q43 18 43 23 V33 Q43 37 39 37' fill='none' stroke={c.navy} strokeWidth={2.4} />
        <Rect x={38} y={29} width={2.5} height={5} rx={1} fill={c.navyDark} />
        <Rect x={36} y={33} width={6} height={8} rx={2} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.2} />
        <Line x1={17} y1={15} x2={29} y2={15} stroke={c.surface} strokeWidth={1.3} opacity={0.45} />
    </G>
)

// Tires — tyre with tread, alloy rim, amber spokes and hub cap.
const tires: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Circle cx={32} cy={32} r={19} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        <Circle cx={32} cy={32} r={16} fill='none' stroke={c.navyDark} strokeWidth={3} strokeDasharray='3 3.2' opacity={0.7} />
        <Circle cx={32} cy={32} r={13} fill={c.navy} />
        <Circle cx={32} cy={32} r={11} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.2} />
        {SPOKES.map(a => (
            <Path
                key={a}
                d='M32 32 L28.5 22 Q32 20.5 35.5 22 Z'
                fill={c.amberGrad}
                stroke={c.amberDark}
                strokeWidth={0.8}
                rotation={a}
                originX={32}
                originY={32}
            />
        ))}
        <Circle cx={32} cy={32} r={3.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1} />
        <Circle cx={32} cy={32} r={1.2} fill={c.amber} />
        <Path d='M19 24 A19 19 0 0 1 30 14' fill='none' stroke={c.surface} strokeWidth={1.6} opacity={0.4} />
    </G>
)

// Other — crossed wrench and screwdriver (tools / misc).
const other: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <G rotation={-40} originX={32} originY={32}>
            <Rect x={29.5} y={26} width={5} height={20} rx={2.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.2} />
            <Path
                d='M26 14 L26 19 Q26 23 32 23 Q38 23 38 19 L38 14 L34.5 14 L34.5 18.5 L29.5 18.5 L29.5 14 Z'
                fill={c.navyGrad}
                stroke={c.navyDark}
                strokeWidth={1.2}
            />
        </G>
        <G rotation={48} originX={32} originY={32}>
            <Rect x={28} y={12} width={8} height={12} rx={3} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.3} />
            <Rect x={30.5} y={24} width={3} height={16} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.1} />
            <Rect x={30.5} y={40} width={3} height={3} fill={c.navyDark} />
            <Line x1={30} y1={15} x2={34} y2={15} stroke={c.amberDark} strokeWidth={0.8} opacity={0.6} />
            <Line x1={30} y1={18} x2={34} y2={18} stroke={c.amberDark} strokeWidth={0.8} opacity={0.6} />
        </G>
    </G>
)

export const ART_C: Record<string, CategoryArtRenderer> = {transmission, fuel, tires, other}
