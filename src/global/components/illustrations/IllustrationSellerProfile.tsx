import React from 'react'
import Svg, {Circle, Ellipse, Path, Rect, G} from 'react-native-svg'

import {useAppTheme} from '@/global/hooks'

interface IllustrationSellerProfileProps {
    size?: number
}

export const IllustrationSellerProfile = ({size = 160}: IllustrationSellerProfileProps) => {
    const theme = useAppTheme()
    const navy = theme.colors.primary
    const amber = theme.colors.tertiary
    const amberLight = theme.colors.tertiaryContainer
    const navyLight = theme.colors.primaryContainer

    return (
        <Svg width={size} height={size * 0.85} viewBox='0 0 200 170' fill='none'>
            <Ellipse cx='100' cy='150' rx='80' ry='12' fill={amberLight} opacity='0.6' />

            <G>
                <Path d='M30 65 L170 65 L160 42 L40 42 Z' fill={amber} />
                <Path
                    d='M55 42 L50 65 M80 42 L75 65 M105 42 L100 65 M130 42 L125 65 M155 42 L150 65'
                    stroke='rgba(255,255,255,0.55)'
                    strokeWidth='2'
                    strokeLinecap='round'
                />
            </G>

            <Rect x='40' y='65' width='120' height='85' fill={theme.colors.surface} stroke={navy} strokeWidth='3' />

            <Rect x='53' y='82' width='26' height='26' fill={navyLight} stroke={navy} strokeWidth='2' rx='2' />
            <Path d='M53 95 L79 95 M66 82 L66 108' stroke={navy} strokeWidth='1.5' opacity='0.4' />

            <Rect x='121' y='82' width='26' height='26' fill={navyLight} stroke={navy} strokeWidth='2' rx='2' />
            <Path d='M121 95 L147 95 M134 82 L134 108' stroke={navy} strokeWidth='1.5' opacity='0.4' />

            <Rect x='85' y='90' width='30' height='60' fill={amber} rx='2' />
            <Rect x='88' y='93' width='24' height='30' fill={amberLight} opacity='0.4' rx='1' />
            <Circle cx='108' cy='122' r='2' fill={theme.colors.onTertiary} />

            <Circle cx='165' cy='50' r='15' fill={amber} />
            <Path d='M165 43 L165 57 M158 50 L172 50' stroke={theme.colors.onTertiary} strokeWidth='2.8' strokeLinecap='round' />

            <Circle cx='25' cy='55' r='3' fill={amber} opacity='0.6' />
            <Circle cx='180' cy='95' r='2.5' fill={navy} opacity='0.3' />
            <Circle cx='20' cy='110' r='2' fill={amber} opacity='0.5' />
        </Svg>
    )
}
