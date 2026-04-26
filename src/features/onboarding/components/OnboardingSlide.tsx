import {Dimensions, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import type {OnboardingSlideData} from '../constants/slides'
import {IllustrationWelcome} from './illustrationWelcome'
import {IllustrationBrowse} from './IllustrationBrowse'
import {IllustrationSell} from './IllustrationSell'

const {width: SCREEN_WIDTH} = Dimensions.get('window')

const ILLUSTRATIONS = {
    welcome: IllustrationWelcome,
    browse: IllustrationBrowse,
    sell: IllustrationSell,
}

interface OnboardingSlideProps {
    slide: OnboardingSlideData
}

export const OnboardingSlide = ({slide}: OnboardingSlideProps) => {
    const theme = useAppTheme()
    const Illustration = ILLUSTRATIONS[slide.illustration]

    return (
        <View style={styles.container}>
            <View style={styles.illustrationWrap}>
                <Illustration size={260} />
            </View>
            <Text style={[styles.title, {color: theme.colors.onSurface}]}>{slide.title}</Text>
            <Text style={[styles.description, {color: theme.colors.onSurfaceVariant}]}>{slide.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 36,
        paddingBottom: 100,
    },
    illustrationWrap: {
        marginBottom: 32,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: -0.3,
        marginBottom: 14,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 26,
        opacity: 0.75,
    },
})
