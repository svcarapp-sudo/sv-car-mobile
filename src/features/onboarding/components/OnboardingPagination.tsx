import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    NEXT: 'التالي',
    GET_STARTED: 'ابدأ الآن',
}

interface OnboardingPaginationProps {
    total: number
    activeIndex: number
    isLast: boolean
    onNext: () => void
}

export const OnboardingPagination = ({total, activeIndex, isLast, onNext}: OnboardingPaginationProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <View style={styles.dots}>
                {Array.from({length: total}).map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === activeIndex ? styles.dotActive : styles.dotInactive,
                            {backgroundColor: i === activeIndex ? theme.colors.primary : theme.colors.outline},
                        ]}
                    />
                ))}
            </View>

            <Button
                mode='contained'
                onPress={onNext}
                style={styles.mainBtn}
                contentStyle={styles.mainBtnContent}
                labelStyle={styles.mainBtnLabel}>
                {isLast ? ARABIC_TEXT.GET_STARTED : ARABIC_TEXT.NEXT}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 32,
        paddingBottom: 50,
        alignItems: 'center',
    },
    dots: {flexDirection: 'row', gap: 8, marginBottom: 28},
    dot: {height: 8, borderRadius: 4},
    dotActive: {width: 24},
    dotInactive: {width: 8},
    mainBtn: {borderRadius: 14, width: '100%'},
    mainBtnContent: {paddingVertical: 6},
    mainBtnLabel: {fontSize: 16, fontWeight: '700'},
})
