import {Animated, StyleSheet} from 'react-native'

import {useAppTheme} from '@/global/hooks'

interface YearWheelItemProps {
    year: number
    index: number
    scrollY: Animated.Value
    itemHeight: number
}

/** One year row that fades + scales toward the centred selection as it scrolls. */
export const YearWheelItem = ({year, index, scrollY, itemHeight}: YearWheelItemProps) => {
    const theme = useAppTheme()
    const center = index * itemHeight
    const inputRange = [center - 2 * itemHeight, center - itemHeight, center, center + itemHeight, center + 2 * itemHeight]
    const opacity = scrollY.interpolate({inputRange, outputRange: [0.22, 0.5, 1, 0.5, 0.22], extrapolate: 'clamp'})
    const scale = scrollY.interpolate({inputRange, outputRange: [0.8, 0.9, 1, 0.9, 0.8], extrapolate: 'clamp'})

    return (
        <Animated.View style={[styles.item, {height: itemHeight, opacity, transform: [{scale}]}]}>
            <Animated.Text style={[styles.text, {color: theme.colors.onSurface}]}>{year}</Animated.Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    item: {justifyContent: 'center', alignItems: 'center'},
    text: {fontSize: 22, fontWeight: '700', writingDirection: 'ltr'},
})
