import {useState} from 'react'
import {FlatList, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import {YearChip, type YearRole} from './YearChip'
import {YearModeToggle, type YearMode} from './YearModeToggle'
import {YearRangeSummary, type ActiveBound} from './YearRangeSummary'

const T = {
    CONTINUE: 'متابعة',
    HINT_START: 'اضغط على سنة البداية',
    HINT_END: 'اضغط على سنة النهاية',
    HINT_EDIT: 'اضغط على سنة لتعديل النطاق',
}

interface PartYearRangeScreenProps {
    years: number[]
    yearFrom: number | null
    yearTo: number | null
    onChange: (from: number | null, to: number | null) => void
    onNext: () => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    contentTopInset?: number
}

const deriveMode = (from: number | null, to: number | null): YearMode => (to != null && to !== from ? 'range' : 'single')

const roleFor = (year: number, from: number | null, to: number | null, mode: YearMode): YearRole => {
    if (from == null) return 'idle'
    if (mode === 'single') return year === from ? 'single' : 'idle'
    if (to == null || from === to) return year === from ? 'start' : 'idle'
    if (year === from) return 'start'
    if (year === to) return 'end'
    return year > from && year < to ? 'middle' : 'idle'
}

export const PartYearRangeScreen = ({
    years,
    yearFrom,
    yearTo,
    onChange,
    onNext,
    onScroll,
    contentTopInset = 0,
}: PartYearRangeScreenProps) => {
    const theme = useAppTheme()
    const [mode, setMode] = useState<YearMode>(() => deriveMode(yearFrom, yearTo))

    const changeMode = (next: YearMode) => {
        setMode(next)
        // Collapsing a real span back to single keeps the start as the chosen year.
        if (next === 'single' && yearTo != null && yearTo !== yearFrom) onChange(yearFrom, null)
    }

    const handleTap = (y: number) => {
        if (mode === 'single') {
            onChange(y, null)
        } else if (yearFrom == null) {
            onChange(y, null)
        } else if (yearTo == null) {
            // Second tap closes the span, auto-ordered so the end never precedes the start.
            if (y < yearFrom) onChange(y, yearFrom)
            else onChange(yearFrom, y)
        } else if (y <= yearFrom) {
            onChange(y, yearTo)
        } else if (y >= yearTo) {
            onChange(yearFrom, y)
        } else if (y - yearFrom <= yearTo - y) {
            // Tap inside a finished span: nudge the nearer end — never wipe the selection.
            onChange(y, yearTo)
        } else {
            onChange(yearFrom, y)
        }
    }

    let active: ActiveBound = 'none'
    let hint = ''
    if (mode === 'range') {
        if (yearFrom == null) {
            active = 'start'
            hint = T.HINT_START
        } else if (yearTo == null) {
            active = 'end'
            hint = T.HINT_END
        } else {
            hint = T.HINT_EDIT
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={years}
                numColumns={3}
                keyExtractor={y => String(y)}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <YearModeToggle mode={mode} onChange={changeMode} />
                        <YearRangeSummary
                            mode={mode}
                            yearFrom={yearFrom}
                            yearTo={yearTo}
                            active={active}
                            onClear={() => onChange(null, null)}
                        />
                        {hint ? <Text style={[styles.hint, {color: theme.colors.onSurfaceVariant}]}>{hint}</Text> : null}
                    </View>
                }
                renderItem={({item}) => (
                    <YearChip year={item} role={roleFor(item, yearFrom, yearTo, mode)} onPress={() => handleTap(item)} />
                )}
                contentContainerStyle={[styles.grid, {paddingTop: contentTopInset}]}
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
            <Button
                mode='contained'
                onPress={onNext}
                disabled={yearFrom == null}
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
    container: {flex: 1},
    list: {flex: 1},
    header: {gap: 12, marginBottom: 14},
    hint: {fontSize: 12.5, fontWeight: '600', textAlign: 'center', marginTop: -2},
    grid: {paddingBottom: 16},
    continue: {borderRadius: 14, marginTop: 8, marginBottom: 12},
    continueContent: {paddingVertical: 6},
})
