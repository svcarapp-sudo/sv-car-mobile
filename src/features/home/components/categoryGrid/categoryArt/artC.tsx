import React from 'react'
import {Ellipse, G, Line, Path, Rect} from 'react-native-svg'

import type {ArtColors, CategoryArtRenderer} from './types'

const VENT_CAPS: [number, number][] = [
    [28.2, 23.5],
    [32.5, 23.1],
    [36.8, 22.7],
]
const FIN_Y = [20.2, 23.5, 26.8, 30.1, 33.4, 36.7, 40]
const TUBE_X = [22.5, 27, 31.5, 36, 40.5]

// Electrical — 12V battery in three-quarter view: shaded top and side faces, lead
// terminal posts with an amber clamp and cable, vent caps, moulded +/- marks and a
// label plate with lightning bolt.
const electrical: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path d='M44 26 L51.5 21.8 L51.5 41.3 L44 45.5 Z' fill={c.darkGrad} stroke={c.navyDark} strokeWidth={1.2} />
        <Path d='M13.5 26 L21 21.8 L51.5 21.8 L44 26 Z' fill={c.navyLt} stroke={c.navyDark} strokeWidth={1.2} />
        {VENT_CAPS.map(([x, y]) => (
            <Ellipse key={`v${x}`} cx={x} cy={y} rx={1.2} ry={0.7} fill={c.navy} opacity={0.45} />
        ))}
        <Rect x={21.2} y={19.4} width={3} height={4.5} rx={0.8} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Ellipse cx={22.7} cy={19.4} rx={1.5} ry={0.8} fill={c.surface} stroke={c.navy} strokeWidth={0.8} />
        <Rect x={39.5} y={18.6} width={3} height={5.3} rx={0.8} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Ellipse cx={41} cy={18.6} rx={1.5} ry={0.8} fill={c.surface} stroke={c.navy} strokeWidth={0.8} />
        <Path d='M42.9 20.9 Q46 20 47.5 17.5' fill='none' stroke={c.amberGrad} strokeWidth={1.8} />
        <Rect x={39.1} y={20} width={3.8} height={1.8} rx={0.9} fill={c.amberGrad} stroke={c.amberDark} strokeWidth={0.8} />
        <Rect x={13.5} y={26} width={30.5} height={19.5} rx={2} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.4} />
        <Line x1={15.2} y1={27.6} x2={42.3} y2={27.6} stroke={c.surface} strokeWidth={1.2} opacity={0.45} />
        <Line x1={16.8} y1={29.6} x2={19.2} y2={29.6} stroke={c.surface} strokeWidth={1.3} opacity={0.7} />
        <Line x1={39.4} y1={29.6} x2={41.9} y2={29.6} stroke={c.amber} strokeWidth={1.3} />
        <Line x1={40.65} y1={28.35} x2={40.65} y2={30.85} stroke={c.amber} strokeWidth={1.3} />
        <Rect x={17} y={32.5} width={23.5} height={8.5} rx={1.5} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.9} />
        <Path
            d='M27.4 33.8 L24 38.2 L26.6 38.2 L25.7 41.6 L29.8 36.9 L27.2 36.9 Z'
            fill={c.amberGrad}
            stroke={c.amberDark}
            strokeWidth={0.8}
        />
        <Line x1={31.5} y1={36} x2={37.5} y2={36} stroke={c.navy} strokeWidth={1.2} opacity={0.45} />
        <Line x1={31.5} y1={38.4} x2={35.5} y2={38.4} stroke={c.navy} strokeWidth={1.2} opacity={0.3} />
    </G>
)

// Cooling — radiator: side tanks with filler cap and mounting tabs, finned core with
// vertical coolant tubes, rubber hoses with worm clamps, and a coolant drop.
const cooling: CategoryArtRenderer = (c: ArtColors) => (
    <G strokeLinecap='round' strokeLinejoin='round'>
        <Path d='M49.5 15.5 C52.5 11.5 55.5 10.5 58 12.2' fill='none' stroke={c.darkGrad} strokeWidth={4} />
        <Rect
            x={51.4}
            y={10.2}
            width={2.2}
            height={4.6}
            rx={0.9}
            fill={c.steelGrad}
            stroke={c.navy}
            strokeWidth={0.8}
            rotation={35}
            originX={52.5}
            originY={12.5}
        />
        <Path d='M14.5 44 C11.5 47.5 8.5 49 6 47.6' fill='none' stroke={c.darkGrad} strokeWidth={4} />
        <Rect
            x={9.1}
            y={45.2}
            width={2.2}
            height={4.6}
            rx={0.9}
            fill={c.steelGrad}
            stroke={c.navy}
            strokeWidth={0.8}
            rotation={65}
            originX={10.2}
            originY={47.5}
        />
        <Rect x={13.3} y={11.9} width={3.4} height={1.8} rx={0.9} fill={c.steelGrad} stroke={c.navy} strokeWidth={0.8} />
        <Ellipse cx={15} cy={13.8} rx={3.1} ry={1.6} fill={c.steelGrad} stroke={c.navy} strokeWidth={1} />
        <Rect x={20.5} y={14} width={4} height={3.5} rx={1} fill={c.navyDark} opacity={0.85} />
        <Rect x={39.5} y={14} width={4} height={3.5} rx={1} fill={c.navyDark} opacity={0.85} />
        <Rect x={18} y={17.2} width={28} height={25.6} fill={c.steelGrad} stroke={c.navy} strokeWidth={1.2} />
        {FIN_Y.map(y => (
            <Line key={`f${y}`} x1={19.5} y1={y} x2={44.5} y2={y} stroke={c.navyLt} strokeWidth={1} opacity={0.8} />
        ))}
        {TUBE_X.map(x => (
            <Line key={`t${x}`} x1={x} y1={19} x2={x} y2={40.8} stroke={c.navy} strokeWidth={1.4} opacity={0.28} />
        ))}
        <Rect x={11} y={15} width={7.5} height={30} rx={3} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.4} />
        <Rect x={45.5} y={15} width={7.5} height={30} rx={3} fill={c.navyGrad} stroke={c.navyDark} strokeWidth={1.4} />
        <Line x1={13.2} y1={17.8} x2={13.2} y2={42} stroke={c.surface} strokeWidth={1.1} opacity={0.25} />
        <Line x1={47.7} y1={17.8} x2={47.7} y2={42} stroke={c.surface} strokeWidth={1.1} opacity={0.25} />
        <Path
            d='M43 45 C43 48.2 38.6 48.2 38.6 45 C38.6 42.6 40.8 39.4 40.8 39.4 C40.8 39.4 43 42.6 43 45 Z'
            fill={c.amberGrad}
            stroke={c.amberDark}
            strokeWidth={0.9}
        />
        <Ellipse cx={39.9} cy={43.6} rx={0.7} ry={1} fill={c.surface} opacity={0.6} />
    </G>
)

export const ART_C: Record<string, CategoryArtRenderer> = {electrical, cooling}
