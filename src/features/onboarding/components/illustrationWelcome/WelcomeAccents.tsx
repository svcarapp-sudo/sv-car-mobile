import React from 'react'
import {Circle, G, Path} from 'react-native-svg'
import {useAppTheme} from '@/global/hooks'

export const WelcomeAccents = () => {
    const theme = useAppTheme()
    const p = theme.colors.primary
    const t = theme.colors.tertiary
    const dark = theme.colors.surfaceDark

    return (
        <G>
            {/* Motion / speed lines */}
            <Path d='M 2 145 L 22 145' stroke={p} strokeWidth='1.4' strokeLinecap='round' opacity={0.2} />
            <Path d='M 6 155 L 24 155' stroke={t} strokeWidth='1.4' strokeLinecap='round' opacity={0.45} />
            <Path d='M 2 164 L 20 164' stroke={p} strokeWidth='1.2' strokeLinecap='round' opacity={0.15} />

            {/* Sun lens flare */}
            <G>
                <Circle cx='198' cy='50' r='22' fill={t} opacity={0.09} />
                <Circle cx='198' cy='50' r='12' fill={t} opacity={0.18} />
                <Circle cx='198' cy='50' r='4' fill='#FFFFFF' opacity={0.95} />
                <Path
                    d='M 198 32 L 198 68 M 180 50 L 216 50 M 186 38 L 210 62 M 210 38 L 186 62'
                    stroke={t}
                    strokeWidth='0.7'
                    strokeLinecap='round'
                    opacity={0.35}
                />
            </G>

            {/* Premium star badge */}
            <G>
                <Circle cx='38' cy='46' r='15' fill={dark} />
                <Circle cx='38' cy='46' r='15' fill='none' stroke={t} strokeWidth='1.5' />
                <Path
                    d='M 38 37 L 40.3 43.8 L 47.5 43.8 L 41.6 48 L 43.9 54.8 L 38 50.6 L 32.1 54.8 L 34.4 48 L 28.5 43.8 L 35.7 43.8 Z'
                    fill={t}
                />
            </G>

            {/* Sparkles & dust */}
            <Path d='M 214 104 L 215 108 L 219 109 L 215 110 L 214 114 L 213 110 L 209 109 L 213 108 Z' fill={t} opacity={0.55} />
            <Path d='M 24 94 L 25 97 L 28 98 L 25 99 L 24 102 L 23 99 L 20 98 L 23 97 Z' fill={p} opacity={0.35} />
            <Circle cx='212' cy='126' r='2' fill={t} opacity={0.4} />
            <Circle cx='26' cy='124' r='1.6' fill={p} opacity={0.3} />
            <Circle cx='220' cy='88' r='1.4' fill={p} opacity={0.25} />
            <Circle cx='150' cy='32' r='2' fill={t} opacity={0.35} />
        </G>
    )
}
