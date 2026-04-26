import React from 'react'
import {Circle, Ellipse, G, Path, Rect} from 'react-native-svg'
import {useAppTheme} from '@/global/hooks'

export const WelcomeCar = () => {
    const theme = useAppTheme()
    const t = theme.colors.tertiary
    const pc = theme.colors.primaryContainer
    const dark = theme.colors.surfaceDark

    return (
        <G>
            {/* Body silhouette with wheel arches */}
            <Path
                d='M 32 168 L 30 160 C 28 152, 32 148, 38 146 L 72 140 C 78 135, 88 120, 104 112 C 116 106, 134 104, 148 108 C 164 112, 178 122, 190 136 L 202 140 C 210 144, 214 156, 212 168 L 192 168 Q 192 152, 174 152 Q 156 152, 156 168 L 86 168 Q 86 152, 68 152 Q 50 152, 50 168 Z'
                fill='url(#wBody)'
            />

            {/* Hood sheen */}
            <Path d='M 44 146 L 90 140 C 86 144, 68 147, 46 149 Z' fill='#FFFFFF' opacity={0.18} />

            {/* Greenhouse / glass cabin */}
            <Path d='M 92 134 C 96 124, 108 114, 124 112 L 145 112 C 160 116, 172 126, 178 134 Z' fill='url(#wGlass)' />

            {/* Windshield sheen */}
            <Path
                d='M 100 130 C 104 122, 112 116, 122 114'
                stroke='#FFFFFF'
                strokeWidth='1.2'
                fill='none'
                opacity={0.45}
                strokeLinecap='round'
            />

            {/* B-pillar */}
            <Rect x='132.5' y='112' width='1.8' height='22' fill={dark} opacity={0.85} />

            {/* Belt line */}
            <Path d='M 38 134.5 L 202 134.5' stroke={dark} strokeWidth='0.6' opacity={0.5} />

            {/* Character line sweep */}
            <Path d='M 48 145 L 202 145' stroke='#FFFFFF' strokeWidth='0.7' opacity={0.22} strokeLinecap='round' />

            {/* Rocker amber trim */}
            <Path d='M 52 162 L 200 160' stroke={t} strokeWidth='1.2' opacity={0.85} strokeLinecap='round' />
            <Path d='M 52 164.5 L 200 162.5' stroke={t} strokeWidth='0.6' opacity={0.4} strokeLinecap='round' />

            {/* Door cuts */}
            <Path d='M 98 136 L 98 160' stroke={dark} strokeWidth='0.5' opacity={0.45} />
            <Path d='M 134 136 L 134 160' stroke={dark} strokeWidth='0.5' opacity={0.45} />

            {/* Door handles */}
            <Rect x='108' y='149' width='12' height='1.8' rx='0.9' fill={pc} opacity={0.55} />
            <Rect x='144' y='149' width='12' height='1.8' rx='0.9' fill={pc} opacity={0.5} />

            {/* Side mirror */}
            <Path d='M 96 130 L 88 135 L 98 137 Z' fill={dark} />

            {/* Headlight pod */}
            <Path d='M 28 152 C 28 150, 30 149, 32 149 L 46 150 L 46 157 L 32 157 C 30 157, 28 156, 28 154 Z' fill={t} />
            <Ellipse cx='37' cy='152.5' rx='5.5' ry='1.6' fill='#FFFFFF' opacity={0.85} />
            <Rect x='30' y='155' width='14' height='1.2' rx='0.6' fill='#FFFFFF' opacity={0.55} />

            {/* Tail light strip */}
            <Rect x='198' y='146' width='14' height='4' rx='1.5' fill={t} />
            <Rect x='196' y='152' width='16' height='1.6' rx='0.8' fill={t} opacity={0.55} />

            {/* Hood badge */}
            <Circle cx='60' cy='144' r='2.2' fill={t} opacity={0.9} />
            <Circle cx='60' cy='144' r='1' fill='#FFFFFF' opacity={0.85} />
        </G>
    )
}
