import React from 'react'
import Svg, {Circle, Defs, Ellipse, LinearGradient, RadialGradient, Rect, Stop} from 'react-native-svg'
import {useAppTheme} from '@/global/hooks'
import {WelcomeCar} from './WelcomeCar'
import {WelcomeWheels} from './WelcomeWheels'
import {WelcomeAccents} from './WelcomeAccents'

interface Props {
    size?: number
}

export const IllustrationWelcome = ({size = 240}: Props) => {
    const theme = useAppTheme()
    const p = theme.colors.primary
    const t = theme.colors.tertiary
    const pc = theme.colors.primaryContainer
    const s = theme.colors.secondary
    const dark = theme.colors.surfaceDark

    return (
        <Svg width={size} height={size} viewBox='0 0 240 240'>
            <Defs>
                <RadialGradient id='wHalo' cx='50%' cy='46%' r='55%'>
                    <Stop offset='0%' stopColor={pc} stopOpacity={1} />
                    <Stop offset='55%' stopColor={pc} stopOpacity={0.45} />
                    <Stop offset='100%' stopColor={pc} stopOpacity={0} />
                </RadialGradient>
                <RadialGradient id='wStage' cx='50%' cy='50%' r='50%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={0.25} />
                    <Stop offset='60%' stopColor={pc} stopOpacity={0.4} />
                    <Stop offset='100%' stopColor={pc} stopOpacity={0} />
                </RadialGradient>
                <LinearGradient id='wBody' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <Stop offset='0%' stopColor={s} stopOpacity={1} />
                    <Stop offset='45%' stopColor={p} stopOpacity={1} />
                    <Stop offset='100%' stopColor={dark} stopOpacity={1} />
                </LinearGradient>
                <LinearGradient id='wGlass' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={0.55} />
                    <Stop offset='45%' stopColor={pc} stopOpacity={0.9} />
                    <Stop offset='100%' stopColor={s} stopOpacity={0.9} />
                </LinearGradient>
                <LinearGradient id='wRim' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <Stop offset='0%' stopColor={pc} stopOpacity={1} />
                    <Stop offset='100%' stopColor={s} stopOpacity={1} />
                </LinearGradient>
                <LinearGradient id='wHorizon' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={0} />
                    <Stop offset='50%' stopColor={t} stopOpacity={0.75} />
                    <Stop offset='100%' stopColor={t} stopOpacity={0} />
                </LinearGradient>
                <RadialGradient id='wBeam' cx='50%' cy='50%' r='50%'>
                    <Stop offset='0%' stopColor={t} stopOpacity={0.55} />
                    <Stop offset='100%' stopColor={t} stopOpacity={0} />
                </RadialGradient>
            </Defs>

            <Circle cx='120' cy='108' r='112' fill='url(#wHalo)' />

            <Rect x='0' y='152' width='240' height='1.6' fill='url(#wHorizon)' />
            <Rect x='12' y='154.5' width='216' height='0.7' fill='url(#wHorizon)' opacity={0.5} />

            <Ellipse cx='120' cy='172' rx='102' ry='22' fill='url(#wStage)' />

            <Circle cx='120' cy='110' r='92' fill='none' stroke={p} strokeWidth='0.8' strokeDasharray='1 5' opacity={0.2} />

            <Ellipse cx='120' cy='188' rx='88' ry='4.5' fill={p} opacity={0.22} />
            <Ellipse cx='120' cy='188' rx='58' ry='2.5' fill={p} opacity={0.25} />

            <Ellipse cx='14' cy='157' rx='22' ry='6' fill='url(#wBeam)' />

            <WelcomeCar />
            <WelcomeWheels />
            <WelcomeAccents />
        </Svg>
    )
}
