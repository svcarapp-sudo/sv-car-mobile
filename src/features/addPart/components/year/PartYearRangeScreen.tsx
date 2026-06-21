import {useEffect, useMemo, useRef, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import {YearModeToggle, type YearMode} from './YearModeToggle'
import {YearSelectionSummary} from './YearSelectionSummary'
import {YearWheel, type YearWheelHandle} from './YearWheel'

const T = {CONTINUE: 'متابعة', FROM: 'من سنة', TO: 'إلى سنة', YEAR: 'السنة'}

interface PartYearRangeScreenProps {
    years: number[]
    yearFrom: number | null
    yearTo: number | null
    onChange: (from: number | null, to: number | null) => void
    onNext: () => void
    contentTopInset?: number
}

const deriveMode = (from: number | null, to: number | null): YearMode => (to != null && to !== from ? 'range' : 'single')

/** Compatible model years: a single snap wheel, or two (From/To) for a span. */
export const PartYearRangeScreen = ({
    years,
    yearFrom,
    yearTo,
    onChange,
    onNext,
    contentTopInset = 0,
}: PartYearRangeScreenProps) => {
    const theme = useAppTheme()
    const fromRef = useRef<YearWheelHandle>(null)
    const toRef = useRef<YearWheelHandle>(null)
    const sorted = useMemo(() => [...years].sort((a, b) => b - a), [years])
    const newest = sorted[0]
    const [mode, setMode] = useState<YearMode>(() => deriveMode(yearFrom, yearTo))

    useEffect(() => {
        if (yearFrom == null && newest != null) onChange(newest, newest)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newest])

    if (sorted.length === 0) return null

    const from = yearFrom ?? newest
    const to = yearTo ?? newest

    const changeMode = (next: YearMode) => {
        setMode(next)
        if (next === 'single') onChange(from, from)
    }

    const handleSingle = (y: number) => onChange(y, y)

    const handleFrom = (f: number) => {
        const nextTo = Math.max(f, to)
        onChange(f, nextTo)
        if (nextTo !== to) toRef.current?.scrollToYear(nextTo)
    }

    const handleTo = (t: number) => {
        const nextFrom = Math.min(t, from)
        onChange(nextFrom, t)
        if (nextFrom !== from) fromRef.current?.scrollToYear(nextFrom)
    }

    return (
        <View style={[styles.container, {paddingTop: contentTopInset}]}>
            <YearModeToggle mode={mode} onChange={changeMode} />
            <YearSelectionSummary mode={mode} from={from} to={to} />

            {mode === 'single' ? (
                <View style={styles.singleWheel}>
                    <YearWheel label={T.YEAR} years={sorted} value={from} onChange={handleSingle} />
                </View>
            ) : (
                <View style={styles.wheels}>
                    <View style={styles.slot}>
                        <YearWheel ref={fromRef} label={T.FROM} years={sorted} value={from} onChange={handleFrom} />
                    </View>
                    <View style={styles.slot}>
                        <YearWheel ref={toRef} label={T.TO} years={sorted} value={to} onChange={handleTo} />
                    </View>
                </View>
            )}

            <View style={styles.spacer} />
            <Button
                mode='contained'
                onPress={onNext}
                buttonColor={theme.colors.primary}
                icon='arrow-left'
                style={styles.continue}
                contentStyle={styles.continueContent}>
                {T.CONTINUE}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, paddingHorizontal: 4, gap: 14},
    wheels: {flexDirection: 'row', gap: 16, paddingHorizontal: 8},
    slot: {flex: 1},
    singleWheel: {width: '60%', alignSelf: 'center'},
    spacer: {flex: 1},
    continue: {borderRadius: 14, marginBottom: 12},
    continueContent: {paddingVertical: 6},
})
