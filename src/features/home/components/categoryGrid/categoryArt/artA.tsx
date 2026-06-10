import React from 'react'
import {Circle, Ellipse, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

// Engine — block with valve cover, cooling fins, intake runner and belt pulley.
const engine: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={17} y={43} width={7} height={4} rx={1.5} fill={c.navyDark} />
        <Rect x={37} y={43} width={7} height={4} rx={1.5} fill={c.navyDark} />
        <Path d='M16 31 Q9 31 9 38 L9 41' fill='none' stroke={c.amber} strokeWidth={2.6} />
        <Rect x={15} y={25} width={28} height={19} rx={4} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        <Rect x={19} y={16} width={19} height={10} rx={3} fill={c.navyLt} stroke={c.navy} strokeWidth={1.5} />
        <Circle cx={24} cy={21} r={1.4} fill={c.amber} />
        <Circle cx={29} cy={21} r={1.4} fill={c.amber} />
        <Circle cx={34} cy={21} r={1.4} fill={c.amber} />
        <Line x1={21} y1={31} x2={21} y2={40} stroke={c.navyDark} strokeWidth={1.4} opacity={0.45} />
        <Line x1={25} y1={31} x2={25} y2={40} stroke={c.navyDark} strokeWidth={1.4} opacity={0.45} />
        <Line x1={29} y1={31} x2={29} y2={40} stroke={c.navyDark} strokeWidth={1.4} opacity={0.45} />
        <Circle cx={45} cy={36} r={7} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.5} />
        <Circle cx={45} cy={36} r={2.6} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1} />
        <Line x1={22} y1={18.5} x2={33} y2={18.5} stroke={c.surface} strokeWidth={1.4} opacity={0.5} />
    </G>
)

// Suspension — coil-over: spring wound over a shock body between two mounts.
const suspension: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={28} y={13} width={8} height={34} rx={4} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.4} />
        <Ellipse cx={32} cy={18} rx={11} ry={3.4} fill='none' stroke={c.amberGrad} strokeWidth={3.2} />
        <Ellipse cx={32} cy={25} rx={11} ry={3.4} fill='none' stroke={c.amberGrad} strokeWidth={3.2} />
        <Ellipse cx={32} cy={32} rx={11} ry={3.4} fill='none' stroke={c.amberGrad} strokeWidth={3.2} />
        <Ellipse cx={32} cy={39} rx={11} ry={3.4} fill='none' stroke={c.amberGrad} strokeWidth={3.2} />
        <Rect x={23} y={9} width={18} height={5} rx={2.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.2} />
        <Circle cx={32} cy={48} r={4.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.5} />
        <Circle cx={32} cy={48} r={1.7} fill={c.navyDark} />
    </G>
)

// Brakes — drilled steel rotor with hub, gripped by an amber caliper.
const brakes: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Circle cx={30} cy={33} r={17} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.5} />
        <Circle cx={30} cy={33} r={13.5} fill='none' stroke={c.navy} strokeWidth={1} opacity={0.25} />
        <Circle cx={40} cy={33} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={37} cy={40} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={30} cy={43} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={23} cy={40} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={20} cy={33} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={23} cy={26} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={30} cy={23} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={37} cy={26} r={1.4} fill={c.navyDark} opacity={0.5} />
        <Circle cx={30} cy={33} r={6.5} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1} />
        <Circle cx={30} cy={33} r={1.8} fill={c.amberGrad} />
        <Path d='M41 20 H45 Q49 20 49 24 V42 Q49 46 45 46 H41 Z' fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.4} />
        <Rect x={40} y={26} width={3} height={14} rx={1.5} fill={c.navyDark} opacity={0.55} />
        <Path d='M19 27 A17 17 0 0 1 28 18.5' fill='none' stroke={c.surface} strokeWidth={1.8} opacity={0.55} />
    </G>
)

// Electrical — battery with +/- terminals and a lightning bolt.
const electrical: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Rect x={14} y={23} width={36} height={25} rx={4} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.5} />
        <Path d='M14 29 Q14 23 18 23 H46 Q50 23 50 29 Z' fill={c.navyLt} />
        <Rect x={20} y={15} width={7} height={9} rx={1.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.2} />
        <Rect x={37} y={15} width={7} height={9} rx={1.5} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.2} />
        <Line x1={21} y1={19.5} x2={26} y2={19.5} stroke={c.navyDark} strokeWidth={1.6} />
        <Line x1={38} y1={19.5} x2={43} y2={19.5} stroke={c.surface} strokeWidth={1.6} />
        <Line x1={40.5} y1={17} x2={40.5} y2={22} stroke={c.surface} strokeWidth={1.6} />
        <Path d='M33 30 L25 41 L31 41 L29 49 L40 36 L33.5 36 Z' fill={c.amberGrad} stroke={c.amberDark} strokeWidth={1.2} />
        <Line x1={18} y1={26} x2={30} y2={26} stroke={c.surface} strokeWidth={1.4} opacity={0.5} />
    </G>
)

export const ART_A: Record<string, CategoryArtRenderer> = {engine, suspension, brakes, electrical}
