import React from 'react'
import Svg, {Circle, Path, G} from 'react-native-svg'

import {useAppTheme} from '@/global/hooks'

interface IllustrationSubscriptionProps {
    size?: number
}

export const IllustrationSubscription = ({size = 140}: IllustrationSubscriptionProps) => {
    const theme = useAppTheme()
    const navy = theme.colors.primary
    const amber = theme.colors.tertiary
    const amberLight = theme.colors.tertiaryContainer

    return (
        <Svg width={size} height={size} viewBox='0 0 160 160' fill='none'>
            <Circle cx='80' cy='82' r='62' fill={amberLight} opacity='0.55' />

            <G>
                <Path d='M80 32 L122 48 L122 86 C122 112 104 128 80 134 C56 128 38 112 38 86 L38 48 Z' fill={navy} />
                <Path d='M80 32 L122 48 L122 86 C122 112 104 128 80 134 L80 32 Z' fill='rgba(255,255,255,0.08)' />
                <Path
                    d='M80 38 L116 51 L116 84 C116 107 100 121 80 127 C60 121 44 107 44 84 L44 51 Z'
                    stroke={amber}
                    strokeWidth='1.5'
                    fill='none'
                    opacity='0.5'
                />
            </G>

            <Path d='M80 57 L86 74 L104 74 L89 84 L95 101 L80 91 L65 101 L71 84 L56 74 L74 74 Z' fill={amber} />
            <Path d='M80 57 L86 74 L104 74 L89 84 L95 101 L80 91 L80 57 Z' fill='rgba(255,255,255,0.15)' />

            <Path d='M26 32 L26 42 M21 37 L31 37' stroke={amber} strokeWidth='2.2' strokeLinecap='round' />
            <Path d='M134 42 L134 48 M131 45 L137 45' stroke={amber} strokeWidth='2' strokeLinecap='round' />
            <Path d='M138 108 L138 116 M134 112 L142 112' stroke={amber} strokeWidth='2' strokeLinecap='round' />
            <Path d='M22 110 L22 116 M19 113 L25 113' stroke={amber} strokeWidth='1.8' strokeLinecap='round' />

            <Circle cx='44' cy='22' r='2.5' fill={amber} />
            <Circle cx='120' cy='22' r='2' fill={amber} opacity='0.7' />
            <Circle cx='146' cy='78' r='2.5' fill={amber} opacity='0.8' />
            <Circle cx='14' cy='78' r='2' fill={amber} opacity='0.6' />
        </Svg>
    )
}
