import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {haptics} from '@/global/utils'

import {YearWheelItem} from './YearWheelItem'

const ITEM_HEIGHT = 42
const VISIBLE = 5
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE
const PAD = (WHEEL_HEIGHT - ITEM_HEIGHT) / 2

export interface YearWheelHandle {
    scrollToYear: (year: number) => void
}

interface YearWheelProps {
    label: string
    years: number[]
    value: number
    onChange: (year: number) => void
}

/** iOS-style snap wheel: scroll to a year, the centred row sits on an amber band. */
export const YearWheel = forwardRef<YearWheelHandle, YearWheelProps>(({label, years, value, onChange}, ref) => {
    const theme = useAppTheme()
    const scrollY = useRef(new Animated.Value(0)).current
    const scrollRef = useRef<ScrollView>(null)
    const lastIndex = useRef(Math.max(0, years.indexOf(value)))

    const scrollToIndex = (index: number, animated: boolean) => scrollRef.current?.scrollTo({y: index * ITEM_HEIGHT, animated})

    useEffect(() => {
        requestAnimationFrame(() => scrollToIndex(lastIndex.current, false))
    }, [])

    useImperativeHandle(ref, () => ({
        scrollToYear: (year: number) => {
            const i = years.indexOf(year)
            if (i >= 0) {
                lastIndex.current = i
                scrollToIndex(i, true)
            }
        },
    }))

    const handleEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const i = Math.max(0, Math.min(years.length - 1, Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT)))
        if (i !== lastIndex.current) {
            lastIndex.current = i
            haptics.selection()
            onChange(years[i])
        }
    }

    return (
        <View style={styles.column}>
            <Text style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>{label}</Text>
            <View
                style={[styles.wheel, {height: WHEEL_HEIGHT}]}
                accessibilityRole='adjustable'
                accessibilityLabel={`${label} ${value}`}>
                <View
                    style={[styles.band, {backgroundColor: theme.colors.accentSoft, top: PAD, height: ITEM_HEIGHT}]}
                    pointerEvents='none'
                />
                <Animated.ScrollView
                    ref={scrollRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate='fast'
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
                    onMomentumScrollEnd={handleEnd}
                    contentContainerStyle={styles.content}>
                    {years.map((y, i) => (
                        <YearWheelItem key={y} year={y} index={i} scrollY={scrollY} itemHeight={ITEM_HEIGHT} />
                    ))}
                </Animated.ScrollView>
            </View>
        </View>
    )
})

YearWheel.displayName = 'YearWheel'

const styles = StyleSheet.create({
    column: {width: '100%', alignItems: 'center', gap: 10},
    label: {fontSize: 12.5, fontWeight: '800'},
    wheel: {width: '100%', position: 'relative', overflow: 'hidden'},
    band: {position: 'absolute', left: 6, right: 6, borderRadius: 12},
    content: {paddingVertical: PAD},
})
