import React from 'react'
import {Circle, G, Path} from 'react-native-svg'
import {useAppTheme} from '@/global/hooks'

const FRONT_CX = 68
const REAR_CX = 174
const CY = 170

export const WelcomeWheels = () => {
    const theme = useAppTheme()
    const t = theme.colors.tertiary
    const dark = theme.colors.surfaceDark

    return (
        <G>
            <Wheel cx={FRONT_CX} dark={dark} t={t} />
            <Wheel cx={REAR_CX} dark={dark} t={t} />
        </G>
    )
}

const Wheel = ({cx, dark, t}: {cx: number; dark: string; t: string}) => {
    const spokes = `M ${cx} ${CY - 14} L ${cx} ${CY} M ${cx + 13} ${CY - 5} L ${cx} ${CY} M ${cx + 8} ${CY + 13} L ${cx} ${CY} M ${cx - 8} ${CY + 13} L ${cx} ${CY} M ${cx - 13} ${CY - 5} L ${cx} ${CY}`
    return (
        <G>
            <Circle cx={cx} cy={CY} r='19' fill={dark} />
            <Circle cx={cx} cy={CY} r='14.5' fill='url(#wRim)' />
            <Circle cx={cx} cy={CY} r='14.5' fill='none' stroke={dark} strokeWidth='0.6' opacity={0.5} />
            <Path d={spokes} stroke={dark} strokeWidth='2.2' strokeLinecap='round' />
            <Circle cx={cx} cy={CY} r='4' fill={dark} />
            <Circle cx={cx} cy={CY} r='1.8' fill={t} />
        </G>
    )
}
