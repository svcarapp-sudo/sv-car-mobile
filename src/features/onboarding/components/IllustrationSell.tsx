import React from 'react'
import Svg, {Circle, Rect, G, Path, Defs, RadialGradient, LinearGradient, Stop, Ellipse} from 'react-native-svg'
import {useAppTheme} from '@/global/hooks'

interface Props {
    size?: number
}

export const IllustrationSell = ({size = 240}: Props) => {
    const theme = useAppTheme()
    const p = theme.colors.primary
    const t = theme.colors.tertiary
    const pc = theme.colors.primaryContainer
    const sv = theme.colors.onSurfaceVariant

    return (
        <Svg width={size} height={size} viewBox='0 0 240 240'>
            <Defs>
                <RadialGradient id='sBg' cx='50%' cy='48%' r='55%'>
                    <Stop offset='0%' stopColor={pc} stopOpacity={0.95} />
                    <Stop offset='70%' stopColor={pc} stopOpacity={0.3} />
                    <Stop offset='100%' stopColor={pc} stopOpacity={0} />
                </RadialGradient>
                <LinearGradient id='sCard' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <Stop offset='0%' stopColor='#FFFFFF' stopOpacity={1} />
                    <Stop offset='100%' stopColor='#F5F7FB' stopOpacity={1} />
                </LinearGradient>
                <LinearGradient id='sAmber' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={1} />
                    <Stop offset='100%' stopColor={t} stopOpacity={0.7} />
                </LinearGradient>
                <LinearGradient id='sCoin' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={1} />
                    <Stop offset='100%' stopColor='#B45309' stopOpacity={1} />
                </LinearGradient>
                <LinearGradient id='sBar' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={1} />
                    <Stop offset='100%' stopColor={t} stopOpacity={0.55} />
                </LinearGradient>
            </Defs>

            {/* Ambient halo */}
            <Circle cx='120' cy='118' r='115' fill='url(#sBg)' />
            <Ellipse cx='120' cy='200' rx='78' ry='6' fill={p} opacity={0.12} />

            {/* Phone / listing card */}
            <G>
                <Rect x='66' y='52' width='108' height='150' rx='20' fill={p} opacity={0.1} />
                <Rect x='70' y='48' width='104' height='148' rx='18' fill='url(#sCard)' />
                <Rect x='70' y='48' width='104' height='148' rx='18' fill='none' stroke={pc} strokeWidth='1.2' />

                {/* Status bar */}
                <Rect x='110' y='54' width='24' height='3' rx='1.5' fill={p} opacity={0.25} />

                {/* Hero image area */}
                <Rect x='80' y='64' width='84' height='56' rx='12' fill={pc} opacity={0.55} />
                {/* Stylized part inside — piston */}
                <G>
                    <Rect x='110' y='76' width='24' height='22' rx='4' fill={p} opacity={0.85} />
                    <Rect x='114' y='80' width='16' height='4' rx='1.5' fill={pc} opacity={0.7} />
                    <Rect x='114' y='87' width='16' height='2' rx='1' fill={pc} opacity={0.45} />
                    <Rect x='114' y='91' width='16' height='2' rx='1' fill={pc} opacity={0.35} />
                    <Rect x='118' y='98' width='8' height='10' rx='1.5' fill={p} opacity={0.7} />
                    <Circle cx='122' cy='113' r='3' fill={p} opacity={0.55} />
                </G>
                {/* Live badge */}
                <Rect x='84' y='68' width='42' height='16' rx='8' fill='#FFFFFF' opacity={0.95} />
                <Circle cx='92' cy='76' r='3' fill={t} />
                <Circle cx='92' cy='76' r='5' fill={t} opacity={0.25} />
                <Rect x='98' y='73' width='22' height='6' rx='1.5' fill={p} opacity={0.75} />

                {/* Title lines */}
                <Rect x='80' y='128' width='68' height='5' rx='2.5' fill={p} opacity={0.85} />
                <Rect x='80' y='137' width='44' height='3.5' rx='1.75' fill={sv} opacity={0.35} />

                {/* Price row */}
                <Rect x='80' y='150' width='50' height='9' rx='2' fill={t} />
                <Rect x='82' y='152.5' width='46' height='4' rx='1' fill='#FFFFFF' opacity={0.35} />

                {/* CTA button */}
                <Rect x='80' y='168' width='84' height='20' rx='10' fill={p} />
                <Rect x='108' y='175' width='28' height='5' rx='2.5' fill='#FFFFFF' opacity={0.85} />
                <Circle cx='96' cy='178' r='2.5' fill='#FFFFFF' opacity={0.75} />
                <Rect x='94' y='176' width='5' height='4' rx='1' fill='none' stroke='#FFFFFF' strokeWidth='1.3' opacity={0.9} />
            </G>

            {/* Price tag — top right, floating */}
            <G transform='rotate(12 206 56)'>
                <Path d='M178 48 L202 48 L218 64 L202 80 L178 80 L178 48 Z' fill='url(#sAmber)' />
                <Path
                    d='M178 48 L202 48 L218 64 L202 80 L178 80 L178 48 Z'
                    fill='none'
                    stroke={t}
                    strokeWidth='0.8'
                    opacity={0.6}
                />
                <Circle cx='186' cy='64' r='3.5' fill='#FFFFFF' opacity={0.95} />
                <Circle cx='186' cy='64' r='1.5' fill={t} />
                <Path d='M194 57 L212 57' stroke='#FFFFFF' strokeWidth='2' strokeLinecap='round' opacity={0.9} />
                <Path d='M194 64 L208 64' stroke='#FFFFFF' strokeWidth='2' strokeLinecap='round' opacity={0.7} />
                <Path d='M194 71 L205 71' stroke='#FFFFFF' strokeWidth='2' strokeLinecap='round' opacity={0.5} />
            </G>

            {/* Rising chart — bottom left */}
            <G>
                <Rect x='12' y='140' width='50' height='52' rx='10' fill='#FFFFFF' />
                <Rect x='12' y='140' width='50' height='52' rx='10' fill='none' stroke={pc} strokeWidth='1' />
                <Rect x='18' y='172' width='6' height='12' rx='1.5' fill={p} opacity={0.35} />
                <Rect x='28' y='164' width='6' height='20' rx='1.5' fill={p} opacity={0.55} />
                <Rect x='38' y='154' width='6' height='30' rx='1.5' fill='url(#sBar)' />
                <Rect x='48' y='148' width='6' height='36' rx='1.5' fill='url(#sBar)' />
                {/* Trendline */}
                <Path
                    d='M20 168 L32 160 L42 150 L52 146'
                    stroke={p}
                    strokeWidth='1.6'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <Circle cx='20' cy='168' r='1.8' fill={p} />
                <Circle cx='32' cy='160' r='1.8' fill={p} />
                <Circle cx='42' cy='150' r='1.8' fill={p} />
                <Circle cx='52' cy='146' r='2.2' fill={t} />
                {/* Up arrow */}
                <Path
                    d='M52 146 L52 138 M48 142 L52 138 L56 142'
                    stroke={t}
                    strokeWidth='1.8'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </G>

            {/* Coin stack — bottom right */}
            <G>
                <Ellipse cx='202' cy='186' rx='22' ry='4' fill={p} opacity={0.1} />
                <G>
                    <Ellipse cx='202' cy='178' rx='18' ry='5' fill={p} opacity={0.35} />
                    <Rect x='184' y='173' width='36' height='5' fill={p} opacity={0.35} />
                    <Ellipse cx='202' cy='173' rx='18' ry='5' fill='url(#sCoin)' />
                </G>
                <G>
                    <Ellipse cx='202' cy='168' rx='18' ry='5' fill={p} opacity={0.35} />
                    <Rect x='184' y='163' width='36' height='5' fill={p} opacity={0.35} />
                    <Ellipse cx='202' cy='163' rx='18' ry='5' fill='url(#sCoin)' />
                </G>
                <G>
                    <Ellipse cx='202' cy='158' rx='18' ry='5' fill={p} opacity={0.35} />
                    <Rect x='184' y='153' width='36' height='5' fill={p} opacity={0.35} />
                    <Ellipse cx='202' cy='153' rx='18' ry='5' fill='url(#sCoin)' />
                    <Rect x='196' y='151' width='12' height='4' rx='1' fill='#FFFFFF' opacity={0.35} />
                </G>
            </G>

            {/* Sparkles */}
            <Path d='M32 72 L34 78 L40 80 L34 82 L32 88 L30 82 L24 80 L30 78 Z' fill={t} opacity={0.55} />
            <Path d='M52 110 L53 113 L56 114 L53 115 L52 118 L51 115 L48 114 L51 113 Z' fill={p} opacity={0.3} />
            <Path d='M224 112 L225 115 L228 116 L225 117 L224 120 L223 117 L220 116 L223 115 Z' fill={t} opacity={0.4} />
            <Circle cx='152' cy='30' r='3' fill={t} opacity={0.35} />
            <Circle cx='228' cy='140' r='2.5' fill={p} opacity={0.2} />
        </Svg>
    )
}
