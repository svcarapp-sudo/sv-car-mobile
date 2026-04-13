import React from 'react'
import Svg, {Circle, Ellipse, Path, Rect} from 'react-native-svg'

import {useAppTheme} from '@/global/hooks'

interface IllustrationEmptyPartsProps {
    size?: number
}

export const IllustrationEmptyParts = ({size = 180}: IllustrationEmptyPartsProps) => {
    const theme = useAppTheme()
    const navy = theme.colors.primary
    const amber = theme.colors.tertiary
    const amberLight = theme.colors.tertiaryContainer
    const surface = theme.colors.surface

    return (
        <Svg width={size} height={size * 0.95} viewBox='0 0 180 170' fill='none'>
            <Ellipse cx='90' cy='158' rx='68' ry='8' fill={amberLight} opacity='0.6' />
            <Circle cx='90' cy='82' r='62' fill={amberLight} opacity='0.55' />

            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(45 90 85)' />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(90 90 85)' />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(135 90 85)' />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(180 90 85)' />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(225 90 85)' />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(270 90 85)' />
            <Rect x='85' y='38' width='10' height='12' rx='2' fill={navy} transform='rotate(315 90 85)' />

            <Circle cx='90' cy='85' r='38' fill={navy} />
            <Circle cx='90' cy='85' r='28' fill={surface} />
            <Circle cx='90' cy='85' r='26' fill='none' stroke={amber} strokeWidth='2' opacity='0.5' />
            <Circle cx='90' cy='85' r='13' fill={amber} />
            <Circle cx='90' cy='85' r='5' fill={navy} />

            <Circle cx='150' cy='44' r='15' fill={amber} />
            <Path d='M150 37 L150 51 M143 44 L157 44' stroke={theme.colors.onTertiary} strokeWidth='3' strokeLinecap='round' />

            <Circle cx='28' cy='40' r='3' fill={amber} opacity='0.7' />
            <Circle cx='32' cy='120' r='2.5' fill={amber} opacity='0.5' />
            <Circle cx='160' cy='128' r='2.5' fill={navy} opacity='0.3' />
            <Circle cx='18' cy='78' r='2' fill={amber} opacity='0.6' />
        </Svg>
    )
}
