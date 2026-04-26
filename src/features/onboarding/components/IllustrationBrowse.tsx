import React from 'react'
import Svg, {Circle, Rect, G, Path, Line, Defs, RadialGradient, LinearGradient, Stop, Ellipse} from 'react-native-svg'
import {useAppTheme} from '@/global/hooks'

interface Props {
    size?: number
}

export const IllustrationBrowse = ({size = 240}: Props) => {
    const theme = useAppTheme()
    const p = theme.colors.primary
    const t = theme.colors.tertiary
    const pc = theme.colors.primaryContainer
    const sv = theme.colors.onSurfaceVariant

    return (
        <Svg width={size} height={size} viewBox='0 0 240 240'>
            <Defs>
                <RadialGradient id='bBg' cx='50%' cy='48%' r='55%'>
                    <Stop offset='0%' stopColor={pc} stopOpacity={0.95} />
                    <Stop offset='70%' stopColor={pc} stopOpacity={0.3} />
                    <Stop offset='100%' stopColor={pc} stopOpacity={0} />
                </RadialGradient>
                <LinearGradient id='bCard' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <Stop offset='0%' stopColor='#FFFFFF' stopOpacity={1} />
                    <Stop offset='100%' stopColor='#F5F7FB' stopOpacity={1} />
                </LinearGradient>
                <LinearGradient id='bGear' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <Stop offset='0%' stopColor={p} stopOpacity={1} />
                    <Stop offset='100%' stopColor={p} stopOpacity={0.75} />
                </LinearGradient>
                <LinearGradient id='bAmber' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={1} />
                    <Stop offset='100%' stopColor={t} stopOpacity={0.7} />
                </LinearGradient>
            </Defs>

            {/* Ambient halo */}
            <Circle cx='120' cy='118' r='115' fill='url(#bBg)' />
            <Ellipse cx='120' cy='200' rx='78' ry='6' fill={p} opacity={0.1} />

            {/* Back card (stacked) */}
            <G>
                <Rect x='68' y='70' width='116' height='130' rx='16' fill={p} opacity={0.08} transform='rotate(-6 126 135)' />
                <Rect x='72' y='66' width='112' height='128' rx='16' fill='url(#bCard)' transform='rotate(-3 128 130)' />
            </G>

            {/* Front card — listing */}
            <G>
                <Rect x='62' y='60' width='132' height='140' rx='18' fill='url(#bCard)' />
                <Rect x='62' y='60' width='132' height='140' rx='18' fill='none' stroke={pc} strokeWidth='1.2' />

                {/* Top app bar */}
                <Rect x='62' y='60' width='132' height='32' rx='18' fill={p} />
                <Rect x='62' y='82' width='132' height='10' fill={p} />
                <Circle cx='74' cy='76' r='2' fill='#FFFFFF' opacity={0.8} />
                <Circle cx='82' cy='76' r='2' fill='#FFFFFF' opacity={0.5} />
                <Circle cx='90' cy='76' r='2' fill='#FFFFFF' opacity={0.3} />
                <Rect x='148' y='73' width='34' height='6' rx='3' fill='#FFFFFF' opacity={0.18} />

                {/* Row 1 — highlighted part (gear) */}
                <Rect x='72' y='100' width='112' height='36' rx='10' fill={t} opacity={0.08} />
                <Rect x='72' y='100' width='112' height='36' rx='10' fill='none' stroke={t} strokeWidth='1.5' opacity={0.55} />
                <G>
                    <Circle cx='88' cy='118' r='11' fill={t} opacity={0.18} />
                    <Path
                        d='M88 109 L90 109 L90.5 112 L93 113 L95 111 L97 113 L95 115.5 L96 118 L99 118.5 L99 120.5 L96 121 L95 123.5 L97 126 L95 128 L93 126 L90.5 127 L90 130 L88 130 L86 130 L85.5 127 L83 126 L81 128 L79 126 L81 123.5 L80 121 L77 120.5 L77 118.5 L80 118 L81 115.5 L79 113 L81 111 L83 113 L85.5 112 L86 109 Z'
                        fill='url(#bGear)'
                    />
                    <Circle cx='88' cy='119.5' r='3' fill='#FFFFFF' />
                </G>
                <Rect x='104' y='108' width='52' height='5' rx='2.5' fill={p} opacity={0.85} />
                <Rect x='104' y='117' width='38' height='4' rx='2' fill={sv} opacity={0.3} />
                <Rect x='104' y='125' width='24' height='6' rx='3' fill={t} />
                <Circle cx='175' cy='118' r='7' fill={t} />
                <Path
                    d='M171 118 L174 121 L179 115'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />

                {/* Row 2 — spark plug */}
                <Rect x='72' y='142' width='112' height='24' rx='8' fill={pc} opacity={0.35} />
                <G>
                    <Rect x='82' y='148' width='4' height='4' rx='1' fill={p} opacity={0.85} />
                    <Rect x='81' y='151' width='6' height='3' fill={p} />
                    <Rect x='82' y='153' width='4' height='5' rx='1' fill={t} />
                    <Rect x='82.5' y='157' width='3' height='3' fill={p} opacity={0.85} />
                </G>
                <Rect x='94' y='149' width='50' height='4' rx='2' fill={p} opacity={0.65} />
                <Rect x='94' y='156' width='30' height='3' rx='1.5' fill={sv} opacity={0.3} />
                <Rect x='156' y='151' width='20' height='7' rx='3.5' fill={p} opacity={0.12} />

                {/* Row 3 — brake disc */}
                <Rect x='72' y='172' width='112' height='24' rx='8' fill={pc} opacity={0.2} />
                <G>
                    <Circle cx='84' cy='184' r='8' fill={p} opacity={0.9} />
                    <Circle cx='84' cy='184' r='5' fill={pc} opacity={0.5} />
                    <Circle cx='84' cy='184' r='2' fill={p} />
                    <Circle
                        cx='84'
                        cy='184'
                        r='8'
                        fill='none'
                        stroke={p}
                        strokeWidth='0.5'
                        strokeDasharray='1 1.5'
                        opacity={0.7}
                    />
                </G>
                <Rect x='94' y='179' width='46' height='4' rx='2' fill={p} opacity={0.5} />
                <Rect x='94' y='186' width='28' height='3' rx='1.5' fill={sv} opacity={0.25} />
                <Rect x='156' y='181' width='20' height='7' rx='3.5' fill={p} opacity={0.08} />
            </G>

            {/* Magnifier — overlapping */}
            <G>
                <Circle cx='52' cy='78' r='30' fill={t} opacity={0.08} />
                <Circle cx='52' cy='78' r='22' fill='#FFFFFF' />
                <Circle cx='52' cy='78' r='22' fill='none' stroke={t} strokeWidth='4' />
                <Path d='M44 72 Q48 66 54 70' stroke='#FFFFFF' strokeWidth='2' fill='none' strokeLinecap='round' opacity={0.7} />
                <Rect x='43' y='78' width='18' height='2.5' rx='1.2' fill={t} opacity={0.3} />
                <Rect x='47' y='84' width='12' height='2' rx='1' fill={t} opacity={0.25} />
                <Line x1='68' y1='94' x2='84' y2='110' stroke={t} strokeWidth='6' strokeLinecap='round' />
                <Circle cx='84' cy='110' r='4' fill={t} />
            </G>

            {/* Filter chips — top right */}
            <G>
                <Rect x='186' y='36' width='44' height='16' rx='8' fill='url(#bAmber)' />
                <Rect x='192' y='42' width='14' height='4' rx='2' fill='#FFFFFF' opacity={0.85} />
                <Circle cx='212' cy='44' r='2' fill='#FFFFFF' opacity={0.85} />

                <Rect x='170' y='20' width='54' height='16' rx='8' fill='#FFFFFF' />
                <Rect x='170' y='20' width='54' height='16' rx='8' fill='none' stroke={p} strokeWidth='1' opacity={0.3} />
                <Circle cx='179' cy='28' r='2.5' fill={p} opacity={0.7} />
                <Rect x='186' y='25' width='28' height='3' rx='1.5' fill={p} opacity={0.7} />
                <Rect x='186' y='30' width='18' height='2' rx='1' fill={sv} opacity={0.3} />
            </G>

            {/* Decorative dots */}
            <Circle cx='28' cy='150' r='4' fill={t} opacity={0.2} />
            <Circle cx='36' cy='168' r='2.5' fill={p} opacity={0.15} />
            <Circle cx='212' cy='170' r='4' fill={p} opacity={0.15} />
            <Circle cx='220' cy='150' r='2.5' fill={t} opacity={0.25} />
            <Path d='M30 42 L31 45 L34 46 L31 47 L30 50 L29 47 L26 46 L29 45 Z' fill={t} opacity={0.4} />
        </Svg>
    )
}
